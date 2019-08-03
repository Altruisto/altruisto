import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import colors from "../../../assets/scss/colors.scss";
import { Loader } from "../../ui/Loader";
import { useAuthContext } from "../../../common/auth";
import { useSnackbar } from "notistack";

export const ChangeEmail = () => {
  const auth = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div className="settings__option settings__option--vertical">
      <span className="settings__label">Change email</span>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: auth.user && auth.user.email ? auth.user.email : ""
        }}
        onSubmit={(values, actions) => {
          enqueueSnackbar("Your settings have been updated", {
            variant: "success"
          });
          actions.setSubmitting(false);
        }}
        validate={values => {
          let errors: {
            email?: string;
          } = {};
          if (!values.email) {
            errors.email = "This field is required";
          }
          const regexp = /\S+@\S+\.\S+/;
          if (!regexp.test(String(values.email).toLowerCase())) {
            errors.email = "Provided email address is not valid";
          }
          return errors;
        }}
        render={({ errors, values, isSubmitting }) => (
          <Form noValidate>
            <div className="field">
              <div className="field__appendix">
                <button
                  className="button-link field__inside-button"
                  disabled={Boolean(
                    (auth.user && auth.user.email === values.email) ||
                      errors.email
                  )}
                  type="submit"
                >
                  {isSubmitting ? (
                    <Loader
                      color={colors.primary}
                      size={12}
                      style={{
                        marginTop: "-1px"
                      }}
                    />
                  ) : (
                    "SAVE"
                  )}
                </button>
              </div>
              <Field type="email" name="email" className="field__input" />
              <div className="field__error-message">
                <ErrorMessage name="email" component="span" />
              </div>
            </div>
          </Form>
        )}
      />
    </div>
  );
};
