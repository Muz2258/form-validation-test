"use strict";

// Base URL for API
const base = "http://localhost:3000";

// Create account input fields
const inputFname = document.querySelector("#fname");
const inputLname = document.querySelector("#lname");
const inputEmail = document.querySelector("#email");
const inputPass = document.querySelector("#password");
const inputPassConfirm = document.querySelector("#pass-confirm");
const strgthMeter = document.querySelector(".strength-meter");

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
let lgthScore = 0;
let numScore = 0;
let capScore = 0;
let spCharScore = 0;
let passStrgthScore;
let passStrgth;

// Generate hint for input fields
const generateHint = function (mssg) {
	return `<p class="input__error">${mssg}</p>`;
};

/* Event listeners */

// Validate email entry
inputEmail.addEventListener("blur", function (e) {
	const input = e.target;

	if (input.value) {
		const emailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

		if (!emailRegex.test(input.value)) {
			if (!input.nextElementSibling) {
				input.insertAdjacentHTML("afterend", generateHint(errMssgs[1]));
			} else {
				input.nextElementSibling.textContent = errMssgs[1];
			}
		} else {
			if (input.nextElementSibling) input.nextElementSibling.remove();
		}
	}
});

// Validate password entry
inputPass.addEventListener("input", function (e) {
	const inputVal = e.target.value;

	if (inputVal.length >= 8) {
		if (lgthScore === 0) {
			lgthScore += 25;
		}
	} else {
		lgthScore = 0;
	}

	if (/[A-Z]/.test(inputVal)) {
		if (capScore === 0) {
			capScore += 15;
		}
	} else {
		capScore = 0;
	}

	if (/[0-9]/.test(inputVal)) {
		if (numScore === 0) {
			numScore += 15;
		}
	} else {
		numScore = 0;
	}

	if (/[!@#\$%\^&*()~`<>?|\\{}\[\]]/.test(inputVal)) {
		if (spCharScore === 0) {
			spCharScore += 45;
		}
	} else {
		spCharScore = 0;
	}

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
});

// Check password match
inputPassConfirm.addEventListener("blur", function (e) {
	const input = e.target;

	if (inputPass.value && input.value) {
		if (input.value !== inputPass.value) {
			if (!input.nextElementSibling) {
				input.insertAdjacentHTML("afterend", generateHint(errMssgs[2]));
			} else {
				input.nextElementSibling.textContent = errMssgs[2];
			}
		} else if (input.nextElementSibling) input.nextElementSibling.remove();
	}
});

// Submit registeration form
btnRegister.addEventListener("click", function (e) {
	e.preventDefault();

	// Validate form fields
	inputsRegister.forEach((input) => {
		if (input.value) {
			if (input.nextElementSibling) {
				input.nextElementSibling.remove();
			}
		} else {
			if (
				!input.nextElementSibling ||
				input.nextElementSibling.className !== "input__error"
			) {
				input.insertAdjacentHTML("afterend", generateHint(errMssgs[0]));
			}
		}
	});
});
