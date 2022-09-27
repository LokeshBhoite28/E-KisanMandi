import axios from 'axios';

const base_url='http://localhost:8080/api/user';
class UserService{


    addNewUser(user){
        return axios.post('http://localhost:8080/api/auth/signup',user,
        {headers:{'Content-Type':'application/json'}});
    }

    loginUser(userAuthrequest){
        return axios.post(base_url+'/login',userAuthrequest,
        {headers:{'Content-Type':'application/json'}});
    }

    getUserById(id){
        return axios.get(base_url+ "/" + id);
    }

    updatedUserDetails(user){
        return axios.put(base_url+'',user,
        {headers:{'Content-Type':'application/json'}});
    }

    linkAddress(userId,address){
        return axios.post(base_url+'/'+userId+'/address',address,
        {headers:{'Content-Type':'application/json'}});
    }

    updateLinkedAddress(userId,address){
        return axios.put(base_url+'/'+userId+'/address',address,
        {headers:{'Content-Type':'application/json'}});
    }

    getAddressByUserId(userId){
        return axios.get(base_url+'/'+userId+'/address');
    }

    getAllUser(){
        return axios.get(base_url);
    }

    getUserByRole(role){
        return axios.get(base_url+ "/role/" + role);
    }

    getAddressByCropId(cropId){
        return axios.get(base_url+ "/crop/" + cropId + '/address');
    }

    uploadProfilePic(userId,imageFile){
        return axios.post(base_url+'/'+userId+'/image',imageFile,
        {headers:{'Content-Type':'multipart/form-data'}});
    }

    getProfilePic(userId){
        return axios.get(base_url+'/'+userId+'/image');
    }

    changeUserPassword(userId,pass){
        return axios.put(base_url+'/'+userId+'/password',pass,
        {headers:{'Content-Type':'application/json'}});
    }
}

export default new UserService();