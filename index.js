/*
WORK FLOW
=========

1. Page loads the JS file
2. User enters/does not enter anything in the input field
3. User submits the form by clicking the button
4. handleFormSubmission is invoked
    1. It validates input
    2. if the input is invalid - error messsages/error border are shown
    3. after HIDE_MSG_DURATION miliseconds - the error message is hidden as well as the border color is removed
    4. On success - an alert message is displayed
    5. When user closes alert message - show the home page with clean data
 */
// Constants
const HIDE_MSG_DURATION = 3000;

// DOM elements
const form = document.querySelector("form");
const input = form.querySelector("input");
const errorEl = form.querySelector("small");
const successEl = document.querySelector("dialog");
const closeModalBtn = successEl.querySelector("button");

// callbacks and functions
function handleFormSubmission(e) {
  // prevent the default form submission behavior of sending data to action URL
  try {
    e.preventDefault();

    // validate the input fields
    // if input fields are invalid - show error
    const typedValue = input.value;
    validateEmail(typedValue);

    // valid form - show dialog
    successEl?.show();
    // clear the input text - value
    input.value = "";
  } catch (error) {
    // default message set
    toggleFormError(true, error?.message);

    const t = setTimeout(() => toggleFormError(false), HIDE_MSG_DURATION);
    return () => clearTimeout(t);
  }
}

/**
 * Validates email string -
 * If empty or blank string is passed - fn throws Error
 * If invalid email is passed - fn throws Error
 *
 * PS: function throws error which needs to be caught by the callee funciton
 * @param email string
 */
function validateEmail(email = "") {
  email = email.trim();

  // check if email is empty
  if (email.length === 0) {
    throw new Error("Whoops! It looks like you forgot to add your email");
  }

  // check email is in valid format - name@host.tld
  //   user names can only contain English letters, digits and special characters - period, hyphen, underscore, plus
  const emailCheckerRegex =
    /^[a-z0-9\-\+\_\.]{1,64}@[a-z]+\.[a-z]{2,8}[\.a-z]*$/i;
  const isValidEmail = emailCheckerRegex.test(email);

  //   throw invalid email error
  if (!isValidEmail) {
    throw new Error("Please provide a valid email address");
  }
}

function toggleFormError(show = true, msg = "") {
  const ERROR_CLS = "invalid-input";
  // show error
  if (show) {
    errorEl.textContent = msg || "Something went wrong";
    !input.classList.contains(ERROR_CLS) && input.classList.add(ERROR_CLS);
    return;
  }
  // hide error
  errorEl.textContent = "";
  input.classList.remove(ERROR_CLS);
}

// using the ? operator to make sure the event listener is added to a valid HTML form
form?.addEventListener("submit", handleFormSubmission);
closeModalBtn?.addEventListener("click", () => {
  successEl.close();
});
