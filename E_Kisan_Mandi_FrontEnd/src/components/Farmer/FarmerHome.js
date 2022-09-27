import React, { Component } from "react";
import FarmerService from "../Services/FarmerService";
import { Link } from "react-router-dom";
import SubHeader from "../SubHeader";
import UserService from "../Services/UserService";

class FarmerHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            contactNo: '',
            role: '',
            card: {
                cardNo: '',
                location: ''
            },
            message: '',
            croparr: [],
            flag: false
        }
    }

    componentDidMount() {
        console.log("in Farmer profile componentDidmount");
        this.setState({
            id: window.localStorage.getItem("user_id"),
            role: window.localStorage.getItem("user_role"),
            message: this.props.message
        })

        let fId = window.localStorage.getItem("user_id");

        UserService.getUserById(fId).then((response)=>{
            console.log("user: "+response.data);
            let user= response.data;
            this.setState({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                contactNo: user.contactNo,
                cardNo: user.card.cardNo,
                location: user.card.location, 
            })
        })
        console.log(fId);
        //getCropListbyId method will get the data from web service and assign it to croparr
        FarmerService.getCropListByFId(fId).then((response) => {
            console.log('in get crop method 1');
            response.data !== null && this.setState({croparr: response.data})
            response.data === '' && this.setState({message:'No crops registered',croparr:[]})  
        })
        
    }

    //this method is called continuously even if small change happen 
    //so its preferable to write the code inside if condition 
    //otherwise it will go in infinite loop
    //five
    componentDidUpdate(prevProps, prevState) {
        //if flag is true means the data is deleted from database
        // so call getCropListByFId from farmerService again
        let fId = window.localStorage.getItem("user_id");
        if (this.state.flag) {
            FarmerService.getCropListByFId(fId).then((response) => {
                response.data !== null && this.setState({ croparr: response.data, flag: false })
                response.data === '' && this.setState({message:'No crops registered',croparr:[]})
            })
        }
    }

    addCropDetails = (id) => {
        this.props.history.push(`/addCrop/${id}`);
    }

    deleteCropById = (cropId) => {
        FarmerService.deleteCropByCropId(cropId).then((response) => {
            console.log(response.data);
            this.setState({ flag: true });
        })
    }
    
    render() {

        return (
            <div>
                <SubHeader />
                <div className="main1" style={{ width: '70%' }}>
                    <button className="btn btn-primary" onClick={() => this.addCropDetails(this.state.id)}>Add Crop</button>
                    <div>
                        <h4 className="text-center">Crop List</h4>
                        <h6 style={{ color:'red' }}>{this.state.message}</h6>
                        <table className="table table-stripped table-bordered">
                            <thead>
                                <tr>
                                    <th>Crop</th>
                                    <th>Species</th>
                                    <th>Grade</th>
                                    <th>Quantity</th>
                                    <th>Sowing date</th>
                                    <th>Harvest date</th>
                                    <th>Least price</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {
                                    this.state.croparr.map((crop, index) =>
                                        <tr key={index}>
                                            <td>{crop.cropName}</td>
                                            <td>{crop.species}</td>
                                            <td>{crop.grade}</td>
                                            <td>{crop.quantity}</td>
                                            <td>{crop.sowingDate}</td>
                                            <td>{crop.harvestDate}</td>
                                            <td>{crop.leastPrice}</td>
                                            <td>
                                                <Link to={{ pathname: `/viewBids/${crop.id}`, state: { crop: crop } }}>
                                                    <button type="button" className="btn btn-success" >View bids</button>
                                                </Link>
                                                <button type="button" className="btn btn-danger"
                                                    onClick={() => this.deleteCropById(crop.id)} >delete</button>
                                                <Link to={{ pathname: `/updateCrop/${crop.id}`, state: { crop: crop } }}>
                                                    <button type="button" className="btn btn-primary">Update</button>
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

export default FarmerHome;