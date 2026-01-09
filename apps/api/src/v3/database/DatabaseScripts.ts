import { pool } from '../../db'
import dotenv from 'dotenv'
import fs from 'fs'
import csv from 'csv-parser'
import { formatResponse } from '../../utils/utils'
dotenv.config()

function readCSV(file) {
  return new Promise((resolve, reject) => {
    const results = []
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject)
  })
}
