import { useRef, useState } from "react";
import "./App.css";
import {MyCanvas } from './MyCanvas';

function App() {
  const [total, setTotal] = useState(0);
  const [shapes, setShapes] = useState([]);
  const ref = useRef(null);
  //const offRef = useRef(null);
  const reload = () => window.location.reload(true);

  const handleInput = (e) => {
    e.preventDefault();
    if(total > 0 && total < 501){
      createShapes();
      //MyOffscreenCanvas({width:"800", height:"800", shapes:{shapes}, ref:{offRef}});
    }
  };

  const createShapes = () => {
    console.log(`createShapes Total=`, total);

    for (let i = 0; i < total; i++) {
      let id = i;
      let shapeName = "Mary" + i;
      let x = getRandomIntInclusive(0, 800);
      //console.log(`createShapes random x =`, x);

      let y = getRandomIntInclusive(0, 800);
      //console.log(`random y =`, y);

      let size = getRandomFloat(5.0, 15.0);
      //console.log(`random size =`, size);

      let type = getRandomIntInclusive(0, 2);
      //console.log(`random type =`, type);
      let typeName;
      if (type === 0) typeName="Square";
      if (type === 1) typeName="Circle";
      if (type === 2) typeName="Triangle";

      let r = getRandomIntInclusive(0, 255).toString(16).toUpperCase();
      if (r.length === 1) {
        r = "0".concat(r);
      }
      //console.log(`random color R =`, r);

      let g = getRandomIntInclusive(0, 255).toString(16).toUpperCase();
      if (g.length === 1) {
        g = "0".concat(g);
      }
      //console.log(`random color g =`, g);

      let b = getRandomIntInclusive(0, 255).toString(16).toUpperCase();
      if (b.length === 1) {
        b = "0".concat(b);
      }
      //console.log(`random color b =`, b);

      let myColor = "#".concat(r, g, b);
      //let myColor = "".concat(r, g, b);
      //console.log(`mycolor=`, myColor);

      const shapeObj = { shapeName, id, x, y, size, type, typeName, myColor };
      console.log(`createShapes shapeObj=`, JSON.stringify(shapeObj));
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
    </div>
  );
};

export default App;
