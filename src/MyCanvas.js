import { forwardRef, useEffect } from "react";

const MyCanvas = forwardRef(function MyCanvas({width, height, shapes}, ref) {
  console.table(shapes);

  useEffect(() => {
   if (ref.current) {
    const ctx = ref.current.getContext("2d");
    let side = 0;
    shapes.forEach(el => {
      ctx.fillStyle = el.myColor;
      ctx.strokeStyle = el.myColor;
      switch (el.type) {
        case 0: //Square
          //console.log('case 0');
            side = el.size/Math.SQRT2;
            ctx.fillRect(el.x, el.y, side, side);
          break;
        case 1:  //Circle
          //console.log('case 1');
          ctx.beginPath();
          ctx.arc(el.x, el.y, el.size, 0, Math.PI * 2, true);
          ctx.fill();

          break;
        case 2:  //Triangle
          //console.log('case 2');
          side = el.size * Math.sqrt(3);
          let R = (side * .5) / Math.cos(Math.PI/6);
          //let height = Math.sqrt(3) / 2 * side;
          //console.log(`R=`, R, `size=`, el.size, `side=`, side);
          let triangle = {
            x1: el.x + R,
            y1: el.y,
            x2: el.x + R * Math.cos(2 * Math.PI/3),
            y2: el.y + R * Math.sin(2 * Math.PI/3),
            x3: el.x + R * Math.cos(4 * Math.PI/3),
            y3: el.y + R * Math.sin(4 * Math.PI/3)
          };
          //console.log(`el.x=`, el.x, `el.y=`, el.y);
          //console.log(`x1,y1=${triangle.x1} ${triangle.y1} x2,y2=${triangle.x2} ${triangle.y2} x3,y3=${triangle.x3} ${triangle.y3}` );
          ctx.beginPath();
          ctx.moveTo(triangle.x1, triangle.y1);
          ctx.lineTo(triangle.x2, triangle.y2);
          ctx.lineTo(triangle.x3, triangle.y3);
          ctx.lineTo(triangle.x1, triangle.y1);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
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
  //console.table(shapes);

  useEffect(() => {
   if (ref.current) {
    const ctx = ref.current.getContext("2d");
    let side = 0;
    shapes.forEach(el => {
      ctx.fillStyle = el.myColor;
      ctx.strokeStyle = el.myColor;
      switch (el.type) {
        case 0: //Square
          //console.log('case 0');
            side = el.size/Math.SQRT2;
            ctx.fillRect(el.x, el.y, side, side);
          break;
        case 1:  //Circle
          //console.log('case 1');
          ctx.beginPath();
          ctx.arc(el.x, el.y, el.size, 0, Math.PI * 2, true);
          ctx.fill();

          break;
        case 2:  //Triangle
          //console.log('case 2');
          side = el.size * Math.sqrt(3);
          let R = (side * .5) / Math.cos(Math.PI/6);
          //let height = Math.sqrt(3) / 2 * side;
          //console.log(`R=`, R, `size=`, el.size, `side=`, side);
          let triangle = {
            x1: el.x + R,
            y1: el.y,
            x2: el.x + R * Math.cos(2 * Math.PI/3),
            y2: el.y + R * Math.sin(2 * Math.PI/3),
            x3: el.x + R * Math.cos(4 * Math.PI/3),
            y3: el.y + R * Math.sin(4 * Math.PI/3)
          };
          //console.log(`el.x=`, el.x, `el.y=`, el.y);
          //console.log(`x1,y1=${triangle.x1} ${triangle.y1} x2,y2=${triangle.x2} ${triangle.y2} x3,y3=${triangle.x3} ${triangle.y3}` );
          ctx.beginPath();
          ctx.moveTo(triangle.x1, triangle.y1);
          ctx.lineTo(triangle.x2, triangle.y2);
          ctx.lineTo(triangle.x3, triangle.y3);
          ctx.lineTo(triangle.x1, triangle.y1);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
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
      width="600"
      height="600"
      style={{ border: "2px solid black" }}
    />
    </>
  );
});



export {MyCanvas, MyOffscreenCanvas}
