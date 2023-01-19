import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup.string().required("Email is a required field"),
  password: yup.string().required("Password is a requred field"),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
  type: yup.boolean().required("isAdm is a required field"),
  phonenumber: yup.string().required("Phonenumber is a required field"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});
