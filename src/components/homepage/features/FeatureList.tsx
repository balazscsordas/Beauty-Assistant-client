import { useContext } from "react";
import LangContext from "../../../context/LanguageProvider";
import FeatureLi from "./FeatureLi";
import { features } from "./features"
    
const FeatureList = () => {

    const { lang } = useContext(LangContext);

    return (
        <section className="relative -top-16">
            <div className="max-w-7xl m-auto flex flex-row flex-wrap justify-center">
                {features.map((feature, index) => (
                    <FeatureLi 
                        key={index}
                        title={lang === 'hun' ? feature.titleHUN : feature.titleENG}
                        description={lang === 'hun' ? feature.descriptionHUN : feature.titleENG}
                    />
                ))}
            </div>
        </section>
    )
}

export default FeatureList