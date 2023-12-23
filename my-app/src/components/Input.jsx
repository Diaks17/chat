import { socket } from "@/utils/socket";
import { useRef } from "react";

const Input = () => {
    const inputRef = useRef();

    const onKeyDown = (e) => {
        // detect when user press enter
        if (inputRef.current.value.length !== 0 && e.keyCode === 13) {
            console.log(inputRef.current.value);

            socket.emit("message", { content: inputRef.current.value });

            inputRef.current.value = "";
        }
    };

    return <div className="w-screen flex justify-center items-center sticky bottom-0 bg-black "><input ref={inputRef} className=" w-4/6 text-black rounded-full p-3  shadow-lg mb-6" type="text" onKeyDown={onKeyDown} placeholder="Ecris ton message " /></div>;
};

export default Input;