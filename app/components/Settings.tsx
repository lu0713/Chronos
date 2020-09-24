import React from 'react';
import Copyright from '../components/Copyright';
import '../stylesheets/MainContainer.scss';
import '../stylesheets/Settings.scss';
// Need to add flag to turn off the splash at start
// Need to add flag to turn off getting started page
// Need to add flag to turn on/off live data (ideally persist on restart)
// Need to add dark mode
const Settings: React.SFC = React.memo((props) => {
  return (
    <div className="settings">
      <button className="mode" id="lightMode">
        Light
      </button>

      <button className="mode" id="darkMode">
        Dark
      </button>
      
      <div className="copyright-container">
        <Copyright />
      </div>
    </div>
  );
});

export default Settings;
