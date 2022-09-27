import Accordion from 'react-bootstrap/Accordion';

const CommodityAssaying = () =>{
    return (
        <div className='main1' style={{ width: "70%",backgroundColor:"#cdf6cd" }}>
            <Accordion >
                <Accordion.Item eventKey="0">
                    <Accordion.Header><h5>Where is the assaying done?</h5></Accordion.Header>
                    <Accordion.Body style={{backgroundColor:"#cdf6cd"}}>
                        - An established Quality Assaying lab is a requisite for APMC, that assesses and certify the quality of produce
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><h5>How many parameters are considered for assaying?</h5></Accordion.Header>
                    <Accordion.Body style={{backgroundColor:"#cdf6cd"}}>
                        - Number of parameters varies for different commodities, majorly the physical parameters are tested. For some commodities Oil content or chemical testing is also performed and then certification result is published on E-Kisan Mandi.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header><h5>Who conducts the assaying and what the fees?</h5></Accordion.Header>
                    <Accordion.Body style={{backgroundColor:"#cdf6cd"}}>
                        - Currently the assaying is conducted by the APMCs and they do not charge any fee from the sellers.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header><h5>Can farmer sell on eNam without assaying?</h5></Accordion.Header>
                    <Accordion.Body style={{backgroundColor:"#cdf6cd"}}>
                        - Yes. Farmers can sell their produce on E-Kisan Mandiwithout assaying also, but in such a case he may or may not get the better price on E-Kisan Mandi.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default CommodityAssaying;