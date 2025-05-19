import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
    
    return (
        <div>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p><b>All: {good + neutral + bad}</b></p>
            <p>Average: {(good - bad)/(good + neutral + bad)}</p>
            <p>Positive: {(good * 100)/(good + neutral + bad)} %</p>
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const addGood = () => {
        setGood(good + 1)
    }

    const addNeutral = () => {
        setNeutral(neutral + 1)
    }

    const addBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>Give feedback</h1>
            <button onClick={addGood}>Good</button>
            <button onClick={addNeutral}>Neutral</button>
            <button onClick={addBad}>Bad</button>
            <h2>Statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App