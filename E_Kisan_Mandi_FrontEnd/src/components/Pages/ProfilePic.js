
import React, { Component } from "react";
import UserService from "../Services/UserService";
import SubHeader from "../SubHeader";
import Col from 'react-bootstrap/Col';

class ProfilePic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.match.params.id,
            file: '',
            error: '',
            msg: ''
        }
    }

    onFileChange = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    uploadFile = (event) => {
        event.preventDefault();
        this.setState({ error: '', msg: '' });

        if (!this.state.file) {
            this.setState({ error: 'Please upload a file.' })
            return;
        }

        if (this.state.file.size >= 2000000) {
            this.setState({ error: 'File size exceeds limit of 2MB.' })
            return;
        }

        let data = new FormData();
        data.append('imageFile', this.state.file);
        data.append('name', this.state.file.name);


        UserService.uploadProfilePic(this.state.userId, data).then((response) => {
            console.log(response.data)
            this.setState({ error: '', msg: 'Sucessfully uploaded file' });
            this.props.history.push('/showProfile/' + this.state.userId)
        }).catch(err => {
            console.log('error:'+err)
            this.setState({error:'Uploading failed..!!!'})
            //this.setState({ error: err.response.data });
        });

    }

    render() {
        return (
            <div>
                <SubHeader />

                <div className="main1" style={{ width: '50vw', textAlign: 'center' }}>
                    <label className="mx-3" style={{ fontSize: '25px' }}>Upload a Photo</label>
                    <br />
                    <div className="App-intro m-3">

                        <h4 style={{ color: 'red' }}>{this.state.error}</h4>
                        <h4 style={{ color: 'green' }}>{this.state.msg}</h4>
                        <input onChange={this.onFileChange} type="file"></input>
                        <button onClick={this.uploadFile} className="btn btn-outline-primary">Upload</button>
                    </div>
                    <Col style={{ textAlign: 'right' }}>
                        <button type="button" name="btn" onClick={this.props.history.goBack}
                            className="btn btn-success ">Back</button>
                    </Col>
                </div>

            </div>
        )
    }

}

export default ProfilePic;