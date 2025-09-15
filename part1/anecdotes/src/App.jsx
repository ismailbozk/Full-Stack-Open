import { useState } from "react";

function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}

function ButtonArray({ onVoteClick, voteText, onNextClick, nextText }) {
  return (
    <div>
      <Button onClick={onVoteClick} text={voteText} />
      <Button onClick={onNextClick} text={nextText} />
    </div>
  );
}

function AnecdoteView({ title, anecdote, voteCount }) {
  return (
    <div>
      <h1>{title}</h1>
      <div>{anecdote}</div>
      <div>has {voteCount} votes</div>
    </div>
  );
}

function MostVotedAnecdote({ title, anecdotes, voteCounts }) {
  const maxVoteCount = Math.max(...voteCounts);
  const indexOfMax = voteCounts.indexOf(maxVoteCount);
  const mostVotedAnecdote = anecdotes[indexOfMax];
  return (
    <AnecdoteView
      title={"Anecdote with most votes"}
      anecdote={mostVotedAnecdote}
      voteCount={maxVoteCount}
    />
  );
}
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
  const [voteCounts, setVoteCount] = useState(Array(anecdotes.length).fill(0));

  function onVoteClick() {
    const copy = [...voteCounts];
    copy[selected] += 1;
    setVoteCount(copy);
  }

  const onNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <>
      <div>
        <AnecdoteView
          title={"Anecdote of the day"}
          anecdote={anecdotes[selected]}
          voteCount={voteCounts[selected]}
        />
      </div>
      <div>
        <ButtonArray
          onVoteClick={onVoteClick}
          voteText="Vote"
          onNextClick={onNextClick}
          nextText="Next Anecdote"
        />
      </div>
      <div>
        <MostVotedAnecdote
          anecdotes={anecdotes}
          voteCounts={voteCounts}
        />
      </div>
    </>
  );
};

export default App;
