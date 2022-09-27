import axios from 'axios';

const base_url='http://localhost:8080/api/trader';
class TraderService{

    getCropsbyCropName(name){
        return axios.get(base_url + '/crops/' + name +'/list');
    }

    getFarmerFromCropId(id){
        return axios.get(base_url + '/crops/' + id +'/user');
    }

    getAllCrops(){
        return axios.get(base_url + '/crops');
    }

    getCropsByDistrict(district){
        return axios.get(base_url + '/crops/address/' + district);
    }

    getMySelectedBids(traderId){
        return axios.get(base_url + '/' + traderId +'/selectedBids');
    }
}

export default new TraderService();