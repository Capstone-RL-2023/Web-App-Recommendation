// Importing modules
import React, {useState, useEffect} from "react";
import "./App.css";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';

  
function App() {
    const [data, setData] = useState([{}])
    const [toggle, setToggle] = useState(false);
    const handleClick = () => {
        setToggle(!toggle);
    };
    
    
    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("/recommend").then(
            res => res.json().then(data => {
                setData(data)
            })
        );
    }, [])

    
    return (
        <div>
            <AppBar position="static" title = "">
                <div  className="navbar">
                    <h3>Recommendation System</h3>
                </div>        
            </AppBar>
            <div className="App">
            <p><b>Recommendation: </b>{data.recommendations}</p>
            <Button variant="contained" className="Button-stats" onClick={handleClick}>View Stats</Button>

            <div style={{ display: toggle ? 'block' : 'none' }}>
                    <p><b>ndcg: </b>{data.ndcg}</p>
                    <p><b>precision: </b>{data.precision}</p>
                    <p><b>user_id: </b>{data.user_id}</p>
            </div>
            </div>
        </div>
    );
}
  
export default App;
