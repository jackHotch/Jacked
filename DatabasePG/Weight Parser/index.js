const pg = require('pg')
const { Pool } = pg
const fs = require('fs')
const { parse } = require('csv-parse')

let rows = []

fs.createReadStream('weight.csv')
  .pipe(parse({ delimiter: ',', from_line: 2 }))
  .on('data', function (row) {
    let newRow = []

    newRow.push(row[1])
    newRow.push(row[2])
    rows.push(newRow)
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

  pool.connect()

  for (let i = 0; i < rows.length; i++) {
    await pool.query(
      `insert into weight (weight, date) values ('${rows[i][0]}', '${rows[i][1]}')`
    )
  }
  console.log('All done')
}
