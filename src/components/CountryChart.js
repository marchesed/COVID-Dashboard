import React from 'react';
import axios from 'axios';
import DataPoint from './DataPoint';

class CountryChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            country: props.country,
            data: [],
            countryString: '',
            totalConfirmed: 0
        }
        this.getData = this.getData.bind(this);
        this.formatNumber = this.formatNumber.bind(this)
    }

    getData(country){
        const url = `https://api.covid19api.com/total/country/${country}/status/confirmed`
    
        axios.get(url)
        .then(resp => {
            if(resp.data[resp.data.length-1]){
                var num = this.formatNumber(resp.data[resp.data.length-1].Cases)
                this.setState({
                    data: resp.data,
                    countryString:  resp.data[resp.data.length-1].Country,
                    totalConfirmed: num
                })
            }
            else{
                this.setState({
                    data: [],
                    countryString:  this.props.country,
                    totalConfirmed: 0
                })
            }
        })
    }

    formatNumber(num){
        if(num > 999){
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else { return num }
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
                <p>Total Confirmed Cases: <span className='font-bold'>{this.state.totalConfirmed}</span></p>
                <h2>Confirmed Cases in {this.state.countryString}</h2>
                <DataPoint points={this.state.data} />
            </div>
        )
    }
}

export default CountryChart;