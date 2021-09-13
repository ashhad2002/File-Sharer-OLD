import React, { Component, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import File from './File'

class App extends Component {

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  fileUploadHandler = async event => {
    let formData = new FormData();
    formData.append('file', this.state.selectedFile);
    await axios.post(' http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  render() {
    return (
      <Router>
      <div>
        <nav>
          <Link to="/">Download</Link> <br/>
          <Link to="/upload">Upload</Link>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/upload">
          <div className="App">
            <input type="file" onChange={this.fileSelectedHandler}/>
            <button onClick={this.fileUploadHandler}>Upload</button>
          </div>
          </Route>
          <Route path="/">
            <Download />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}

// function Upload() {
// }

function Download() {
    const [Files, setFiles] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/')
    .then((response) => {
      setFiles(response.data);
    });
  }, []);

  return (
    <h2>{Files.map(file => <File key={file._id} File={file} />)}</h2>
  );
}


export default App;
