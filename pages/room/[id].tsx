import type { NextPage } from "next";
import { useRouter } from "next/router";
import Chat from "../../components/Chat";

const Room: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const baseUrl = process.env.NEXT_PUBLIC_WS_BASE_URL ?? "";
  if (baseUrl == "") {
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
      <h1>Room:{id}</h1>
      <Chat socketUrl={socketUrl} />
    </>
  );
};

export default Room;
