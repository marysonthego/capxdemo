const Counter = () => {
  const [count, setCount] = React.useState(0)

  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const animate = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;

      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setCount(prevCount => (prevCount + deltaTime * 0.01) % 100);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  return <div>{Math.round(count)}</div>
}

ReactDOM.render(<Counter />, document.getElementById('app'))



const element = document.getElementById('some-element-you-want-to-animate');
let start, previousTimeStamp;
let done = false

function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
    }
  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    // Math.min() is used here to make sure the element stops at exactly 200px
    const count = Math.min(0.1 * elapsed, 200);
    element.style.transform = `translateX(${count}px)`;
    if (count === 200) done = true;
  }

  if (elapsed < 2000) { // Stop the animation after 2 seconds
    previousTimeStamp = timestamp;
    if (!done) {
      window.requestAnimationFrame(step);
    }
  }
}

window.requestAnimationFrame(step);
