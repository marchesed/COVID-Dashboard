import axios from 'axios';

export const casesByCountry = () => {
    return axios.get('https://api.covid19api.com/country/canada/status/confirmed')
}