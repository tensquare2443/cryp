import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "actions";
import axios from "axios";
import { Line } from "react-chartjs-2";
import formatPrice from "../../functions/formatPrice";

class Graph extends Component {
  componentDidMount() {
    this.props.getCurrencyData("bitcoin");

    this.props.setLoaders([
      this.props.loaders,
      {
        graph: true
      }
    ]);

    axios
      .get(`https://api.coincap.io/v2/assets/bitcoin/history?interval=d1`)
      .then(response => {
        this.props.getCurrencyHistory(response.data.data, "BTC", "30day");

        this.props.setLoaders([
          this.props.loaders,
          {
            graph: false
          }
        ]);
      })
      .catch(e => {
        console.log(e);

        this.props.setLoaders([
          this.props.loaders,
          {
            graph: false
          }
        ]);
      });
  }

  render() {
    const currencyHistory = this.props.currencyHistory;
    const data = {
      labels: currencyHistory.map(day => day.date),
      datasets: [
        {
          label: this.props.currencyData.id,
          backgroundColor: this.props.color[0],
          borderColor: this.props.color[1],
          data: currencyHistory.map(day => day.price),
          pointRadius: 4
        }
      ]
    };
    const chartFontFamily = "'Ubuntu', sans-serif";

    return (
      <div className="graph-container">
        {this.props.loaders.graph ? (
          <div className="graph-loader-container">
            <div className="lds-dual-ring graph-loader"></div>
          </div>
        ) : null}
        <Line
          data={data}
          options={{
            legend: {
              display: false
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontColor: "white",
                    fontFamily: chartFontFamily,
                    callback: formatPrice
                  },
                  gridLines: {
                    color: "#36373E"
                  }
                }
              ],
              xAxes: [
                {
                  ticks: {
                    fontColor: "white",
                    fontFamily: chartFontFamily
                  },
                  gridLines: {
                    color: "#36373E"
                  }
                }
              ]
            },
            layout: {
              padding: 20
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  if (tooltipItem.yLabel / 1 < 0.01) {
                    var labelFormatted = tooltipItem.yLabel.toFixed(4);
                  } else if (tooltipItem.yLabel / 1 < 1) {
                    labelFormatted = tooltipItem.yLabel.toFixed(3);
                  } else {
                    labelFormatted = tooltipItem.yLabel.toFixed(2);
                  }

                  return formatPrice(labelFormatted);
                }
              },
              titleFontFamily: chartFontFamily,
              bodyFontFamily: chartFontFamily
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
    color: state.color,
    loaders: state.loaders
  };
}

export default connect(mapStateToProps, actions)(Graph);
