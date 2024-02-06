const {pool} = require('../db');

async function get_video_by_id(id) {
    const results = await pool.promise().query("SELECT * FROM uploads where id = ?", [id]);
    return results[0];
}

async function get_video_by_schedule(schedule_id) {
    const results = await pool.promise().query("SELECT * FROM uploads where schedule_id = ?", [schedule_id]);
    return results[0];
}

module.exports = {
    get_video_by_id,
    get_video_by_schedule
}


// get_users()
// .then(function(results){
//     console.log(results);
// })
// .catch(function(err){
//     console.log("Error: "+err);
// })

