import { useSession } from 'next-auth/react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { CreatePost } from '~/components/CreatePost'

const createPostPage = () => {
  const session = useSession()
  
  if (session.status === "unauthenticated") return

  return (
    <div className='flex justify-center p-12'>
      <CreatePost></CreatePost>
    </div>
  )
}

export default createPostPage