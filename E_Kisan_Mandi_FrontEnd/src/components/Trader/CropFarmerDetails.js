import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import UserService from '../Services/UserService';
import SubHeader from "../SubHeader";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BidService from '../Services/BidService';
import TraderService from '../Services/TraderService';

class CropFarmerDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bidId: this.props.match.params.id,
            id:'',
            cropId:'',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            contactNo: '',
            role: '',
            card: {
                cardNo: '',
                location: ''
            },
            tehsil: '',
            district: '',
            state: '',
            country: '',
            pinCode: '',
            crop: '',
            bid: this.props.location.state.bid,
            flag:false
        }
    }

    componentDidMount() {
        BidService.getCropByBidId(this.state.bidId).then((response) => {
            console.log(response.data);
            console.log("crop details: " + response.data.id);
            this.setState({ crop: response.data , cropId: response.data.id,flag:true})
        })
    }

    componentDidUpdate(){
        if(this.state.flag){
        TraderService.getFarmerFromCropId(this.state.crop.id).then((response) => {
            console.log(response.data);
            let user = response.data;
            this.setState({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                contactNo: user.contactNo,
                role: user.role,
                cardNo: user.card.cardNo,
                location: user.card.location,
            })
        })

        UserService.getAddressByCropId(this.state.crop.id).then((response) => {
            console.log(response.data);
            let adr = response.data;
            this.setState({
                tehsil: adr.tehsil,
                district: adr.district,
                state: adr.state,
                country: adr.country,
                pinCode: adr.pinCode
            })
        })
        this.setState({flag:false})
    }
    }

    render() {

        return (
            <div>
                <SubHeader />
                <div className='main1'>
                    <h4 style={{textAlign:'center'}}>Bid Specifications</h4>
                    <br/>
                    <Row><Col xs={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Your Bid</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Bid Id         :{this.state.bid.id}</ListGroup.Item>
                                <ListGroup.Item>Amount       :{this.state.bid.bidAmount}</ListGroup.Item>
                            </ListGroup>

                        </Card>
                    </Col>
                        <Col xs={4}>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                                <Card.Body>
                                    <Card.Title>Crop</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Id         :{this.state.crop.id}</ListGroup.Item>
                                    <ListGroup.Item>Crop Name       :{this.state.crop.cropName}</ListGroup.Item>
                                    <ListGroup.Item>Species     :{this.state.crop.species}</ListGroup.Item>
                                    <ListGroup.Item>Grade :{this.state.crop.grade}</ListGroup.Item>
                                    <ListGroup.Item>Harvest Date       :{this.state.crop.harvestDate}</ListGroup.Item>
                                    <ListGroup.Item>Sowing Date   :{this.state.crop.sowingDate}</ListGroup.Item>
                                    <ListGroup.Item>Quantity   :{this.state.crop.quantity}</ListGroup.Item>
                                    <ListGroup.Item>Least Price     :{this.state.crop.leastPrice}</ListGroup.Item>
                                    <ListGroup.Item>Status    :{this.state.status}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                        <Col xs={4}>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                                <Card.Body>
                                    <Card.Title>Profile</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Id         :{this.state.id}</ListGroup.Item>
                                    <ListGroup.Item>Name       :{this.state.firstName} {this.state.lastName}</ListGroup.Item>
                                    <ListGroup.Item>Email      :{this.state.email}</ListGroup.Item>
                                    <ListGroup.Item>Contact No :{this.state.contactNo}</ListGroup.Item>
                                    <ListGroup.Item>Role       :{this.state.role}</ListGroup.Item>
                                    <ListGroup.Item>Adhar No   :{this.state.cardNo}</ListGroup.Item>
                                    <ListGroup.Item>Location   :{this.state.location}</ListGroup.Item>
                                    <ListGroup.Item>Tehsil     :{this.state.tehsil}</ListGroup.Item>
                                    <ListGroup.Item>District    :{this.state.district}</ListGroup.Item>
                                    <ListGroup.Item>State      :{this.state.state}</ListGroup.Item>
                                    <ListGroup.Item>Country    :{this.state.country}</ListGroup.Item>
                                    <ListGroup.Item>Pin Code   :{this.state.pinCode}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Col style={{ textAlign: 'right' }}>
                        <button type="button" name="btn" onClick={this.props.history.goBack}
                            className="btn btn-success ">Back</button>
                    </Col>
                </div>
            </div>
        );
    }
}
export default CropFarmerDetail;