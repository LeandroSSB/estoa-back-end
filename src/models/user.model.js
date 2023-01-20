import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("name is a required field"),
  email: yup.string().required("email is a required field"),
  password: yup.string().required("password is a requred field"),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
  type: yup.boolean().required("type is a required field"),
  phoneNumber: yup.string().required("phoneNumber is a required field"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email invalid").required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});

export const userSchemaOpcional = yup.object().shape({
  name: yup.string().nullable(),
  email: yup.string().email().nullable(),
  password: yup.string().nullable(),
  confirmPassword: yup.string().nullable().oneOf([yup.ref('password'), null], 'Passwords must match'),
  type: yup.boolean().nullable(),
  phoneNumber: yup.string().nullable()
});