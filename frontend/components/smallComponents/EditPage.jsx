import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext';
import PrimaryButton from '../PrimaryButton'
import PrimaryInput from '../PrimaryInput'
import ProfilePicture from '../ProfilePicture'

function EditPage() {
  const { userToken, userDetails, setUserDetails, setSettingStatus } = useContext(AppContext);

  const { website, instagram, twitter, name, bio, profileImg} = userDetails;

  const onChange = (e) => {
    setUserDetails((prevVal) => ({
        ...prevVal,
        [e.target.id]: e.target.value,
    }))
}

  return (
    <section className="w-full px-10 pt-5">
        <div className="w-[70px] overflow-hidden rounded-full border-[5px] border-mainYellow">
            <ProfilePicture />
        </div>
        <form className="my-5 space-y-5">
            <div className="space-y-1">
                <label htmlFor="name" className="font-bold text-sm">Name</label>
                <PrimaryInput 
                  type="text"
                  placeholder="Name"
                  id="name"
                  value={name}
                  onChange={onChange}
                />
            </div>
            <div>
                <label htmlFor="about" className="font-bold text-sm">About me</label>
                <textarea 
                 name="about" 
                 placeholder="Name" 
                 cols="30" 
                 rows="4"
                 value={bio}
                 id={"bio"}
                 onChange={onChange}
                 className="space-y-1 bg-input-gray w-full px-4 py-2 border-2 border-mainBlue rounded-lg resize-none placeholder:text-sm placeholder:text-gray/50">
                </textarea>
            </div>
            <div className="space-y-1">
            <label htmlFor="name" className="font-bold text-sm">Website</label>
                <PrimaryInput 
                  type="text"
                  placeholder="Web link"
                  id="website"
                  value={website}
                  onChange={onChange}
                />
            </div>
            <div className="space-y-1">
                <label htmlFor="twitter" className="font-bold text-sm">Twitter handle</label>
                <PrimaryInput 
                  type="text"
                  placeholder="@yourtwitterhandle"
                  id="twitter"
                  value={twitter}
                  onChange={onChange}
                />
            </div>
            <div className="space-y-1">
                <label htmlFor="instagram" className="font-bold text-sm">Instagram handle</label>
                <PrimaryInput 
                  type="text"
                  placeholder="@yourinstagramhandle"
                  id="instagram"
                  value={instagram}
                  onChange={onChange}
                />
            </div>
        </form>
        <button className='px-4 py-2 text-center bg-dark-blue rounded-full text-white text-sm'>
            Log Out @Name
        </button>
    </section>
  )
}

export default EditPage