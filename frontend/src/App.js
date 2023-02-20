// Importing modules
import React, {useState, useEffect} from "react";
import "./App.css";
  
function App() {
    const [data, setData] = useState([{}])
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
            <p><b>ndcg: </b>{data.ndcg}</p>
            <p><b>precision: </b>{data.precision}</p>
            <p><b>recommendation: </b>{data.recommendations}</p>
            <p><b>success: </b>{data.success}</p>
            <p><b>user_id: </b>{data.user_id}</p>
        </div>
    );
}
  
export default App;
