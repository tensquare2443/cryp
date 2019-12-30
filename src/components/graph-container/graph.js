import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import axios from 'axios';
import {Line} from 'react-chartjs-2';

class Graph extends Component {
  componentDidMount() {
    this.props.getCurrencyData('bitcoin');

    // axios.get(`http://coincap.io/history/30day/BTC`).then((response) => {
    //   this.props.getCurrencyHistory(response.data.price, 'BTC', '30day');
    // }).catch((e) => console.log(e));
    axios.get(`https://api.coincap.io/v2/assets/bitcoin/history?interval=d1`).then((response) => {
      // console.log(response);
      // this.props.getCurrencyHistory(response.data.price, 'BTC', '30day');
      this.props.getCurrencyHistory(response.data.data, 'BTC', '30day');
    }).catch((e) => console.log(e));
  }

  render() {
    const currencyHistory = this.props.currencyHistory;
    const data = {
      labels: currencyHistory.map((day) => day.date),
      datasets: [{
          label: this.props.currencyData.id,
          backgroundColor: this.props.color[0],
          borderColor: this.props.color[1],
          data: currencyHistory.map((day) => day.price),
      }]
    };

    return(
      <div>
        <Line
          data={data}
          options={{
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  fontColor: 'white',
                  callback: function(payload) {
                    return `$${payload}`;
                  }
                },
                gridLines: {
                  color: '#36373E'
                }
              }],
              xAxes: [{
                ticks: {
                  fontColor: 'white'
                },
                gridLines: {
                  color: '#36373E'
                }
              }]
            },
            layout: {
              padding: 20
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  if (tooltipItem.yLabel/1 < 0.01) {
                    return `$${tooltipItem.yLabel.toFixed(4)}`;
                  } else if (tooltipItem.yLabel/1 < 1) {
                    return `$${tooltipItem.yLabel.toFixed(3)}`;
                  } else {
                    return `$${tooltipItem.yLabel.toFixed(2)}`;
                  }
                }
              }
            }
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencyHistory: state.currencyHistory,
    currencyData: state.currencyData,
    color: state.color
  };
}

export default connect(mapStateToProps, actions)(Graph);
