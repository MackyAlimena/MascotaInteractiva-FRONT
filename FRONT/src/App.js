import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import DataPage from './DataPage'; // Import DataPage

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/data" element={<DataPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


/*
import React from 'react';
import Pets from './components/Pets';
import Statistics from './components/Statistics';


function App() {
    return (
        <div className="App">
            <Pets />
            <Statistics />
        </div>
    );
}

export default App;
*/
