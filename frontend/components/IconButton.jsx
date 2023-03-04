
export default function IconButton(props) {
    return (
        <button className="border bg-white h-fit p-3 md:p-3 hover:transition-colors hover:bg-mainBlue hover:text-white rounded-full ">
            {props.children}
        </button>
    )
}