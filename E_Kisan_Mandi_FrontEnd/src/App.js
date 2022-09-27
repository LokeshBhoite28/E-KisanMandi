
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import Header from './components/Header';
import {Switch,Route} from "react-router-dom";
import Home from './components/Pages/Home';
import AboutUs from './components/Pages/AboutUs';
import ContactUs from './components/Pages/ContactUs';
import FarmerFAQ from './components/Pages/FarmerFAQ';
import TraderFAQ from './components/Pages/TraderFAQ';
import LogIn from './components/Pages/LogIn';
import Register from './components/Pages/Register';
import CommodityList from './components/Pages/CommodityList';
import CommodityAssaying from './components/Pages/CommodityAssaying';
import FarmerHome from './components/Farmer/FarmerHome';
import TraderHome from './components/Trader/TraderHome';
import AddCrop from './components/Farmer/AddCrop';
import LogOut from './components/Pages/LogOut';
import UpdateCrop from './components/Farmer/UpdateCrop';
import ViewBids from './components/Farmer/ViewBids';
import ShowProfile from './components/Pages/ShowProfile';
import UpdateProfile from './components/Pages/UpdateProfile';
import AddAddress from './components/Pages/AddAddress';
import UpdateAddress from './components/Pages/UpdateAddress';
import SetBid from './components/Trader/SetBid';
import AllBids from './components/Trader/AllBids';
import CropFarmerDetail from './components/Trader/CropFarmerDetails';
import AdminHome from './components/Admin/AdminHome';
import ProfilePic from './components/Pages/ProfilePic';
import ChangePassword from './components/Pages/ChangePassword';
import TermAndCondition from './components/Pages/TermAndConditionScreen';
import PrivacyPolicy from './components/Pages/PrivacyPolicyScreen';


function App() {
  return (
    <div className="page-container">
      <Header />
      <div className="content-wrap" style={{backgroundColor:'#FFFFFF'}}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/contactus" component={ContactUs} />
          <Route path="/farmerfaq" component={FarmerFAQ} />
          <Route path="/traderfaq" component={TraderFAQ} />
          <Route path="/commodityList" component={CommodityList} />
          <Route path="/commodityAssaying" component={CommodityAssaying} />
          <Route path="/termsnconditions" component={TermAndCondition} />
          <Route path="/privacypolicy" component={PrivacyPolicy} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={Register} />
          <Route path="/farmerProfile" component={FarmerHome} />
          <Route path="/traderProfile" component={TraderHome} />
          <Route path="/adminProfile" component={AdminHome} />
          <Route path="/addCrop/:id" component={AddCrop} />
          <Route path="/updateCrop/:id" component={UpdateCrop} />
          <Route path="/viewBids/:id" component={ViewBids} />
          <Route path="/showProfile/:id" component={ShowProfile} />
          <Route path="/updateProfile/:id" component={UpdateProfile} />
          <Route path="/addAddress/:id" component={AddAddress} />
          <Route path="/updateAddress/:id" component={UpdateAddress} />
          <Route path="/setBids/:id" component={SetBid} />
          <Route path="/allBids/:id" component={AllBids} />
          <Route path="/cropFarmerDetails/:id" component={CropFarmerDetail} />
          <Route path="/uploadProfilePic/:id" component={ProfilePic} />
          <Route path="/changePassword/:id" component={ChangePassword} />
          <Route path="/logOut" component={LogOut} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
};

export default App;
