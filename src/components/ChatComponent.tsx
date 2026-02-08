import * as React from "react";
import { useState } from "react";
import { LuBot, LuSendHorizontal } from "react-icons/lu";
import useChatBot from "../hooks/useChatBot";
import Markdown from "react-markdown";
import useChatScroll from "../hooks/useChatScroll";
import { IoMdDownload } from "react-icons/io";
import jsPDF from "jspdf";

const ChatComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChatBot();
  const ref = useChatScroll(messages);
  const printRef = React.useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleDownload = async () => {
    const element = printRef.current;
    if (!element) return null;

    const pdf = new jsPDF("p", "px", "a4");
    const content = element.innerHTML;

    pdf.html(content, {
      callback: function (pdf) {
        pdf.save("research_paper.pdf");
      },
      x: 0,
      y: 0,
      html2canvas: {
        scale: 0.8,
        useCORS: true,
        logging: false,
        letterRendering: true,
        allowTaint: true,
        width: 800,
      },
      autoPaging: true,
      width: 800,
      windowWidth: 800,
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <h2 className="p-4 semibold text-lg text-center bg-blue-100 flex text-blue-800 justify-center">
        <p>
          Satyam's <br />
          AI Powered Research Assistant
        </p>

        <p>
          <br />
          <LuBot size={25} />
        </p>
      </h2>
      <div
        id="chat-messages-container"
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {messages.map((msg, index) => (
          <div
            ref={ref}
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            <div ref={printRef}>
              <Markdown>{msg.text}</Markdown>
            </div>

            {msg.sender === "bot" ? (
              <div className="flex justify-end">
                <button onClick={handleDownload}>
                  <IoMdDownload />
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center p-4 bg-gray-50">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What do you want to learn about?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button onClick={handleSend} className="p-2">
          <LuSendHorizontal size={30} />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
