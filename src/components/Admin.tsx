import type { FunctionComponent } from "react";

const AdminContainer: FunctionComponent<any> = ({ socket }) => (
  <div>
    <h1>ADMIN SECTION</h1>
    <button onClick={() => socket.emit("reset")}>RESET GAME</button>
    <button onClick={() => socket.emit("next-question")}>NEXT QUESTION</button>
  </div>
);

export default AdminContainer;
