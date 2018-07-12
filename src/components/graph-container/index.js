import React, {Component} from 'react';
import Graph from 'components/graph-container/graph';
import GraphOptions from 'components/graph-container/graph-options';

class GraphContainer extends Component {
  render() {
    return(
      <div>
        <GraphOptions/>
        <div className="graph">
          <Graph/>
        </div>
      </div>
    );
  }
}

export default GraphContainer;
