
interface Props {
    text: string;
    data: number | string;
}

const ListStatitem = ({ text, data }: Props) => {
    return (
        <div className="flex flex-row flex-wrap justify-between mt-4 md:mt-5">
            <p>{text}</p>
            <span className="font-medium">{data}</span>
        </div>
    )
}

export default ListStatitem;