import { createRef, forwardRef, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [total, setTotal] = useState(0);
  const [shapes, setShapes] = useState([]);
  const ref = useRef(null);

  const handleInput = (e) => {
    e.preventDefault();
    createShapes();
  };

  const createShapes = () => {
    //console.log(`createShapes Total=`, total);

    for (let i = 0; i < total; i++) {
      let id = i;
      let x = getRandomIntInclusive(0, 800);
      //console.log(`createShapes random x =`, x);

      let y = getRandomIntInclusive(0, 800);
      //console.log(`random y =`, y);

      let size = getRandomIntInclusive(5, 15);
      //console.log(`random size =`, size);

      let type = getRandomIntInclusive(0, 2);
      //console.log(`random type =`, type);

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

      const shapeObj = { id, x, y, size, type, myColor };
      //console.log(`createShapes shapeObj=`, JSON.stringify(shapeObj));
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

  const MyCanvas = forwardRef(function MyCanvas({width, height, shapes}, ref) {

    useEffect(() => {
      if (ref.current) {
        const ctx = ref.current.getContext("2d");
        shapes.forEach(el => {
          switch (el.type) {
            case '0':
              console.log('case 0');
              break;
            case 1:
              console.log('case 1');
              break;
            case 2:
              console.log('case 2');
              break;
            default:
            break;
          }
        });
        ctx.strokeRect(200, 200, 40, 50);
      };
    }, [ref]);

    return (
      <>
      <canvas
        ref={ref}
        width="600"
        height="600"
        style={{ border: "2px solid black" }}
      />
      </>
    );
  });

  const Rectangle = () => {
    const ref = useRef(HTMLCanvasElement);
    useEffect(() => {
      if (ref.current) {
        const ctx = ref.current.getContext("2d");
        ctx.strokeRect(200, 200, 40, 50);
      }
    }, [ref]);
  };

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
          <>
            <button onClick={(e) => {
              handleInput(e); }} >
              Submit
            </button>
          </>
          </span>
      </header>
      <div>
      <ul>
        {
        shapes.map(({id, x, y, size, type, myColor}) => (

          <li key={id} color={myColor}>x={x} y={y} size={size} type={type} color={myColor}</li>

        ))
        }
      </ul>
      </div>
      <div>
      <MyCanvas width="600" height="600" shapes={shapes} ref={ref}/>
      </div>
    </div>
  );
};

export default App;
