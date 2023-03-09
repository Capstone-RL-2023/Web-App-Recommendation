// Importing modules
import React, {useState, useEffect} from "react";
import "./App.css";
  
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
        <div className="App">
            <h1>Recommendation System</h1>
            <p><b>recommendation: </b>{data.recommendations}</p>
            <button className="Button-stats" onClick={handleClick}>View Stats</button>

            <div style={{ display: toggle ? 'block' : 'none' }}>
                    <p><b>ndcg: </b>{data.ndcg}</p>
                    <p><b>precision: </b>{data.precision}</p>
                    <p><b>user_id: </b>{data.user_id}</p>
            </div>
        </div>
    );
}
  
export default App;
