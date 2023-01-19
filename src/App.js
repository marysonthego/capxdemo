import { createRef, forwardRef, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [total, setTotal] = useState(0);

  const handleInput = (e) => {
    let value = e.currentTarget.value;
    console.log(`value=`, value);
    if (value > 500 || value < 0) {
      return <>Please enter a number between 0 and 500</>;
    } else {
      setTotal(value);
    }
  };

  const Rectangle = () => {
    const ref = useRef(HTMLCanvasElement);
    useEffect(() => {
      if (ref.current) {
        const ctx = ref.current.getContext("2d");
        ctx.strokeRect(200, 200, 40, 50);
      }
    }, [ref]);
    return (
      <canvas
        ref={ref}
        width="600"
        height="600"
        style={{ border: "2px solid black" }}
      />
    );
  };

  const Circle =() => {
    const ref = useRef(HTMLCanvasElement);
    const [startX, setStartX] = useState(0);
    useEffect(() => {
      if (ref.current) {
        const ctx = ref.current.getContext("2d");

        requestAnimationFrame(function ball() {
          drawCircle(ctx, {
            radius: 50,
            lineWidth: 3,
            strokeStyle: "#4F7CAC",
            colorFill: "#4F7CAC",
            startY: 150,
            startX
          });
          setStartX((prevStartX) => prevStartX + 5);
          ctx.stroke();
          if (startX > 400) {
             setStartX(0);
           }
        });
      }
    }, [startX, ref]);
    return (
       <>
         <h1>Moving Circle</h1>
         <canvas
           ref={ref}
           width="400"
           height="350"
           style={{ border: "2px solid black" }}
         />
       </>
     );
   };

   const DrawTriangle = () => {
    const [startX, setStartX] = useState(0);
    const ref = useRef(HTMLCanvasElement);
    useEffect(() => {
      if (ref.current) {
        const ctx = ref.current.getContext("2d");

        requestAnimationFrame(function ball() {
          drawCircle(ctx, {
            radius: 50,
            lineWidth: 3,
            strokeStyle: "#4F7CAC",
            colorFill: "#4F7CAC",
            startY: 150,
            startX
          });
          setStartX((prevStartX) => prevStartX + 5);
          ctx?.stroke();
          if (startX > 400) {
             setStartX(0);
           }
        });
      }
    }, [startX]);
    return (
      <>
        <h1>Moving Circle</h1>
        <canvas
          ref={ref}
          width="400"
          height="350"
          style={{ border: "2px solid black" }}
        />
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <div>
            <label>How many shapes would you like to display? {"  "}</label>
            <input
              id="userInput"
              name="userInput"
              type="number"
              min="0"
              max="500"
              required
              onInput={(e) => {
                handleInput(e);
              }}
            />
            <span className="validity"></span>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </header>
      <Rectangle />
      <Circle />
      <DrawTriangle />
    </div>
  );
};

export const drawCircle = (
  ctx,
  circleDims,
  rectDims = { w: 400, h: 3500 }
) => {
 const {
    radius,
    strokeStyle,
    startX,
    startY,
    lineWidth,
    colorFill
  } = circleDims;
  ctx.clearRect(0, 0, rectDims.w, rectDims.h);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;

  ctx.beginPath();
  ctx.arc(startX, startY, radius, 0, Math.PI * 2, true);
  ctx.stroke();
 if (colorFill) {
    ctx.fillStyle = colorFill;
    ctx.fill();
  }
};



export default App;
