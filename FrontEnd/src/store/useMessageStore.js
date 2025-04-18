import { create } from "zustand";
import { axiosInstance } from '../lib/axios'
import toast from "react-hot-toast";
import { useAuthStore } from './useAuthStore'

export const useMessageStore = create((set,get) => ({

    message: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoding: false,
    

    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            
            const res = await axiosInstance.get('/message/users')            
            set({ users: res.data })
        } catch (err) {
            toast.error(err.response.err.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },


    getMessage: async (userId) => {
        try {
            set({ isMessageLoding: true })
            const res = await axiosInstance(`/message/${userId}`)
            set({ message: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessageLoding: false })
        }
    },

    sendMessages: async (messageData) => {
        const { message,selectedUser } = get()
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)   
            set({message:[...message,res.data]})
        } catch (error) {   
            toast.error(error.response.data.message)
        }
    },

    subcribeToMessages: () => {
        const {selectedUser} = get()
        if(!selectedUser) return;
        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return 
            set({ message:[...get().message,newMessage] })
        }) 
    },

    unsubcribeToMessage:() => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage")
    },

    setSelectedUser : (selectedUser) => set({selectedUser})
}))