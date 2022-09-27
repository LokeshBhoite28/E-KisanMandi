import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import UserService from '../Services/UserService';
import SubHeader from "../SubHeader";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



class ShowProfile extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
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
            Blob: null,
        }
    }

    componentDidMount() {

        UserService.getUserById(this.state.id).then((response) => {
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


        UserService.getAddressByUserId(this.state.id).then((response) => {
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


        UserService.getProfilePic(this.state.id)
        .then(response=> {
           console.log(response.image)
           this.setState({Blob:response.image})

          });
    }


    render() {

        return (
            <div>
                <SubHeader />
                <div className='main1' style={{ width: '30%' }}>
                    <Card style={{ alignContent: 'center' }}>
                    <img src={this.state.Blob} className="center " alt="image" height="150px" width="150px" /> 
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
                    <br />
                    <Row>
                       
                        <Col style={{ textAlign: 'right' }}>
                            <button type="button" name="btn" onClick={this.props.history.goBack}
                                className="btn btn-success ">Back</button>
                        </Col>
                    </Row>
                </div>
            </div >
        );
    }
}
export default ShowProfile;