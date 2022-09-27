import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import UserService from "../Services/UserService";
import SubHeader from "../SubHeader";
import InputGroup from 'react-bootstrap/InputGroup';

class UpdateProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.match.params.id,
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
            validated: false
        }
    }

    componentDidMount() {
        console.log('in update profile compDidMount');
        UserService.getUserById(this.state.userId).then((response) => {
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
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) };

    updateUser = (event) => {
        console.log('in update user method');
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({ validated: true });

        event.preventDefault();
        let updatedUser = {
            id: this.state.userId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            contactNo: this.state.contactNo,
            role: this.state.role,
            card: { cardNo: this.state.cardNo, location: this.state.location }
        }

        UserService.updatedUserDetails(updatedUser).then((response) => {
            console.log('updated user: ' + response.data)
            let user = response.data;
            user !== null && user.role === "ROLE_FARMER" && this.props.history.push('/farmerProfile')
            user !== null && user.role === "ROLE_TRADER" && this.props.history.push('/traderProfile')

        }).catch((error) => { // error is a Promise
            console.log('in update user error catch block');
            console.log(error.response.data);
        })
    }

    goBack = (e) => {
        e.preventDefault();
        if (window.localStorage.getItem('user_role') === 'FARMER') {
            this.props.history.push('/farmerProfile')
        } else {
            this.props.history.push('/traderProfile')
        }
    }


    render() {
        return (
            <div>
                <SubHeader />
                <div className='main1' >
                    <h5>{this.state.message}</h5>
                    <Form noValidate validated={this.state.validated}>
                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formBasicFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" placeholder="Enter first name"
                                            name="firstName"
                                            value={this.state.firstName}
                                            onChange={this.onChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide first name
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" placeholder="Enter first name"
                                            name="lastName"
                                            value={this.state.lastName}
                                            onChange={this.onChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide last name
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="email" placeholder="enter email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide email
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicContactNo">
                                    <Form.Label>Contact No</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" placeholder="Enter contact no"
                                            name="contactNo"
                                            value={this.state.contactNo}
                                            onChange={this.onChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide contact no
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formBasicRole">
                                    <Form.Label>Role</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Select aria-label="Default select example" name="role"
                                            value={this.state.role}
                                            onChange={this.onChange} required>
                                            <option>Select role </option>
                                            <option value="ROLE_FARMER">Farmer</option>
                                            <option value="ROLE_TRADER">Trader</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide role
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicAdharNo">
                                    <Form.Label>Adhar Card No</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" placeholder="Enter card no"

                                            value={this.state.cardNo}
                                            onChange={(event) => this.setState({ cardNo: event.target.value })}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide card no
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formBasicLocation">
                                    <Form.Label>Location</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" placeholder="Enter location"

                                            value={this.state.location}
                                            onChange={(event) => this.setState({ location: event.target.value })}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide location
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Form.Group className="mb-3">

                            </Form.Group>
                            <Col>
                                <Button variant="primary" type="submit" onClick={this.updateUser}>
                                    Update
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

export default UpdateProfile;