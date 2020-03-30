import React from 'react';
import logo from './logo.svg';
import './App.css';
import CountryChart from './components/CountryChart';
import axios from 'axios'

const countriesURL = "https://api.covid19api.com/countries"

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      optionsState: "canada",
      countries: []
    }
    this.changeCountry = this.changeCountry.bind(this);
    this.getCountryList = this.getCountryList.bind(this);
  }
  
  changeCountry(event) {
    this.setState({optionsState: event.target.value})
    event.preventDefault();
  }

  getCountryList() {
    axios.get(countriesURL)
    .then(resp => {
      this.setState({countries: resp.data})
    })
  }

  componentDidMount() {
    this.getCountryList();
  }

  render() {

    const countries = this.state.countries.map(country => {
      if(country.Slug){
        return <option value={country.Slug}>{country.Country}</option>
      }
    })

    return (
      <div>
        <h1>COVID-19 Dashboard</h1>
        <select value={this.state.optionsState} onChange={this.changeCountry}>
          {countries}
        </select>
        <CountryChart country={this.state.optionsState} />
      </div>
    );
  }
  
}

export default App;
