const { Pool } = require("pg")

const config = require("./config")

const pool = new Pool({
	host: config.DB_HOST,
	user: config.DB_USER,
	password: config.DB_PASSWORD,
	database: config.DATABASE,
	port: config.DB_PORT,
})

const rows = async (query, ...params) => {
	const client = await pool.connect()

	try {
		const { rows } = await client.query(query, params)
		return rows

	} catch (err) {
		console.log(err);

	} finally {
		await client.release()
	}
}

const row = async (query, ...params) => {
	const client = await pool.connect()

	try {
		const { rows: [row] } = await client.query(query, params)
		return row

	} catch (err) {
		console.log(err);

	} finally {
		await client.release()

	}
}

module.exports = { rows, row }