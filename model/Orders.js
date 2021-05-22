const { row, rows } = require("../config/pg");

class Orders {
  static async create({ title, descripton, region_id, service_id, jbt_type, price, owner_id, image_src }) {
    const order = await row(`
      insert into orders 
        (title, descripton, region_id, service_id, jbt_type, price, owner_id, image_src)
      values 
        ($1, $2, $3, $4 , $5, $6, $7, $8)
      returning 
        title, descripton, region_id, service_id, jbt_type, price, owner_id, order_id, image_src;
      `, title, descripton, region_id, service_id, jbt_type, price, owner_id, image_src)
    return order;

  }

  static async findById(order_id) {
    const order = await row(`
      select 
        *
      from 
        orders
      where
        order_id=$1;
      `, order_id)
    return order;
  }

  static async findByUserId({ user_id }) {
    const order = await rows(`
    select
    ord.order_id,
    ord.title,
    ord.descripton,
    ord.image_src,
    ord.jbt_type,

    ord.price,
    usr.phone_number,
    ord.created_at,
    reg.region_name,
    serv.service_name
  from orders as ord                                                           
  join users as usr on ord.owner_id = usr.user_id
  join services as serv on serv.service_id = ord.service_id
  join regions as reg on reg.region_id = ord.region_id
        where owner_id=$1;
      `, user_id)
    return order;
  }

  static async findAll({ limit, page }) {
    const districts = await rows(`
    select
    ord.order_id,
    ord.title,
    ord.jbt_type,

    ord.descripton,
    ord.image_src,
    ord.price,
    usr.phone_number,
    ord.created_at,
    reg.region_name,
    serv.service_name
  from orders as ord                                                           
  join users as usr on ord.owner_id = usr.user_id
  join services as serv on serv.service_id = ord.service_id
  join regions as reg on reg.region_id = ord.region_id
      limit $1 offset ($2 - 1) * $1;
      `, limit, page)
    return districts;
  }

  static async searchByService({ service_id, limit, page }) {
    const districts = await rows(`
      select
        ord.order_id,
        ord.title,
        ord.descripton,
        ord.jbt_type,

      ord.image_src,
        ord.price,
        usr.phone_number,
        ord.created_at,
        reg.region_name,
        serv.service_name
      from orders as ord                                                           
      join users as usr on ord.owner_id = usr.user_id
      join services as serv on serv.service_id = ord.service_id
      join regions as reg on reg.region_id = ord.region_id
      where
        ord.service_id = $3
      limit $1 offset ($2 - 1) * $1;
      `, limit, page, service_id)
    return districts;
  }

  static async searchByRegions({ region_id, limit, page }) {
    const regions = await rows(`
      select
        ord.order_id,
        ord.title,
        ord.descripton,
        ord.jbt_type,

      ord.image_src,
        ord.price,
        usr.phone_number,
        ord.created_at,
        reg.region_name,
        serv.service_name
      from orders as ord                                                           
      join users as usr on ord.owner_id = usr.user_id
      join services as serv on serv.service_id = ord.service_id
      join regions as reg on reg.region_id = ord.region_id
      where
        ord.region_id = $3
      limit $1 offset ($2 - 1) * $1;
      `, limit, page, region_id)
    return regions;
  }

  static async searchByTitle({title, limit, page }) {
    const orders = await rows(`
      select
        ord.order_id,
        ord.title,
        ord.descripton,
        ord.price,
        ord.jbt_type,
        usr.phone_number,
        ord.image_src,
        ord.created_at,
        reg.region_name,
        serv.service_name,
        regexp_matches(ord.title, $3, 'i') as keyword
      from orders as ord
      join users as usr on ord.owner_id = usr.user_id
      join services as serv on serv.service_id = ord.service_id
      join regions as reg on reg.region_id = ord.region_id      
      limit $1 offset ($2 - 1) * $1;
      `, limit, page,title)


    return orders;
  }

  static async deleteOne({ order_id }) {
    const order = await row(`
      delete from 
        orders
      where
        order_id=$1;
      `, order_id)
    return order;
  }

}
// 
module.exports = Orders