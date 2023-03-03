import styled from "@emotion/styled";
import { FunctionComponent, useState } from "react";

type NewUserContainerProps = {
  handleSubmit: any;
  isDisabled: boolean;
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FormContainer = styled.form`
  display: flex;
  gap: 4px;
`;

const NewUserContainer: FunctionComponent<NewUserContainerProps> = ({
  handleSubmit,
  isDisabled,
}) => {
  const [name, setName] = useState<string>();

  // TODO: add validations?

  return (
    <Container>
      <h1>Enter your name</h1>
      <FormContainer
        onSubmit={(e) => {
          handleSubmit(e, name);
        }}
      >
        <input
          type="text"
          placeholder="Example: Pepepiojo"
          onChange={(e) => setName(e.target.value)}
        />
        <button disabled={isDisabled} type="submit">
          {isDisabled ? "No room available" : "Enter room"}
        </button>
      </FormContainer>
    </Container>
  );
};

export default NewUserContainer;
