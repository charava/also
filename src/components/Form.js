import React from 'react';
import { Formik, Field, Form, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
// import api from 'src/api/axios.js';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
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
const MyDateInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input type="date" className="date-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};



const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};




class SignupForm extends React.Component {
  constructor() {
    super();
    this.state={
        prevUsers: [],
        submit: ''
    }
  }

  componentDidMount() {
 

    axios
      // .get('http://127.0.0.1:27017/users')
      .get('http://localhost:8082/users') // add a conditional that tells you if its local or production
      .then(res => {
        let userInfo = res.data.map((data) => [data._id,data.firstName, data.lastName,data.email,data.phone]);
        this.setState({
            prevUsers: userInfo,
          })
      })
      .catch(err =>{
        console.log('Error from fetching database');
        this.setState({
          submit: '',
        })
      })
    };



    alreadyEmail = (email) => {
        let emailList = this.state.prevUsers.map((data) => data[3]);
        if (emailList.includes(email)) {
            return true;
        } else {
            return false;
        }
    }

    alreadyPhone = (phone) => {
        let phoneList = this.state.prevUsers.map((data) => data[4]);
        if (phoneList.includes(phone)) {
            return true;
        } else {
            return false;
        }
    }


 
  render() {
    return (
      <div class='container'>
        <h2>Finally have a friend to talk to who "just gets it."</h2>
        <p>We match youth ages 14-18 with a buddy in their community who shares a first-hand experience of the challenges they face at home. Our algorithm identifies buddy-pairs based on their specific experience of loss or adversity (ex: parental divorce, chronic illness, financial hardship, single-parent household, etc), identity (age, gender, etc), interests, and location. For more information, visit our <Link class='formLink' to='/faqs'>FAQs</Link>.</p>
        <p class='smallwarning'>Please note that you can only submit the form once.</p>
   
        
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            age: '',
            birthdate: '',
            gender: '',
            city: '',    
            topExperience: '',
            explanation: '',
            durationExperienced: '',
            minAge: '',
            maxAge: '',
            genderPref: [],
            additionalPref: '',
            acceptedTerms: false, // added for our checkbox
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            lastName: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            pronouns: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            phone: Yup.string()
              .max(10, 'Must be 10 digits')
              .min(10, 'Must be 10 digits')
              .required('Required'),
            age: Yup.number()
              .typeError("Age must be a number")
              // .min(14, "Age must be at least 14")
              // .max(18, "Age must be 14-18")
              .required("Required"),
            birthdate: Yup.date()
                // .max(
                //   new Date(new Date().setFullYear(new Date().getFullYear() - 14)),
                //   'Age must be at least 14'  
                // ) // Set the minimum date to 18 years in the past
                // .min(new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
                //   'Age must be 14-18'  
                // ) // Set the minimum date to 18 years in the past
                .required('Please enter a birthdate'),
            gender: Yup.string()
              .oneOf(
                ['female','male','nonbinary','other-gender'], 
                'Please select an option'
              )
              .required('Required'),
            city: Yup.string()
              .oneOf(
                ['atherton', 'belmont', 'brisbane', 'burlingame', 'colma', 'daly-city', 'foster-city', 'half-moon-bay', 'hillsborough', 'menlo-park', 'millbrae', 'pacifica', 'palo-alto', 'portola-valley', 'redwood-city', 'san-bruno', 'san-carlos', 'san-francisco', 'san-mateo', 'south-san-francisco', 'woodside', 'other'], 
                'Please select an option'
              )
              .required('Required'),
            topExperience: Yup.string()
              .oneOf(
                ['anxiety', 'depression', 'ocd', 'schizophrenia', 'anorexia', 'bulimia', 'adhd', 'bipolar', 'surviveSuicide', 'lostSuicide', 'bullied', 'physAssault', 'domAbuse'], 
                'Please select an option'
              ),
            durationExperienced: Yup.string()
              .oneOf(
                ['fewdays','fewweeks','fewmonths','oneyear','twoyears','threeplusyears','wholelife'],
                'Please select an option'
              ),
            minAge: Yup.number()
              .min(14, "Minimum must be between 14-18")
              .max(18, "Minimum must be between 14-18")
              .required("Age is required"),
            maxAge: Yup.number()
              .min(14, "Maximum must be between 14-18")
              .max(18, "Maximum must be between 14-18")
              .required("Age is required"),
  
            acceptedTerms: Yup.boolean()
              .required('Required')
              .oneOf([true], 'You must accept the terms and conditions.'),
            checked: Yup.array() // not working
              .of(Yup.string())
              .max(3, 'You can only choose up to 3 options')
              
                
           
          })}
  
          onSubmit={(values, { resetForm }) => {
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 400);
            
  
            if (values.age > 18) {
           
              this.setState({submit: 'Your submission will not be recieved; only youth ages 14-18 are allowed to be matched.'})
              
            } else if  (values.age < 14) {
            
              this.setState({submit: 'Your submission will not be recieved; only youth ages 14-18 are allowed to be matched.'})

  
            } else if (this.alreadyEmail(values.email)) {
              
                this.setState({submit: 'Your submission will not be recieved, becuase someone with you email has already submitted to this form. If this is not you, please email charcharrosario@gmail for support.'})


            } else if (this.alreadyPhone(values.phone)) {
               
                this.setState({submit: 'Your submission will not be recieved, becuase someone with your phone already submitted to this form. If this is not you, please email charcharrosario@gmail.com for support.'})
            

            } else {
              resetForm()
            
  
              let genderPref = values.genderPref;

              if (genderPref.includes('noPref')) {
                genderPref = ['noPref']
              }

  
              const data = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                age: values.age,
                gender: values.gender,
                pronouns: values.pronouns,
                birthdate: values.birthdate,
                city: values.city,
                topExperience: values.topExperience,
                explanation: values.explanation,
                durationExperienced: values.durationExperienced,
                minAge: values.minAge,
                maxAge: values.maxAge,
                genderPref: genderPref,
                additionalPref: values.additionalPref,
                acceptedTerms: values.acceptedTerms,
                matched: false,
                time: Date().toLocaleString()
              }

          
  
              // emailjs.send('service_kp2l21l', 'template_hwroh8j', data, 'wQwbGwM4OG2rj7J3g')
              // .then((res) => {
              //     // console.log('SUCCESS!', res.status, res.text);
              //     this.setState({submit: 'Thanks for submitting! Have a question about what\'s next? Check out our FAQs.'})

              // }, (error) => {
              //     // console.log(error.text);
              //     this.setState({submit: 'Sorry, our server ran into an issue, and your submission was not received. Please try again.'})

              // });


              axios
              .post('http://localhost:8082/add-user', data)
              .then(res => {
                // console.log('Added new user!')
                
                this.setState({submit: 'Thanks for submitting! Have a question about what\'s next? Check out our FAQs.'})
              })
              .catch(err => {
                
                this.setState({submit: 'Sorry, our server ran into an issue, and your submission was not received. Please try again.'})
                // console.log("Error in adding new post-it!");
                // console.error(err);
              })
            }
        
          }}
        >
    
          <Form>
            
            <MyTextInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Jane"
            />
  
            <MyTextInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Doe"
            />
  
            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@email.com"
            />
            <MyTextInput
              label="Phone Number"
              name="phone"
              type="text"
              placeholder="1234562577"
            />
            <MyTextInput
              label="Age"
              name="age"
              type="number"
              placeholder="18"
            />
            <MyDateInput
              label="Date of Birth"
              name="birthdate"
              type="date"
            />
            
            <MyTextInput
              label="Pronouns"
              name="pronouns"
              type="text"
              placeholder="She/Her/Hers"
            />

            <MySelect label="Gender" name="gender">
              <option value="">Select your gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="nonbinary">Nonbinary</option>
              <option value="other-gender">Other</option>
            </MySelect>

            
  
            <MySelect label="City" name="city">
              <option value="">Select your city</option>
              <option value="atherton">Atherton</option>
              <option value="belmont">Belmont</option>
              <option value="brisbane">Brisbane</option>
              <option value="burlingame">Burlingame</option>
              <option value="colma">Colma</option>
              <option value="daly-city">Daly City</option>
              <option value="foster-city">Foster City</option>
              <option value="half-moon-bay">Half Moon Bay</option>
              <option value="hillsborough">Hillsborough</option>
              <option value="menlo-park">Menlo Park</option>
              <option value="millbrae">Millbrae</option>
              <option value="pacifica">Pacifica</option>
              <option value="palo-alto">Palo Alto</option>
              <option value="portola-valley">Portola Valley</option>
              <option value="redwood-city">Redwood City</option>
              <option value="san-bruno">San Bruno</option>
              <option value="san-carlos">San Carlos</option>
              <option value="san-francisco">San Francisco</option>
              <option value="san-mateo">San Mateo</option>
              <option value="south-san-francisco">South San Francisco</option>
              <option value="woodside">Woodside</option>
              <option value="other-location">Other</option>
            </MySelect>
            <p class='request-other-link'>Not seeing your city? Let us know to add your city to the list <Link class='formLink' to='/contact'>here</Link>.</p>

  
            <MyTextArea
                label="Please describe your experience of loss or adversity here: "
                name="explanation"
                type="text"
            />

            {/* <MySelect label="I'd like my buddy to ALSO know what it's like to... (Choose one)" name="topExperience">
              <option value="">Select one experience</option>
              <option value="anxiety">have anxiety</option>
              <option value="depression">have depression</option>
              <option value="ocd">have OCD</option>
              <option value="schizophrenia">have schizophrenia</option>
              <option value="anorexia">have anorexia</option>
              <option value="bulimia">have bulimia</option>
              <option value="adhd">have ADHD</option>
              <option value="bipolar">have Bipolar Disorder</option>
              <option value="surviveSuicide">survive suicide</option>
              <option value="lostSuicide">lose a family member to suicide</option>
              <option value="bullied">experience bullying</option>
              <option value="physAssault">experience physical assault</option>
              <option value="domAbuse"> experience domestic abuse</option>
            </MySelect>
            <p class='request-other-link'>Not seeing an option that fits you? Let us know to add it to the list <Link class='formLink' to='/contact'>here</Link>.</p> */}

            <MySelect label="How long has this experience been impacting your life?" name="durationExperienced">
              <option value="">Select a time</option>
              <option value="fewdays">A few days</option>
              <option value="fewweeks">A few weeks</option>
              <option value="fewmonths">A few months</option>
              <option value="oneyear">1 year</option>
              <option value="twoyears">2 years</option>
              <option value="threeplusyears">3+ years</option>
              <option value="wholelife">My whole life</option>
            </MySelect>
  
  
            
  
            <MyTextInput
              label="I'd like the minimum age of my buddy to be..."
              name="minAge"
              type="number"
              placeholder="14"
            />
            <MyTextInput
              label="I'd like the maximum age of my buddy to be..."
              name="maxAge"
              type="number"
              placeholder="18"
            />
  
       
  
            <div id="checkbox-group"><h6>Gender preferences</h6></div>
            <div role="group" aria-labelledby="checkbox-group">
              <label>
                <Field type="checkbox" name="genderPref" value="female" />
                Female
              </label>
              <label>
                <Field type="checkbox" name="genderPref" value="male" />
                Male
              </label>
              <label>
                <Field type="checkbox" name="genderPref" value="nonbinary" />
                Nonbinary
              </label>
              <label>
                <Field type="checkbox" name="genderPref" value="noPref" />
                No preference
              </label>
            </div>
  
           
            <MyTextArea
              label="Optional: Anything else that we should take into consideration?"
              name="additionalPref"
              type="text"
            />
            
            <MyCheckbox name="acceptedTerms">
              I accept the <Link class='bottomLink' to='/terms'>terms and conditions</Link>.
            </MyCheckbox>
  
            <button type="submit" >Submit</button>
            <h6>{this.state.submit}</h6>
          </Form>
  
        </Formik>
      </div>
    );
          }

  
};



 export default SignupForm;