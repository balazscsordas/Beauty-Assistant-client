import FeatureLi from "./FeatureLi";
import { features } from "./features";
    
const FeatureList = () => {

    return (
        <section className="relative -top-20">
                <div className="max-w-7xl m-auto flex flex-row flex-wrap">
                    {features.map((feature, index) => (
                        <FeatureLi 
                            key={index}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
                
        </section>
    )
}

export default FeatureList