import { ServiceListInterface } from "../../interfaces/ServicesListInterfaces"; 

const ClientCard = ({ name }: ServiceListInterface) => {
    return (
        <section id="client-card-section">
            <p>{name}</p>
        </section>
    )
}

export default ClientCard;