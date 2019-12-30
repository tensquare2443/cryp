import React, {Component} from 'react';
import Sidebar from 'components/sidebar';
import GraphContainer from 'components/graph-container';

/*
DONE - add new font to chart
DONE - set max width on chart
DONE - redo chart colors, and on nav as well
DONE - check if new font is actually existing
DONE - loader on graph
DONE - loader on nav
DONE - responsive sidebar
DONE - make graph dots biggers
DONE - right padding/margin on chart
DONE - alphabetize sidebar
DONE - commas in chart tooltips (& axes?)
DONE - commas in nav
DONE - console bootstrap error?
DONE - change "BTC" title on nav to "Bitcoin"? change font etc.?
DONE - console check
DONE - "undefined" on nav on app open
DONE - remove 'wrapping' on sidebar currency names to prevent screen height issue
DONE - fix min-scroll slight issue on mobile 'sidebar'
DONE - was lots of decimals on y-axis an edge case? (check Holo (HOT))
- then check in all browsers
*/

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
