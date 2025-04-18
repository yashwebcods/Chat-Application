import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import Chat from '../components/Chat'
import { useMessageStore } from '../store/useMessageStore'

function HomePage() {
  const { selectedUser } = useMessageStore()

  return (  
    <>
      <div className='mt-16 p-3 h-screen bg-base-200'>
        <div className='flex items-center justify-center pi-20 px-4'>
          <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]'>
            <div className='flex h-full rounded-lg overfllow-hidden'>
              <Sidebar />

              {!selectedUser ? <NoChatSelected /> : <Chat />}
            </div>
          </div>
        </div >
      </div>
    </>
  )
}

export default HomePage