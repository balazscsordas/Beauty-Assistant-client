interface Props {
    number: number,
    title: string;
    bgColor: string;
}

const PhaseDisplayerItem = ({ number, title, bgColor }: Props) => {

    return (
        <div className="px-2 font-medium basis-1/4">
            <span className={`m-auto w-6 h-6 sm:w-8 sm:h-8 z-10 flex items-center justify-center rounded-full mb-2 text-xs  ${bgColor}`}>
                { number }
            </span>
            <span className="text-[0.6rem] md:text-xs flex justify-center">{ title }</span>
        </div>
    )
}

export default PhaseDisplayerItem;