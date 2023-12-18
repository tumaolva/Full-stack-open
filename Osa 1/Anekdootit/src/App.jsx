import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({ anecdote, votes }) => (
  <div>
    <p>{anecdote}</p>
    <p>Votes:{votes}</p>
  </div>
);

const TopAnecdote = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes);
  const indexOfMax = votes.indexOf(maxVotes);

  if (maxVotes === 0) {
    return <p>No votes yet</p>;
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[indexOfMax]} votes={maxVotes} />
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const randomAnecdotes = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex)
  }
  const anecdoteVote = () => {
    const cVotes = [...votes];
    cVotes[selected] += 1;
    setVotes(cVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
        <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
        <Button handleClick={anecdoteVote} text="vote" />
        <Button handleClick={randomAnecdotes} text="random anecdote"/>
      <h1>Anecdote with most votes</h1>
      <TopAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App