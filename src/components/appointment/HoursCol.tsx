import { useMemo } from "react";

const HoursCol = () => {

    const hours = useMemo(() => [
        '8:00', '8:15', '8:30', '8:45', 
        '9:00', '9:15', '9:30', '9:45',
        '10:00', '10:15', '10:30', '10:45',
        '11:00', '11:15', '11:30', '11:45',
        '12:00', '12:15', '12:30', '12:45',
        '13:00', '13:15', '13:30', '13:45',
        '14:00', '14:15', '14:30', '14:45',
        '15:00', '15:15', '15:30', '15:45',
        '16:00', '16:15', '16:30', '16:45',
        '17:00', '17:15', '17:30', '17:45',
        '18:00', '18:15', '18:30', '18:45',
        '19:00', '19:15', '19:30', '19:45',
    ], [])

    
    return (
        <div className="flex flex-col relative bottom-[22.5px]">
            {hours.map((hour, index) => (
                <span key={index} className="text-xs [&:nth-child(4n+1)]:font-bold [&:nth-child(4n+1)]:text-sm h-[45px] w-16 md:w-20 flex items-center justify-center">
                    {hour}
                </span>
            ))}
        </div>
    )
}

export default HoursCol;