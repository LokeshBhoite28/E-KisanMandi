import React, { Component } from "react";
import { Link } from 'react-router-dom';
import BidService from "../Services/BidService";
import SubHeader from "../SubHeader";
import Card from 'react-bootstrap/Card';

class ViewBids extends Component {
    constructor(props) {
        super(props)
        this.state = {
            farmerId:window.localStorage.getItem("user_id"),
            cropId: this.props.match.params.id,
            //this will retrive data coming from state object via Link tag
            crop: this.props.location.state.crop,
            bid: [],
            bidderId: '',
            bidder: []
        }
        console.log(this.state.crop);
    }

    componentDidMount() {
        console.log('in view bid mount');
        BidService.getBidsByCropId(this.state.cropId).then((response) => {
            console.log(response.data);
            response.data !== null && this.setState({ bid: response.data });
            response.data === '' && this.setState({ message: 'No Bids received yet', bid: [] })
        })

        
    }

    getTraderDetails = (bidId) => {
        BidService.getTraderByBidId(bidId).then((response) => {
            console.log(response.data.id)
            this.props.history.push(`/showProfile/${response.data.id}`)
        })
    }

    select = (bidId) => {
        BidService.selectBid(this.state.farmerId,bidId).then((response) =>{
            console.log(response.data);
            response.data !== null && alert("You have selected Bid with id :"+bidId);
            this.props.history.push('/farmerProfile');
        }).catch((error)=>{
            console.log(error.response.data)
            alert("You have already selected this bid..!!!!");
        })
    }

    render() {
        return (
            <div>
                <SubHeader />
                <div className="main1">
                    <Card className="text-center">
                        <Card.Header>View Bids for crop</Card.Header>
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
                    <div className="row">
                        <table className="table table-stripped table-bordered">
                            <thead>
                                <tr>
                                    <th>Bid Id</th>
                                    <th>Bid Amount</th>
                                    <th>Trader</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.bid.map((bid, index) =>
                                        <tr key={index}>
                                            <td>{bid.id}</td>
                                            <td>{bid.bidAmount}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger"
                                                    onClick={() => this.getTraderDetails(bid.id)} >Trader details</button>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-primary"
                                                    onClick={() => this.select(bid.id)} >Select Bid</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div className="row" style={{ textAlign: 'right' }}>
                            <Link to="/farmerProfile">
                                <button type="button" name="btn"
                                    className="btn btn-success">Back</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewBids;