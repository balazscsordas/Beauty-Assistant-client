import StatusFilterItem from "./StatusFilterItem"

const StatusFilter = () => {

    const statuses = [
        {
            engName: 'expired',
            hunName: 'Lejárt'
        },
        {
            engName: 'pending',
            hunName: 'Függőben'
        },
        {
            engName: 'used',
            hunName: 'Felhasznált'
        }
    ];

    return (
        <section className="mt-4">
            {statuses.map((status, index) => (
                <StatusFilterItem key={index} hunName={status.hunName} engName={status.engName}/>
            ))}
        </section>
    )
}

export default StatusFilter;