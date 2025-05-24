import * as React from "react";
import ChatComponent from "./components/ChatComponent";

const App: React.FC = () => {
  return (
    <div className="Wrapper">
      <div className="max-w-lg mt-20 mx-auto bg-white shadow-md rounded-lg p-6 overflow-hidden">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
};

export default App;
