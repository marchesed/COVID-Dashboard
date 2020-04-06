import React from 'react';
import './App.css';
import CountryChart from './components/CountryChart';
import axios from 'axios'

const countriesURL = "https://api.covid19api.com/countries"

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      optionsState: "yemen",
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
      this.setState({countries: resp.data.sort(function(a, b){
        if(a.Country < b.Country) { return -1; }
        if(a.Country > b.Country) { return 1; }
        return 0;
    })})
    })
  }

  componentDidMount() {
    this.getCountryList();
  }

  render() {

    const countries = this.state.countries.map(country => {
      if(country.Slug){
        return <option key={country.Slug} value={country.Slug}>{country.Country}</option>
      }
      return <div>error :(</div>
    })

    return (
      <div>
        <h1 className='text-center'>COVID-19 Dashboard</h1>
        <select className='text-center' value={this.state.optionsState} onChange={this.changeCountry}>
          {countries}
        </select>
        <CountryChart country={this.state.optionsState} />
      </div>
    );
  }
  
}

export default App;
