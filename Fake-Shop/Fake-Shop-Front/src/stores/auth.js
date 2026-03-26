import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../api';

export const useAuthStore = defineStore('auth', () => {
  const storedUser = localStorage.getItem('fake_store_user');
  const user = ref(storedUser ? JSON.parse(storedUser) : null);

  const isAuthenticated = computed(() => user.value !== null);

  const login = async (email, password) => {
    try {
      const response = await api.post('/users/login', { email, password });
      
      user.value = response.data;
      
      localStorage.setItem('fake_store_user', JSON.stringify(response.data));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed.' 
      };
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('fake_store_user');
  };

  return { user, isAuthenticated, login, logout };
});