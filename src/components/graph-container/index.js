import React, { Component } from "react";
import Graph from "components/graph-container/graph";
import GraphOptions from "components/graph-container/graph-options";
import Sidebar from "components/sidebar";

class GraphContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currenciesListOpen: false
    };
  }

  toggleCurrenciesList = () => {
    this.setState({ currenciesListOpen: !this.state.currenciesListOpen });
  };

  render() {
    return (
      <div>
        <GraphOptions />
        <div className="px-2 pt-2 view-another-curr-btn-container">
          <button
            type="submit"
            className="btn btn-sm btn-block view-another-curr-btn"
            style={{ borderRadius: "0px" }}
            onClick={this.toggleCurrenciesList}
          >
            <div>View another currency</div>
            <div style={{ display: "flex" }}>
              {this.state.currenciesListOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 14l5-5 5 5z" fill="#fff" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" fill="#fff" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              )}
            </div>
          </button>
        </div>
        {this.state.currenciesListOpen ? (
          <div className="currencies-sm">
            <Sidebar toggleCurrenciesList={this.toggleCurrenciesList} />
          </div>
        ) : null}
        <div className="graph">
          <Graph />
        </div>
      </div>
    );
  }
}

export default GraphContainer;
