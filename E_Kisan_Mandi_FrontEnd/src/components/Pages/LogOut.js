import React, { Component } from 'react'

class LogOut extends Component {

componentDidMount() {
    this.changeStatus();
  }

changeStatus = () => {
    window.localStorage.removeItem("status");
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("user_fName");
    window.localStorage.removeItem("user_lName");
    window.localStorage.removeItem("user_role");
    this.props.history.push('/');
  } 


    render(){
      return (
        <div>
           <h5>You have Logged Out Successfully..!!</h5>
        </div>
     );
    }   
}
export default LogOut;