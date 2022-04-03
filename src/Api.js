import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost/api/public_html/'
})