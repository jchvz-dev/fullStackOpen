import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    if (all === 0) { 
        return (
            <p>No feedback given</p>
        )
    }
    
    return (
        <table>
            <tbody>
                <StatisticLine text='Good' value={good} />
                <StatisticLine text='Neutral' value={neutral} />
                <StatisticLine text='Bad' value={bad} />
                <StatisticLine text='All' value={all} />
                <StatisticLine text='Average' value={(good - bad)/all} />
                <StatisticLine text='Positive' value={`${(good*100)/all} %`} />
            </tbody>
        </table>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}:</td>
            <td>{value}</td>
        </tr>
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
            <Button onClick={addGood} text='Good' />
            <Button onClick={addNeutral} text='Neutral' />
            <Button onClick={addBad} text='Bad' />

            <h2>Statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App