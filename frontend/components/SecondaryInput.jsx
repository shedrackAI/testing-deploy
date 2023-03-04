

export default function SecondaryInput(props) {
    return(
        <input className="w-full h-[3rem] border-none bg-[#F6F6F6] rounded-lg placeholder:text-gray/50 apearance-none bg-transparent focus:outline-none  outline-none" 
            type={props.type}
            value={props.value}
            id={props.id}
            placeholder={props.placeholder}
            onChange={props.onChange} 
            name={props.name}
        />
    )
}

// focus:ring-mainBlue hover:ring-mainBlue
// hover:border-mainBlue
// focus:border-mainBlue
// hover:ring-1
// focus:ring-1
// focus:transition-color