const {Pool} = require('pg')
const pool = new Pool({
    connectionString:'postgres://faqthobm:9nNFznMzjrVi0GHkPmjRWfZPSoCoQNhi@dumbo.db.elephantsql.com/faqthobm'
})

module.exports = {pool}