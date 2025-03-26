import { create } from "zustand";
import { axiosInstance } from '../lib/axios'
import toast from "react-hot-toast";

export const useMessageStore = create((set) => ({

    user: fasle,
    isMessageLoding : fasle,
    selectedUser:null,
    message:[],

    getUser: async () => {
        set({ user: true })
        try {
            res = await axiosInstance.get('/message/users')
            set({ user: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ user: fasle })
        }
    },

    getMessage: async (userId) => {
        set({isMessageLoding:true})
        try {
            const res = await axiosInstance(`/message/${userId}`) 
            set({message:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isMessageLoding:false})
        }
    }
}))