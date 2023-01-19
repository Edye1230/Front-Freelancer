import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
<nav className="navbar navbar-dark bg-dark">
<div className="container-fluid m-2">
    <a className="navbar-brand" href="#">Invoice Generator</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="#">Home</a>
        <a className="nav-link" href="#">Features</a>
        <a className="nav-link" href="#">Pricing</a>
        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
      </div>
    </div>
  </div>
</nav>
    <App />
    <footer className="bg-dark text-center text-lg-start fixed-bottom">
  <div className="text-center p-3 text-light m-2">
    Edye QS | Copyright 2023
  </div>
</footer>
  </React.StrictMode>,
  
)
