let login = document.getElementById("login");
let signup = document.getElementById("signup");
let home = document.getElementById("home");
let userIndex = -1;

// Login
let userEmailLogin = document.getElementById("emailInputLogin");
let userPasswordLogin = document.getElementById("passwordInputLogin");
// Show-Hide Password Login
let passwordLoginHide = document.getElementById("passwordLoginHide");
let passwordLoginUnHide = document.getElementById("passwordLoginUnHide");
// Signup
let userNameSignup = document.getElementById("nameInputSignup");
let userEmailSignup = document.getElementById("emailInputSignup");
let userPasswordSignup = document.getElementById("passwordInputSignup");
let userConfirmPasswordSignup = document.getElementById(
  "confirmPasswordInputSignup"
);

// Show-Hide Password Signup
let passwordSignupHide = document.getElementById("passwordSignupHide");
let passwordSignupUnHide = document.getElementById("passwordSignupUnHide");
let passwordConfirmSignupHide = document.getElementById(
  "passwordConfirmSignupHide"
);
let passwordConfirmSignupUnHide = document.getElementById(
  "passwordConfirmSignupUnHide"
);

// Accounts Array
let accountArray = [];

(function () {
  // Get Local Storage
  let savedData = JSON.parse(localStorage.getItem("accounts"));
  if (savedData) {
    accountArray = savedData;
    console.log();
  }

  let savedIndex = localStorage.getItem("userIndex");
  if (savedIndex) {
    userIndex = savedIndex;
    gotoHome();
  }

  // Blur Inputs
  userEmailLogin.addEventListener("blur", function () {
    validateEmail(userEmailLogin, "emailAlertLogin");
  });
  userPasswordLogin.addEventListener("blur", function () {
    validatePassword(userPasswordLogin, "passwordAlertLogin");
  });
  userNameSignup.addEventListener("blur", function () {
    validateName(userNameSignup, "nameAlertSignup");
  });
  userEmailSignup.addEventListener("blur", function () {
    validateEmail(userEmailSignup, "emailAlertSignout");
  });
  userPasswordSignup.addEventListener("blur", function () {
    validatePassword(userPasswordSignup, "passwordAlertSignup");
  });

  userConfirmPasswordSignup.addEventListener("blur", function () {
    confirmPassword(
      userPasswordSignup,
      userConfirmPasswordSignup,
      "passwordConfirmAlertSignup"
    );
  });

  //Show-Hide Password
  passwordLoginHide.addEventListener("mousedown", function (e) {
    e.preventDefault();
  });
  passwordLoginUnHide.addEventListener("mousedown", function (e) {
    e.preventDefault();
  });
  passwordSignupHide.addEventListener("mousedown", function (e) {
    e.preventDefault();
  });
  passwordSignupUnHide.addEventListener("mousedown", function (e) {
    e.preventDefault();
  });
  passwordConfirmSignupHide.addEventListener("mousedown", function (e) {
    e.preventDefault();
  });
  passwordConfirmSignupUnHide.addEventListener("mousedown", function (e) {
    e.preventDefault();
  });

  //Clicks
  passwordLoginHide.addEventListener("click", function () {
    ShowHidePassword(
      passwordLoginHide,
      passwordLoginUnHide,
      userPasswordLogin,
      "text"
    );
  });
  passwordLoginUnHide.addEventListener("click", function () {
    ShowHidePassword(
      passwordLoginUnHide,
      passwordLoginHide,
      userPasswordLogin,
      "password"
    );
  });
  passwordSignupHide.addEventListener("click", function () {
    ShowHidePassword(
      passwordSignupHide,
      passwordSignupUnHide,
      userPasswordSignup,
      "text"
    );
  });
  passwordSignupUnHide.addEventListener("click", function () {
    ShowHidePassword(
      passwordSignupUnHide,
      passwordSignupHide,
      userPasswordSignup,
      "password"
    );
  });
  passwordConfirmSignupHide.addEventListener("click", function () {
    ShowHidePassword(
      passwordConfirmSignupHide,
      passwordConfirmSignupUnHide,
      userConfirmPasswordSignup,
      "text"
    );
  });
  passwordConfirmSignupUnHide.addEventListener("click", function () {
    ShowHidePassword(
      passwordConfirmSignupUnHide,
      passwordConfirmSignupHide,
      userConfirmPasswordSignup,
      "password"
    );
  });
  document.getElementById("goToSignup").addEventListener("click", goToSignup);
  document
    .querySelector("#signup .login-back")
    .addEventListener("click", goToLogin);
  document
    .getElementById("createAccBtn")
    .addEventListener("click", createAccount);
  document.getElementById("loginBtn").addEventListener("click", loginUser);
  document.querySelector("#home .logout-btn").addEventListener("click", logout);
})();
// Login
function loginUser() {
  if (userEmailLogin.value == "" && userPasswordLogin.value == "") {
    alertOn("emailAlertLogin", "Enter Your E-mail");
    alertOn("passwordAlertLogin", "Enter Your Password");
    return;
  }
  for (let i = 0; i < accountArray.length; i++) {
    if (accountArray[i].userEmail == userEmailLogin.value) {
      if (accountArray[i].userPassword == userPasswordLogin.value) {
        saveUserIndexLocal(i);
        return;
      } else {
        alertOn("passwordAlertLogin", "Incorrect Password");
        return;
      }
    }
    alertOn("emailAlertLogin", "Incorrect E-mail");
  }
}

