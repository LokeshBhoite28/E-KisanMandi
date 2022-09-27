import axios from 'axios';

const base_url='http://localhost:8080/api/farmer';
class FarmerService{

    addCropDetails(fId,crop){
            return axios.post(base_url + '/' + fId,crop,
            {headers:{'Content-Type':'application/json'}});
    }

    getCropListByFId(fId){
        return axios.get(base_url + '/' + fId + '/crops');
    }

    getCropByCropId(cId){
        return axios.get(base_url + '/crops/' + cId);
    }

    updateCropDetails(fId,crop){
        return axios.put(base_url + '/' + fId,crop,
        {headers:{'Content-Type':'application/json'}});
    }

    deleteCropByCropId(cropId){
        return axios.delete(base_url + '/crops/' + cropId);
    }

   
}

export default new FarmerService();