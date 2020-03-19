import React from 'react';
import { Button } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {

  render() {
    const divStyle = { paddingTop: '3%', paddingBottom: '7%' };
    return (
        <footer style={{ height: '100%', backgroundColor: '#475f6f', color: 'whitesmoke' }}>
          <div style={divStyle} className="ui fluid center aligned container">
            <hr/>
            <div className="footer-text">
              Gregory • University of Hawaiʻi at Mānoa • 2500 Campus Road • Honolulu, HI 96822<br/>
              <div className="footer-text-2">
                Documentation available here
              </div>
            </div>
          </div>
        </footer>
    );
  }
}

export default Footer;
