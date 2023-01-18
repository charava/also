import React from 'react';
import axios from 'axios';

class Alg extends React.Component {
    constructor() {
      super();
      this.state={
          users: [],
      }
    }
    

    getUsers = () => {
        axios
          .get('http://localhost:8082/users')
          .then(res => {
            this.setState({
                users: res.data //check to see order of data, wnat to be in order of submission, so reverse()
              })
            console.log(this.state.users)
          })
          .catch(err =>{
            console.log('Error from retrieving users');
          })
      };

      

    matchingAlgorithm = () => {
        let users = ''

        axios
          .get('http://localhost:8082/users')
          .then(res => {
            users = res.data


          })
          .catch(err =>{
            console.log('Error from retrieving users');
          })

        
       
    };

    

    render() {
        let matches = []
        let alreadyMatched = [] // a local list of who to ignore cuz theyve been matched

        console.log(this.state.users.length)

        for (let userInd = 0; userInd < (this.state.users.length - 1); userInd++)  {
            const userOne = this.state.users[userInd]
            // only if this person needs to still be matched
            if ((!(userOne.matched)) || (alreadyMatched.includes(userInd))) {
                console.log(userOne)

                for (let userTwoInd = (userInd+1); userTwoInd < (this.state.users.length); userInd++) {
                    const userTwo = this.state.users[userTwoInd]
                    if ((!(userTwo.matched)) || (alreadyMatched.includes(userTwoInd))) {

                        //EXPERIENCE
                        if (userOne.topExperience === userTwo.topExperience) {
                            // AGE
                            if (((userOne.age >= userTwo.minAge) && (userOne.age <= userTwo.maxAge)) && ((userTwo.age >= userOne.minAge) && (userTwo.age <= userOne.maxAge))) {
                                // GENDER
                                if (((userOne.genderPref.includes("noPref")) && (userTwo.genderPref.includes("noPref"))) || ((userOne.genderPref.includes("noPref")) && (userTwo.genderPref.includes(userOne.gender))) || ((userTwo.genderPref.includes("noPref")) && (userOne.genderPref.includes(userTwo.gender))) || ((userOne.genderPref.includes(userTwo.gender)) && (userTwo.genderPref.includes(userOne.gender)))) {
                                    // match has occured!!!
                                    break
                                    console.log("match with " + userInd + " and " + userTwoInd)
                                    matches.push([userInd, userTwoInd])

                                    // updating local list
                                    alreadyMatched.push(userInd)
                                    alreadyMatched.push(userTwoInd)



                                    // updating remote database ----
                                    const userOneData = {
                                        id: userOne._id,
                                        matched: true
                                    }
                                    const userTwoData = {
                                        id: userTwo._id,
                                        matched: true
                                    }
                                    axios
                                        .put('http://localhost:8082/matched', userOneData)
                                        .then(res => {
                                            console.log('updated matched')
                                        })
                                        .catch(err =>{
                                            console.log('Error from update match');
                                        })
                                    axios
                                        .put('http://localhost:8082/matched', userTwoData)
                                        .then(res => {
                                            console.log('updated matched')
                                        })
                                        .catch(err =>{
                                            console.log('Error from update match');
                                        })

                                    break
                

                                } else {
                                    console.log("ERR: discrepancy w gender between " + (userInd) + " and " + (userTwoInd))
                                }
                            } else {
                                console.log("ERR: discrepancy w age between " + (userInd) + " and " + (userTwoInd))
                            }

                        } else {
                            console.log("ERR: discrepancy w experience between " + (userInd) + " and " + (userTwoInd))
                        }
                    
                    } else {
                        console.log('ERR: user ' + userInd + ' already matched')
                    }
                }
            } else {
                console.log('ERR: user ' + userInd + ' already matched')
            }
        }

        console.log(matches)
        
        return(
            <div>helo</div>

        );
    }


};

export default Alg;