function saveUserIndexLocal(index) {
  localStorage.setItem("userIndex", index);
  userIndex = index;
  gotoHome();
  clrLoginInputs();
}

function clrLoginInputs() {
  userEmailLogin.value = "";
  userPasswordLogin.value = "";
}
// Logout
function logout() {
  localStorage.removeItem("userIndex");
  goToLogin();
}

// Create Account
function createAccount() {
  if (
    validateName(userNameSignup, "nameAlertSignup") &&
    validateEmail(userEmailSignup, "emailAlertSignout") &&
    validatePassword(userPasswordSignup, "passwordAlertSignup") &&
    confirmPassword(
      userPasswordSignup,
      userConfirmPasswordSignup,
      "passwordConfirmAlertSignup"
    )
  ) {
    let account = {
      userName: userNameSignup.value,
      userEmail: userEmailSignup.value,
      userPassword: userPasswordSignup.value,
    };
    checkEmailExist(account, userEmailSignup, "emailAlertSignout");
  }
}

function checkEmailExist(account) {
  for (let i = 0; i < accountArray.length; i++) {
    if (accountArray[i].userEmail == account.userEmail) {
      clrSignupInputs();
      accountExistAlert();
      return;
    }
  }
  addAccountToArray(account, accountArray);
}

function addAccountToArray(account, accountArray) {
  accountArray.push(account);
  saveArrayToLocal(accountArray);
}

function saveArrayToLocal(accountsArray) {
  localStorage.setItem("accounts", JSON.stringify(accountsArray));
  clrSignupInputs();
  accountCreatedAlert();
}

function clrSignupInputs() {
  userNameSignup.value = "";
  userEmailSignup.value = "";
  userPasswordSignup.value = "";
  userConfirmPasswordSignup.value = "";
}

// Home
function setUserName() {
  document.getElementById("userNameHome").innerText =
    accountArray[userIndex].userName;
}

// Navigation
function goToLogin() {
  signup.classList.add("hide");
  home.classList.add("hide");
  login.classList.remove("hide");
}

function goToSignup() {
  signup.classList.remove("hide");
  login.classList.add("hide");
}

function gotoHome() {
  login.classList.add("hide");
  home.classList.remove("hide");
  setUserName();
}

// Validation
function checkEmailFormat(email) {
  let regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

function validateEmail(element, alertId) {
  if (checkEmailFormat(element.value)) {
    alertOff(alertId);
    return true;
  } else {
    alertOn(alertId);
    return false;
  }
}

function validatePassword(element, alertId) {
  if (element.value.length >= 7) {
    alertOff(alertId);
    return true;
  } else {
    alertOn(alertId);
    return false;
  }
}

function validateName(element, id) {
  if (element.value.length >= 5) {
    alertOff(id);
    return true;
  } else {
    alertOn(id);
    return false;
  }
}

function confirmPassword(firstElement, secondElement, id) {
  if (firstElement.value === secondElement.value) {
    alertOff(id);
    return true;
  } else {
    alertOn(id);
    return false;
  }
}

// Hide-Show Password
function ShowHidePassword(addElement, removeElement, inputElement, inputType) {
  let cursorPosition = inputElement.selectionStart;
  handleEyeIcon(addElement, removeElement);
  changeInputType(inputElement.id, inputType);
  setTimeout(function () {
    inputElement.setSelectionRange(cursorPosition, cursorPosition);
  }, 0);
}

function handleEyeIcon(addElement, removeElement) {
  addElement.classList.add("hide");
  removeElement.classList.remove("hide");
}

function changeInputType(id, type) {
  document.getElementById(id).type = type;
}

// Alert
function alertOn(id, message) {
  document.getElementById(id).classList.remove("hide");
  if (message) {
    document.getElementById(id).innerHTML = message;
  }
}
function alertOff(id) {
  document.getElementById(id).classList.add("hide");
}

function accountCreatedAlert() {
  document.getElementById("success-cr").style.opacity = 1;
  setInterval(function () {
    document.getElementById("success-cr").style.opacity = 0;
  }, 3000);
  goToLogin();
}

function accountExistAlert() {
  document.getElementById("failed-cr").style.opacity = 1;
  setInterval(function () {
    document.getElementById("failed-cr").style.opacity = 0;
  }, 3000);
  goToLogin();
}
