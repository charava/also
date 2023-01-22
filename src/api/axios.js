import axios from 'axios';

export default axios.create({
    baseURL: 'http://alsoproject.vercel.app/api/' || "http://localhost:3000"
})