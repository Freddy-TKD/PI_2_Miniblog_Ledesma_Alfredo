import pool from "./pool.js"

const result = await pool.query("SELECT NOW()")
console.log(result.rows)

pool.end()