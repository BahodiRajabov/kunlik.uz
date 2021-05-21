const { row, rows } = require("../config/pg");

class Sessions {
  static async create({ user_id, token_id, remote_ip, device }) {

    const session = await row(`
      insert into user_sessions 
        (user_id, token_id, remote_ip, device)
      values 
        ($1, $2, $3, $4)
      returning
        user_id, token_id, remote_ip, device, session_id;
      `, user_id, token_id, remote_ip, device)

    return session;

  }

  static async findByUserId(user_id) {
    const session = await row(`
      select 
        *
      from 
        user_sessions
      where
        user_id=$1;
      `, user_id)
    return session;

  }

  static async deleteById(session_id) {
    const session = await row(`
      delete from
        user_sessions
      where
        session_id=$1;
      `, session_id)
    return session;
  }
}

module.exports = Sessions