import styled from "@emotion/styled";
import AdminContainer from "components/Admin";
import EndGameContainer from "components/EndGame";
import NewUserContainer from "components/NewUser";
import QuestionContainer from "components/Question";
import SEO from "components/SEO";
import { ReactElement, useEffect, useState } from "react";
import io from "socket.io-client";
import { mediaQuery } from "styles";

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${mediaQuery("md")} {
    grid-template-columns: auto;
  }
`;

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:3001");

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
        {!name && (
          <NewUserContainer
            isDisabled={!socket.connected}
            handleSubmit={handleSubmit}
          />
        )}
        {question && (
          <QuestionContainer
            isAnswered={!!answer}
            question={question}
            submitAnswer={submitAnswer}
          />
        )}
      </div>
      <section>
        <h1>Players:</h1>
        {players.map((player: any) => (
          <p key={player.id}>{player.name}</p>
        ))}
      </section>
    </Container>
  );
}

App.getLayout = (page: ReactElement) => (
  <>
    <SEO title="Game" />
    {page}
  </>
);

export default App;
