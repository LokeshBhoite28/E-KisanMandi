import React, { Component } from "react";
import { Link } from 'react-router-dom';
import BidService from "../Services/BidService";
import SubHeader from "../SubHeader";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class SetBid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //this will retrive data coming from state object via Link tag
            crop: this.props.location.state.crop,
            userId: window.localStorage.getItem('user_id'),
            bidAmount: ''
        }
        console.log(this.state.crop);
    }

    setBid = (e) => {
        e.preventDefault();
        let bid = { bidAmount: this.state.bidAmount };
        BidService.setBidAmount(this.state.crop.id, this.state.userId, bid).then((response) => {
            console.log(response.data);
            this.props.history.push('/traderProfile');
            response.data !== null && alert('Confirm your bid with Amount :' + this.state.bidAmount);

        })
    }

    render() {
        return (
            <div>
                <SubHeader />
                <div className="main1">
                    <Card className="text-center">
                        <Card.Header>Set Bids for crop</Card.Header>
                        <Card.Body>
                            <Card.Title>Crop id</Card.Title>
                            <Card.Text>
                                {this.state.crop.id}
                            </Card.Text>

                            <Card.Title>Crop Name</Card.Title>
                            <Card.Text>
                                {this.state.crop.cropName}
                            </Card.Text>

                            <Card.Title>Least price</Card.Title>
                            <Card.Text>
                                {this.state.crop.leastPrice}
                            </Card.Text>

                        </Card.Body>
                        <Card.Footer className="text-muted"><h5 style={{ color: 'red' }}>{this.state.message}</h5></Card.Footer>
                    </Card>

                    <br />
                    <div>
                        <Form>
                            <Row>
                                <Col xs={3}>
                                    <Form.Group className="mb-3" controlId="formBasicSearch">
                                        <Form.Control type="text" placeholder="Text to search"
                                            value={this.state.search}
                                            onChange={(event) => this.setState({ bidAmount: event.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={2}>
                                    <Form.Group className="mb-3">
                                        <Button variant="primary" type="submit" onClick={this.setBid}>
                                            Bid
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </div>

                    <div className="row" style={{ textAlign: 'right' }}>
                        <Link to="/traderProfile">
                            <button type="button" name="btn"
                                className="btn btn-success">Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SetBid;