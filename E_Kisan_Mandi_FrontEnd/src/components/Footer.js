import { Link } from "react-router-dom";
function Footer() {
    return (
        <div className="footer">
            <div  >
                <table width="90%" style={{ marginLeft: "16px" }}>
                    <br></br>
                    <tr>
                        <td>
                            <tr>
                                <Link className="nav-link active" aria-current="page" to="/contactus">ContactUs</Link>
                            </tr>
                            <tr>
                                <Link className="nav-link active" aria-current="page" to="/termsnconditions">Terms & Conditions</Link>
                            </tr>
                            <tr>
                                <Link className="nav-link active" aria-current="page" to="/privacypolicy">Privacy Policy</Link>
                            </tr>
                        </td>

                        <td className="float-end">
                            <div>
                                <h2>Download App</h2> <br />
                                <a
                                    style={{ marginRight: "16px" }}>
                                    <img
                                        src="https://www.jiomart.com/images/cms/wysiwyg/app-icons/play_store.png"
                                        alt="Download GreenMart App for Android from Play Store"
                                    />
                                </a>
                                <a><img src="https://www.jiomart.com/images/cms/wysiwyg/app-icons/ios_store.png"
                                    alt="Download GreenMart App for iOs from App Store" /></a>
                            </div>
                        </td>
                    </tr>
                </table>

                <div style={{ textAlign: "center" }}>
                    <div>© By Hemant and Lokesh 2022, E-Kisan Mandi CDAC Project, INDIA</div>
                </div>
            </div>

        </div>
    )
}

export default Footer;