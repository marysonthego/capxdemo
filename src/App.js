import { createRef, forwardRef, useEffect, useRef, useState } from "react";
import { MyCanvas } from "./MyCanvas";
import "./App.css";

function App() {
  const [total, setTotal] = useState(0);

  const handleInput = (e) => {
    e.preventDefault();
    const shapes = createShapes(total);
    console.log(`app shapes:`, shapes);
  };

  const createShapes = (total) => {
    const shapes = [];
    console.log(`Total=`, total);

    for (let i = 0; i < total; i++) {
      let x = getRandomIntInclusive(0, 800);
      console.log(`random x =`, x);

      let y = getRandomIntInclusive(0, 800);
      console.log(`random y =`, y);

      let size = getRandomIntInclusive(5, 15);
      console.log(`random size =`, size);

      let type = getRandomIntInclusive(0, 2);
      console.log(`random type =`, type);

      let r = getRandomIntInclusive(0, 255).toString(16).toUpperCase();
      if (r.length === 1) {
        r = "0".concat(r);
      }
      console.log(`random color R =`, r);

      let g = getRandomIntInclusive(0, 255).toString(16).toUpperCase();
      if (g.length === 1) {
        g = "0".concat(g);
      }
      console.log(`random color g =`, g);

      let b = getRandomIntInclusive(0, 255).toString(16).toUpperCase();
      if (b.length === 1) {
        b = "0".concat(b);
      }
      console.log(`random color b =`, b);

      let myColor = "#".concat(r, g, b);
      console.log(`mycolor=`, myColor);

      let shapeObj = { x, y, size, type, myColor };
      console.log(`shapeObj=`, JSON.stringify(shapeObj));

      shapes.push(shapeObj);
    }
    console.log(shapes);

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }
    return shapes;
  };
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleInput}>
          <label>How many shapes would you like to display? {"  "}</label>
          <input
            id="userInput"
            name="userInput"
            type="number"
            min="0"
            max="500"
            required
            value={total}
            onChange={(e) => setTotal(e.currentTarget.value)}
          />
          <span className="validity"></span>
          <div>
            <input type="submit" />
          </div>
        </form>
      </header>
    </div>
  );
};

export default App;
