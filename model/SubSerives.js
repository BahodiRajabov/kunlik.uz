const { row, rows } = require("../config/pg");

class SubServices {
  static async create({ s_service_name, service_id }) {
    const service = await row(`
      insert into sub_services 
        (s_service_name, service_id)
      values 
        ($1, $2)
      returning
        s_service_name, service_id, s_service_id;
      `, s_service_name, service_id)
    return service;

  }

  static async findByServiceId({ service_id }) {
    const service = await row(`
      select 
        s_service_id,
        s_service_name
      from 
        sub_services
      where
        service_id=$1;
      `, service_id)
    return service;

  }

}

module.exports = SubServices