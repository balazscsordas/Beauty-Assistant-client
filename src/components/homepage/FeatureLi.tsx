import { FeatureLi } from '../../interfaces/HomepageInterfaces';

const FeatureItem = ({ title, description }: FeatureLi) => {

    return (
        <section className="flex flex-row basis-1/2">
            <div className="m-4 bg-white p-4 w-full shadow-md rounded-md">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </section>
    )
}

export default FeatureItem