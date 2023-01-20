import * as yup from "yup";

export const reportSchema = yup.object().shape({
  user_id: yup.number("user id must be a number").required("User id must be provided"),
  title: yup.string("title must be a string").required("Title must be provided"),
});

export const reportSchemaOpcional = yup.object().shape({
  user_id: yup.number("user id must be a number").nullable(),
  title: yup.string("title must be a string").nullable(),
});
