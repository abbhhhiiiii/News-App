
import './App.css';
import React, { Component } from 'react'
import News from './components/News';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {

  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={6} country="us" category="general"/>}></Route>
          <Route exact path="/business"element={<News key="business" pageSize={6} country="us" category="business"/>}></Route>
          <Route exact path="/entertainment"element={<News key="entertainment" pageSize={6} country="us" category="entertainment"/>}></Route>
          <Route exact path="/general"element={<News key="general" pageSize={6} country="us" category="general"/>}></Route>
          <Route exact path="/health"element={<News key="health" pageSize={6} country="us" category="health"/>}></Route>
          <Route exact path="/science"element={<News key="science" pageSize={6} country="us" category="science"/>}></Route>
          <Route exact path="/sports"element={<News key="sports" pageSize={6} country="us" category="sports"/>}></Route>
          <Route exact path="/technology"element={<News key="technology" pageSize={6} country="us" category="technology"/>}></Route>
        </Routes>
        </Router>
      </div>
    )
  }
}
