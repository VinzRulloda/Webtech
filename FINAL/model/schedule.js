const {pool} = require('../db');

async function get_schedule_now() {
    const query = "SELECT *, TIMESTAMPDIFF(SECOND,start_time,NOW())  AS time_difference FROM schedule WHERE NOW() BETWEEN start_time AND end_time"
    const results = await pool.promise().query(query);
    return results[0];
}


module.exports = {
    get_schedule_now
}


// get_all_schedule()
// .then(function(results){
//     console.log(results);
// })
// .catch(function(err){
//     console.log("Error: "+err);
// })

