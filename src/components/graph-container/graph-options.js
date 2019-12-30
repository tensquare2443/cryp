import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import axios from 'axios';

class GraphOptions extends Component {
  dateRangeChange(e) {
    var dateRange = e.currentTarget.innerText.split(' ')[0] + 'day';
    var currency = this.props.currency.id;

    this.props.changeDateRange(dateRange);
    axios.get(`https://api.coincap.io/v2/assets/${currency}/history?interval=d1`).then((response) => {
      this.props.getCurrencyHistory(response.data.data, currency, dateRange);
    }).catch((e) => console.log(e));
  }
  colorChange(e) {
    this.props.changeColor(e.currentTarget.innerText);
  }

  render() {
    if (this.props.currencyData.data && this.props.currencyData.data.priceUsd) {
      var currencyUsd = +this.props.currencyData.data.priceUsd;
      if (currencyUsd/1 < 0.01) {
        currencyUsd = `$${currencyUsd.toFixed(4)}`;
      } else if (currencyUsd/1 < 1) {
        currencyUsd = `$${currencyUsd.toFixed(3)}`;
      } else {
        currencyUsd = `$${currencyUsd.toFixed(2)}`;
      }
    }
    const dateRanges = ['7day', '30day', '90day', '180day', '365day'].map((range) => {
      return (
        <div
          onClick={this.dateRangeChange.bind(this)}
          key={range}
          className="dropdown-item date-range-dropdown-item text-white"
        >{range.replace('day', '') + ' Days'}</div>
      );
    });
    const colors = [
      ['Blue','rgb(86,93,236)','rgb(73, 77, 171)'],
      ['Red','rgb(207, 45, 45)','rgb(155,30,30)'],
      ['Green','rgb(67,214,69)','rgb(55,169,56)'],
      ['Gold','rgb(208, 194, 73)','rgb(162,152,61)'],
      ['Purple','rgb(225, 102, 218)','rgb(188,88,182)'],
      ['Teal','rgb(102, 225, 212)','rgb(89,173,164)']
    ].map((color) => {
      return(
        <div
          onClick={this.colorChange.bind(this)}
          key={color[0]}
          style={{backgroundColor: color[1]}}
          data-id={color.join('')}
          className="dropdown-item color-dropdown-item text-white"
        >
          {color[0]}
        </div>
      );
    });
    return(
      <nav className="navbar navbar-expand-lg navbar-dark graph-nav">
        <div className="navbar-brand text-white">{this.props.currency.symbol}</div>
        <ul className="navbar-nav mr-auto d-none d-sm-block">
          <li className="nav-item">
            <div className="nav-link text-white">
              {`One ${this.props.currency.symbol} = ${currencyUsd} USD`}
            </div>
          </li>
        </ul>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle text-white color-dropdown-button"  id="navbarDropdown" role="button" data-toggle="dropdown">
                Color
              </div>
              <div className="dropdown-menu dropdown-menu-right color-dropdown">{colors}</div>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle text-white date-range-dropdown-button"  id="navbarDropdown" role="button" data-toggle="dropdown">
                {this.props.dateRange.replace('day', '') + ' Day History'}
              </div>
              <div className="dropdown-menu dropdown-menu-right date-range-dropdown">{dateRanges}</div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currency: state.currency,
    currencyData: state.currencyData,
    dateRange: state.dateRange,
    color: state.color
  };
}

export default connect(mapStateToProps, actions)(GraphOptions);
