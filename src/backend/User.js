const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const postSchema = require('./Posts.js')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: false,
        unique: false
    },
    lastName: {
        type: String,
        required: false,
        unique: false
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    phone: {
        type: String,
        required: false,
        unique: false
    },
    age: {
        type: Number,
        required: false,
        unique: false
    },
    gender: {
        type: String,
        required: false,
        unique: false
    },
    pronouns: {
        type: String,
        required: false,
        unique: false
    },
    birthdate: {
        type: Date,
        required: false,
        unique: false
    },
    city: {
        type: String,
        required: false,
        unique: false
    },
    topExperience: {
        type: String,
        required: false,
        unique: false
    },
    explanation: {
        type: String,
        required: false,
        unique: false
    },
    durationExperienced: {
        type: String,
        required: false,
        unique: false
    },
    minAge: {
        type: Number,
        required: false,
        unique: false
    },
    maxAge: {
        type: Number,
        required: false,
        unique: false
    },
    genderPref: {
        type: Array,
        required: false,
        unique: false
    },
    additionalPref: {
        type: String,
        required: false,
        unique: false
    },
    acceptedTerms: {
        type: Boolean,
        required: false,
        unique: false
    },
    matched: {
        type: Boolean,
        required: false,
        unique: false
    },
    time: {
        type: String,
        required: false,
        unique: false
    },
});


//temporary creation in code and not on postman
//const TrialUser = mongoose.model('TrialUser', userSchema);
//const smallParent = new TrialUser({ userInfo: [{name: 'Charlotte', email: 'charcharro@gmail.com', username: 'charosa', password: 'bestpas22'}], posts: [{ title: 'helloooo', description: 'this is desc' }, { title: 'asdfas', description: 'this is sfadsgsdesc' }] })
//console.log(smallParent)

module.exports = mongoose.model("User", userSchema);
