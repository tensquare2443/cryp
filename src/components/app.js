import React, {Component} from 'react';
import Sidebar from 'components/sidebar';
import GraphContainer from 'components/graph-container';

class App extends Component {
  render() {
    return(
      <div className="container-fluid px-0">
        <div className="row no-gutters">
          <div className="d-none d-sm-block col-sm-2 sidebar-cont">
            <Sidebar/>
          </div>
          <div className="col-12 col-sm-10">
            <GraphContainer/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
