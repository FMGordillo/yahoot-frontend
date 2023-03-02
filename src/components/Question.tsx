import styled from "@emotion/styled";
import type { FunctionComponent } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Figure = styled.figure`
  width: 500px;
  img {
    width: 100%;
  }
`;

const Options = styled.ul`
  display: grid;
  gap: 4px;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  list-style: none;
`;

const Option = styled.li`
  width: 150px;
  height: 100px;
  & > button {
    width: 100%;
    height: 100%;
  }
`;

const QuestionContainer: FunctionComponent<any> = ({
  question,
  isAnswered,
  submitAnswer,
}) => (
  <Container>
    <h1>Question</h1>
    <p>{question.text}</p>
    <Figure>
      <img src={question.imgSrc} alt="Not working, sorry" />
    </Figure>
    <Options>
      {question.choices.map((choice: string) => (
        <Option key={choice}>
          <button
            disabled={isAnswered}
            onClick={() => {
              submitAnswer(choice);
            }}
          >
            {choice}
          </button>
        </Option>
      ))}
    </Options>
  </Container>
);

export default QuestionContainer;
