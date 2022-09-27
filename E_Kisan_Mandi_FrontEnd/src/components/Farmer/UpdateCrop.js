import { Component } from "react";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FarmerService from "../Services/FarmerService";
import SubHeader from "../SubHeader";
import InputGroup from 'react-bootstrap/InputGroup';

class UpdateCrop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            farmerId: '',
            id: this.props.match.params.id,
            cropName: '',
            species: '',
            grade: '',
            sowingDate: '',
            harvestDate: '',
            quantity: '',
            photos: null,
            leastPrice: '',
            status: 0,
            validated: false
        }
    }



    componentDidMount() {
        this.setState({ farmerId: window.window.localStorage.getItem("user_id") })

        FarmerService.getCropByCropId(this.state.id).then((response) => {
            let crop = response.data;
            this.setState({
                cropName: crop.cropName,
                species: crop.species,
                grade: crop.grade,
                sowingDate: crop.sowingDate,
                harvestDate: crop.harvestDate,
                quantity: crop.quantity,
                photos: null,
                leastPrice: crop.leastPrice,
                status: 0
            })
        }
        )
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) };

    updateCrop = (event) => {
        console.log('in update crop method');
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({ validated: true });

        event.preventDefault();
        console.log("in add crop update method");
        let updatedCrop = {
            id: this.state.id,
            cropName: this.state.cropName,
            species: this.state.species,
            grade: this.state.grade,
            sowingDate: this.state.sowingDate,
            harvestDate: this.state.harvestDate,
            quantity: this.state.quantity,
            photos: this.state.photos,
            leastPrice: this.state.leastPrice,
            status: this.state.status
        }

        FarmerService.updateCropDetails(this.state.farmerId, updatedCrop).then((response) => {
            console.log(response.data);
            this.props.history.push("/farmerProfile");
        }).catch((error) => { 
            console.log('in update crop error catch block');
            console.log(error.response.data);
        })
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
                                <Form.Group className="mb-3" controlId="formBasicCropName">
                                   <Form.Label>Crop Name</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" placeholder="Enter crop name"
                                            name="cropName"
                                            value={this.state.cropName}
                                            onChange={this.onChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide crop name
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-3" controlId="formBasicSpecies">
                                    <Form.Label>Species</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" placeholder="Enter Species"
                                            name="species"
                                            value={this.state.species}
                                            onChange={this.onChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide species name
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                            <Form.Group className="mb-3" controlId="formBasicGrade">
                                    <Form.Label>Grade</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Select aria-label="Default select example" name="grade"
                                            value={this.state.grade}
                                            onChange={this.onChange} required>
                                            <option>Grade </option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide grade
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-3" controlId="formBasicQuantity">
                                    <Form.Label>Quantity <h6 style={{ display: "inline", color: 'red' }}>in quintals (1 quintal = 100 kg)</h6></Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" placeholder="Enter quantity"
                                            name="quantity"
                                            value={this.state.quantity}
                                            onChange={this.onChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide Quantity
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                            </Col>
                            <Col xs={6}>
                            <Form.Group className="mb-3" controlId="formBasicSowingDate">
                                    <Form.Label>Sowing Date</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="date" placeholder="Enter sowing date"
                                            name="sowingDate"
                                            value={this.state.sowingDate}
                                            onChange={this.onChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide Sowing date
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-3" controlId="formBasicHarvestDate">
                                    <Form.Label>Harvest Date</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="date" placeholder="Enter harvest date"
                                            name="harvestDate"
                                            value={this.state.harvestDate}
                                            onChange={this.onChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide harvest date
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col xs={6}>
                            <Form.Group className="mb-3" controlId="formBasicLeastPrice">
                                    <Form.Label>Least Price<h6 style={{ display: "inline", color: 'red' }}> per  quintals</h6></Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" placeholder="Enter least price"
                                            name="leastPrice"
                                            value={this.state.leastPrice}
                                            onChange={this.onChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide least price
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Form.Group className="mb-3">
                               
                            </Form.Group>
                            <Col>
                                <Button variant="primary" type="submit" onClick={this.updateCrop}>
                                    Update
                                </Button>
                            </Col>
                            <Col style={{textAlign:'right'}}>
                                <Link to="/farmerProfile">
                                    <button type="button" name="btn"
                                        className="btn btn-success ">Back</button>
                                </Link></Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default UpdateCrop;