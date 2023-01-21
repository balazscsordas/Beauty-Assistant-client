const WeekdaysName = () => {

    const daysName = ['H', 'K', 'SZ', 'CS', 'P', 'SZ', 'V']

    return (
        <div className="flex flex-row my-3">
            {daysName.map((day, index) => (
                <span className="flex p-0 justify-center items-center text-sm w-[14.28%] h-10 rounded-full" key={index}>{day}</span>
            ))}
        </div>
    )
}

export default WeekdaysName;