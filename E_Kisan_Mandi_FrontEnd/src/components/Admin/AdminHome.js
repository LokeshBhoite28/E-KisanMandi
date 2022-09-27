import { Component } from "react";
import SubHeader from "../SubHeader";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import UserService from '../Services/UserService';

class AdminHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:window.localStorage.getItem('u_id'),
            search: '',
            value: '',
            userarr:[],
            message:''
        }
    }

    searchUser=(e)=>{
        e.preventDefault();
        this.state.value === 'all' && UserService.getAllUser().then((response)=>this.setState({userarr:response.data}))
        
        this.state.value !== 'all' && UserService.getUserByRole(this.state.value).then((response)=>{
            this.setState({userarr:response.data})
            response.data === '' && this.setState({message:'No match found',userarr:[]})
        })
       
    }

    render() {
        return (
            <div>
                <SubHeader />
                <div className="main1">
                    <h5>Search By:</h5>
                    <div>
                    <Form>
                        <Row>
                            <Col xs={2}>
                                <Form.Select aria-label="Default select example" value={this.state.value} onChange={(event) => this.setState({value : event.target.value })}>
                                    <option>Search By: </option>
                                    <option value="all">All</option>
                                    <option value="FARMER">Farmer</option>
                                    <option value="TRADER">Trader</option>
                                </Form.Select>
                            </Col>
                            <Col xs={2}>
                                <Form.Group className="mb-3">
                                    <Button variant="primary" type="button" onClick={this.searchUser}>
                                        Search
                                    </Button>
                                </Form.Group>
                            </Col>

                            <Col style={{ textAlign: 'right' }}>
                                <Form.Group className="mb-3">
                                    Total: {this.state.userarr.length}
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    </div>
                    <div>
                        <h4 className="text-center">User List</h4>
                        <h6 style={{ color:'red' }}>{this.state.message}</h6>
                        <table className="table table-stripped table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact No</th>
                                    <th>Role</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {
                                    this.state.userarr.map((u, index) =>
                                        <tr key={index}>
                                            <td>{u.id}</td>
                                            <td>{u.firstName} {u.lastName}</td>
                                            <td>{u.email}</td>
                                            <td>{u.contactNo}</td>
                                            <td>{u.role}</td>
                                            <td>
                                                <Link to={{ pathname: `/showProfile/${u.id}`}}>
                                                    <button type="button" className="btn btn-success" >Show Profile</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                }
                                
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminHome;