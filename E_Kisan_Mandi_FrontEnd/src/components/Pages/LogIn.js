import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthenticationService from '../Services/AuthenticationService';


class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      message: '',
      userName: '',
      authenticated: false,
      login: false,
    }
    this.authenticateUser = this.authenticateUser.bind(this);
  };

  authenticateUser(e) {
    e.preventDefault();//to stop auto refreshing
    this.setState({ login: true });
    let userAuthrequest = { email: this.state.email, password: this.state.password }
   
    AuthenticationService.authenticateUser(userAuthrequest).then((response) => {
      
      let user = response.data;
      user === null && this.setState({message:"Invalid login credentials"})
      
      // this.setState({role: response.data.role})
      window.localStorage.setItem('user_id', response.data.userId);
      window.localStorage.setItem('user_fName', response.data.firstName);
      window.localStorage.setItem('user_lName', response.data.lastName);
      response.data.role === "ROLE_FARMER" && window.localStorage.setItem('user_role', "FARMER");
      response.data.role === "ROLE_TRADER" && window.localStorage.setItem('user_role', "TRADER");
      response.data.role === "ROLE_ADMIN" && window.localStorage.setItem('user_role', "ADMIN");
      
      console.log(response.data.jwt);
      AuthenticationService.storeUserDetails(
        response.data.jwt
        
      );
      
      user !== null && response.data.role === "ROLE_FARMER" && this.props.history.push('/farmerProfile');
      user !== null && response.data.role === "ROLE_TRADER" && this.props.history.push('/traderProfile');
      user !== null && response.data.role === "ROLE_ADMIN" && this.props.history.push('/adminProfile');

      user !== null && response.data.role === "ROLE_FARMER" && alert("Login successful By FARMER")
      user !== null && response.data.role === "ROLE_TRADER" && alert("Login successful By TRADER")
      user !== null && response.data.role === "ROLE_ADMIN" && alert("Login successful By ADMIN")
      user !== null && this.setState({ message: 'Login successful'});
  
    }).catch((error) => { // error is a Promise
      console.log('in log in catch block');
      console.log(error.response.data);
      this.setState({ message: error.response.data})
  })

  }

  render() {
    return (
      <div className='main1' style={{ width: "40%" }}>
        <h6 style={{ color:'red' }}>{this.state.message}</h6>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              value={this.state.password}
              onChange={(event) => this.setState({ password: event.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            New User? <Link to="/signup">Register here</Link>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.authenticateUser}>
            Log In
          </Button>
        </Form>
      </div>
    );
  }
}

export default LogIn;