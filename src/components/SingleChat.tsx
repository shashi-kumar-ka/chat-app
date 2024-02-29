import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Message, Details } from "./chat";
import Image from "next/image";
import { addMessage } from "../store/chatSlice";

interface Props {
  chat: Message[];
  details: Details;
  setChat: React.Dispatch<React.SetStateAction<Message[]>>;
}

const SingleChat = ({ chat, details, setChat }: Props) => {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chats.chats);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selectedOption: string | undefined
  ) => {
    e.preventDefault();
    let messageToSend = newMessage.trim();

    switch (selectedOption) {
      case "Request a call":
        messageToSend = "I want a callback";
        break;
      case "Go to My Orders":
        messageToSend = "I want to check my orders";
        break;
      default:
        break;
    }

    if (messageToSend) {
      const newMessageObject: Message = {
        messageId: String(new Date().getTime()),
        message: messageToSend,
        timestamp: new Date().getTime(),
        sender: "USER",
        messageType: "text",
      };

      dispatch(addMessage({ chatId: details.id, message: newMessageObject }));
      setChat((prevChat) => [...prevChat, newMessageObject]);
      setFormattedChat((prevFormattedChat) => [
        ...prevFormattedChat,
        newMessageObject,
      ]);
      setNewMessage("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(e, "");
  };

  const setTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const timeFormat = `${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
    return timeFormat;
  };

  const [formattedChat, setFormattedChat] = useState<Message[]>([]);

  const formatTimestamp = (timestamp: number): string => {
    const messageDate = new Date(timestamp);
    const currentDate = new Date();
    const messageDay = messageDate.getDate();
    const currentDay = currentDate.getDate();
    const messageMonth = messageDate.getMonth();
    const currentMonth = currentDate.getMonth();
    const messageYear = messageDate.getFullYear();
    const currentYear = currentDate.getFullYear();

    if (messageYear === currentYear && messageMonth === currentMonth) {
      if (messageDay === currentDay) {
        return "Today";
      } else if (messageDay === currentDay - 1) {
        return "Yesterday";
      } else {
        return `${messageDay}/${messageMonth + 1}/${messageYear}`;
      }
    }
    return `${messageDay}/${messageMonth + 1}/${messageYear}`;
  };

  useEffect(() => {
    if (chat?.length > 0) {
      const formatted = chat.reduce((acc: Message[], curr: Message) => {
        if (acc.length === 0) {
          acc.push(curr);
        } else {
          const lastMessage = acc[acc.length - 1];
          if (
            formatTimestamp(curr.timestamp) !==
            formatTimestamp(lastMessage.timestamp)
          ) {
            const dateLabel: Message = {
              messageId: String(new Date().getTime()),
              message: formatTimestamp(curr.timestamp),
              timestamp: curr.timestamp,
              sender: "USER",
              messageType: "text",
            };
            acc.push(dateLabel);
          }
          acc.push(curr);
        }
        return acc;
      }, []);

      setFormattedChat(formatted);
    } else {
      setFormattedChat([]); // to clear the chat while switching to different chats
    }
  }, [chat]);

  const renderOptions = (
    options: { optionText: string; optionSubText?: string }[],
    isLatestMessage: boolean
  ) => {
    return (
      <div className="options">
        {options.map((option, index) => (
          <button
            key={`${option.optionText}_${index}`}
            className={`option flex flex-col ${
              !isLatestMessage ? "disabled" : ""
            }`}
            onClick={(e) =>
              sendMessage(e, isLatestMessage ? option.optionText : undefined)
            }
            disabled={!isLatestMessage}
          >
            <p className={`blue ${!isLatestMessage ? "disabled-text" : ""}`}>
              {option.optionText}
            </p>
            {option.optionSubText && (
              <div className="subtext">{option.optionSubText}</div>
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-back h-screen">
      <div className="topbar flex items-center h-96">
        <Image
          className="ml-4"
          src={details?.imageURL}
          alt="Profile"
          width={50}
          height={50}
        />
        <h2 className="text-2xl font-semibold text-gray-800 ml-4">
          {details?.title}
        </h2>
      </div>
      <div className="max-w-30 overflow-scroll p-4">
        {formattedChat.length > 0 ? (
          formattedChat.map((message, index) => (
            <div
              key={`${message.messageId}_${message.timestamp}`}
              className={`flex flex-col mb-2 ${
                message.sender === "USER"
                  ? "justify-end items-end"
                  : "justify-start items-start"
              }`}
            >
              {formatTimestamp(message.timestamp) !==
                formatTimestamp(formattedChat[index - 1]?.timestamp) && (
                <div className="date-label mt-2 flex items-center justify-center">
                  {formatTimestamp(message.timestamp)}
                </div>
              )}

              {message.messageType === "optionedMessage" && message.options ? (
                <div className="option-box rounded-lg-2">
                  <p className="text-sx">{message.message}</p>
                  {renderOptions(
                    message.options,
                    index === formattedChat.length - 1
                  )}
                </div>
              ) : (
                <div
                  className={`px-4 py-2 ${
                    message.sender === "USER"
                      ? "bg-blue-500 text-white rounded-lg-1 self-end"
                      : "bg-white text-gray-800 rounded-lg-2 self-start"
                  }`}
                >
                  {message.message}
                  <p className="time flex justify-end">
                    {setTime(message.timestamp)}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            Send a message to start Chatting
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-4 bottom-0 w-50 flex bg-gray-200"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-80 p-2 border rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2 w-20"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SingleChat;
