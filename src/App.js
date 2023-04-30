import React from 'react';
import "./styles.css";
import { Link } from 'react-router-dom';

/*
TODO:


- add submissions through localhosted app
- make python alg more complex
- create spreadsheet for submissions
- import csv
- run in colab

- add dark mode styling to website.

- figure out baseURL axios issue  / book morgan meeting
- add a backup experience

- add more space after big button
- create backend algorithm - or connect to external python program 

- Add automated email once ppl submit sayinf ty and sit back and relax


- add a "in crisis, please call.... or use... ALSO is not intended to replace professional support. if you feel at risk or at harm."
- enable ppl to update their response

- add question of "write message to future buddy"
- 1 through 10, how much does it impact your life?

- add footer created by charlotte

- age and bday should match, find a way to use values.age to validate the birthdate in yup

GIT STUFF
rm -rf .git     
git add -A                                           
git status
git branch -m master main
git status
git commit -m "first commit"
git remote add origin git@github.com:charava/also.git
git push --set-upstream origin main


npm run build
cd build
vercel...
once deployed, make immediate changes
vercel --prod


https://codesandbox.io/s/formik-v2-tutorial-final-ge1pt
https://formik.org/docs/examples/checkboxes
https://dashboard.emailjs.com/admin/templates/xl5c6us


*/ 


class App extends React.Component {
  constructor() {
    super();
    this.state={
      submit: ''
    }
  }
 
  render() {
    return (
      <div class='mainBody'>
        {/* <h1>Looking for a friend to talk to who shares a similar challenge or experience?</h1> */}
        {/* <h1>Looking for a friend to talk to who shares a similar mental health challenge or experience?</h1> */}
        <h1>Feel like no one at school understands what you're dealing with at home? Looking for a friend with a relatable experience of loss or adversity?</h1>


        {/* <h1>Looking for a friend to talk to who can understand what you're going through?</h1> */}
        {/* <h3>We match youth with buddies who share similar mental health challenges or trauma.</h3> */}

        {/* <h1>You deserve a friend who can understand what you're going through.</h1> */}
        {/* buddy matching for youth mental health */}
        <h3>Fill out our short form.  Find a local buddy.  It's that easy.</h3>
        <p class='smallBio'>ALSO is the first peer support platform that intelligently matches youth with local buddies who share relatable experiences of loss or adversity in their families. </p>

        {/* <p class='smallBio'>ALSO is the first-ever peer-support platform that helps youth with mental health challenges or trauma find buddies in their communtiy with similar experiences. </p> */}
        <Link to="/form"><button class='buddy-button'>Find your buddy</button></Link>

    </div>
    );
 }
}





 export default App;