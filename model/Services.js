const { row, rows } = require("../config/pg");

class Services {
  static async create({ service_name, image_src }) {
    const service = await row(`
      insert into services 
        (service_name, image_src)
      values 
        ($1, $2)
      returning
        service_name, image_src, service_id;
      `, service_name, image_src)
    return service;

  }

  static async findAll() {
    const regions = await rows(`
      select
        service_id,
        service_name,
        image_src
      from 
        services
      `)
    return regions;
  }

}

module.exports = Services