import { useState, useEffect } from "react";
import { Details } from "./chat";
import Image from "next/image";

interface Chat {
  id: number;
  title: string;
  imageURL: string;
  orderId: string;
  latestMessageTimestamp: number;
}

interface ListItemProps {
  chat: Details;
  chats: Chat[];
  selectedChatId?: number | null;
  isSelected: boolean;
  onChatSelect: (chat: Details) => void;
}

const ListItem = ({
  chat,
  chats,
  isSelected,
  selectedChatId,
  onChatSelect,
}: ListItemProps) => {
  const lastMessage = chat.messageList[chat.messageList.length - 1];

  const formatTimestamp = (timestamp: number): string => {
    if (timestamp == undefined) {
      return "";
    }
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

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  useEffect(() => {
    if (selectedChatId) {
      const selectedChat = chats.find((chat) => chat.id === selectedChatId);
      setSelectedChat(selectedChat || null);
    } else {
      setSelectedChat(null);
    }
  }, [selectedChatId, chats]);

  return (
    <>
      <div
        key={chat.id}
        className={`p-4 cursor-pointer chats ${isSelected ? "bg-back" : ""}`}
        onClick={() => onChatSelect(chat)}
      >
        <div className="data">
          <div className="box">
            <div className="logo">
              <Image src={chat.imageURL} width={60} height={60} alt="" />
            </div>
            <div className="message-info">
              <div className="title">
                <p className="h-primary">{chat.title}</p>
                <p className="h-secondary">
                  {formatTimestamp(lastMessage?.timestamp)}
                </p>
              </div>
              <p className="h-primary">Order {chat.orderId}</p>
              <p className="h-secondary">{lastMessage?.message}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="hr-line" />
    </>
  );
};

export default ListItem;
