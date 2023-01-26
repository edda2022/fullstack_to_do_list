const {Pool} = require('pg')
const pool = new Pool({
    connectionString:'postgres://vehbqeru:zSAZ6Ebf83LRI65j9_3dm3nBL_wPIY5K@dumbo.db.elephantsql.com/vehbqeru'
})

module.exports = {pool}