import React, { Component } from "react";
import UserService from "../Services/UserService";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import SubHeader from "../SubHeader";

class UpdateAddress extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.match.params.id,
            location: '',
            tehsil: '',
            district: '',
            state: '',
            country: '',
            pinCode: '',
            role: window.localStorage.getItem("user_role"),
            back:''
        }
    }

    componentDidMount() {
        UserService.getAddressByUserId(this.state.userId).then((response) => {
            console.log('adr by id: ',response.data)
            let adr = response.data;
            this.setState({
                id: adr.id,
                location: adr.location,
                tehsil: adr.tehsil,
                district: adr.district,
                state: adr.state,
                country: adr.country,
                pinCode: adr.pinCode
            })
        })
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) };

    updateAddress = (e) => {
        e.preventDefault();
        let address = {
            id: this.state.id,
            location: this.state.location,
            tehsil: this.state.tehsil,
            district: this.state.district,
            state: this.state.state,
            country: this.state.country,
            pinCode: this.state.pinCode,
        }

        let role = this.state.role;

        UserService.updateLinkedAddress(this.state.userId, address).then((response) => {
            console.log(response.data)
            let adr = response.data;
            adr !== null && role === 'FARMER' && this.props.history.push('/farmerProfile') 
            adr !== null && role === 'TRADER' && this.props.history.push('/traderProfile') 
        })
    }

    goBack =(e)=>{
        e.preventDefault();
        if(this.state.role === 'FARMER'){
            this.props.history.push('/farmerProfile') 
        }else{
            this.props.history.push('/traderProfile')
        }
    }

    render() {
        return (
            <div>
                <SubHeader />
                <div className='main1' style={{ width: "40%" }}>
                    <h5>{this.state.message}</h5>
                    <Form>
                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formBasicLocation">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter location"
                                        name='location'
                                        value={this.state.location}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicTehsil">
                                    <Form.Label>Tehsil</Form.Label>
                                    <Form.Control type="text" placeholder="tehsil"
                                        name="tehsil"
                                        value={this.state.tehsil}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formBasicDistrict">
                                    <Form.Label>District</Form.Label>
                                    <Form.Control type="text" placeholder="district"
                                        name="district"
                                        value={this.state.district}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="text" placeholder="state"
                                        name="state"
                                        value={this.state.state}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formBasicCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="text" placeholder="country"
                                        name="country"
                                        value={this.state.country}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicPinCode">
                                    <Form.Label>PinCode</Form.Label>
                                    <Form.Control type="text" placeholder="pin code"
                                        name="pinCode"
                                        value={this.state.pinCode}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Form.Group className="mb-3">
                            </Form.Group>

                            <Col>
                                <Button variant="primary" type="submit" onClick={this.updateAddress}>
                                    Link Address
                                </Button>
                            </Col>
                            <Col style={{ textAlign: 'right' }}>
                                    <button type="button" name="btn" onClick={this.goBack}
                                        className="btn btn-success ">Back</button>
                                </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default UpdateAddress;