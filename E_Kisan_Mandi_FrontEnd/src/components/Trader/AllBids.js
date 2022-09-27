import React,{ Component } from "react";
import BidService from "../Services/BidService";
import SubHeader from "../SubHeader";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import TraderService from '../Services/TraderService';

class AllBids extends Component{

    constructor(props){
        super(props)
        this.state={
            userId:this.props.match.params.id,
            bidId:'',
            bids:[],
            croparr:[],
            selectedBids:[],
            message:'',
            message1:'',
            flag:false

        }
    }

    componentDidMount(){
        BidService.getBidsByBidderId(this.state.userId).then((response)=>{
            console.log(response.data);
            response.data !== null && this.setState({bids:response.data})
            response.data === '' && this.setState({message:'No bids registered yet',bids:[]})
        })

        TraderService.getMySelectedBids(this.state.userId).then((response)=>{
            console.log(response.data);
            response.data !== null && this.setState({selectedBids:response.data})
            response.data === 'No Bids Selected yet..!!' && this.setState({message1:'No bids selected yet..!!',selectedBids:[]})
        })

    }
   
   

    render(){
        return(
            <div>
                <SubHeader />
                <div className="main1">
                
                <h4 className="text-center">My Bid List</h4>
                <h6 style={{ color:'red' }}>{this.state.message}</h6>
                <Row>
                    <Col>
                <table className="table table-stripped table-bordered" >
                    <thead>
                        <tr>
                            <th>Bid Id</th>
                            <th>Bid Amount</th>
                            <th>Crop Name</th>
                            <th> </th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                            this.state.bids.map((bid, index) =>
                                <tr key={index}>
                                    <td>{bid.id}</td>
                                    <td>{bid.bidAmount}</td>
                                    <td>{bid.cropName}</td>
                                    <td>
                                    <Link to={{ pathname: `/cropFarmerDetails/${bid.id}`, state: { bid: bid } }}>
                                                    <button type="button" className="btn btn-primary">Details</button>
                                                </Link>
                                    </td>
                                </tr>
                            )
                        } 
                    </tbody>
                </table>
                </Col>
               </Row>
               <br/>
               <h4 className="text-center">Selected Bid List</h4>
               <h6 style={{ color:'red' }}>{this.state.message1}</h6>
                <Row>
                    <Col>
                <table className="table table-stripped table-bordered" >
                    <thead>
                        <tr>
                            <th>Bid Id</th>
                            <th>Bid Amount</th>
                            <th>Crop Name</th>
                            <th> </th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                            this.state.selectedBids.map((bid, index) =>
                                <tr key={index}>
                                    <td>{bid.id}</td>
                                    <td>{bid.bidAmount}</td>
                                    <td>{bid.cropName}</td>
                                    <td>
                                    <Link to={{ pathname: `/cropFarmerDetails/${bid.id}`, state: { bid: bid } }}>
                                                    <button type="button" className="btn btn-primary">Details</button>
                                                </Link>
                                    </td>
                                </tr>
                            )
                        } 
                    </tbody>
                </table>
                </Col>
                
               </Row>
               <Col style={{ textAlign: 'right' }}>
                        <button type="button" name="btn" onClick={this.props.history.goBack}
                            className="btn btn-success ">Back</button>
                    </Col>
           </div>
        </div>
        )
    }
}

export default AllBids;