import { useRef, useState } from "react";
import "./App.css";
import { MyCanvas } from "./MyCanvas";
import {Test} from "./test";

function App() {
  const [total, setTotal] = useState(0); // number of shapes selected
  const [shapes, setShapes] = useState([]); // the array of shapes
  let x, y;
  let intervalID;
  const forward = useRef(false);
  const backward = useRef(false);

  // all shapes start out transparent
  const [transparency, setTransparency] = useState({
    Square: true,
    Circle: true,
    Triangle: true,
  });

  const ref = useRef(null);
  const reload = () => window.location.reload(true);

  // submit button handler
  const handleInput = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    if (total > 0 && total < 501) {
      createShapes();
    }
  };

  const createShapes = () => {
    for (let i = 0; i < total; i++) {
      let id = i;
      let shapeName = "Mary" + i;
      // randomize initial x,y coordinates
      x = getRandomIntInclusive(0, 800);
      y = getRandomIntInclusive(0, 800);
      console.log(`initial x=`, x, `initial y=`, y);

      // randomize radius (size) bounded 5-15
      let size = getRandomFloat(5.0, 15.0);

      // randomize shape to display
      let type = getRandomIntInclusive(0, 2);

      // this could be an enumeration
      let typeName;
      if (type === 0) typeName = "Square";
      if (type === 1) typeName = "Circle";
      if (type === 2) typeName = "Triangle";

      // build random hex colors #RRGGBB
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

      let myColor = "#".concat(r, g, b);

      // Add shape to state
      const shapeObj = { shapeName, id, x, y, size, type, typeName, myColor };
      setShapes((shapes) => [...shapes, shapeObj]);
    }

  };

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    // The maximum is inclusive and the minimum is inclusive
  }

  const getRandomFloat = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  const toggleTransparency = (e) => {
    e.preventDefault();
    const buttonName=e.target.name;
    if (transparency[buttonName] === true) {
      setTransparency({
        ...transparency,
        [buttonName]: false,
      });
    } else {
      setTransparency({
        ...transparency,
        [buttonName]: true,
      });
    };
  }

  const toggleMotion = (e) => {
    e.preventDefault();
    const buttonName=e.target.name;
    console.log(`buttonName=`,buttonName, `forward=`,forward.current, `backward=`,backward.current);
    switch (buttonName) {
      case "Forward":
        if (forward.current === true) {
          forward.current = false;
        } else if (forward.current === false) {
          forward.current = true;
          backward.current = false;
        };
      break;
      case "Backward":
          if (backward.current === true) {
            backward.current = false;
          } else if (backward.current === false) {
            backward.current = true;
            forward.current = false;
          };
      break;
      default:
      break;
    }
    console.log(`2 buttonName=`,buttonName, `forward=`,forward.current, `backward=`,backward.current);
    if(forward.current === true || backward.current === true) {
      Animate();
    }
  }

  const Animate = () => {
    let dx, dy;
    if (forward.current === true){
      dx = Math.abs(getRandomFloat(-5, 5));
      dy = Math.abs(getRandomFloat(-5, 5));
    } else if (backward.current === true) {
      dx = (-1 * Math.abs(getRandomFloat(-5, 5)));
      dy = (-1 * Math.abs(getRandomFloat(-5, 5)));
    }
    console.log(`dx=`, dx, `dy=`, dy);

    const updateShapes = () => {
      const newShapes = shapes.map((s, i) => {
        let tempShape = {...s};
        tempShape.x = s.x + dx;
        tempShape.y = s.y + dy;
        //shapeArray.push(tempShape);
        return tempShape;
      });
      setShapes(newShapes);
      // return (
      //   <MyCanvas width="800" height="800" shapes={shapeArray} transparency={transparency} ref={ref} />
      // )
    };

    if(forward.current === true || backward.current === true) {
      console.log(`1 intervalID=`, intervalID);
      if (!intervalID) {
        intervalID = setInterval(() => updateShapes(), 1000);
      };
    } else {
      console.log(`clearInterval`);
      clearInterval(intervalID);
    };
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
            onChange={(e) => setTotal(e.target.value)}
          />
          <span className="validity"></span>
          <button name="Submit"
            onClick={(e) => {
              handleInput(e);
            }}
          >
            Submit
          </button>
          {"  "}
          <button onClick={reload}>Reset</button>
        </span>
      </header>
      <div></div>
      <div >
        <MyCanvas width="800" height="800" shapes={shapes} transparency={transparency} ref={ref} />
      </div>
      <div>
      <span>
        Toggle Transparency! {"  "}
        <button name="Square"
          onClick={(e) => {toggleTransparency(e);
          }}
        >
          {" "}
          Squares{" "}
        </button>
        {"  "}
        <button name="Circle"
          onClick={(e) => {toggleTransparency(e);
          }}
        >
          {" "}
          Circles{" "}
        </button>
        {"  "}
        <button name="Triangle"
          onClick={(e) => {toggleTransparency(e);
          }}
        >
          {" "}
          Triangles{" "}
        </button>
        {"    "}Toggle Motion! {"  "}
          <button name="Forward"
            onClick={(e) => {toggleMotion(e);
            }}
          >
            {" "}
            Forward{" "}
          </button>
          {"  "}
          <button name="Backward"
            onClick={(e) => {toggleMotion(e);
            }}
          >
            {" "}
            Backward{" "}
          </button>
        </span>
      </div>
      <Test />
    </div>
  );
}

export default App;
