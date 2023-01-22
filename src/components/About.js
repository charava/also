import React from 'react';
import { Link } from 'react-router-dom';

class About extends React.Component {
  
  render() {
    return(
      <div class='container'>
        <h1>Our world today faces a youth loneliness crisis.</h1>

        <h4>Stigma, shame, and social pressure are keeping teens silent.</h4>
        <p>Teens today are growing up in an environment where talking openly about mental health challenges and trauma is seen as "weak," 
            "annoying," or  "shameful." Youth learn to hide their battles and imperfections at school, on social media, 
            and even from close friends and family.
          </p>
          
         <p>
            There are no support groups for minors. The majority of youth today don't feel comfortable talking to an adult or are unable to afford professional care. 
             Without having an outlet to talk to, youth are placed at greater risk for developing psychological issues or suicidal behavior. 
          </p>

        
        <p>Recent studies from the Covid-19 pandemic reveal that more than 1 in 3 high school students faced a mental health challenge. 
            The percentage of people with a mental illness who report an unmet need for treatment has increased every year since 2011. 
            Suicide is the second leading cause of death for 15 to 24-year-olds.</p>
        
        <h3>So what do we do? Well, we asked. You responded.</h3>
        <ul>
            <li><h6>"I need a friend my age who can really understand what I'm going through." - Student, 15</h6></li>
            <li><h6>"[I want] open, casual conversations about our struggles with others," - Haley, 17</h6></li>
            <li><h6>"I want a friend who understands even just one part of my situation. I want to be able to talk through our experiences together in a stigma-free way." - Student, 15</h6></li>
            <li><h6>"None of my friends take my [challenges] seriously. It's hard to talk to them without feeling like a burden, and I can tell it makes them uncomfortable. I want to talk to someone who just get its." - Student, 16 </h6></li>
        </ul>
   
        <p>We want to help. But the issue is people don't blatantly reveal their personal lives in their social media bios 
            or when they're walking down the hallway at school. It's nearly impossible for youth 
            today to know if someone else is going through a similar situation without speculating or 
            asking the uncomfortable question, "Hey, do you also...?"</p>

        <h3>That's where ALSO comes in. </h3>
        <h5>ALSO is the first-ever peer-support platform that enables teens to safely and confidentially find friends in their community with relatable mental health challenges or experiences. </h5>
        <p>You gave us the initial idea, so keep giving us more! We are constantly iterating and improving our platform. Provide feedback if you can <Link class='formLink' to='/contact'>here</Link>.</p>

        <h1>So, what's the backstory?</h1>
        <p>ALSO was started by high school student <a href='https://www.linkedin.com/in/charlotte-rosario-1a88a9208/'>Charlotte Rosario</a> after she lost a family member to suicide and had no one to talk to who understood what she was going through.
        She received pity from close friends, but no clarity or hope. Without having anyone to talk to who shared a similar experience, Charlotte struggled with feeling isolated and alone. </p>
        <p>Now, nearly three years later, Charlotte has been actively searching for others who may be able to provide affinity to her experiences. She's heard through word-of-mouth of others in her community 
            who have experienced a similar situation but have had no way of getting in touch with them. Through talking with peers, Charlotte has realized that isolation and loneliness when it comes to mental health challenges or trauma is
            a widespread issue—-experienced by nearly everyone. Charlotte is passionate about fostering belonging in her community and thus set out to create ALSO to ensure her peers never have to feel alone again.
        </p>

      </div>
    );
  }
  
}

export default About;