/* eslint-disable no-case-declarations */
import { useState } from "react";

const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>;
const Header = ({ title }) => <h1>{title}</h1>;
const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {text === "positive" ? "%" : ""}
      </td>
    </tr>
  );
};
const Statistics = ({ statistics }) => {
  if (statistics.all === 0) {
    return <h2>No feedback given</h2>;
  }
  return (
    <>
      <table>
        <tbody>
          <StatisticsLine text={"good"} value={statistics.good} />
          <StatisticsLine text={"neutral"} value={statistics.neutral} />
          <StatisticsLine text={"bad"} value={statistics.bad} />
          <StatisticsLine text={"all"} value={statistics.all} />
          <StatisticsLine text={"average"} value={statistics.avg} />
          <StatisticsLine text={"positive"} value={statistics.positive} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [avg, setAvg] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleClick = (name) => () => {
    const updatedAll = all + 1;
    const updatedAvg = updatedAll / 3;
    setAll(updatedAll);
    setAvg(updatedAvg);
    switch (name) {
      case "good":
        const updatedGood = good + 1;
        const updatedPositive = (updatedGood / updatedAll) * 100;
        setGood(updatedGood);
        setPositive(updatedPositive);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        setPositive((good / updatedAll) * 100);
        break;
      case "bad":
        setBad(bad + 1);
        setPositive((good / updatedAll) * 100);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Header title={"give feedback"} />
      <Button name="good" onClick={handleClick("good")} />
      <Button name="neutral" onClick={handleClick("neutral")} />
      <Button name="bad" onClick={handleClick("bad")} />
      <Header title={"statistics"} />
      <Statistics statistics={{ good, neutral, bad, all, avg, positive }} />
    </div>
  );
};

export default App;
