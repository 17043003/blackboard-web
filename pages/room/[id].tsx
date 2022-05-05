import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Chat from "../../components/Chat";
import Modal from "../../components/Modal";
import Blackboard from "../../components/Blackboard";

type ChatRoomProps = {
  id: string | string[];
  name: string;
  socketUrl: string;
};

const Room: NextPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const baseUrl = process.env.NEXT_PUBLIC_WS_BASE_URL ?? "";
  if (baseUrl == "" || id == null) {
    return (
      <>
        <h1>Websoket connect error.</h1>
        <h2>Websocket URL is invalid.</h2>
      </>
    );
  }

  const socketUrl = `${baseUrl}/${id}`;

  return (
    <>
      {name ? (
        <ChatRoom {...{ id, name, socketUrl }} />
      ) : (
        <Modal setValue={setName} message={"Enter your name"} />
      )}
    </>
  );
};

const ChatRoom = ({ id, name, socketUrl }: ChatRoomProps) => {
  return (
    <>
      <div className={"bg-gray-400"}>
        <h1
          className={
            "font-bold tracking-wider text-green-700 sm:text-4xl text-2xl ml-4 pt-2"
          }
        >
          Room:{id}
        </h1>
        <p className={"mb-1 ml-4"}>You : {name}</p>
      </div>
      <div className={"flex"}>
        <div className={"flex-initial w-3/12"}>Menu</div>
        <div className={"flex-initial w-6/12"}>
          <Blackboard />
        </div>
        <div className={"flex-initial w-3/12"}>
          <Chat socketUrl={socketUrl} />
        </div>
      </div>
    </>
  );
};

export default Room;
