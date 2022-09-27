import { Component } from "react";

class PriceDetails extends Component {

    constructor(props){
        super(props)
        this.state={
            state:''
        }
    }
    

    render(){
    return (
        <div>
            <div className="col-sm-12 well e-trade-detail-box">
                <input type="hidden" id="previous_date" value="2022-09-19" />
                <input type="hidden" id="current_date" value="2022-09-20" />
                <div className="col-md-2 emandi-select e-trade-inputs" style={{ paddingLeft: "15px" }}>
                    <b>State</b>
                    <select className="form-control" id="min_max_state" value={this.state.state} onChange={(event) => this.setState({value : event.target.value })}>
                        <option value="">-- All --</option><option value="276">ANDHRA PRADESH</option><option value="526">CHANDIGARH</option><option value="100">CHHATTISGARH</option><option value="22">GUJARAT</option><option value="32">HARYANA</option><option value="43">HIMACHAL PRADESH</option><option value="696">JAMMU AND KASHMIR</option><option value="47">JHARKHAND</option><option value="695">KARNATAKA</option><option value="694">KERALA</option><option value="20">MADHYA PRADESH</option><option value="296">MAHARASHTRA</option><option value="384">ODISHA</option><option value="599">PUDUCHERRY</option><option value="602">PUNJAB</option><option value="26">RAJASTHAN</option><option value="509">TAMIL NADU</option><option value="28">TELANGANA</option><option value="46">UTTAR PRADESH</option><option value="385">UTTARAKHAND</option><option value="569">WEST BENGAL</option>
                    </select>
                </div>

                <div class="col-md-2 emandi-select e-trade-inputs">
                    <b>APMC's</b>
                    <select className="form-control" id="min_max_apmc">
                        <option value="0">-- Select APMCs --</option>
                    </select>
                </div>
            </div>
        </div>
    )
    }
}
export default PriceDetails;