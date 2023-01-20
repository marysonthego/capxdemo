import { useRef, useState } from "react";
import "./App.css";
import {MyCanvas } from './MyCanvas';

function App() {
  const [total, setTotal] = useState(0);
  const [shapes, setShapes] = useState([]);
  const [transparency, setTransparency] = useState({
    Square: true,
    Circle: true,
    Triangle: true
  });
  const ref = useRef(null);
  const reload = () => window.location.reload(true);

  const handleInput = (e) => {
    e.preventDefault();
    if(total > 0 && total < 501){
      createShapes();
    }
  };

  const createShapes = () => {
    for (let i = 0; i < total; i++) {
      let id = i;
      let shapeName = "Mary" + i;
      let x = getRandomIntInclusive(0, 800);

      let y = getRandomIntInclusive(0, 800);

      let size = getRandomFloat(5.0, 15.0);

      let type = getRandomIntInclusive(0, 2);
      let typeName;
      if (type === 0) typeName="Square";
      if (type === 1) typeName="Circle";
      if (type === 2) typeName="Triangle";

      let r = getRandomIntInclusive(0, 255).toString(16).toUpperCase();
      if (r.length === 1) {
        r = "0".concat(r);
      }

      let g = getRandomIntInclusive(0, 255).toString(16).toUpperCase();
      if (g.length === 1) {
        g = "0".concat(g);
      }

      let b = getRandomIntInclusive(0, 255).toString(16).toUpperCase();
      if (b.length === 1) {
        b = "0".concat(b);
      }

      let myColor;
      if(transparency[typeName] === true) {
        myColor = "#".concat(r,g,b,"80"); //50% transparency
      } else {
        myColor = "#".concat(r,g,b,"FF"); //Opaque
      }

      const shapeObj = { shapeName, id, x, y, size, type, typeName, myColor };
      setShapes(
        shapes => [...shapes, shapeObj],
        );
    }

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }
  };

  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  return (
    <div className="App">
      <header className="App-header">
        <span>
          <label>How many shapes would you like to display? {"  "}</label>
          <input
            type="number"
            min="0"
            max="500"
            required
            value={total}
            onChange={e => setTotal(e.target.value)}
          />
          <span className="validity"></span>
            <button onClick={(e) => {
              handleInput(e); }} >
              Submit
            </button>
            {"  "}
            <button onClick={reload}>
              Reset
            </button>
          </span>
      </header>
      <div>
      </div>
      <div>
      <MyCanvas width="600" height="600" shapes={shapes} ref={ref}/>
      </div>
      <span>
        Toggle Transparency of shapes! {"  "}
        <button onClick={() => {
          if(transparency.Square === true) {           setTransparency({
            ...transparency, Square: false
          });
        } else {
          setTransparency({
            ...transparency, Square: true
          });
        }
        }}> Squares </button>
        {"  "}
        <button onClick={(e) => {
          if(transparency.Circle === true) {           setTransparency({
            ...transparency, Circle: false
          });
        } else {
          setTransparency({
            ...transparency, Circle: true
          });
        }
        }}> Circles </button>
        {"  "}
        <button onClick={(e) => {
         if(transparency.Triangle === true) {           setTransparency({
          ...transparency, Triangle: false
        });
        } else {
          setTransparency({
            ...transparency, Triangle: true
          });
        }
        }}> Triangles </button>
      </span>
    </div>
  );
};

export default App;
