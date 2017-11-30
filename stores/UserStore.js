import {observable} from 'mobx'
var axios = require('axios')

let index = 0

class ObservableUserStore {
  @observable user = {
    
  }
  @observable message = 'here';
 

  @observable submitLogin(a, b) {
    return new Promise((resolve, reject)=>{
      axios.post('http://localhost:5000/login', {
            username: a,
            password: b,
    }).then((res) => {
          this.user = res.data
        if (res.data.found) {
          resolve(res.data)
        } else {
          reject(res.data);
        }
      }).catch(e => {
        console.log(e);
        console.log(e.message)
          this.message = e.message
      });
    });
  }

}


const observableUserStore = new ObservableUserStore()
export default observableUserStore