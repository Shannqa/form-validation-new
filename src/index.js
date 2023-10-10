/* eslint-disable no-lonely-if */
/* eslint-disable prefer-destructuring */
// eslint-disable-next-line no-unused-vars
import css from "./style.css";

// prepare a form

const body = document.querySelector("body");
const form = document.createElement("form");
const inputEmail = document.createElement("input");
const selectCountry = document.createElement("select");
const inputZip = document.createElement("input");
const inputPass = document.createElement("input");
const inputPassConf = document.createElement("input");
const button = document.createElement("button");
const labelEmail = document.createElement("label");
const labelCountry = document.createElement("label");
const labelZip = document.createElement("label");
const labelPass = document.createElement("label");
const labelPassConf = document.createElement("label");
const spanEmail = document.createElement("span");
const spanCountry = document.createElement("span");
const spanZip = document.createElement("span");
const spanPass = document.createElement("span");
const spanPassConf = document.createElement("span");
const optionChoose = document.createElement("option");
const optionPL = document.createElement("option");
const optionCH = document.createElement("option");
const optionFR = document.createElement("option");
const optionNL = document.createElement("option");

labelEmail.setAttribute("for", "email");
inputEmail.setAttribute("id", "email");
inputEmail.setAttribute("name", "email");
inputEmail.setAttribute("type", "email");
labelCountry.setAttribute("for", "country");
selectCountry.setAttribute("id", "country");
selectCountry.setAttribute("name", "country");
labelZip.setAttribute("for", "zipcode");
inputZip.setAttribute("id", "zipcode");
inputZip.setAttribute("name", "zipcode");
labelPass.setAttribute("for", "password");
inputPass.setAttribute("id", "password");
inputPass.setAttribute("name", "password");
labelPassConf.setAttribute("for", "password-confirm");
inputPassConf.setAttribute("id", "password-confirm");
inputPassConf.setAttribute("name", "password-confirm");
optionChoose.setAttribute("value", "choose");
optionPL.setAttribute("value", "pl");
optionCH.setAttribute("value", "ch");
optionFR.setAttribute("value", "fr");
optionNL.setAttribute("value", "nl");
form.setAttribute("novalidate", true);

labelEmail.textContent = "Email address:";
labelCountry.textContent = "Country:";
labelZip.textContent = "Zip code (required):";
labelPass.textContent = "Password (required):";
spanPass.textContent =
  "Min. 8 characters, one upper- and lowercase letter and one number.";
labelPassConf.textContent = "Confirm password (required):";
button.textContent = "Submit";
optionChoose.textContent = "-- Choose a country --";
optionPL.textContent = "Poland";
optionCH.textContent = "Switzerland";
optionFR.textContent = "France";
optionNL.textContent = "Netherlands";

spanPass.className = "span-pass";

selectCountry.appendChild(optionChoose);
selectCountry.appendChild(optionPL);
selectCountry.appendChild(optionCH);
selectCountry.appendChild(optionFR);
selectCountry.appendChild(optionNL);

form.appendChild(labelEmail);
form.appendChild(inputEmail);
form.appendChild(spanEmail);
form.appendChild(labelCountry);
form.appendChild(selectCountry);
form.appendChild(spanCountry);
form.appendChild(labelZip);
form.appendChild(inputZip);
form.appendChild(spanZip);
form.appendChild(labelPass);
form.appendChild(inputPass);
form.appendChild(spanPass);
form.appendChild(labelPassConf);
form.appendChild(inputPassConf);
form.appendChild(spanPassConf);
form.appendChild(button);
body.appendChild(form);

// validity

function checkEmail() {
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const emailValid =
    inputEmail.value.length === 0 || emailRegExp.test(inputEmail.value);
  if (!emailValid) {
    inputEmail.className = "invalid";
    spanEmail.className = "error-active";
    spanEmail.textContent = "Please enter a valid email address.";
  } else {
    inputEmail.className = "valid";
    spanEmail.className = "error-inactive";
    spanEmail.textContent = "";
  }
}

function checkCountry() {
  if (selectCountry.value === "choose") {
    selectCountry.className = "invalid";
    spanCountry.className = "error-active";
    spanCountry.textContent = "This field is required.";
  } else {
    selectCountry.className = "valid";
    spanCountry.className = "error-inactive";
    spanCountry.textContent = "";
  }
}

function checkZipcode() {
  const zipValid = inputZip.value.length;

  const zipPatterns = {
    choose: ["", ""],
    pl: [
      "^\\d{2}-\\d{3}$",
      "Poland's zipcodes must follow this pattern: 2 digits, followed by a hyphen (-), followed by 3 digits, e.g. 12-345.",
    ],
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland's zipcodes must follow this pattern: optional 'CH-' and 4 digits, e.g. CH-1234 or 1234.",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France's zipcodes must follow this pattern: optional 'FR-', followed by 5 digits, e.g. FR-12345 or 12345.",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland's zipcodes must follow this pattern: 4 digits followed by 2 letters except SA, SD and SS.",
    ],
  };

  const countryCurrent = selectCountry.value;

  const zipTest = new RegExp(zipPatterns[countryCurrent][0], "");

  if (!zipValid) {
    inputZip.className = "invalid";
    spanZip.textContent = "This field is required";
    spanZip.className = "error-active";
  } else {
    if (zipTest.test(inputZip.value)) {
      inputZip.className = "valid";
      spanZip.textContent = "";
      spanZip.className = "error-inactive";
    } else {
      inputZip.className = "invalid";
      spanZip.textContent = zipPatterns[countryCurrent][1];
      spanZip.className = "error-active";
    }
  }
}

function checkPassword() {
  const passRegExp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[\\d])[A-Za-z\\d]{8,}$";
  const passTip =
    "The password must be 8 or more characters and contain at least one uppercase letter, one lowercase letter and one digit.";
  const passValid = inputPass.value.length;
  const passConfValid = inputPassConf.value.length;
  const passTest = new RegExp(passRegExp, "");

  if (inputPass.value !== inputPassConf.value) {
    inputPass.className = "invalid";
    inputPassConf.className = "invalid";
    spanPass.textContent = "Passwords do not match.";
    spanPassConf.textContent = "Passwords do not match.";
    spanPass.className = "error-active";
    spanPassConf.className = "error-active";
  } else if (!passValid) {
    inputPass.className = "invalid";
    spanPass.textContent = "This field is required";
    spanPass.className = "error-active";
  } else if (!passConfValid) {
    inputPassConf.className = "invalid";
    spanPassConf.textContent = "This field is required";
    spanPassConf.className = "error-active";
  } else {
    if (passTest.test(inputPass.value)) {
      inputPass.className = "valid";
      spanPass.textContent = "";
      spanPass.className = "error-inactive";
    } else {
      inputPass.className = "invalid";
      spanPass.textContent = passTip;
      spanPass.className = "error-active";
    }
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkEmail();
  checkCountry();
  checkZipcode();
  checkPassword();
});

// check on moving away from the focused field
inputEmail.addEventListener("blur", checkEmail);
selectCountry.addEventListener("blur", checkCountry);
inputZip.addEventListener("blur", checkZipcode);
inputPass.addEventListener("blur", checkPassword);
