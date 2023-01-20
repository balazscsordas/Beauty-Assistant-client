import { FeatureLi } from '../../interfaces/HomepageInterfaces';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Collapse, IconButton } from '@mui/material';
import { useState } from 'react';

const FeatureList = ({ title, description }: FeatureLi) => {

    const [showDescription, setShowDescription] = useState(false);

    return (
        <section id="feature-li">
            <div className="feature-list-li">
                <div className='feature-list-li-title-block'>
                    <IconButton onClick={() => setShowDescription(prev => !prev)}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                    <p>{title}</p>
                </div>
                <Collapse in={showDescription}>
                    { <p className='description'>{description}</p> }
                </Collapse>
            </div>
        </section>
    )
}

export default FeatureList