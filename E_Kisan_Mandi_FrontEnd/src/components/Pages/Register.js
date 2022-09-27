import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import UserService from '../Services/UserService';
import InputGroup from 'react-bootstrap/InputGroup';

class Register extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
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
            message: '',
            response: '',
            validated: false,
            passwordShown:false
        }
    }


    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) };

    componentDidMount() {
        console.log("in employeeAdd componentDidmount");
    }


    addUser = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({ validated: true });

        event.preventDefault();//to prevent refreshing the page
        console.log("add user method");
        console.log('in register add user');
        let user = {
            firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email,
            password: this.state.password, contactNo: this.state.contactNo, role: this.state.role,
            card: { cardNo: this.state.cardNo, location: this.state.location }

        }
        console.log(user);
        UserService.addNewUser(user).then((response) => {
            console.log('in register user method');
            console.log(response.data);
            this.props.history.push("/login");

        }).catch((error) => { // error is a Promise
            console.log('in register user error catch block');
            console.log(error.response.data);
            this.setState({ message: error.response.data })
        })


    }

    togglePassword = (e) => {
        e.preventDefault();
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        this.state.passwordShown === false && this.setState({passwordShown: true})
        this.state.passwordShown === true && this.setState({passwordShown: false})
      };


    render() {
        return (
            <div className='main1' >

                <h6 style={{ color: 'red' }}>{this.state.message}</h6>
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
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control type ={this.state.passwordShown ? "text" : "password"} placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        required
                                    />
                                     <button  onClick={this.togglePassword}>Show</button>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide password
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
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
                        <Col>
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

                        <Col xs={6}>
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
                        <Col>
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
                            Existing User? <Link to="/login">Login here</Link>
                        </Form.Group>
                        <Col>
                            <Button variant="primary" type="submit" onClick={this.addUser}>
                                Register
                            </Button>
                        </Col>
                        <Col style={{ textAlign: 'right' }}>
                            <Link to="/" >
                                <button type="button" name="btn"
                                    className="btn btn-success ">Back</button>
                            </Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Register;