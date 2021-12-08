/**
 * validate password
 * @returns {boolean}
 * @constructor
 */
function ValidatePassword() {
    const myForm = document.getElementById('myForm');
    const password = myForm.elements['password'].value;
    const confirm_password = myForm.elements['confirm_password'].value;

    if (password !== confirm_password) {
        alert('Please make sure passwords match.');
        return false;
    } else {
        return true;
    }
};
