import {observable} from 'mobx'
var axios = require('axios')

let index = 0

class ObservableUserStore {
  @observable user = {
    firstName: null,
  }
  @observable message = 'here';
 

  @observable submitLogin(a, b) {
    return new Promise((resolve, reject)=>{
      axios.post('http://192.168.1.14:5000/login', {
            username: a,
            password: b,
    }).then((res) => {
      console.log(res.data)
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


  addUserItem (user) {
    this.user.push({
      firstName: '',
      lastName: '',
      email: '',
      users: [],
      index
    })
    index++
  }

  removeUserItem (user) {
    this.user = this.user.filter((l) => {
      return l.index !== user.index
    })
  }

  addItem(user, name) {
    this.user.forEach((l) => {
      if (l.index === user.index) {
        l.users.push(name)
      }
    })
  }
}


const observableUserStore = new ObservableUserStore()
export default observableUserStore