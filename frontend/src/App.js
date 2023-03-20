// Importing modules
import React, {useState, useEffect} from "react";
import "./App.css";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Movies from "./MovieBox"

function App() {
    const [data, setData] = useState([{}]);
    const [toggle, setToggle] = useState(false);
    
    const handleClick = () => {
        setToggle(!toggle);
    };
    
    
    // Using useEffect for single rendering
    useEffect(() => {
        fetch('/recommend').then(
            res => res.json().then(data => {
                setData(data)
            })
        )
    }, []);

    var dict_rec = data.recommendations;
    const movie_array = [];
    var i = 0;

    for (var key in dict_rec){
        movie_array[i] = dict_rec[key][0]
        i++;
    }

    var first_mov_ex = movie_array[0]?.substring(0, movie_array[0].length - 7)
    first_mov_ex = first_mov_ex?.replace(/\s/g, '+');

    return (
        <div>
            <AppBar position="static" title = "">
                <h3>Recommendation System</h3>
            </AppBar>
            <div className="App">
                <div>{first_mov_ex}</div>
                <Movies movie_array={first_mov_ex}/>
                
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
