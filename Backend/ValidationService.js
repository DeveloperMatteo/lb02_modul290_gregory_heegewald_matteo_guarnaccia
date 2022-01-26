// Validate form input elements
const validateLib = require('./ValidationLib');

/**
 * Validate form data
 * @param data
 * @returns {boolean|{msg: string, isNotValid: boolean}|{isNotValid}|*}
 */
function validateFormData(data) {
    // checkRequired
    let result = validateLib.checkRequired("firstName", data.firstName);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("lastName", data.lastName);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("email", data.email);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("geburtstag", data.geburtstag);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("phone", data.phone);
    if (result.isNotValid) { return result; }



    //check XY

    result = validateLib.checkLength("firstName",data.firstName, 3, 50);
    if (result.isNotValid) { return result; }


    result = validateLib.checkLength("lastName", data.lastName);
    if (result.isNotValid) { return result; }

    result = validateLib.checkEmail("email", data.email);
    if (result.isNotValid) { return result; }

    result = validateLib.checkgeburtstag("geburtstag", data.geburtstag);
    if (result.isNotValid) { return result; }

    result = validateLib.checkphone("phone", data.phone);
    if (result.isNotValid) { return result; }


    return false;
}

/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT beackets!
 */
module.exports = {
    validateContact: validateFormData,
}
