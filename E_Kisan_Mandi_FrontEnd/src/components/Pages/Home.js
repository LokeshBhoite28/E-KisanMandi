import HomeCorousel from './HomeCorousel';
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Home = () => {
   return (
      <div className='container'>
         <Row>
            <Col xs={4}></Col>
            <Col xs={6}>
               <div style={{ marginTop: '20px' }}>
                  <ListGroup horizontal>
                     <ListGroup.Item> <p> <Link className="nav-link active" aria-current="page" to="/commodityList"><img alt="" src="https://enam.gov.in/web/assest/images/new-theme/icon/img2.png" xss="removed" />Commodities</Link></p></ListGroup.Item>
                     
                     <ListGroup.Item> <p> <Link className="nav-link active" aria-current="page" to="/commodityAssaying"><img alt="" src="https://enam.gov.in/web/assest/images/new-theme/icon/img3.png" xss="removed" />Commodity Assaying</Link></p></ListGroup.Item>
                     
                  </ListGroup>
               </div>
            </Col>
         </Row>
         <Row>
            <Col>
            <div style={{ marginTop: '15px', textAlign: 'left' }}>
               
                  <HomeCorousel />
            
            </div>
            </Col>
         </Row>

         <Row>
            <div id="dash-marquee" style={{ marginTop: '4px', padding: '16px', marginBottom: '57px' }}>
               <p style={{ backgroundColor: '#f5f5f5', paddingTop: '10px', paddingBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}><Marquee>E-Kisan Mandi welcomes all the FPOs(Farmers Producer Organisation) &amp; requests to register for trading on E-Kisan Mandi to avail benefits from the transparent system. Kindly reach us on our Toll-Free No.1800 270 0224 &nbsp;&nbsp; | &nbsp;&nbsp; &nbsp; </Marquee></p>
            </div>
         </Row>
      </div>

   )
};

export default Home;