import { ClientListInterface } from "../../interfaces/ClientInterfaces"; 
import ClientCard from "./ClientCard";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import { Container, Row } from 'react-bootstrap';
import Link from "next/link";


const ClientList = ({ clients }: ClientListInterface[]) => {

    return (
            <section id="client-list-section">
                <>
                    <h1 className="section-title">Vendégek</h1>
                    <div className="button-block">
                        <Link href="/admin/add-new-client" passHref>
                            <Button 
                                className="add-new-client-button" 
                                variant="outlined" 
                                startIcon={<AddCircleOutlineIcon />}>
                                Vendég hozzáadása
                            </Button>
                        </Link>
                        
                    </div>
                    <Container className="client-list">
                        <Row>
                            {clients.length === 0 
                                ? <p>Még nem adtál hozzá vendéget!</p>
                                : clients.map((client: ClientListInterface, index: number) => (
                                <ClientCard
                                    key={index}
                                    age={client.age}
                                    name={client.name}
                                />
                            ))}
                        </Row>
                    </Container>
                </>
            </section>
    )
}

export default ClientList;