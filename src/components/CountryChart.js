import React from 'react';
import axios from 'axios';
import DataPoint from './DataPoint';

class CountryChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            country: props.country,
            data: [],
            totalConfirmed: 0
        }
        this.getData = this.getData.bind(this);
    }

    getData(country){
        //https://api.covid19api.com/live/country/spain/status/confirmed
        const url = `https://api.covid19api.com/total/country/${country}/status/confirmed`
    
        axios.get(url)
        .then(resp => {
            this.setState({
                data: resp.data,
                totalConfirmed: resp.data[resp.data.length-1].Cases
            })
        })
    }

    componentDidMount() {
        this.getData(this.props.country)
    }

    componentDidUpdate(prevProps){
        if (prevProps.country !== this.props.country) {
            this.getData(this.props.country)
        }
    }

    render(){
        return(
            <div>
                <h2>{this.props.country} Confirmed Cases</h2>
                <p>Total Confirmed Cases: {this.state.totalConfirmed}</p>
                <DataPoint points={this.state.data}/>
            </div>
        )
    }
}

export default CountryChart;