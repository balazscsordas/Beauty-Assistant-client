import { ServicesListInterface } from "../../interfaces/ServicesListInterfaces"; 

const ClientCard = ({ name }: ServicesListInterface) => {
    return (
        <section id="client-card-section">
            <p>{name}</p>
        </section>
    )
}

export default ClientCard;