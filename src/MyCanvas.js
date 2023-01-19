import { createRef, forwardRef, useEffect, useRef, useState } from "react";

const MyCanvas = forwardRef(function MyCanvas({width, height}, ref) {

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

export {MyCanvas}
