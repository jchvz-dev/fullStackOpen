import { useState } from 'react'

const MostVoted = ({hasVoted, anecdote, votes}) => {
    if (hasVoted) {
        return (
            <div>
                <h3>Anecdote with most votes</h3>
                <p>{anecdote}</p>
                <p>- has {votes} votes</p>
            </div>
        )
    }
    return (
        <p>No votes have been received yet</p>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const total = anecdotes.length
   
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(total).fill(0))
    const [hasVoted, setHasVoted] = useState(false)

    const mostVoted = votes.indexOf(Math.max(...votes));

    const getRandomAnecdote = () => {
        const randomItem = Math.floor(Math.random() * total)
        setSelected(randomItem)
    }

    const addVote = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)
        setHasVoted(true)
    }

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <div>
            {anecdotes[selected]}
            </div>
            <p>- has {votes[selected]} votes</p>
            <button onClick={addVote}>Vote</button>
            <button onClick={getRandomAnecdote}>Next anecdote</button>

            <MostVoted hasVoted={hasVoted} anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />

        </div>
    )
}

export default App