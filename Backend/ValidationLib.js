// Show input error message

/**
 * Beschreibung
 * @param id: Identifikation des eingegebenen Datenelement
 * @param message: Fehlermeldung
 * @returns {string}
 */
function showError(id, message) {
    return `${id}: ${message}`;
}

// Show success outline
function showSuccess(id) {
    return `${id} successfully validated!`;
}

// Check email is valid
function checkEmail(id,input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Email is not valid')
        }
    }
    return result;
}

//TODO: Check article for throwing errors in node js
// https://stackoverflow.com/questions/33086247/throwing-an-error-in-node-js

// Check required fields
function checkRequired(id, input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    //if input is empty ...
    if (input.trim() === '') {
        //.. then it's not valid
        result = {
            isNotValid: true,
            msg: showError(id, `${input.toString()} is required`)
        }
    }
    //return validation result
    return result;
}

// Check input length
function checkLength(id, input, min, max) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    if (input.length < min) {
        result = {
            isNotValid: true,
            msg: showError(id,
            `${id} must be at least ${min} characters`)
        }
    } else if (input.length > max) {
        result = {
            isNotValid: true,
            msg: showError(id,
                `${id} must be less than ${max} characters`)
        }
    }
    return result;
}


// geburtstag überprüfen
function checkgeburtstag (datum) {
    //(Schritt 1) Fehlerbehandlung
    if (!datum) return false;
    datum = datum.toString();
    //(Schritt 2) Aufspaltung des Datums
    datum = datum.split('-');
    if (datum.length != 3) return false;

    //(Schritt 3) Entfernung der fuehrenden Nullen und Anpassung des Monats
    datum[2] = parseInt(datum[2], 10);
    datum[1] = parseInt(datum[1], 10);

    //(Schritt 4) Behandlung Jahr nur zweistellig
    if (datum[0].length == 2) datum[0] = '20' + datum[0];

    //(Schritt 5) Alter prüfen
    var day = datum[2];
    var month = datum[1];
    var year = datum[0];
    var age = 18;
    var mydate = new Date();
    mydate.setFullYear(year, month-1, day)
    var currdate = new Date();
    currdate.setFullYear(currdate.getFullYear() - age)
    return (currdate - mydate < 0 ? false : true);
}
// Ende



function checkphone(id, input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{2})?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!re.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Mobile is not valid')
        }
    }
    return result;
}



/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT beackets!
 */
module.exports = {
    checkEmail,
    checkLength,
    checkRequired,
    checkphone,
    checkgeburtstag,
}
