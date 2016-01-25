import Chance from 'chance'

// Thanks http://stackoverflow.com/questions/1497481/javascript-password-generator
function generatePassword() {

    var length = 8,
        charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = ""

    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n))
    }

    return retVal
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

class UserGenerator {

  constructor() {
    var chance = new Chance()

    return {
      email: chance.email({domain: 'test.co'}),
      firstName: chance.first(),
      lastName: chance.last(),
      password: generatePassword(),
      username: chance.word() + new Date()
    }
  }

}
export default UserGenerator
