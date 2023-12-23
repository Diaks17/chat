import { useEffect, useRef, } from "react";

import { useRouter } from "next/router";



const Login = () => {

    const inputRef = useRef();
    const { push } = useRouter();

    const onkeydown = (e) => {
        if (e.keyCode === 13) {

            console.log("Enter key pressed");
            console.log(inputRef.current.value);

            localStorage.setItem("username", inputRef.current.value);
            inputRef.current.value = "";
            push("/");
        }
    }

    useEffect(() => {
        console.log(inputRef);

    }), [];


    return (
        <div className="flex justify-center items-center flex-col h-screen">




            <h1>Login</h1>
            <p>Enter USername</p>
            <input
                ref={inputRef}
                type="text"
                className="rounded-full px-4 py-2  text-black"
                placeholder="TOn Nom"
                onKeyDown={onkeydown}
            />

        </div>
    )
}
export default Login;