import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import AdminContainer from "./components/Admin";
import EndGameContainer from "./components/EndGame";
import NewUserContainer from "./components/NewUser";
import QuestionContainer from "./components/Question";

const Container = styled.div`
  display: grid;
  margin: 0 280px;
  grid-template-columns: 1fr auto;
`;

const socket = io("http://localhost:3001"); // change this to your server address

function App() {
  const [isEndGame, setIsEndGame] = useState(false);
  const [name, setName] = useState<string>();
  const [players, setPlayers] = useState([]);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState<string>();
  const [_score, setScore] = useState(0);

  useEffect(() => {
    socket.on("players", (_players) => {
      setPlayers(_players);
    });

    socket.on("question", (_question) => {
      setQuestion(_question);
      setAnswer(undefined);
    });

    socket.on("answer", (isCorrect) => {
      if (isCorrect) {
        setScore((prev) => prev + 100);
      }
    });

    socket.on("reset", () => {
      setQuestion(null);
      setIsEndGame(false);
      setAnswer(undefined);
    });

    socket.on("game-over", () => {
      setQuestion(null);
      setIsEndGame(true);
      setAnswer(undefined);
    });
  }, [setQuestion, setScore, setPlayers]);

  const handleSubmit = (e: any, _name: string) => {
    e.preventDefault();
    joinRoom(_name);
    setName(_name);
  };

  const submitAnswer = (answer: string) => {
    setAnswer(answer);
    socket.emit("answer", answer);
  };

  const joinRoom = (name: string) => {
    socket.emit("join", name);
  };

  return (
    <Container>
      <div>
        {name === "ADMIN" && <AdminContainer socket={socket} />}
        {isEndGame && <EndGameContainer />}
        {!name && <NewUserContainer handleSubmit={handleSubmit} />}
        {question && (
          <QuestionContainer
            isAnswered={!!answer}
            question={question}
            submitAnswer={submitAnswer}
          />
        )}
      </div>
      <aside>
        <h1>Players:</h1>
        {players.map((player: any) => (
          <p key={player.id}>{player.name}</p>
        ))}
      </aside>
    </Container>
  );
}

export default App;
