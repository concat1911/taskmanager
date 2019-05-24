import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';

const username = "Linh";

ReactDOM.render(<App username={username}/>, document.getElementById('root'));
