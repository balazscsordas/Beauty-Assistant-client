import { FeatureLi } from '../../../interfaces/HomepageInterfaces';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FeatureItem = ({ title, description }: FeatureLi) => {

    return (
        <section className="flex flex-row sm:basis-1/2">
            <div className="m-4 bg-white p-4 w-full shadow-md rounded-md">
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <span className="text-green-600 mr-2"><CheckCircleIcon/></span>
                        <h3 className="text-lg font-bold mb-3">{title}</h3>
                    </div>
                    <p>{description}</p>
                </div>
            </div>
        </section>
    )
}

export default FeatureItem