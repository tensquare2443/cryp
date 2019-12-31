import React, {Component} from 'react';
import Sidebar from 'components/sidebar';
import GraphContainer from 'components/graph-container';


class App extends Component {
  render() {
    return(
      <div className="container-fluid px-0">
        <div className="row no-gutters">
          <div className="d-none d-md-block col-md-3 sidebar-cont">
            <Sidebar/>
          </div>
          <div className="col-12 col-md-9">
            <GraphContainer/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
