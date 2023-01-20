const WeekdaysName = () => {

    const daysName = ['H', 'K', 'SZ', 'CS', 'P', 'SZ', 'V']

    return (
        <div className="days-block">
            {daysName.map((day, index) => (
                <span key={index}>{day}</span>
            ))}
        </div>
    )
}

export default WeekdaysName;