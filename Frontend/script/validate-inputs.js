// read form element
let ALL_INPUT_VALID;

//reading fields from input form
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const geburtstag = document.getElementById('geburtstag');
const adress = document.getElementById('adress');
const zipcode = document.getElementById('zipcode');
const city = document.getElementById('city');
const phone = document.getElementById('phone');

/* Aufgabe: Lesen Sie folgende Input-Elemente aus:
  lastName, subject, description (textarea), phone
*/
//--Begin

//--End

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
    ALL_INPUT_VALID = false;
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
      ALL_INPUT_VALID = false;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input,
        `${getFieldName(input)} must be at least ${min} characters`
    );
    ALL_INPUT_VALID = false;
  } else if (input.value.length > max) {
    showError(input,
        `${getFieldName(input)} must be less than ${max} characters`
    );
    ALL_INPUT_VALID = false;
  } else {
    showSuccess(input);
  }
}


function checkphone (input) {
    const re = /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Phonenumber is not valid');
        ALL_INPUT_VALID = false;
    }
}


/**
 * Get fieldname
 * @param input: HTML-Element by its id
 * @returns {string}: Returns caption of the input field with first Letter in capital
 */
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

/**
 * Validate form input elements
 */
/* Aufgabe: Validieren Sie folgende Input-Elemente aus:
  lastName, subject, phone
*/
//--Begin
function validateForm(){
  if(!checkRequired([firstName, lastName, email, geburtstag, adress, zipcode, city, phone])){
    checkLength(firstName, 3, 30);
    checkLength(zipcode, 1, 4)
    checkEmail(email);
    checkphone(phone);
  }
}
//--End

/**
 * Make a testcall after the page is loaded
 */
window.onload = () => {
  console.log(`Make test call to the server ...`);
  getWelcome().then(
      result => {
        console.log(`Response from server: ${result}`);
      },
      error => {
        console.log(error)
      }
  );
};

/**
 Event listener
 */
form.addEventListener('submit', function(e) {
  ALL_INPUT_VALID = true;
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
  //Send Data
  if (ALL_INPUT_VALID){
    let formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        geburtstag: geburtstag.value,
        adress: adress.value,
        zipcode: zipcode.value,
        city: city.value,
        phone: phone.value


      }
    //--End

    console.log(`All input is valid. Send data to server: 
      ${JSON.stringify(formData)}`);

    //Variant 1
      // sendForm1(formData);

    //Variant 2
    sendForm2(formData).then(
        result => {
          console.log(`Response from server: ${result}`);
          window.location.href = './confirm.html';
        },
        error => {
          console.log(error);
        }
    );


  } else {
    console.log("At least one validation failed. No data sent to contact-server.")
  }

});
