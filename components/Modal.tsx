import { useState } from "react";

type ModalProps = {
    setValue: (value: string) => void
}

const Modal = ({setValue}: ModalProps): JSX.Element => {
    const [formText, setFormText] = useState("");

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormText(e.target.value);
    }

  return (
    <div
      className={
        "fixed bg-slate-600 w-full h-full opacity-90 flex justify-center items-center"
      }
    >
      <div className={""}>
        <label htmlFor="name">Name:</label>
        <input type="text" onChange={handleChange}/>
        <button onClick={() => setValue(formText)}>OK</button>
      </div>
    </div>
  );
};

export default Modal;
