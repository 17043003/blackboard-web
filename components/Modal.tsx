import { useState, useEffect, useRef } from "react";

type ModalProps = {
  setValue: (value: string) => void;
  message: string;
};

const Modal = ({ setValue, message }: ModalProps): JSX.Element => {
  const [formText, setFormText] = useState("");
  const editBox = useRef<HTMLInputElement | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormText(e.target.value);
  };

  // Set focus.
  useEffect(() => {
    editBox.current?.focus();
  }, []);

  return (
    <div
      className={
        "fixed bg-slate-600 w-full h-full opacity-90 flex justify-center items-center"
      }
    >
      <div
        className={
          "flex flex-col items-center bg-red-100 sm:w-1/3 w-9/12 h-32 rounded"
        }
      >
        <div className={"flex-initial w-full"}>
          <h2 className={"font-bold mt-3 text-center"}>{message}</h2>
        </div>
        <div className={"flex-initial my-2"}>
          <input
            ref={editBox}
            className={
              "drop-shadow-xl focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            }
            type="text"
            onChange={handleChange}
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                setValue(formText);
              }
            }}
          />
        </div>
        <button
          className={
            "bg-sky-500 font-bold w-1/4 mt-4 mx-auto rounded drop-shadow-xl"
          }
          onClick={() => setValue(formText)}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
