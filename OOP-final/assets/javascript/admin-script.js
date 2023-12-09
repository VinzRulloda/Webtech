function editUser(userId) {
    var newFirstName = prompt("Enter new first name:");
    var newLastName = prompt("Enter new last name:");
    var newUsername = prompt("Enter new username:");
    var newPassword = prompt("Enter new password:");
    var newUserType = prompt("Enter new user type (admin or user):");

    if (newFirstName !== null) {
        sendAjaxRequest('edit_user.php', { userId: userId, newFirstName: newFirstName });
    }

    if (newLastName !== null) {
        sendAjaxRequest('edit_user.php', { userId: userId, newLastName: newLastName });
    }

    if (newUsername !== null) {
        sendAjaxRequest('edit_user.php', { userId: userId, newUsername: newUsername });
    }

    if (newPassword !== null) {
        sendAjaxRequest('edit_user.php', { userId: userId, newPassword: newPassword });
    }

    if (newUserType !== null) {
        sendAjaxRequest('edit_user.php', { userId: userId, newUserType: newUserType });
    }
    window.setTimeout( function() {
        window.location.reload();
      }, 1000);
}

function openEditUserForm(userId, firstName, lastName, username, password, userType) {
    document.getElementById("editUserId").value = userId;
    document.getElementById("editFirstName").value = firstName;
    document.getElementById("editLastName").value = lastName;
    document.getElementById("editUsername").value = username;
    document.getElementById("editPassword").value = password;
    document.getElementById("editUserType").value = userType;

    var editUserForm = document.getElementById("editUserForm");
    editUserForm.style.display = "block";
}

function editUser(userId, firstName, lastName, username, password, userType) {
    openEditUserForm(userId, firstName, lastName, username, password, userType);
}

function updateUser() {
    var userId = document.getElementById("editUserId").value;
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

    sendAjaxRequest('edit_user.php', data, function () {
        window.location.reload();
    });

    document.getElementById("editUserForm").style.display = "none";
    window.setTimeout( function() {
        window.location.reload();
      }, 1000);
    
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
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
            if (callback) {
                callback();
            }
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var params = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
    xhr.send(params);
}
