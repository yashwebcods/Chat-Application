import React, { useEffect } from 'react'
import { useMessageStore } from '../store/useMessageStore'
import SidebarSkeleton from './Skeletons/sidebarSkeleton'
import { User } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

function Sidebar() {
    const { getUsers, users, selectedUser, isUsersLoading, setSelectedUser } = useMessageStore()

    const { onlineUsers } = useAuthStore()

    useEffect(() => {
        console.log(users);
        getUsers()
    }, [getUsers])


    if (isUsersLoading) return <SidebarSkeleton />
    return (
        <>
            <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
                <div className='border-b border-base-300 w-full p-5 '>
                    <div className='flex items-center gap-2'>
                        <User className='size-6 ' />
                        <span className='font-medium hidden lg:block'>Contact</span>
                    </div>
                </div>
                <div className='overflow-y-hidden w-full py-3'>
                    {users.map((v, i) => {
                        return (
                            <button key={v._id} onClick={() => setSelectedUser(v)} className={`w-full p-3 flex items-center gap-5 
                            hover:bg-base-300 transition-colors
                             ${selectedUser?._id === v._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                            `}>
                                <div className='relative mx-auto lg:mx-0'>
                                    <div>
                                        <img src={v.image || "../../public/avatar.png"} alt={v.fullName} className='size-10 rounded-4xl' />
                                    </div>
                                    {
                                        onlineUsers.includes(v._id) && (
                                            <span
                                                className="absolute bottom-0 right-0 size-3 bg-green-500 
                                                rounded-full ring-2 ring-zinc-900"
                                            />
                                        )
                                    }
                                </div>
                                <div className='hidden lg:block text-left min-w-0"'>
                                    <div className='font-medium truncate'>{v.fullName}</div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </aside>
        </>
    )
}

export default Sidebar 