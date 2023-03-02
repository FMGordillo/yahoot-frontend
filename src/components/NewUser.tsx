import { FunctionComponent, useState } from "react";

type NewUserContainerProps = {
  handleSubmit: any;
};

const NewUserContainer: FunctionComponent<NewUserContainerProps> = ({
  handleSubmit,
}) => {
  const [name, setName] = useState<string>();
  return (
    <div>
      <h1>Enter your name</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e, name);
        }}
      >
        <input
          type="text"
          placeholder="Example: Pepepiojo"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Enter room</button>
      </form>
    </div>
  );
};

export default NewUserContainer;
