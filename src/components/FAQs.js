import React from 'react';
import { Link } from 'react-router-dom';

class FAQs extends React.Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div class='container'>
       
        <h1>Frequently Asked Questions</h1>
        <h3>How long until I am matched?</h3>
        <p>We match people on a rolling basis. If no one fits the minimum criteria for a match (i.e. same experience, in age-range, fits gender-preferences) by the end of 3 months, we will connect you with the next closest match. If you have been waiting past 3 months, please email charlottearosario@gmail.com.</p>
        
        <h3>How do you decide who I’ll be matched with?</h3>
        <p>Everyone has a different identity, background, interests, and experiences. This means that everyone prioritizes different aspects of a person when they look for a friend or person to confide in. Your response to the form enlightens us with what is important to you. We've developed an algorithm that analyzes the selected choices from the form and looks for overlap or similar answer choices between you and another person.</p>
        <h3>What happens after I fill out the <Link class='FAQs-findbuddy' to='/form'>Find a Buddy</Link> form?</h3>
        <p>After you fill out the matching-form, you will wait (at most 3 months) our algorithm detects that another person who filled out the form meets your minimum criteria. We will then send an email to you and your buddy to kick-start the connection and explain why the match was made.</p>
        <h3>Will my person be local?</h3>
        <p>We prioritize finding matches within communities. Our hope is that you already share some mutual connections with the potential buddy and have the option to meet your buddy in-person. For now, we are only matching youth 14-18 in the SF Bay Area.</p>
        <h3>How will my buddy and I communicate?</h3>
        <p>We set up the initial email connection. You are welcome to talk with you buddy about setting up other dired methods of communication--like texting or sharing social media handles. Since we match buddies within local communities, our hope is that you and your buddy can communicate not only online, but in person as well!</p>

      </div>
    );
  }
  
}

export default FAQs;