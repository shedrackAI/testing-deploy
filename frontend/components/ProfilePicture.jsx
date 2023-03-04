import Image from 'next/image'
import React, { useContext } from 'react'

import image from '../assets/picture.jpg'
import { AppContext } from '../contexts/AppContext';

function ProfilePicture() {
  const { 
    userDetails, 
    setUserDetails,
    avatar
} = useContext(AppContext);
  return (
        <Image src={avatar} width={130} height={130} alt="profile picture" />
  )
}

export default ProfilePicture