function editUser(firstName, lastName, username, password, userType) {
    document.getElementById("editFirstName").value = "";
    document.getElementById("editLastName").value = "";
    document.getElementById("editUsername").value = "";
    document.getElementById("editPassword").value = "";
    document.getElementById("editUserType").value = "";

    var editUserForm = document.getElementById("editUserForm");
    editUserForm.style.display = "block";
}


function updateUser() {
    var userId
    var firstName = document.getElementById("editFirstName").value;
    var lastName = document.getElementById("editLastName").value;
    var username = document.getElementById("editUsername").value;
    var password = document.getElementById("editPassword").value;
    var userType = document.getElementById("editUserType").value;

    var data = {
        userId: userId,
        newFirstName: firstName,
        newLastName: lastName,
        newUsername: username,
        newPassword: password,
        newUserType: userType
    };

    sendAjaxRequest('update_user.php', data, function () {
        window.location.reload();
    });

    document.getElementById("editUserForm").style.display = "none";
}



function toggleAddUserForm() {
    var addUserForm = document.getElementById("addUserForm");
    if (addUserForm.style.display === "none" || addUserForm.style.display === "") {
        addUserForm.style.display = "block";
    } else {
        addUserForm.style.display = "none";
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
    console.log('Request:', params); // Log the data being sent
    xhr.send(params);
}

