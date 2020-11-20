import { FormikErrors } from "formik";
import React from "react";

interface Props {
  errors: FormikErrors<{
    name: string;
    email: string;
    message: string;
  }>;
}

const FormErrors: React.FC<Props> = ({ errors }: Props) => {
  return (
    <div className="errors">
      <div className="error">{errors.name}</div>
      <div className="error">{errors.email}</div>
      <div className="error">{errors.message}</div>
    </div>
  );
};

export default FormErrors;
