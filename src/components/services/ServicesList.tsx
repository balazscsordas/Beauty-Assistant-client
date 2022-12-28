import { useState } from "react"; 
import { Row } from "react-bootstrap";
import { ServiceListInterface } from "../../interfaces/ServiceInterfaces"; 
import ServiceCard from "./ServiceCard";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';  
import Link from "next/link";

const ClientList = () => {

    const [services, setServices] = useState<ServiceListInterface[]>([]);

    return (
            <section id="client-list-section">
                <h1 className="section-title">Szolgáltatások</h1>
                <div className="button-block">
                    <Link href="/admin/add-new-service" passHref>
                        <Button 
                            className="add-new-client-button" 
                            variant="outlined" 
                            startIcon={<AddCircleOutlineIcon />}>
                            Szolgáltatás hozzáadása
                        </Button>
                    </Link>
                </div>
                <div className="client-list">
                    {services.length === 0
                        ? <p>Még nem adtál hozzá szolgáltatást.</p>
                        : <p>a</p>
                    }
                </div>
                
                
            </section>
    )
}

export default ClientList;