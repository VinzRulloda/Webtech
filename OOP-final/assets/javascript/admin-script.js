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

    sendAjaxRequest('add_user.php', data);
    toggleAddUserForm();
}

function removeUser(userId) {
    var confirmDelete = confirm("Are you sure you want to remove this user?");
    if (confirmDelete) {
        // Send an AJAX request to remove_user.php
        var data = { userId: userId };
        sendAjaxRequest('remove_user.php', data);
    }
}

function sendAjaxRequest(url, data) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
            location.reload();
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var params = "";
    for (var key in data) {
        params += key + "=" + encodeURIComponent(data[key]) + "&";
    }
    xhr.send(params);
}