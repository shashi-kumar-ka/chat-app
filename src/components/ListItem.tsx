import { useState, useEffect } from 'react'
import { Details } from './chat'
import Image from 'next/image';

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


const ListItem = ({ chat, chats, isSelected, selectedChatId, onChatSelect }: ListItemProps) => {
    const lastMessage = chat.messageList[chat.messageList.length - 1];

    const date = new Date(chat.latestMessageTimestamp)
    const formattedDate = date.toLocaleDateString();

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
            className={`p-4 cursor-pointer chats ${isSelected ? 'bg-back' : ''}`}
            onClick={() => onChatSelect(chat)}
          >
        <div className="data">
            <div className="box">
                <div className="logo">
                    <Image src={chat.imageURL} width={60} height={60} alt='' />
                </div>
                <div className="message-info">
                    <div className="title"><p className='h-primary'>{chat.title}</p><p className='h-secondary'>{formattedDate}</p></div>
                    <p className='h-primary'>Order {chat.orderId}</p>
                    <p className='h-secondary'>{lastMessage?.message}</p>
                </div>
            </div>
        </div>
        </div>
        <hr className='hr-line' />
    </>
  )
}

export default ListItem