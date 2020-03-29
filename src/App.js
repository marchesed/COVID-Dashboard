import React from 'react';
import logo from './logo.svg';
import './App.css';
import CountryChart from './components/CountryChart';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      optionsState: "canada"
    }
    this.changeCountry = this.changeCountry.bind(this);
  }
  
  changeCountry(event) {
    console.log(event.target.value)
    this.setState({optionsState: event.target.value})
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>COVID-19 Dashboard</h1>
        <select value={this.state.optionsState} onChange={this.changeCountry}>
          <option value="canada">Canada</option>
          <option value="us">US</option>
        </select>
        <CountryChart country={this.state.optionsState} />
        {/* <CountryChart country="us" /> */}
      </div>
    );
  }
  
}

export default App;
