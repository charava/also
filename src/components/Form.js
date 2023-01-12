import React from 'react';
import { Formik, Field, Form, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
      .get('http://localhost:8082/users')
      .then(res => {
        let userInfo = res.data.map((data) => [data._id,data.firstName, data.lastName,data.email,data.phone]);
        this.setState({
            prevUsers: userInfo
          })
      })
      .catch(err =>{
        console.log('Error from fetching database');
      })
    };

    alreadyEmail = (email) => {
        console.log(this.state.prevUsers)
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
        <h3>Find a buddy in your community who shares a similar mental health or trauma experience</h3>
        <p>We help youth ages 14-18 find someone in their community to talk to who shares a first-hand understanding of their mental health challenge or trauma. Our algorithm matches people based on the similar situations, identities (age, gender, etc), interests, and location. For more information, visit our <a href='/faqs'>FAQs</a>.</p>
        <p class='smallwarning'>Please note, you can only submit the form once.</p>
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
            // otherMentalHealth: '',
            
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
  
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 400);
            // resetForm();
            
  
            if (values.age > 18) {
              setTimeout(() => {
                alert(JSON.stringify('Sorry, only youth ages 14-18 are allowed to be matched.', null, 2));
                setSubmitting(false);
              }, 400);

              this.setState({submit: 'Your submission will not be recieved; only youth ages 14-18 are allowed to be matched.'})
              
            } else if  (values.age < 14) {
              setTimeout(() => {
                alert(JSON.stringify('Sorry, we only allow youth over the age of 14 to be matched.', null, 2));
                setSubmitting(false);
              }, 400);
              this.setState({submit: 'Your submission will not be recieved; only youth ages 14-18 are allowed to be matched.'})

  
            } else if (this.alreadyEmail(values.email)) {
            setTimeout(() => {
                alert(JSON.stringify('Someone with you email has already submitted to this form. If this is not you, please email charcharrosario@gmail for support.', null, 2));
                setSubmitting(false);
                }, 400);
            this.setState({submit: 'Someone with you email has already submitted to this form. If this is not you, please email charcharrosario@gmail for support.'})


            } else if (this.alreadyPhone(values.phone)) {
                setTimeout(() => {
                    alert(JSON.stringify('Someone with your phone has already submitted to this form. If this is not you, please email charcharrosario@gmail.com for support.', null, 2));
                    setSubmitting(false);
                    }, 400);
                this.setState({submit: 'Someone with your phone already submitted to this form. If this is not you, please email charcharrosario@gmail.com for support.'})
            

            } else {
              setTimeout(() => {
                alert(JSON.stringify('Thanks for submitting! Look out for an email over the next two months to see if you\'ve been matched.', null, 2));
                setSubmitting(false);
              }, 400);
              this.setState({submit: 'Thanks for submitting! Have a question about what\'s next? Check out our FAQs.'})

              const genderPref = values.genderPref
              if (values.genderPref.includes('noPref')) {
                genderPref = ['noPref']
              }
  
            //   const experiences = values.experiences 
            //   if (values.otherMentalHealth != '') {
            //     experiences.push(values.otherMentalHealth)
            //   }


  
              const data = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                age: values.age,
                birthdate: values.birthdate,
                city: values.city,
                topExperience: values.topExperience,
                // otherMentalHealth: values.otherMentalHealth,
                explanation: values.explanation,
                durationExperienced: values.durationExperienced,
                minAge: values.minAge,
                maxAge: values.maxAge,
                genderPref: genderPref,
                additionalPref: values.additionalPref,
                acceptedTerms: values.acceptedTerms
              }
              axios
              .post('http://localhost:8082/add-user', data)
              .then(res => {
                console.log('Added new user!')
                //clear out state???
              })
              .catch(err => {
                console.log("Error in adding new post-it!");
                console.error(err);
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
            <p class='request-other-link'>Not seeing your city? Let us know to add your city to the list <a href='/contact'>here</a>.</p>

  
  
            <MySelect label="I'd like my buddy to ALSO know what it's like to... (Choose one)" name="topExperience">
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
            <p class='request-other-link'>Not seeing an option that fits you? Let us know to add it to the list <a href='/contact'>here</a>.</p>

            {/* 
            <div id="checkbox-group"><h6>I'd like my buddy to <strong>ALSO</strong> know what it's like to... (Choose the experience that is most important to you)</h6></div>
            <div role="group" aria-labelledby="checkbox-group">
              <label>
                <Field type="checkbox" name="experiences" value="anxiety" />
                have anxiety
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="depression" />
                have depression
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="ocd" />
                have OCD
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="schizophrenia" />
                have schizophrenia
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="psychosis" />
                have psychosis
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="anorexia" />
                have anorexia
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="bulimia" />
                have bulimia
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="adhd" />
                have ADHD
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="bipolar" />
                have Bipolar Disorder
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="survivedSuicide" />
                survive suicide
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="lostSuicide" />
                lose a family member to suicide
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="bullied" />
                experience bullying
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="physAssault" />
                experience physical assault
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="domAbuse" />
                experience domestic abuse
              </label>
              <label>
                <Field type="checkbox" name="experiences" value="otherMentalHealth" />
                <MyTextInput
                  label="Other: "
                  name="otherMentalHealth"
                  type="text"
                />
              </label>
            </div> */}
  
          {/* // When (approximately) did you last experience the option(s) you selected above? */}
            <MySelect label="How long has the option you selected above been impacting your life?" name="durationExperienced">
              <option value="">Select a time</option>
              <option value="fewdays">A few days</option>
              <option value="fewweeks">A few weeks</option>
              <option value="fewmonths">A few months</option>
              <option value="oneyear">1 year</option>
              <option value="twoyears">2 years</option>
              <option value="threeplusyears">3+ years</option>
              <option value="wholelife">My whole life</option>
            </MySelect>
  
  
            <MyTextArea
                label="Please elaborate on your situtation here: "
                name="explanation"
                type="text"
            />
  
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
              placeholder="17"
            />
  
            {/* <div class="local-question">
              <h6>Want your buddy to be local?</h6>
              <MyRadioBox name="localY">
                Yes
              </MyRadioBox>
              <MyRadioBox name="localN">
                No
              </MyRadioBox>
              <MyRadioBox name="localNoPref">
                No preference
              </MyRadioBox>
            </div> */}
  
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
  
            {/* <div class="gender-question">
              <h6>Gender preferences</h6>
              <MyCheckbox name="genderPrefFemale">
                Female
              </MyCheckbox>
              <MyCheckbox name="genderPrefMale">
                Male
              </MyCheckbox>
              <MyCheckbox name="genderPrefNonbinary">
                Nonbinary
              </MyCheckbox>
              <MyCheckbox name="genderNoPref">
                No preference
              </MyCheckbox>
            </div> */}
  
            <MyTextArea
              label="Optional: Anything else that we should take into consideration?"
              name="additionalPref"
              type="text"
            />
            
            <MyCheckbox name="acceptedTerms">
              I accept the <a id='bottomTerms' href="/terms">terms and conditions</a>.
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