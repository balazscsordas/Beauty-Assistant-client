import { FeatureLi } from '../../interfaces/HomepageInterfaces';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Collapse, IconButton } from '@mui/material';
import { useState } from 'react';

const FeatureList = ({ title, description }: FeatureLi) => {

    const [showDescription, setShowDescription] = useState(false);

    return (
        <section className="bg-orange-100 shadow-md p-1 m-4 rounded-md">
            <div className="feature-list-li">
                <div className="flex flex-row items-center">
                    <IconButton className="mr-2" onClick={() => setShowDescription(prev => !prev)}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                    <p className="mb-0 text-sm font-semibold" >{title}</p>
                </div>
                <Collapse in={showDescription}>
                    { <p className="ml-11 my-2 text-sm">{description}</p> }
                </Collapse>
            </div>
        </section>
    )
}

export default FeatureList