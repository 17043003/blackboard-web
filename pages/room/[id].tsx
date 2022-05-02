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
      <div className={"bg-gray-400"}>
        <h1
          className={
            "font-bold tracking-wider text-green-700 sm:text-4xl text-2xl ml-4 mb-2 pt-2"
          }
        >
          Room:{id}
        </h1>
      </div>
      <div className={"flex"}>
        <div className={"flex-initial w-3/12"}>Menu</div>
        <div className={"flex-initial w-6/12"}>Canvas</div>
        <div className={"flex-initial w-3/12"}>
          <Chat socketUrl={socketUrl} />
        </div>
      </div>
    </>
  );
};

export default Room;
