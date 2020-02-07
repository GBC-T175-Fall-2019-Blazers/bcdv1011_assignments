import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import IpfsFilesWrite from './IpfsFilesWrite';

import logo from './logo.svg';
import './App.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ipfsClient = require('ipfs-http-client')
// connect to ipfs daemon API server
const ipfs = ipfsClient('http://localhost:5001') // (the default in Node.js)

function App() {

  const [ipfsVersion, setIpfsVersion] = useState(0);


  const getIpfsVersion = async () => {
      const v = await ipfs.version();
      setIpfsVersion(v.version);

    };

    useEffect(() => {
      getIpfsVersion();

    },[ipfsVersion]);


  return (
    <div className="App">
      <Router>
        <AppBar position="static" color="default" style={{ margin: 0 }}>
          <Toolbar>
           <NavLink className="nav-link" to="/">Version</NavLink>
          </Toolbar>
          <Toolbar>
           <NavLink className="nav-link" to="/UploadFile/">Add File</NavLink>
          </Toolbar>
       </AppBar>
<Switch>
       <Route exact path="/" >
        <header className="App-header">
         <h1>IPFS Version:{ipfsVersion}</h1>
       </header>
       </Route>


       <Route exact path="/UploadFile/" component={IpfsFilesWrite} />
</Switch>
      </Router>
    </div>
  );
}

export default App;
