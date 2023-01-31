import { FeatureLi } from '../../../interfaces/HomepageInterfaces';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FeatureItem = ({ title, description }: FeatureLi) => {

    return (
        <section className="flex flex-row sm:basis-1/2">
            <div className="m-4 bg-white p-6 w-full shadow-md rounded-md">
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <span className="text-green-600 mr-2 mb-3"><CheckCircleIcon/></span>
                        <h3 className="text-[1rem] sm:text-lg font-bold mb-6">{title}</h3>
                    </div>
                    <p>{description}</p>
                </div>
            </div>
        </section>
    )
}

export default FeatureItem