const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) throw new Error("Enter the Name!!");

  if (!validator.isEmail(email))
    throw new Error("the email entered is not valid!!");

  if (!validator.isStrongPassword(password))
    throw new Error("entered password is not strong engouh!!");
};

const ValidateUserEditData = (req) => {
  const validFeild = [
    "firstName",
    "lastName",
    "email",
    "about",
    "photourl",
    "skills",
    "age",
    "gender"
  ];
  const isValidToEdit = Object.keys(req.body).every((key) => {
    return validFeild.includes(key);
  });
  return isValidToEdit;
};

module.exports = { validateSignupData, ValidateUserEditData };
