import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1)/ total
  const percentageGood = good / total * 100 || 0;


  const goodReview = () => {
    
    const updatedGood = good + 1
    setGood(updatedGood)
    console.log('good feedback given. previous total' , good , 'new total', updatedGood)
  }

  const neutralReview = () => {
  
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    console.log('neutral feedback given. previous total' , neutral , 'new total', updatedNeutral)
  }
  const badReview = () => {  
    const updatedBad = bad + 1
    setBad(updatedBad)
    console.log('bad feedback given. previous total' , bad , 'new total', updatedBad)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
      </div>
      <div>
      <Button handleClick={goodReview} text="good" />
      <Button handleClick={neutralReview} text="neutral" />
      <Button handleClick={badReview} text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
      </div>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>total {total}</p>
        <p>average {isNaN(average) ? 0 : average}</p>
        <p>positive {isNaN(percentageGood) ? 0 : percentageGood}%</p>
      </div>
    </div>
  )
}

export default App