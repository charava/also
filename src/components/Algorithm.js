import React from 'react';
import axios from 'axios';


function PostIt (props) {
    const postInfo  = props.postInfo;
    return(
        <div>
            <div>
                <h4>The Note registered under this ID:</h4>
                <h2>{postInfo.text}</h2>
                {/* <h2>
                  <Link to={`/show/${postInfo.post_id}`} replace>
                      { postInfo.text }
                  </Link>
                </h2> 
                <h3>{postInfo.name}</h3>  
                */}
                <p>post ID: {postInfo.post_id}</p>
            </div>
            <br></br>
        </div>
    )
};
 /*
  1. go one by one
  first scan for experience1, then (if relevant) exp2, then exp3. if at least one experiencei shared, then move on to age
  if the remaining people fit into age range, continue on to gender. if there is no pref, move on. 
  if there is a preference, and a person satisfies it, continue on to how long its been impacting. 
  then move on to pulling out key words from "sitaution" write up and "additional info"
  */

class Alg extends React.Component {
  constructor() {
    super();
    this.state={
        users: [],
    }
  }

  componentDidMount() {
    axios
      //TODO: fill in the GET call below with the appropriate URL
      //look at routes
      .get('http://localhost:8082/users')
      .then(res => {
        //TODO: Fill this in with the appropriate state information
        //from whatever the response is
        this.setState({
            users: res.data //.reverse()
          })
      })
      .catch(err =>{
        console.log('Error from ShowAllNuevans');
      })
    
    
  };
  
  hasSimilarItem(arr1, arr2) {
    return arr1.some((item) => arr2.includes(item));
  }

  countSimilarItems(array1, array2) {
    let count = 0;
    for (const item of array1) {
      if (array2.includes(item)) {
        count++;
      }
    }
    return count;
  }

  elementWithin(arr, item) {
    return arr.some(innerArr => innerArr.includes(item));
  }

  //SCORING 
  // num of experiences shared --> 3 pt each
  // fits into age range --> 3pt, age is one off of age range --> 1pt
  // if gender pref, fits gender pref --> 3pt 
  // how long its been impacting u (similar) --> 1pt (has not been done yet)


  loopingThrough = () => {
    const users = this.state.users
    console.log(' ')
    console.log('RESTARTING')


    // this doesnt work, because its finding the best possible option, not the feasble options. some requests are set in stone and must be met no matter hwat. 
    // also this algorithm only optimizes for the first user, not the second
    let matches = []
    for (let i = 0; i < users.length; i++) {
        const userOneExperiences = users[i].experiences
        const userOneGenderPref = users[i].genderPref

        if (!(this.elementWithin(matches, users[i]))) { // filtering out the ones that already have been matched

            // console.log('ITERATION: ' + i)
            // console.log(matches)
            // console.log(users[i])
            // console.log(' ')

            
            let prevBestScore = 0
            let prevBestArray = ''

            for (let j = i + 1; j < users.length; j++) {
                let userTwoScore = 0

                const userTwoExperiences = users[j].experiences
                const userTwoAge = users[j].age
                const userTwoGender = users[j].gender


                const numOfSimilarExp = this.countSimilarItems(userOneExperiences, userTwoExperiences) 
                userTwoScore += numOfSimilarExp * 3

                if ((userTwoAge < users[i].maxAge) && (userTwoAge > users[i].minAge)) { // if the second user fits user one age criteria
                    userTwoScore += 3
                }

                if (!(userOneGenderPref.includes('noPref'))) { // if user has pref on gender
                    if (userOneGenderPref.includes(userTwoGender)) {
                        userTwoScore += 3
                    }
                }

                if (userTwoScore > prevBestScore) {
                    prevBestScore = userTwoScore
                    prevBestArray = users[j]
                }

            }
            const match = [users[i], prevBestArray]
            matches.push(match)
        }
        

      }
    console.log(matches)

  }
  


  render() {
    return(
      <div>
        {this.state.users.map((user) => (
            <div key={user._id}>{user.firstName}</div>
        ))}
        {this.loopingThrough()}
      </div>
    );
  }
  
}

export default Alg;