const pg = require('pg')
const { Pool } = pg
const fs = require('fs')
const { parse } = require('csv-parse')

const rows = new Set()

fs.createReadStream('strong.csv')
  .pipe(parse({ delimiter: ',', from_line: 2 }))
  .on('data', function (row) {
    rows.add(row[3])
  })
  .on('error', function (error) {
    console.log(error.message)
  })
  .on('end', async function () {
    await insertIntoMySql(rows)
    console.log('finished parsing')
  })

async function insertIntoMySql(rows) {
  const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    database: 'gymapp',
    user: 'postgres',
    password: '12345',
  })

  // postgresql://root:YyIXh8l34uvgoobntz0TJYXpocNqu32e@dpg-cq2qgd4s1f4s73f3urfg-a.ohio-postgres.render.com/gymapppg

  pool.connect()

  for (const name of rows) {
    await pool.query(`insert into exercises (name) values ('${name}')`)
  }
  console.log('All done')
}
