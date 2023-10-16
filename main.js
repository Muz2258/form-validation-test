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
let lgthScore = 0;
let numScore = 0;
let capScore = 0;
let spCharScore = 0;
let passStrgthScore;
let passStrgth;
let strgthMeter;

// Generate hint for input fields
const generateHint = function (mssg) {
	return `<p class="input__error">${mssg}</p>`;
};

const strgthMeterHtml = `
	<div class="strength-meter very-weak">
		<div class="level" id="lvl-1"></div>
		<div class="level" id="lvl-2"></div>
		<div class="level" id="lvl-3"></div>
		<div class="level" id="lvl-4"></div>
		<div class="level" id="lvl-5"></div>
		<p class="desc"></p>
	</div>
`;

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

// Password field event listeners
// On focus
inputPass.addEventListener("focus", function (e) {
	const input = e.target;

	if (!input.nextElementSibling) {
		input.insertAdjacentHTML("afterend", strgthMeterHtml);
	} else if (input.nextElementSibling.className === "input__error") {
		input.nextElementSibling.remove();
		input.insertAdjacentHTML("afterend", strgthMeterHtml);
	}

	strgthMeter = document.querySelector(".strength-meter");
});

// On blur
inputPass.addEventListener("blur", function (e) {
	const input = e.target;

	if (input.nextElementSibling.classList[0] === "strength-meter") {
		input.nextElementSibling.remove();
	}
});

// On input
inputPass.addEventListener("input", function (e) {
	const inputVal = e.target.value;

	// Check password length
	if (inputVal.length >= 8) {
		if (lgthScore === 0) {
			lgthScore += 25;
		}
	} else {
		lgthScore = 0;
	}

	// Check for capital letters
	if (/[A-Z]/.test(inputVal)) {
		if (capScore === 0) {
			capScore += 15;
		}
	} else {
		capScore = 0;
	}

	// Check for numbers
	if (/[0-9]/.test(inputVal)) {
		if (numScore === 0) {
			numScore += 15;
		}
	} else {
		numScore = 0;
	}

	// Check for special characters
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

// Confirm password event listeners
// On blur
inputPassConfirm.addEventListener("blur", function (e) {
	const input = e.target;

	// Check for password match
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

// Button event listener
// On click
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
