export default function PrimaryButton(props) {
    return (
        <button className="rounded-full p-3 w-full bg-mainBlue transition-color ease-in duration-300 mb-4 hover:bg-mainBlue/[80%]"
         onClick={props.onClick}>
         <p className="font-bold">{props.text}</p>
        </button>
    )
}