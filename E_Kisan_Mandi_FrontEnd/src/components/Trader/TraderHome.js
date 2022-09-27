import { Component } from "react";
import SubHeader from "../SubHeader";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import TraderService from "../Services/TraderService";

class TraderHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: window.localStorage.getItem('user_id'),
            search: '',
            value: '',
            croparr: []
        }
    }

    

    searchCrops = (e) => {
        console.log('in search crop method');
        e.preventDefault();
        if (this.state.value === 'all') {
            console.log('in search crop method : All');
            TraderService.getAllCrops().then((response) => {
                console.log(response.data);
                this.setState({ croparr: response.data })
                response.data !== null && this.setState({ croparr: response.data, message: '' })
                response.data === '' && this.setState({ message: 'No crops found', croparr: [] })
            })
        }
        if (this.state.value === 'crop') {
            TraderService.getCropsbyCropName(this.state.search).then((response) => {
                console.log(response.data);
                this.setState({ croparr: response.data })
                response.data !== null && this.setState({ croparr: response.data, message: '', search: '' })
                response.data === '' && this.setState({ message: 'No crops found', croparr: [] })
            })
        }
        if(this.state.value === 'district'){
            TraderService.getCropsByDistrict(this.state.search).then((response)=>{
                console.log(response.data);
                this.setState({ croparr: response.data })
                response.data !== null && this.setState({ croparr: response.data, message: '', search: '' })
                response.data === '' && this.setState({ message: 'No crops found', croparr: [] })
            })
        }
    }

    getFarmer = (cropid) => {
        TraderService.getFarmerFromCropId(cropid).then((response) => {
            console.log(response.data);
            this.props.history.push(`/showProfile/${response.data.id}`);
        })
    }

    render() {
        return (
            <div>
                <SubHeader />
                <div className="main1">
                    <h5>Search Crops here:</h5>
                    <div>
                        <Form>
                            <Row>
                                <Col xs={2}>
                                    <Form.Select aria-label="Default select example" value={this.state.value} onChange={(event) => this.setState({ value: event.target.value })}>
                                        <option>Search By: </option>
                                        <option value="all">All</option>
                                        <option value="crop">Crop</option>
                                        <option value="district">District</option>
                                    </Form.Select>
                                </Col>
                                <Col xs={3}>
                                    <Form.Group className="mb-3" controlId="formBasicSearch">
                                        <Form.Control type="text" placeholder="Text to search"
                                            value={this.state.search}
                                            onChange={(event) => this.setState({ search: event.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={2}>
                                    <Form.Group className="mb-3">
                                        <Button variant="primary" type="submit" onClick={this.searchCrops}>
                                            Search
                                        </Button>
                                    </Form.Group>
                                </Col>

                                <Col style={{ textAlign: 'right' }}>
                                    <Form.Group className="mb-3">
                                        <Link to={{ pathname: `/allBids/${this.state.id}` }}>
                                            <Button variant="success" type="submit">
                                                My Bids
                                            </Button>
                                        </Link>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div>
                        <h4 className="text-center">Crop List</h4>
                        <h6 style={{ color: 'red' }}>{this.state.message}</h6>
                        <table className="table table-stripped table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Crop</th>
                                    <th>Species</th>
                                    <th>Grade</th>
                                    <th>Quantity</th>
                                    <th>Sowing date</th>
                                    <th>Harvest date</th>
                                    <th>Least price</th>
                                    <th>Status</th>
                                    <th> </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.croparr.map((crop, index) =>
                                        <tr key={index}>
                                            <td>{crop.id}</td>
                                            <td>{crop.cropName}</td>
                                            <td>{crop.species}</td>
                                            <td>{crop.grade}</td>
                                            <td>{crop.quantity}</td>
                                            <td>{crop.sowingDate}</td>
                                            <td>{crop.harvestDate}</td>
                                            <td>{crop.leastPrice}</td>
                                            <td>{crop.status.toString()}</td>
                                            <td>
                                                <Link to={{ pathname: `/setBids/${crop.id}`, state: { crop: crop } }}>
                                                    <button type="button" className="btn btn-success" >Set bid</button>
                                                </Link>
                                                &nbsp;
                                                <button type="button" className="btn btn-primary" onClick={() => { this.getFarmer(crop.id) }}>Farmer Details</button>
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

export default TraderHome;