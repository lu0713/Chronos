import React, { useContext, useEffect, useState, useRef, forwardRef } from 'react';

// MATERIAL UI METHODS
import {
  IconButton,
  Modal,
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

// MATERIAL UI ICONS
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import UpdateIcon from '@material-ui/icons/Update';
import PeopleIcon from '@material-ui/icons/People';
import CachedIcon from '@material-ui/icons/Cached';
import DataUsageIcon from '@material-ui/icons/DataUsage';

// MODALS
import AddModal from '../modals/AddModal';
import ServicesModal from '../modals/ServicesModal';

// STYLESHEETS
import '../stylesheets/Occupied.scss';

// DASHBOARD CONTEXT
import { DashboardContext } from '../context/DashboardContext';

import { ApplicationContext } from '../context/ApplicationContext';

// TYPESCRIPT
interface StyleProps {
  root: BaseCSSProperties;
}
type ClickEvent = React.MouseEvent<HTMLElement>;

const Occupied = React.memo(() => {
  const { setServicesData } = useContext(ApplicationContext);
  const { applications, getApplications, deleteApp } = useContext(DashboardContext);
  const [open, setOpen] = useState<boolean>(false);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [app, setApp] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('Search...');
  // Dynamic refs
  const delRef = useRef<any>([]);

  useEffect(() => {
    setServicesData([]);
    getApplications();
  }, []);

  // Ask user for deletetion confirmation
  const confirmDelete = (event: ClickEvent, app: string, i: number) => {
    const message = `The application '${app}' will be permanently deleted. Continue?`;
    if (confirm(message)) deleteApp(i);
  };

  // Handle clicks on Application cards
  const handleClick = (event: ClickEvent, selectedApp: string, i: number) => {
    if (delRef.current[i] && !delRef.current[i].contains(event.target)) {
      setIndex(i);
      setApp(selectedApp);
      setServicesData([]);
      setOpen(true);
    }
  };

  const useStyles = makeStyles<Theme, StyleProps>(theme => ({
    // ALL CARDS
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'visible',
      height: 280,
      width: 280,
      textAlign: 'center',
      color: '#888888',
      whiteSpace: 'nowrap',
      backgroundColor: '#ffffff',
      borderRadius: 3,
      border: '0',
      boxShadow:
        '0 6px 6px 0 rgba(153, 153, 153, 0.14), 0 6px 6px -2px rgba(153, 153, 153, 0.2), 0 6px 8px 0 rgba(153, 153, 153, 0.12)',
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: `#3788fc`,
        color: '#ffffff',
        fontWeight: 600,
      },
    },
    iconbutton: {
      boxShadow: 'none',
      color: 'none',
      visibility: 'hidden',
    },
    btnStyle: {
      position: 'absolute',
      top: -10,
      left: -72,
      margin: '0',
      color: '#eeeeee',
      borderRadius: '0',
      backgroundColor: 'none',
      visibility: 'visible',
    },
    icon: {
      width: '75px',
      height: '75px',
      boxShadow: 'none',
    },
    // ALL CARDS: CONTENT
    fontStyles: {
      fontSize: '18px',
      fontFamily: 'Roboto',
      fontWeight: 300,
      color: '#444d56',
    }
  }));

  const classes = useStyles({} as StyleProps);

  return (
    <div className="entireArea">
      <div className="dashboardArea">
        <div className="headerContainer">
          <header className="mainHeader">
            <section className="header" id="leftHeader">
              <span>
                <ListIcon className="icon" id="listIcon" />
              </span>
              <span>
                <p id="dashboardLabel">Dashboard</p>
              </span>
            </section>
            <section className="header" id="rightHeader">
              <form className="form">
                <label className="inputContainer">
                  <input className="form" id="textInput" placeholder={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" name="search" />
                  <hr />
                </label>
                <button className="form" id="submitBtn" type="submit">
                  <SearchIcon className="icon" id="searchIcon" />
                </button>
              </form>
              <div className="dashboardIconArea">
                <span className="dashboardTooltip">You have {applications.length} active databases</span>
                <DashboardIcon className="navIcon" id="dashboardIcon" />
              </div>
              
              <div className="notificationsIconArea">
                <span className="notificationsTooltip">You have no new alerts</span>
                < NotificationsIcon className="navIcon" id="notificationsIcon" />
              </div>

              <div className="personIconArea">
                <span className="personTooltip">You are not logged in</span>
                <PersonIcon className="navIcon" id="personIcon" />
              </div>
            </section>
          </header>
        </div>

        <div className="cardContainer">
          <div className="card" id={`card-add`}>
            <Button className={classes.paper} onClick={() => setAddOpen(true)}>
              <AddCircleOutlineTwoToneIcon className={classes.icon} />
            </Button>
          </div>

          {applications.map((app: string[], i: number | any | string | undefined) => (
            <div className="card" key={`card-${i}`} id={`card-${i}`}>
              <Card
                key={`card-${i}`}
                className={classes.paper}
                variant="outlined"
                onClick={event => handleClick(event, app[0], i)}
              >

                  <div className="databaseIconContainer">
                    <div className="databaseIconHeader">
                      <img className="databaseIcon" src="../assets/mongo-icon-white.png" alt="MongoDB"></img>
                    </div>
                  </div>
                  
                  <CardHeader
                    avatar={
                      <IconButton
                        id="iconButton"
                        ref={element => (delRef.current[i] = element)}
                        className={classes.iconbutton}
                        aria-label="Delete"
                        onClick={event => confirmDelete(event, app[0], i)}
                      >
                        <HighlightOffIcon 
                        className={classes.btnStyle} 
                        id="deleteIcon" 
                        ref={element => (delRef.current[i] = element)} 
                        />
                      </IconButton>
                    }
                  >
                  </CardHeader>
                <CardContent>
                  <p id="databaseName">Database Name:</p>
                  <Typography className={classes.fontStyles}>{app[0]}</Typography>
                </CardContent>
                <hr className="cardLine"/>

                <div className="cardFooter">
                  <UpdateIcon className="cardFooterIcon"/>
                  <em><p id="cardFooterText">Just updated</p></em>
                </div>
              </Card>
            </div>
          ))}
          
          <Modal open={addOpen} onClose={() => setAddOpen(false)}>
            <AddModal setOpen={setAddOpen} />
          </Modal>
          
          <Modal open={open} onClose={() => setOpen(false)}>
            <ServicesModal key={`key-${index}`} i={index} app={app} />
          </Modal>

        </div>
        
        <hr className="dashboardDivider" />
        
        <div className="lowerContainers" id="middleContainer">
          
          <div className="containerMiddleRow" id="middleLeftContainer">
            <div className="middleContainersIconHeader" id="middleLeftContainerIconHeader">
              <img className="databaseIcon" src="../assets/globe-icon-white.png" alt="MLC"></img>
            </div>
            <div className="middleRowCard">
              <div className="mapContainer">
                <div className="cardTitle">
                  <p id="globalUsers">Global Users</p>
                </div>
                
                <hr className="titleUnderline"/>
                
                <div className="mapArea">
                  <div className="countryData">              
                    <div className="mapColumn" id="flags">
                      <p className="flag">🇺🇸</p>
                      <p className="flag">🇨🇳</p>
                      <p className="flag">🇷🇺</p>
                      <p className="flag">🇮🇳</p>
                      <p className="flag">🇻🇳</p>
                      <p className="flag">🇺🇦</p>
                      <p className="flag">🇰🇷</p>
                      <p className="flag">🇹🇼</p>
                    </div>

                    <div className="mapColumn" id="countries">
                      <p>USA</p>
                      <p>China</p>
                      <p>Russia</p>
                      <p>India</p>
                      <p>Vietnam</p>
                      <p>Ukraine</p>
                      <p>South Korea</p>
                      <p>Taiwan</p>
                    </div>
                    
                    <div className="mapColumn" id="countryUsers">
                      <p>2.934</p>
                      <p>2.821</p>
                      <p>2.711</p>
                      <p>2.654</p>
                      <p>1.982</p>
                      <p>1.631</p>
                      <p>1.552</p>
                      <p>1.211</p>
                    </div>

                    <div className="mapColumn" id="countryPercentage">
                      <p>10.56%</p>
                      <p>9.012%</p>
                      <p>9.009%</p>
                      <p>8.855%</p>
                      <p>8.643%</p>
                      <p>8.292%</p>
                      <p>7.411%</p>
                      <p>6.883%</p>
                    </div>
                  </div>

                  <div className="globalMap">
                    <img id="mapImage" src="../assets/global-map-grey.png" alt="Map"></img>
                  </div>
                </div>
              </div>

              <hr className="middleRowCardLine" />              
              <div className="middleCardFooter">
                <PeopleIcon className="cardFooterIcon" />
                <em><p id="middleCardFooterText">Users in millions</p></em>
                <span id="totalUsers">19.127</span>
              </div>

            </div>
          </div>
          
          <div className="containerMiddleRow" id="middleRightContainer">
            <div className="middleContainersIconHeader" id="middleRightContainerIconHeader">
              <img className="databaseIcon" src="../assets/database-icon-white.png" alt="MRC"></img>
            </div>
            
            <div className="databaseContainer">
              <div className="cardTitle">
                <p id="databaseTitle">Active Databases</p>
              </div>
              <hr className="titleUnderline" />
              
              <div className="middleRowCard">
                <div className="databaseNamesContainer">
                  <ul id="databaseNames">
                    {applications.map((app: string[], i: number | any | string | undefined) => (
                    <li key={`li-${i}`} id={`li-${i}`}>
                      {app[0]}
                    </li>
                  ))} 
                  </ul> 
                </div>
                {/* <hr className="middleRowCardLine" /> */}
                <div className="middleCardFooter">
                  {/* <UpdateIcon className="cardFooterIcon" />
                  <em><p id="middleCardFooterText">Just updated</p></em> */}
                </div>
              </div>
            </div>
          </div>

        </div>

        <hr className="dashboardDivider" />

        <div className="lowerContainers" id="bottomContainer">
          <div className="containerBottomRow" id="bottomLeftContainer">
            <div className="bottomContainersIconHeader" id="bottomLeftContainerIconHeader">
              <img className="databaseIcon" src="../assets/question-mark-white.png" alt="BLC"></img>
            </div>
            <div className="bottomRowCard">

              <div className="topicsContainer">
                <div className="cardTitle">
                  <p id="topicsTitle">Topics</p>
                </div>

                <hr className="titleUnderline" />
                <div className="cardTitle">
                  <em><p id="topicsSubtitle">Open Topics</p></em>
                </div>
                
                  <div className="topicsSection">
                    
                    <div className="topicsColumn" id="questions">
                      <ul id="questionList">
                        <li>When can we expect to see the next release?</li>
                        <li>Does Chronos work with GraphQL?</li>
                        <li>How does distributed route tracing work?</li>
                        <li>Will Chronos work with Docker Compose?</li>
                        <li>Is it possible to use Chronos on any microservices application?</li>
                        <li>Does Chronos provide LTS for previous version?</li>
                      </ul>
                    </div>

                    <div className="topicsColumn" id="status">
                      <em><p>Thread inactive</p></em>
                      <em><p>Thread closed</p></em>
                      <em><p>Thread closed</p></em>
                      <em><p>Thread active</p></em>
                      <em><p>Thread inactive</p></em>
                      <em><p>Thread reopened</p></em>
                    </div>

                  </div>
                
              </div>

              <hr className="bottomRowCardLine" />
              <div className="bottomCardFooter">
                <CachedIcon className="cardFooterIcon" />
                <em><p id="bottomCardFooterText">Cached answers</p></em>
              </div>
            </div>
          </div>

          <div className="containerBottomRow" id="bottomCenterContainer">
            <div className="bottomContainersIconHeader" id="bottomCenterContainerIconHeader">
              <img className="databaseIcon" src="../assets/linkedin-icon-white.png" alt="BCC"></img>
            </div>
            <div className="bottomRowCard">
              <div className="cardTitle">
                <p id="outageTitle">Social Media</p>
              </div>
              <hr className="titleUnderline" />
              <div className="mediaContainer">
                <img id="socialMediaImage" src="../assets/social-media-dashboard.jpg" alt="Social Media Dashboard"></img>
              </div>
              {/* <hr className="bottomRowCardLine" /> */}
              <div className="bottomCardFooter">
                {/* <CachedIcon className="cardFooterIcon" />
                <em><p id="bottomCardFooterText">Just updated</p></em> */}
              </div>
            </div>
          </div>

          <div className="containerBottomRow" id="bottomRightContainer">
            <div className="bottomContainersIconHeader" id="bottomRightContainerIconHeader">
              <img className="databaseIcon" src="../assets/exclamation-point-white.png" alt="BRC"></img>
            </div>
            <div className="bottomRowCard">
              <div className="cardTitle">
                <p id="outageTitle">Outages</p>
              </div>
              <hr className="titleUnderline" />
              <p>No current outages</p>
              {/* <hr className="bottomRowCardLine" /> */}
              <div className="bottomCardFooter">
                {/* <UpdateIcon className="cardFooterIcon" /> */}
                {/* <em><p id="bottomCardFooterText">Just updated</p></em> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Occupied;
