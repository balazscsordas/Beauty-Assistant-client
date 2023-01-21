import { Col, Container, Row } from "react-bootstrap";
import FeatureLi from "./FeatureLi";
    

const features1 = [
    {
        title: 'Könnyedén kezelhető, felhasználóbarát felület',
        description: '3 különböző témának köszönhetően saját ízlésed alapján szabhatod személyre a kezelőfelületet. Egyszerű kezelhetőség a gyors és hatékony munkavégzés érdekében.'
    }, 
    {
        title: 'Vendégkarton',
        description: 'A kötelező mezőkön felül (név, email, telefonszám, valamint kor) 5 db egyedi mező alapján tárolhatsz fontos információkat vendégeidről.'
    },
    
    {
        title: 'Szolgáltatások rögzítése',
        description: 'Tedd mindenki számára láthatóvá szolgáltatásaidat és szerezz új ügyfeleket.'
    },
    {
        title: 'Ajándékutalványok nyilvántartása',
        description: 'Pár kattintással létrehozhatsz új ajándékutalványokat, illetve visszanézheted a korábban létrehozottakat.'
    }, 
]

const features2 = [
    {
        title: 'Online időpontfoglalás lehetősége',
        description: 'Egy kattintással elérhetővé teheted az online időpontfoglalást'
    }, 
    {
        title: 'Feketelista',
        description: 'Egyszerűen rögzítheted ha egy vendéged nem jött el az időpontra, így garantáltan nem fogod elfelejteni.'
    },
    {
        title: 'Vendégek e-mail értesítése időpont előtt',
        description: 'Személyre szabhatod az értesítés szövegét, illetve hogy mikor és hány alkalommal menjen ki a levél a vendég számára'
    },
    {
        title: 'Statisztikák, elemzések',
        description: 'Hasznos kimutatások vállalkozásoddal kapcsolatban napi, heti, illetve havi bontásban.'
    }, 
]


const FeatureList = () => {

    return (
        <section className="my-14">
            <Container className="max-w-6xl">
                <h2 className="text-center mb-8 font-bold">Funkciók</h2>
                <Row>
                    <Col lg={6}>
                        {features1.map((feature, index) => (
                            <FeatureLi 
                                key={index}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </Col>
                    <Col lg={6}>
                        {features2.map((feature, index) => (
                            <FeatureLi 
                                key={index}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </Col>
                </Row>
            </Container>
            <ul>
                
            </ul>
        </section>
    )
}

export default FeatureList