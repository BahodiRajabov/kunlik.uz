const { row, rows } = require("../config/pg");

class Users {
  static async create({ first_name, last_name, phone_number, password }) {
    const user = await row(`
      insert into users 
        (first_name, last_name, phone_number, password)
      values 
        ($1, $2, $3, crypt($4, gen_salt('bf')) )
      returning 
        first_name, last_name, phone_number, user_id, user_role;
      `, first_name, last_name, phone_number, password)
    return user;

  }

  static async findById(userId) {
    const user = await row(`
      select 
        *
      from 
        users
      where
        user_id=$1;
      `, userId)
    return user;

  }

  static async findByPhoneNumber(phoneNumber) {
    const user = await row(`
      select 
        *
      from 
        users
      where
        phone_number=$1;
      `, phoneNumber)
    return user;

  }

  static async comparePassword(password, hashedPassword) {
    const isValid = await row(`
      select (crypt($1, $2) = $2) as is_valid;
      `, password, hashedPassword)

    return isValid;

  }

}

module.exports = Users