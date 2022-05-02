import useWebSocket, { ReadyState } from "react-use-websocket";
import { useState, useEffect } from "react";

const Chat = ({ socketUrl }: { socketUrl: string }): JSX.Element => {
  const [messages, setMessages] = useState<string[]>([]);
  const [receivedMsg, setReceivedMsg] = useState("");
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    share: true,
    onOpen: () => {
      if (readyState != ReadyState.OPEN) {
        console.log("opened");
        sendMessage("Connected!");
      }
    },
    onMessage: (ev) => {
      console.log(ev.data);
      setReceivedMsg(ev.data);
    },

    shouldReconnect: (closeEvent) => {
      return true;
    },
  });

  useEffect(() => {
    if (receivedMsg == "") return;
    setMessages([...messages, receivedMsg]);
  }, [receivedMsg]);
  return (
    <>
      <ul className={"font-mono"}>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </>
  );
};

export default Chat;
