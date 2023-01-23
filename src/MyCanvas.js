import { forwardRef, useRef, useEffect, useState } from "react";

const MyCanvas = forwardRef(function MyCanvas({width, height, shapes, transparency, motion}, ref) {
  console.table(shapes);
  const velocityMin = -5.0;
  const velocityMax = 5.0;
  let velocity = 0;

  useEffect(() => {  //Draw the shapes
   if (ref.current) {
    const ctx = ref.current.getContext("2d");
    //Clear to prevent cumulative transparency
    ctx.clearRect(0,0,width,height);

    let side = 0;
    shapes.forEach(el => {
      ctx.fillStyle = el.myColor;
      ctx.strokeStyle = el.myColor;
      ctx.font = "13px sans-serif"; //13px ~ 10pt
      ctx.textBaseline = "bottom";
      switch (el.type) {
        case 0: //Square
            side = el.size/Math.SQRT2;
            if (transparency.Square === true) {
              ctx.globalAlpha = 0.5;
            } else {
              ctx.globalAlpha = 1.0;
            }
            ctx.fillRect(el.x, el.y, side, side);
            ctx.fillText(el.shapeName, el.x, el.y);
          break;
        case 1:  //Circle
          ctx.beginPath();
          ctx.arc(el.x, el.y, el.size, 0, Math.PI * 2, true);
          if (transparency.Circle === true) {
            ctx.globalAlpha = 0.5;
          } else {
            ctx.globalAlpha = 1.0;
          }
          ctx.fill();
          ctx.fillText(el.shapeName, el.x, el.y);
          break;
        case 2:  //Triangle
          side = el.size * Math.sqrt(3);
          let R = (side * .5) / Math.cos(Math.PI/6);
          let triangle = {
            x1: el.x + R,
            y1: el.y,
            x2: el.x + R * Math.cos(2 * Math.PI/3),
            y2: el.y + R * Math.sin(2 * Math.PI/3),
            x3: el.x + R * Math.cos(4 * Math.PI/3),
            y3: el.y + R * Math.sin(4 * Math.PI/3)
          };
          ctx.beginPath();
          ctx.moveTo(triangle.x1, triangle.y1);
          ctx.lineTo(triangle.x2, triangle.y2);
          ctx.lineTo(triangle.x3, triangle.y3);
          ctx.lineTo(triangle.x1, triangle.y1);
          ctx.closePath();
          if (transparency.Triangle === true) {
            ctx.globalAlpha = 0.5;
          } else {
            ctx.globalAlpha = 1.0;
          }
          ctx.stroke();
          ctx.fill();
          ctx.fillText(el.shapeName, el.x, el.y);
          break;
        default:
        break;
      }
    });
  };
},[ref, shapes, transparency]);



const MotionVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  Math.abs(getRandomFloat(velocityMin, velocityMax));
};

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

  return (
    <>
    <canvas
      ref={ref}
      width={width}
      height={height}
      style={{ border: "2px solid black", scale: "75%" }}
    />
    </>
  );
});

export {MyCanvas}
