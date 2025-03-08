import { useState } from 'react';

export default function MyButton() {
  const [thing, setAnything] = useState(0);

  function handleClick() {
    setAnything(thing + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {thing} times
    </button>
  );
}