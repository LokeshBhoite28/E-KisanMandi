import axios from 'axios';

const base_url='http://localhost:8080/api/crops';
class BidService{

    getBidsByCropId(cropid){
        return axios.get(base_url +'/'+ cropid +"/bid")
    }

    getTraderByBidId(bidId){
        return axios.get(base_url +'/'+ bidId +"/user")
    }

    setBidAmount(cropId,userId,amount){
        return axios.post(base_url + '/' + userId +'/'+ cropId,amount,
        {headers:{'Content-Type':'application/json'}});
    }

    getBidsByBidderId(bidderId){
        return axios.get(base_url +'/bidder/'+ bidderId +"/bid")
    }

    getCropByBidId(bidId){
        return axios.get(base_url +'/bid/'+ bidId +"/crop")
    }

    selectBid(farmerId,bidId){
        return axios.post(base_url + '/' + farmerId +'/bid/'+ bidId)
    }
}

export default new BidService();