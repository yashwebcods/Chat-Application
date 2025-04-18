import { LogOut, MessageSquare, Settings , User } from 'lucide-react'
import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';

function Navbar() {
  const { logout, authUser } = useAuthStore();
  return (
    <>
      <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg'>
        <div className='container mx-auto px-4 h-16'>
          <div className='flex items-center justify-between h-full'>
            <div className='flex items-center gap-8'>
              <Link to="/" className='flex items-center'>
                <div className='p-2 bg-primary/10 rounded-lg mx-2'>
                  <MessageSquare className='size-5 h-5 text-primary' />
                </div>
                <h1 className='text-primary font-bold'>
                  Chatty
                </h1>
              </Link>
            </div>
            <div className='flex items-center gap-5'>
              <Link className='flex gap-2 items-center backdrop-blur-sm' to={"/setting"}>
                <Settings className='size-5 text-primary/60 ' />
                <span className='hidden sm:inline'>Setting</span>
              </Link>
              {authUser && (
                <>
                  <Link className='flex gap-2 items-center backdrop-blur-sm' to={"/profile"}>
                    <User className='size-5 text-primary/60 ' />
                    <span className='hidden sm:inline'>Profile</span>
                  </Link>
                  <button className='flex gap-2 items-center' onClick={logout}>
                    <LogOut className='size-5 text-red/50' />
                    <span className='hidden sm:inline'>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>



        </div>
      </header>
    </>
  )
}

export default Navbar