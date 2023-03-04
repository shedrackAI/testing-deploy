
export default function SecondaryButton(props) {
    return (
        <button onClick={props.onClick} className="border bg-white h-fit p-2 px-4 md:px-5 hover:transition-colors hover:bg-mainBlue hover:text-white rounded-full ">
            <p>{props.text}</p>
        </button>
    )
}