import { Col, Container, Row } from "react-bootstrap";
import FeatureLi from "./FeatureLi";
    

const features1 = [
    {
        title: 'Könnyedén kezelhető, felhasználóbarát felület',
        description: 'Egy kattintással elérhetővé teheted az online időpontfoglalást'
    }, 
    {
        title: 'Online időpontfoglalás lehetősége',
        description: 'Egy kattintással elérhetővé teheted az online időpontfoglalást'
    }, 
    {
        title: 'Raktárkészlet kezelése',
        description: 'Automatikus raktárkészlet kezelés'
    },
    {
        title: 'Vendégek e-mail értesítése időpont előtt',
        description: 'Személyre szabhatod az értesítés szövegét, illetve hogy mikor és hány alkalommal menjen ki a levél a vendég számára'
    },
    {
        title: 'Feketelista',
        description: 'asd'
    },
]

const features2 = [
    {
        title: 'Vendégkarton',
        description: 'Egyedi mezők alapján tárolhatsz fontos információkat a vendégeidről.'
    }, 
    {
        title: 'Szolgáltatások rögzítése',
        description: 'Tedd mindenki számára láthatóvá szolgáltatásaidat.'
    }, 
    {
        title: 'Kuponok, ajándékutalványok',
        description: 'Hozz létre új kuponokat, ajándékutalványokat és tedd egyszerűbbé a nyilvántartásukat.'
    }, 
    {
        title: 'Statisztikák, elemzések',
        description: 'Hasznos kimutatások vállalkozásoddal kapcsolatban napi, heti, illetve havi bontásban.'
    }, 
]


const FeatureList = () => {

    return (
        <section id="feature-list">
            <Container>
                <h2>Funkciók</h2>
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