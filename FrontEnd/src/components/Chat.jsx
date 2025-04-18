import React, { useEffect, useRef, useState } from 'react'
import { useMessageStore } from '../store/useMessageStore'
import { ChatHeader } from './ChatHeader'
import { MessageInput } from './MessageInput'
import { Loader } from 'lucide-react'
import ChatSkeleton from './Skeletons/ChatSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { DateFormated } from '../lib/utills'

function Chat() {
  const { message, getMessage, isMessageLoding, selectedUser, subcribeToMessages, unsubcribeToMessage } = useMessageStore()
  const { authUser } = useAuthStore()

  const messaeEndRef = useRef(null)
 
  useEffect(() => {
    subcribeToMessages() // real time messgae
    getMessage(selectedUser._id) 
    return () => unsubcribeToMessage()
  }, [selectedUser._id, getMessage])


  // auto scroll to bottom when userRef or messagge are change or triggerd 
  useEffect(() => {
    if(messaeEndRef.current && message){
      messaeEndRef.current.scrollIntoView({behavior:"smooth"})
    }
  }, [message])

  
  // for skeleton ui
  if (isMessageLoding) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <ChatSkeleton />
        <MessageInput />
      </div>
    );
  }
  
  return (
    <>
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader className='z-2 bg-atech ' />
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          {
            message.map((v) => (
              <div key={v._id}
                className={`chat ${v.senderId == authUser._id ? "chat-end" : "chat-start"}`}
                ref={messaeEndRef}
              >
                <div className='chat-image avatar'>
                  <div className='size-10 rounded-full border'>
                    <img src={v.senderId === authUser._id ? authUser.image || '/avatar.png' : selectedUser.image || '/avatar.png'} />
                  </div>
                </div>
                <div className='chat-header'>
                  <time className='text-xs opacity-50 ml-1'>
                    {DateFormated(v.createdAt)}
                  </time>
                </div>
                <div className='chat-bubble flex flex-col'>
                  <button>
                    <img src={v.image} className='sm:max-w-[200px] rounded mb-2' />
                    {v.text && <p>{v.text}</p>}
                  </button>
                </div>
              </div>
            ))
          }
        </div>
        <MessageInput className='z-1 fixed' />
      </div>
    </>
  )
}

export default Chat