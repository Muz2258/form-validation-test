"use strict";

// Base URL for API
const base = "http://localhost:3000";

// Create account input fields
const inputFname = document.querySelector("#fname");
const inputLname = document.querySelector("#lname");
const inputEmail = document.querySelector("#email");
const inputPass = document.querySelector("#password");
const inputPassConfirm = document.querySelector("#pass-confirm");

// Create account button
const btnRegister = document.querySelector(".btn__register");

// Array of all create account input fields
const inputsRegister = [inputFname, inputLname, inputEmail, inputPass, inputPassConfirm];

// Array of possible error messages
const errMssgs = [
	"Hey! you missed this field",
	"Hey! the email you entered is not correct",
	"You seem not to have inputted a matching password",
];

let err;
let strgthMeter;
const validStatus = [false, false, false, false, false];

// Generate hint for input fields
const generateHint = function (mssg) {
	return `<p class="input__error">${mssg}</p>`;
};

// Validate email entry
inputEmail.addEventListener("blur", function (e) {
	const input = e.target;

	if (input.value) {
		const emailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

		if (!emailRegex.test(input.value)) {
			if (!input.nextElementSibling) {
				input.insertAdjacentHTML("afterend", generateHint(errMssgs[1]));
				validStatus[2] = false;
			} else {
				input.nextElementSibling.textContent = errMssgs[1];
				validStatus[2] = false;
			}
		} else {
			if (input.nextElementSibling) {
				input.nextElementSibling.remove();
				validStatus[2] = true;
			}
		}
	}
});

/* 
	PASSWORD INPUT INTERACTIONS 

	- Focus, blur and input event handlers for both password
	and confirm password inputs
	- Calculate and show password strength
	- Show warning hints if fields are empty
*/

// HTML template for password strength meter
const strgthMeterHtml = `
	<div class="strength-meter very-weak">
		<div class="level" id="lvl-1"></div>
		<div class="level" id="lvl-2"></div>
		<div class="level" id="lvl-3"></div>
		<div class="level" id="lvl-4"></div>
		<div class="level" id="lvl-5"></div>
	</div>
`;

// Function to calculate password strength
const calcPassStrength = function (val) {
	let lgthScore = 0;
	let numScore = 0;
	let capScore = 0;
	let spCharScore = 0;
	let passStrgthScore;

	// Check password length
	val.length >= 8 && lgthScore === 0 ? (lgthScore += 25) : (lgthScore = 0);

	// Check for capital letters
	/[A-Z]/.test(val) && capScore === 0 ? (capScore += 15) : (capScore = 0);

	// Check for numbers
	/[0-9]/.test(val) && numScore === 0 ? (numScore += 15) : (numScore = 0);

	// Check for special characters
	/[!@#\$%\^&*()~`<>?|\\{}\[\]]/.test(val) && spCharScore === 0
		? (spCharScore += 45)
		: (spCharScore = 0);

	// Calculate total password strength score
	passStrgthScore = lgthScore + numScore + capScore + spCharScore;

	// Update strength classes
	if (passStrgthScore < 15) strgthMeter.classList.replace(strgthMeter.classList[1], "very-weak");
	else if (passStrgthScore >= 15 && passStrgthScore < 30)
		strgthMeter.classList.replace(strgthMeter.classList[1], "weak");
	else if (passStrgthScore >= 30 && passStrgthScore < 55)
		strgthMeter.classList.replace(strgthMeter.classList[1], "average");
	else if (passStrgthScore >= 55 && passStrgthScore < 100)
		strgthMeter.classList.replace(strgthMeter.classList[1], "strong");
	else if (passStrgthScore === 100)
		strgthMeter.classList.replace(strgthMeter.classList[1], "very-strong");
};

// Password input: Focus event
inputPass.addEventListener("focus", function (e) {
	const input = e.target;

	if (!input.nextElementSibling) {
		input.insertAdjacentHTML("afterend", strgthMeterHtml);
	} else if (input.nextElementSibling.className === "input__error") {
		input.nextElementSibling.remove();
		input.insertAdjacentHTML("afterend", strgthMeterHtml);
	}

	strgthMeter = document.querySelector(".strength-meter");

	if (input.value) {
		calcPassStrength(input.value);
	}
});

// Password input: Input event
inputPass.addEventListener("input", function (e) {
	calcPassStrength(e.target.value);
});

// Password input: Blur event
inputPass.addEventListener("blur", function (e) {
	const input = e.target;

	if (input.nextElementSibling.classList[0] === "strength-meter") {
		input.nextElementSibling.remove();
	}

	if (input.value) {
		validStatus[3] = true;
	} else {
		validStatus[3] = false;
	}
});

// Confirm password input: Blur event
inputPassConfirm.addEventListener("blur", function (e) {
	const input = e.target;

	// Check for password match
	if (inputPass.value && input.value) {
		if (input.value !== inputPass.value) {
			validStatus[4] = false;

			if (!input.nextElementSibling) {
				input.insertAdjacentHTML("afterend", generateHint(errMssgs[2]));
			} else {
				input.nextElementSibling.textContent = errMssgs[2];
			}
		} else {
			validStatus[4] = true;

			if (input.nextElementSibling) input.nextElementSibling.remove();
		}
	} else validStatus[4] = false;
});

/* 
	SUBMITTING FORM DATA

	- Click interaction on button
	- Verify input field data is valid
	- Make post request to submit data to api
*/
// Submit button: Click event
btnRegister.addEventListener("click", function (e) {
	e.preventDefault();
});
