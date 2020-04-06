import React from 'react'
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DataPoint = (props) =>{
    const options = {
        animationEnabled: true,
        data: [{				
                  type: "line",
                  dataPoints: []
         }]
     }
    const data = props.points
    data.map(point => {
        point.Date = formatDate(point.Date)
        options.data[0].dataPoints.push({label: point.Date, y: point.Cases})
        return null
    })
    if(options.data[0].dataPoints.length < 1){
        return(
            <div>No data available for this country sorry :(</div>
        )
    }
    else{
        return (
            <div>
                <CanvasJSChart options = {options} />
            </div>
        )
    }
}

function formatDate(date){
    let newDate = new Date(date)
    let dateString = months[newDate.getMonth()] + " " + newDate.getDate();
    return dateString
}

export default DataPoint