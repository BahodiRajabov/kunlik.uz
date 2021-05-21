const { row, rows } = require("../config/pg");

class Regions {
  static async create({ region_name }) {
    const region = await row(`
      insert into regions 
        (region_name)
      values 
        ($1)
      returning 
        region_name, region_id;
      `, region_name)
    return region;

  }

  static async findById({ region_id }) {
    const region = await row(`
      select 
        region_id,
        region_name
      from 
        regions
      where
        region_id=$1;
      `, region_id)
    return region;

  }

  static async findAll() {
    const regions = await rows(`
      select 
        region_id,
        region_name
      from 
        regions;
      `)
    return regions;
  }

}

module.exports = Regions