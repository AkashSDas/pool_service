import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import * as yup from "yup";
import FormErrors from "./form_errors";

const initialFormValues = {
  name: "",
  email: "",
  message: "",
};

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().required(),
});

const ContactUs: React.FC = () => {
  const [displayEmailSuccess, setDisplayEmailSuccess] = useState(false);
  const [displayEmailError, setDisplayEmailError] = useState(false);
  const [btnText, setBtnText] = useState("🐋 Send");

  const sweetAlertJsx = () => (
    <>
      <SweetAlert
        success
        show={displayEmailSuccess}
        title="Pool Service"
        onConfirm={() => setDisplayEmailSuccess(false)}
      >
        Email successfully sent
      </SweetAlert>

      <SweetAlert
        error
        show={displayEmailError}
        title="Pool Service"
        onConfirm={() => setDisplayEmailError(false)}
      >
        Email was not sent, Please try again
      </SweetAlert>
    </>
  );

  return (
    <section className="contact-us">
      <h1>Contact Us</h1>

      <div style={{ textAlign: "center" }} className="info">
        999-888-7777 (emergency calls)
        <br />
        999-888-7777 (for text)
      </div>

      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          setBtnText("🐋 Sending...");

          fetch("http://localhost:3000/api/send-email", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              message: data.message,
            }),
          })
            .then(async (response) => {
              let data = await response.json();
              if (data.success) {
                setDisplayEmailSuccess(true);
              } else {
                setDisplayEmailError(true);
              }
              return null;
            })
            .catch((err) => {
              setDisplayEmailError(true);
            })
            .then((_) => setBtnText("🐋 Send"));

          setSubmitting(false); // once the async call is done
          resetForm();
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            {(values.email || values.message || values.name) && errors ? (
              <FormErrors errors={errors} />
            ) : null}

            {sweetAlertJsx()}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                value={values.name}
                type="text"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                value={values.email}
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <Field
                name="message"
                value={values.message}
                type="text"
                placeholder="Enter your message"
              />
            </div>

            <div className="form-group">
              <button
                className="email-submit-btn"
                type="submit"
                disabled={isSubmitting}
              >
                {btnText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ContactUs;
