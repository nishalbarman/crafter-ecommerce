// verify if given EMAIL address is valid or not
export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// verify if given NAME has one space between the firstname and lastname
export function hasOneSpaceBetweenNames(name) {
  const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  return nameRegex.test(name);
}

// verify if given PHONENUMBER is valid or not
export function isValidIndianMobileNumber(mobileNumber) {
  const indianMobileNumberRegex = /^(\+91-|\+91|0)?[6-9]\d{9}$/;
  return indianMobileNumberRegex.test(mobileNumber);
}
