import React from 'react';
import manifest from './manifest.json';
import './App.css';

console.log(manifest)

// Support for Markdown syntax
const ReactMarkdown = require('react-markdown')

class TableRows extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <table class="colwidths-given table table-bordered">
          <thead valign="bottom">
            <th class="head">Property</th>
            <th class="head">Type</th>
            <th class="head">Description</th>
            <th class="head">Default</th>
            <th class="head">Req</th>
          </thead>
          <tbody valign="top">
            {Object.entries(manifest.properties).map((value, index) => {
              if (typeof value[1].required === "boolean") {
                value[1].required = "true"
              }
              if (typeof value[1].required === "undefined") {
                value[1].required = "false"
              }

              return (
                <tr>
                  <td>{value[0]}</td>
                  <td>{value[1].type}</td>
                  <td>{value[1].description}</td>
                  <td>{value[1].default}</td>
                  <td>{value[1].required}</td>
                </tr>
              ) 
            })}
          </tbody>
        </table>
    );
  }
}

class PipeConfig extends React.Component {
  constructor(props) {
    super(props);
  }

  pipe = {
    id: "pipe-id",
    name: "Name of pipe",
    type: "pipe",
    source: {
      type: "json",
      system: "<name of system>",
      url: "/entities/get"
    }, 
  };
  
  render() {
    return(
      <div class="sort">
      <label>
      Pipe config options...
      <br></br>    
      <select class="btn-large btn-filter" onChange={this.sortByChanged} value={this.props.sortBy}>
          <option value="">Pick from available config</option>
          <option value="total_count">Projects using this extension</option>
          <option value="pull_count">Dockerhub Pulls</option>
          <option value="lastUpdate">Last Update</option>
      </select>
      </label>
      </div>
    );
  }
}

class SystemConfig extends React.Component {
  constructor(props) {
    super(props);
  }

  system = {
    _id: "<name of service i.e. kalmarunion>-connector",
    type: "system:microservice",
    docker: {
      environment: {
        password: "$SECRET(<scandinavian secret>)",
        username: "$ENV(<scandinavian username>)"
      },
      image: "sesamcommunity/<name of service>-connector:latest",
      port: 5000
    },
    verify_ssl: true
  };
  

  render() {
    return(
      <div>
        <br></br>
        <label>
              System config options...
              <br></br>    
              <select class="btn-large btn-filter" onChange={this.sortByChanged} value={this.props.sortBy}>
                  <option value="">Pick from available config</option>
                  <option value="total_count">Projects using this extension</option>
                  <option value="pull_count">Dockerhub Pulls</option>
                  <option value="lastUpdate">Last Update</option>
              </select>
        </label>
      </div>
      
    );
  }
}


function App() {
  return (
    <div className="App">
      <header>
        <h1>This is for reasons unknown...</h1>
      </header>
      <body>
        <div class="section" id="id7">
        <h4>{manifest.name}</h4>
        <div class="Markdown">
          <ReactMarkdown source={manifest.description} class="ReactMarkdown"></ReactMarkdown>
        </div>
          <TableRows></TableRows>
        </div>
        <br></br>
        <div>
          <PipeConfig></PipeConfig>
          <SystemConfig></SystemConfig>
        </div>
      </body>
      <footer>
        <br></br>
        <img src="https://media.giphy.com/media/xT0xevhcz1AOHKJFfy/giphy.gif" alt="Rickle Pickle"></img>
        <br></br>
      </footer>
    </div>
  );
}

export default App;
