import React, { createRef } from 'react';
import './App.css';

function App() {
  const [showResults, setShowResults] = React.useState(false)
  const [operationsS, setOperations] = React.useState([])
  const [randomsS, setRandoms] = React.useState([])
  const [sumsS, setSums] = React.useState([])
  const [initialS, setInitial] = React.useState(0)
  function handleSubmit(e) {
    e.preventDefault();
    const appmax = Number(e.target.elements.appsubmit.value)
    const appnum = Number(e.target.elements.appnum.value)
    const ops = ['+', '-']
    var start = 0

    const randInt = (a) => {
      return Math.round(Math.random() * a)
    }


    const operations = []
    const randoms = []
    const sums = []

    for (let i = 0; i < appnum; i++) {
      while (true) {
        var op = ops[randInt(ops.length - 1)]
        var prev = i == 0 ? randInt(appmax) : sums[i - 1]
        var random = randInt(appmax)
        var sum = op == '+' ? prev + random : prev - random
        console.log(prev, op, random, '=', sum)
        if ((sum >= 0) && (sum <= appmax)) {
          if (i == 0) { setInitial(prev) }
          operations.push(op)
          randoms.push(random)
          sums.push(sum)
          break
        }
      }
    }
    console.log(operations)
    console.log(randoms)
    console.log(sums)
    //const els = Array.from(Array(Number(e.target.elements.appnum.value)).keys())
    //console.log(els)
    setOperations(operations)
    setRandoms(randoms)
    setSums(sums)
    setShowResults(true)

  }

  const DivList = () => {
    const rowList = [];
    for (let i = 0; i < operationsS.length; i++) {
      rowList.push(
        <div className='op' key={i}>
          <div className='number'>{i + 1}</div>
          <div className='text'>{i == 0 ? initialS : <span className='index'>{i}</span>}{operationsS[i]}
            {randomsS[i]}=<span className='under' /></div>
        </div>);
    }
    return rowList;
  }

  const Results = () => (
    <div className="ops">
      {<DivList />}
    </div>
  )

  const Answers = () => (
    <div className="answers">
      {sumsS.map((sum, i) => <span key={i}>[{i + 1}]:{sum} </span>)}
    </div>
  )

  return (
    <div className="App">
      {showResults ? null :
        <div id="settings">
          <form onSubmit={handleSubmit}>
            <p>
              Количество операций: <input id="appnum" type="number" defaultValue={12} />
            </p>
            <p>
              Максимальное число: <input id="appsubmit" type="number" defaultValue={20} />
            </p>
            <p>
              <input type="submit" value="Сгенерировать" />
            </p>
          </form>
        </div>
      }
      <div>
        {showResults ? <Results /> : null}
      </div>
      <div>
        {showResults ? <Answers /> : null}
      </div>
    </div >
  );
}

export default App;
