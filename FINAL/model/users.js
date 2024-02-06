const {pool} = require('../db');

async function get_user(username, password) {
    const query = "SELECT * FROM `users` WHERE username = ? AND password = ?";
    const results = await pool.promise().query(query, [username, password]);
    return results[0];
}

async function get_user_by_id(id) {
    const query = "SELECT * FROM `users` WHERE id = ?";
    const results = await pool.promise().query(query, [id]);
    return results[0];
}


async function get_users() {
    const results = await pool.promise().query("SELECT * FROM users");
    return results[0];
}

async function add_new_user(userdata) {
    const query = `INSERT INTO users (fname, lname, username, password, usertype) VALUES (?, ?, ?, ?, ?)`;

    const results = await pool.promise().query(query, userdata);
    return results[0];
}

async function edit_user(userdata) {
    const query = `UPDATE users SET fname = ?, lname = ?, username = ?, usertype = ?  WHERE id = ?;`;

    const results = await pool.promise().query(query, userdata);
    return results[0];
}

async function delete_user(id) {
    const query = "DELETE from users where id = ?";
    const results = await pool.promise().query(query, [id]);
    return results[0];
}

async function toggle_user_status(id, status) {

    if (status == 0) {
        new_status = 1;
    } else {
        new_status = 0;
    }

    const query = "UPDATE users set status = ? where id = ?";
    const results = await pool.promise().query(query, [new_status, id]);
    return results[0];
}

async function change_user_password(userid, new_password) {
    const query = "UPDATE users set password = ? where id = ?";
    const results = await pool.promise().query(query, [new_password, userid]);
    return results[0];
}



module.exports = {
    get_user,
    get_user_by_id,
    get_users,
    add_new_user,
    edit_user,
    delete_user,
    toggle_user_status,
    change_user_password
}


// get_users()
// .then(function(results){
//     console.log(results);
// })
// .catch(function(err){
//     console.log("Error: "+err);
// })

