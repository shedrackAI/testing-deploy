import React from 'react'

function PrimaryInput(props) {
  return (
    <input className="w-full h-[3rem] border-2 border-mainBlue bg-input-gray rounded-lg placeholder:text-gray/50 apearance-none focus:outline-none  outline-none" 
        type={props.type}
        value={props.value}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange} 
        onFocus={props.onFocus}
    />
  )
}

export default PrimaryInput