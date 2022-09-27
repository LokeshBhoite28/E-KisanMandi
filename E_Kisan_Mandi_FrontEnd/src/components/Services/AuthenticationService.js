import axios from 'axios';
class AuthenticationService {
  authenticateUser(user) {
    console.log('auth call', user);
    return axios.post('http://localhost:8080/api/auth/signin',user);
  }

  storeUserDetails(jwt) {
    //since user has logged in : now for every request to the backend : add req auth interceptor
    this.setupRequestInterceptor(jwt);
  }
  isUserLoggedIn() {
    console.log('chk user');
    return window.localStorage.getItem('user_id') === null ? false : true;
  }

  //set up axios request interceptor for JWT
  setupRequestInterceptor(jwt) {
    //  const basicAuth = 'Basic ' + window.btoa(userName + ':' + password);
    axios.interceptors.request.use((config) => {
     // if (this.isUserLoggedIn()) {
        //adding the authorization header to config
        console.log(jwt);
        config.headers.authorization = 'Bearer ' + jwt;
      
      //return config
      return config;
    });
  }
  
}

//export it's instance , so that it's methods can be called from components
export default new AuthenticationService();
