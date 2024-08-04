// Registor form validation

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);

};

function registerValidate() {
  let regidtername = document.getElementById('fullname').value;
  let regidteremail = document.getElementById('email').value;
  let registerpassword = document.getElementById('password').value;
  let confirmpassword = document.getElementById('confirmPassword').value;

  if (regidtername == "") {
    alert('Please Enter the full name');
    return false;
  } else if (regidteremail == "") {
    alert('Please Enter valid Email id');
    return false;
  } else if (validateEmail(regidteremail) == false) {
    alert("Email Invalid");
    return false;
  } else if (registerpassword == "") {
    alert('Please Enter the Password');
    return false;
  } else if (confirmpassword == "") {
    alert('Please Enter confirm the Password');
    return false;
  } else if (registerpassword.length < 8) {
    alert('Password must be 8 character long');
    return false;
  } else if (registerpassword !== confirmpassword) {
    alert('Password does not match');
    return false;
  }


  let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

  let user = {
    id: Number(new Date()),
    fullname: regidtername,
    email: regidteremail,
    password: registerpassword,
    confirmpassword: confirmpassword
  }

  let user_data_str = JSON.stringify(user);
  const userExists = users.find(user => JSON.stringify(user) === user_data_str);

  if (userExists) {
    alert('User already exists');
    return false
  } else {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }
  return true;
}


// Login validation 
const loginValidate = (event) => {
  event.preventDefault();
  let loginEmail = document.getElementById("loginEmail").value;
  let loginPassword = document.getElementById("loginPassword").value;
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (loginEmail === "" || loginPassword === "") {
    alert('Enter email id');
    return false;
  } else {
    let validLogin = false;
    let loggedInUser = null;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === loginEmail && users[i].password === loginPassword) {
        validLogin = true;
        loggedInUser = users[i];
        break;
      }
    }

    if(loggedInUser ==  null){
      alert('Password does not match');
    }

    console.log('loggedInUser', loggedInUser);

    if (validLogin) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      location.href = "./LoginSuccess.html";
    } else {
     
    }
  }
}

// Edit User Funcation
const editUser = (event, user) => {
  event.preventDefault();
  let fullName = document.getElementById("editname").value;
  let email = document.getElementById("editEmail").value;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (fullName === "" || email === "") {
    alert("Please fill in all the details.");
    return;
  } else if (!emailPattern.test(email)) {
    alert("Please enter valid email.");
    return;
  } else if (users.some(user => user.email === email)) {
    alert("This email is already registered");
    return;
  }
  user.fullname = fullName;

  // Update email only if it is not disabled
  if (!document.getElementById("editEmail").disabled) {
    user.email = email;
  }

  let index = users.findIndex(u => u.id === user.id);
  users[index] = user;

  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "./UserList.html";
}

// Confirm  Delete User Funcation
const confirmDeleteUser = (id) => {
  if (confirm("Are you sure you want to delete this user?")) {
    deleteUser(id);
  }
}

// Delete User Funcation
const deleteUser = (id) => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter(user => user.id !== id);
  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
}

