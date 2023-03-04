export default function PrimaryFiled(props) {
    return (
        <div className="flex flex-col mb-6">
            <label className="text-[0.8rem] font-medium" htmlFor="text">{props.label}</label>
            <input className="w-[20rem] h-[3rem] border-mainBlue hover:border-mainBlue rounded-lg apearance-none focus:ring-mainBlue bg-transparent focus:ring-1 focus:border-mainBlue focus:outline-none focus:transition-color" 
                type={props.type}
                value={props.value}
                id={props.id}
                placeholder={props.placeholder}
                onChange={props.onChange} />
        </div>
    )
}