"use client";
import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";
import { useRouter } from "next/router";

import Input from "@/components/Input";
import Commands from "@/components/Commands";

const Home = () => {

    const [messages, setMessages] = useState([]);

    const { push } = useRouter();

    const onSession = ({ sessionID, userID }) => {
        // attach the session ID to the next reconnection attempts
        socket.auth = { sessionID };
        // store it in the localStorage
        localStorage.setItem("sessionID", sessionID);
        // save the ID of the user
        socket.userID = userID;
    };

    const onMessage = (message) => {
        console.log("message reçu chef", message);

        setMessages((oldMessages) => [...oldMessages, message]);

    }

    const getMessagesAtInit = (messagesAtInit) => {
        setMessages(messagesAtInit);

    };

    useEffect(() => {
        const sessionID = localStorage.getItem("sessionID");

        // session is already defined
        if (sessionID) {
            socket.auth = { sessionID };
            socket.connect();
            // first time connecting and has already visited login page
        } else if (localStorage.getItem("username")) {
            const username = localStorage.getItem("username");
            socket.auth = { username };
            socket.connect();
            //   // redirect to login page
        } else {
            push("/login");
        }

        socket.on("session", onSession);
        socket.on("message", onMessage);
        socket.on("messages", getMessagesAtInit);


        return () => {
            socket.disconnect();
            socket.off("session", onSession);
            socket.off("message", onMessage);
            socket.off("messages", getMessagesAtInit);
        };
    }, []);

    return (
        <div className=" relative flex justify-center items-center flex-col">
            <h1 className=" pt-2 sticky top-0 text-5xl bg-black w-screen text-center">Dark Room</h1>
            <Commands />
            <div className="w-2/5">
                {messages.map((message, index) => (
                    <div className="p-7" key={index}> <span className=" text-red-700">{message.username}</span> : {message.content} </div>
                ))}
            </div>
            <Input />
        </div>
    );
};

export default Home;