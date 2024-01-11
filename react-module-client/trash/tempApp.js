/* import './App.css';
import axios from 'axios';
import React,{useState,useEffect} from 'react';

function App() {

  const sendRequest = async() => {
    const response = await axios.get("/visitormanager?site_id=01f0ea04-6040-47d8-a756-f1b08d855096", {headers:{"login_token": "98A047DF-0C2D-402D-8397-86AC011D09A8"}});
    console.log(response);
    console.log(response.data);
  };

  useEffect(()=>{
    sendRequest();    
  });

  return (
    <div className="App">      
    </div>
  );
}

export default App; */

import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const sendRequest = async () => {
    const response = await axios.get("http://localhost:5000");
    console.log(response);
    console.log(response.data);
  };

  useEffect(() => {
    sendRequest();
  });

  return (
    <div className="App">
      <p>hjw</p>
    </div>
  );
}

export default App;

/* import axios from "axios";
import { useEffect } from 'react';

function App() {
  const callApi = async()=>{
    axios.get("/api").then((res)=>{console.log(res.data.test)});
  };

  useEffect(()=>{
    callApi();
  }, []);
  
  return (
    <div className="App">
	...
    </div>
  );
}

export default App; */

/* import axios from "axios";
import { useEffect } from 'react';

function App() {
  const callApi = async()=>{
    axios.get("/api").then((res)=>{console.log(res.data.test)});
  };

  useEffect(()=>{
    callApi();
  }, []);
  
  return (
    <div className="App">
	...
    </div>
  );
}

export default App; */

/* export default App;

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */
