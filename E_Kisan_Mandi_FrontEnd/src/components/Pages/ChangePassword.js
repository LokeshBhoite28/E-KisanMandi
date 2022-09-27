import React, { Component } from 'react'
import UserService from '../Services/UserService';
import SubHeader from '../SubHeader';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, InputGroup, Row } from 'react-bootstrap';


class ChangePassword extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      password: '',
      message: '',
      passwordShown:false
    }

  }



  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  changePassword = (e) => {
    e.preventDefault();
    let pass ={newPass: this.state.password}
    UserService.changeUserPassword(this.state.id, pass)
      .then(response => {
        console.log(response.data)
        localStorage.getItem('user_role')=== 'FARMER' && this.props.history.push('/farmerProfile');
        localStorage.getItem('user_role')=== 'TRADER' && this.props.history.push('/traderProfile');
      }).catch((error) => { // error is a Promise
        console.log('in change password catch block');
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
      <div>
        <SubHeader />
        <div className="main1" style={{ width: '40vw' }}>
          <h5 style={{ color: 'red' }}>{this.state.message}</h5>
          <Form>
            <Form.Label>New Password</Form.Label>
            <Row>
              <Col xs={8}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <InputGroup>
                    <Form.Control type={this.state.passwordShown ? "text" : "password"} placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      required
                    />
                    <button onClick={this.togglePassword}>Show</button>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Button variant="primary" type="submit" onClick={this.changePassword}>
                  Change Password
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }

}
export default ChangePassword;