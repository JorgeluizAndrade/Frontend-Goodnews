import CrudPosts from '@/components/CrudPosts'
import React from 'react'

import "@/app/globals.css";

type Props = {}

const ManagerPosts = (props: Props) => {
  return (
    <div>
        <CrudPosts />
    </div>
  )
}

export default ManagerPosts