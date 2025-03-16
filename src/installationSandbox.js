import { useState } from 'react';

function Title() {
  return <h1>Calculate !</h1>;
}

function Factorial() {
  const [number, setNumber] = useState(0);

  function factorial(n) {
    if (n === "") return 1;
    if (isNaN(n) || n < 0) return "Please enter a positive number";
    n = parseInt(n);
    if (n === 0) return 1;
    return n * factorial(n - 1);
  }

  return <>
    <label>
      Calculate factorial of :
      {' '}
      <input type="number" min={0} value={number} onChange={(e) => setNumber(e.target.value)} />
    </label>
    <p>> {factorial(number)}</p>
  </>
}

function AverageResult({faces, numberOfDice}) {
  if (numberOfDice <= 0 || faces <= 0 || isNaN(numberOfDice) || isNaN(faces)) return <p>Please enter only numbers above 0</p>
  faces = parseInt(faces);
  numberOfDice = parseInt(numberOfDice);
  const average = (faces + 1) / 2 * numberOfDice;
  return <p>Average total : {average}</p>
}

function AverageMinResult({faces, numberOfDice}) {
  if (numberOfDice <= 0 || faces <= 0 || isNaN(numberOfDice) || isNaN(faces)) return <p>Please enter only numbers above 0</p>
  let sum = 0;
  for (let i = 1; i <= faces; i++) {
    sum += i**numberOfDice;
  }
  const average = sum / faces**numberOfDice;
  return <p>Average result of lowest dice : {average}</p>
}

function AverageMaxResult({faces, numberOfDice}) {
  if (numberOfDice <= 0 || faces <= 0 || isNaN(numberOfDice) || isNaN(faces)) return <p>Please enter only numbers above 0</p>
  let sum = 0;
  for (let i = 1; i <= faces**numberOfDice; i++) {
    sum += Math.ceil(i**(1/numberOfDice));
  }
  const average = sum / faces**numberOfDice
  return <p>Average result of highest dice : {average}</p>
}

function AverageDiceResult() {
  const [faces, setFaces] = useState(6);
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [minActive, setMinActive] = useState(false);
  const [maxActive, setMaxActive] = useState(false);
  console.log(faces)

  return <>
    <label>
      Number of faces :
      {' '}
      <input type="number" min={1} value={faces} onChange={(e) => setFaces(e.target.value)} />
      Number of dice :
      {' '}
      <input type="number" min={1} value={numberOfDice} onChange={(e) => setNumberOfDice(e.target.value)} />
    </label>
    <AverageResult faces={faces} numberOfDice={numberOfDice} />
    <label>
      Activate min
      {' '}
      <input type="checkbox" checked={minActive} onChange={(e) => setMinActive(e.target.checked)} />
    </label>
    {minActive && <AverageMinResult faces={faces} numberOfDice={numberOfDice} />}
    <label>
      Activate max (may take a while and/or crash for number of dice >= 7)
      {' '}
      <input type="checkbox" checked={maxActive} onChange={(e) => setMaxActive(e.target.checked)} />
    </label>
    {maxActive && <AverageMaxResult faces={faces} numberOfDice={numberOfDice} />}
  </>
}

export default function App() {
  return <>
    <Title />
    <Factorial />
    <AverageDiceResult />
  </>
}