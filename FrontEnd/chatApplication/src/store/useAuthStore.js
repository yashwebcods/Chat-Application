import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

export const useAuthStore = create((set) => ({

    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data })
        } catch (err) {
            console.log('Error in check auth', err.message);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            toast.success("Account Created")
            set({ authUser: res.data })
        } catch (err) {
            toast.error(err.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    },

    logout: async () => {
        set({ isSigningUp: false })
        try {
            const res = await axiosInstance.get('/auth/logout')
            toast.success('Logout Success')
            set({ authUser: null })
        } catch (err) {
            toast.error(err.response.data.message)
        } finally {
            set({ isSigningUp: true })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        console.log(data);
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({ authUser: res.data })
            toast.success('Logged in succesfully')
        } catch (err) {
            toast.error(err.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    updateProfile: async (data) => {
        set({ updateProfile: true })
        try {
            const res = await axiosInstance.put('/auth/update-profile',data)
            set({authUser:res.data})
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log('Error in profile update', error.message);
            toast.error(error.response.data.message)
        } finally {
            set({ updateProfile: false })
        }
    }
}));
