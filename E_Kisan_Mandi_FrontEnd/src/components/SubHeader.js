import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function SubHeader() {
    const [user, setUser] = useState({
        id:'',
        firstName: '',
        lastName: '',
        role: ''
    })
    useEffect(() => {
        setUser({
            id:window.localStorage.getItem("user_id"),
            firstName: window.localStorage.getItem("user_fName"),
            lastName: window.localStorage.getItem("user_lName"),
            role: window.localStorage.getItem("user_role")
        })
    }, [])
    
    return (
        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'lightsteelblue' }}>
            <Container>
                <Navbar.Brand>{user.role}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link active" aria-current="page" to={'/showProfile/' + user.id}>Profile</Link>

                        <NavDropdown title="Actions" id="collasible-nav-dropdown">

                            <NavDropdown.Item>
                                <Link className="nav-link active" aria-current="page" to={'/updateProfile/' + user.id}>Edit Profile</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link className="nav-link active" aria-current="page" to={'/changePassword/' + user.id}>Change Password</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link className="nav-link active" aria-current="page" to={'/addAddress/' + user.id}>Add Address</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link className="nav-link active" aria-current="page" to={'/updateAddress/' + user.id}>Change Address</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link className="nav-link active" aria-current="page" to={'/uploadProfilePic/' + user.id}>Upload Profile Pic</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Navbar.Text>
                            Signed in as: {user.firstName} {user.lastName}
                        </Navbar.Text>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/logOut">
                        <button className="btn btn-outline-success">LogOut</button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SubHeader;