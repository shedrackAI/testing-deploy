export default function AuthButton(props) {
    return (
        <button className="rounded-full p-3 w-[20rem] bg-mainBlue transition-color ease-in duration-300 mb-4 hover:bg-mainBlue/[80%]"
        onClick={props.onClick}>
            <p className="font-medium">{props.text}</p>
        </button>
    )
}