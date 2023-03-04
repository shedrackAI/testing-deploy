import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts/AppContext';
import Post from './Post'

function Posts() {
    const { 
        userDetails,
        notifications,
        setNotifications
    } = useContext(AppContext);

  return (
    <div className="w-full mt-6 space-y-7 overflow-y-scroll max-h-[600px]">
        {notifications.map((item) => {
            return (
                <Post key={item._id} imageUrl={item.profileImage} text={item.message} name={item.from} token={item.token}/> 
            )
        })}
    </div>
  )
}

export default Posts;