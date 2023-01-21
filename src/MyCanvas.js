import { forwardRef, useEffect } from "react";

const MyCanvas = forwardRef(function MyCanvas({width, height, shapes}, ref) {
  console.table(shapes);

  useEffect(() => {  //Draw the shapes
   if (ref.current) {
    const ctx = ref.current.getContext("2d");
    let side = 0;
    shapes.forEach(el => {
      ctx.fillStyle = el.myColor;
      ctx.strokeStyle = el.myColor;
      ctx.font = "13px sans-serif"; //13px ~ 10pt
      ctx.textBaseline = "bottom";
      switch (el.type) {
        case 0: //Square
            side = el.size/Math.SQRT2;
            ctx.fillRect(el.x, el.y, side, side);
            ctx.fillText(el.shapeName, el.x, el.y);
          break;
        case 1:  //Circle
          ctx.beginPath();
          ctx.arc(el.x, el.y, el.size, 0, Math.PI * 2, true);
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
          ctx.stroke();
          ctx.fill();
          ctx.fillText(el.shapeName, el.x, el.y);
          break;
        default:
        break;
      }
    });
  };
},[ref, shapes]);

  return (
    <>
    <canvas
      ref={ref}
      width="800"
      height="800"
      style={{ border: "2px solid black" }}
    />
    </>
  );
});

const MyOffscreenCanvas = forwardRef(function MyOffscreenCanvas({width, height, shapes}, ref) {
  /* TODO
  Investigate using offScreenCanvas to build 800x800 canvas, then display it in a visible 600x600 canvas.
  Also good for optimizing redraws - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
  */

});

export {MyCanvas, MyOffscreenCanvas}
