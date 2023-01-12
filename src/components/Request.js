import React from 'react';
import { Formik, Field, Form, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};


class RequestContact extends React.Component {
  constructor() {
    super();
  }

  handleClick = () => {
    console.log("Button was clicked!");
  }
  

  render() {
    return(
      <div class='container'>
        <h3>Have a suggestion? Just wanna say hello? Let us know!</h3>
        <Formik
          initialValues={{
            name: '',
            email: '',
            message: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address'),
            message: Yup.string()
              .required('Required')
            
           
          })}
  
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
            resetForm();
            
  
            
            
        
          }}
        >
    
          <Form>
            
            <MyTextInput
              label="Name"
              name="name"
              type="text"
              placeholder="Jane"
            />

            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@email.com"
            />

            <MyTextArea
              label="Message"
              name="message"
              type="text"
              placeholder="I am from Los Angeles and did not see that city location listed as an option on the form."
            />

            <button type="submit" >Submit</button>
          </Form>

          </Formik>


      </div>
    );
  }
  
}

export default RequestContact;