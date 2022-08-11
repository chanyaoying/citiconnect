import io from "socket.io-client";
import { useState, useEffect } from "react";
import NavBanker from '../../components/NavBanker'

let socket;

type Message = {
  author: string;
  message: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [messages1, setMessages1] = useState<Array<Messages>>([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.off('newIncomingMessage').on("newIncomingMessage", (msg) => {
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, message: msg.message },
      ]);
      console.log(messages1);
    });
  };

  const sendMessage = async () => {
    socket.emit("createdMessage", { author: "Banker", message });
    setMessages1((currentMsg) => [
      ...currentMsg,
      { author: "Banker", message },
    ]);
    setMessage("");
    console.log(messages);
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div>
    <NavBanker />
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-gradient-to-b from-blue-600 to-gray-400">
      <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
      
        {(
          <>
            <p className="font-bold text-white text-xl">
              You are talking to your client!
            </p>
            <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md ">
              <div className="h-full last:border-b-0 overflow-y-scroll">
                {messages.map((msg, i) => {
                  return (
                    <div
                      className="w-full py-1 px-2 border-b border-gray-200"
                      key={i}
                    >
                      {msg.author}: {msg.message}
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-gray-300 w-full flex rounded-bl-md">
                <input
                  type="text"
                  placeholder="New message..."
                  value={message}
                  className="outline-none py-2 px-2 rounded-bl-md flex-1"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={handleKeypress}
                />
                <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
                  <button
                    className="group-hover:text-white px-3 h-full"
                    onClick={() => {
                      sendMessage();
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
    </div>
  );
}