const { row, rows } = require("../config/pg");

class Districts {
  static async create({ district_name, region_id }) {
    const district = await row(`
      insert into districts 
        (district_name, region_id)
      values
        ($1, $2)
      returning
        district_name, region_id, district_id;
      `, district_name, region_id)
    return district;
  }

  static async findById({ district_id }) {
    const district = await row(`
      select
        district_name,
        region_id,
        district_id
      from 
        districts
      where
        district_id=$1;
      `, district_id)
    return district;

  }

  static async findByRegionId({ region_id }) {
    const district = await row(`
      select
        district_name,
        district_id
      from 
        districts
      where
        region_id=$1;
      `, region_id)
    return district;

  }

  static async findAll() {
    const districts = await rows(`
      select 
        district_name,
        region_id,
        district_id
      from
        districts;
      `)
    return districts;
  }

}

module.exports = Districts