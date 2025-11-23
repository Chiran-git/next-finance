export default function Label(props) {
    return <label {...props} className={`textgray-700 dark:text-gray-300 ml-1 ${props.className}`}></label>
}