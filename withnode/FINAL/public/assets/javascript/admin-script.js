function editUser(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'edit_user.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var user = JSON.parse(xhr.responseText);

            document.getElementById("editUserId").value = user.id;
            document.getElementById("editFirstName").value = user.fname;
            document.getElementById("editLastName").value = user.lname;
            document.getElementById("editUsername").value = user.username;
            document.getElementById("editPassword").value = user.password;
            document.getElementById("editUserType").value = user.usertype;
            document.getElementById("editUserForm").style.display = "block";
        }
    };
    xhr.send('action=getUserById&id=' + id);
}

function updateUser() {
    var id = document.getElementById("editUserId").value;
    var firstName = document.getElementById("editFirstName").value;
    var lastName = document.getElementById("editLastName").value;
    var username = document.getElementById("editUsername").value;
    var password = document.getElementById("editPassword").value;
    var userType = document.getElementById("editUserType").value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'edit_user.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            document.getElementById("editUserForm").style.display = "none";
            updateTableRow(id, firstName, lastName, username, password, userType);

            alert(response.success);
        }
    };
    window.setTimeout( function() {
        window.location.reload();
      }, 1000);
    xhr.send('action=updateUserById&id=' + id + '&firstName=' + firstName + '&lastName=' + lastName + '&username=' + username + '&password=' + password + '&userType=' + userType);
}

function toggleAddUserForm() {
    var addUserForm = document.getElementById("addUserForm");
    if (addUserForm.style.display === "none" || addUserForm.style.display === "") {
        addUserForm.style.display = "block";
    } else {
        addUserForm.style.display = "none";
    }
}

function toggleEditUserForm(id) {
    fetch("/user/"+id)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById("editFirstName").value = data.fname;
        document.getElementById("editLastName").value = data.lname;
        document.getElementById("editUsername").value = data.username;
        document.getElementById("editPassword").value = data.password;
        document.getElementById("editUserType").value = data.usertype;
        document.getElementById("userid").value = data.id;
    });

    var editUserForm = document.getElementById("editUserForm");
    if (editUserForm.style.display === "none" || editUserForm.style.display === "") {
        editUserForm.style.display = "block";
    } else {
        editUserForm.style.display = "none";
    }
}

function toggleDeleteUserForm(id) {
    fetch("/user/"+id)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById("Name").innerHTML = data.fname+" "+data.lname;
        document.getElementById("deleteuserid").value = data.id;
    });

    var deleteUserForm = document.getElementById("deleteUserForm");
    if (deleteUserForm.style.display === "none" || deleteUserForm.style.display === "") {
        deleteUserForm.style.display = "block";
    } else {
        deleteUserForm.style.display = "none";
    }
}
function addUserToTable() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var userType = document.getElementById("userType").value;

    var data = {
        userId: null,
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        userType: userType
    };
    window.setTimeout( function() {
        window.location.reload();
      }, 1000);

    sendAjaxRequest('add_user.php', data);
    toggleAddUserForm();
}

function removeUser(userId) {
    var confirmDelete = confirm("Are you sure you want to remove this user?");
    if (confirmDelete) {
        var data = { userId: userId };
        sendAjaxRequest('remove_user.php', data);
    }
    window.setTimeout( function() {
        window.location.reload();
      }, 1000);
}

function sendAjaxRequest(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            console.log('Response:', xhr.responseText);
            if (xhr.status == 200) {
                if (callback) {
                    callback();
                }
            } else {
                console.error('Error:', xhr.status);
            }
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var params = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
    console.log('Request:', params);
    xhr.send(params);
}

