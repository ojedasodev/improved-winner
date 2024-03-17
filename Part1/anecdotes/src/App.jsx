/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};
const Title = ({ text }) => <h1>{text}</h1>;
const Content = ({ anecdote, votes }) => {
  return (
    <p>
      {anecdote}
      <br />
      Has {votes} votes
    </p>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const handleClick = (type) => () => {
    switch (type) {
      case "vote":
        const copy = [...votes];
        copy[selected] += 1;
        setVotes(copy);
        console.log("votes on ", selected, " ", copy[selected]);
        break;
      case "next":
        const newRamdomNumber = Math.floor(Math.random() * anecdotes.length);
        setSelected(newRamdomNumber);
        console.log("anecdote: ", newRamdomNumber);
        break;
      default:
        break;
    }
  };
  const maxVotesAnecdote = () => {
    const maxVotes = anecdotes[votes.indexOf(Math.max(...votes))];
    console.log("current max votes: ", maxVotes);
    return maxVotes;
  };
  return (
    <div>
      <Title text={"Anecdote of the day"} />
      <Content anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text={"vote"} onClick={handleClick("vote")} />
      <Button text={"next anecdote"} onClick={handleClick("next")} />
      <Title text={"Anecdote with most votes"} />
      <Content anecdote={maxVotesAnecdote()} votes={Math.max(...votes)} />
    </div>
  );
};

export default App;
