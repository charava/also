import React from 'react';
import "./styles.css";
import { Link } from 'react-router-dom';

/*
TODO:

// add a backup experience
- enable ppl to update their response
- fix the 404 errors on vercel
- create backend algorithm 

- add question of "write message to future buddy"
- 1 through 10, how much does it impact your life?

- add better description of project on site 
-  add a note to say, hey, please don't lie about your age here.


- refer to HTML bootstrap site i made
- center mainbody div content 
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
        <h1>You deserve a friend who can understand what you're going through.</h1>
        {/* buddy matching for youth mental health */}
        <h3>Fill out our short form.  Find a local buddy.  It's that easy.</h3>
        <p class='smallBio'>ALSO is the first-ever peer-support platform that helps youth with mental health challenges or trauma find buddies in their communtiy with similar experiences. </p>
        <Link to="/form"><button class='buddy-button'>Find your buddy</button></Link>

    </div>
    );
 }
}





 export default App;