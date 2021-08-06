
import axios from 'axios';

export const Services ={
  Getrepo : (token)=> {
    return axios({
      method: 'get',
      url:  process.env.REACT_APP_REPO,
      config: { headers: {
        Authorization: token,
      }
    }
  })
  },

   getpublicevents :(token)=> {
    return axios({
      method: 'get',
      url:process.env.REACT_APP_EVENT,
      config: { headers: {
        Authorization: token,
      }
    }
  })
  }
}
//export default Getrepo;
 
