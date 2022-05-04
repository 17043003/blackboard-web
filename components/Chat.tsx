import useWebSocket, { ReadyState } from "react-use-websocket";
import { useState, useEffect } from "react";

const Chat = ({ socketUrl }: { socketUrl: string }): JSX.Element => {
  const [messages, setMessages] = useState<string[]>([]);
  const [receivedMsg, setReceivedMsg] = useState("");
  const [willSendMsg, setWillSendMsg] = useState("");
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

  const handleWillSendMsg: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setWillSendMsg(e.target.value);
  };

  const handleSendMsg = () => {
    if (willSendMsg == "") return;
    sendMessage(willSendMsg);
    setWillSendMsg("");
  };

  useEffect(() => {
    if (receivedMsg == "") return;
    setMessages([...messages, receivedMsg]);
  }, [receivedMsg]);
  return (
    <div className={"flex flex-col h-full"}>
      <div className={""}>
        <ul className={"font-mono"}>
          {messages.map((message, index) => (
            <li key={index} className={"mb-4"}>
              {message}
            </li>
          ))}
        </ul>
      </div>
      <div className={"overflow-auto"}>
        <input
          className={"placeholder:italic placeholder:text-slate-400"}
          type="text"
          placeholder="Enter message"
          onChange={handleWillSendMsg}
          value={willSendMsg}
        />
        <button onClick={handleSendMsg}>Submit</button>
      </div>
    </div>
  );
};

export default Chat;
