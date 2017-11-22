import {observable} from 'mobx'

let index = 0

class ObservableUserStore {
  @observable user = [
    {
    firstName: 'mew'
  }
  ]

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