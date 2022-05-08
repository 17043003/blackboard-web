import useWebSocket, { ReadyState } from "react-use-websocket";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FigureKind } from "../components/Menu";
import { figureFactory } from "../utils/figure/FigureFactory";
import Figure from "../utils/figure/Figure";

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
        sendMessage(`{"chat":{"chatmessage":"Connected!"}}`);
      }
    },
    onMessage: (ev) => {
      console.log(ev.data);
      try {
        const jsonObject = JSON.parse(ev.data);
        if (jsonObject?.chat != null) {
          setReceivedMsg(jsonObject?.chat.chatmessage);
        }
      } catch (e) {
        console.log(e);
      }
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
    sendMessage(`{"chat":{"chatmessage":"${willSendMsg}"}}`);
    setWillSendMsg("");
  };

  useEffect(() => {
    if (receivedMsg == "") return;
    setMessages([...messages, receivedMsg]);
  }, [receivedMsg]);
  return (
    <div className={"flex flex-col h-full"}>
      <div className={"break-words whitespace-pre-wrap"}>
        <ul className={"font-mono"}>
          {messages.map((message, index) => (
            <li key={index} className={"mb-4"}>
              {message}
            </li>
          ))}
        </ul>
      </div>
      <div className={"overflow-auto bg-lime-100"}>
        <input
          className={
            "m-2 placeholder:italic placeholder:text-slate-400 drop-shadow-xl focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
          }
          type="text"
          placeholder="Enter message"
          onChange={handleWillSendMsg}
          value={willSendMsg}
        />
        <button className={""} onClick={handleSendMsg}>
          <Image src="/send.svg" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
