import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "../src/components/ListItem";
import SingleChat from "../src/components/SingleChat";
import { Details } from "../src/components/chat";
import { setChats } from "../src/store/chatSlice";
import { RootState } from "../src/store/store";

const Home = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chats.chats);

  const router = useRouter();
  const { id } = router.query;
  // const [chat, setChat] = useState<Message[]>([]);
  // useEffect(() => {}, [chat]);

  const [selectedChat, setSelectedChat] = useState<Details | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/codebuds-fk/chat/chats")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setChats(data));
      })
      .catch((error) => {
        console.error("Error fetching chats: ", error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      const selectedChat = chats.find((chat) => chat.id === Number(id));
      setSelectedChat(selectedChat || null);
    } else {
      setSelectedChat(null);
    }
  }, [id, chats]);

  const filteredChats = chats.filter((chat: Details) => {
    return (
      chat.title.toLowerCase().includes(search.toLowerCase()) ||
      chat.orderId.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleChatClick = (chat: Details) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex h-screen w-screen">
      {selectedChat ? (
        <>
          <div className="relative">
            <div className="topbar">
              <div className="container1">
                <div className="navbar1">
                  <h3>Filter by Title / Order ID</h3>
                  <input
                    type="text"
                    placeholder="Start typing to search"
                    className="search-bar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <hr className="hr-line" />
            </div>
            <div className="content1">
              {filteredChats.map((chat: Details) => (
                <ListItem
                  key={chat.id}
                  chats={chats}
                  chat={chat}
                  onChatSelect={(chat) => router.push(`/?id=${chat.id}`)}
                  isSelected={selectedChat && selectedChat.id === chat.id}
                />
              ))}
            </div>
          </div>

          <div className="right-bar">
            {chats.map((chat) => (
              <div key={chat.id} onClick={() => handleChatClick(chat)}></div>
            ))}
            {selectedChat && (
              <SingleChat
                chat={selectedChat.messageList}
                details={selectedChat}
                // setChat={setChat}
              />
            )}
          </div>
        </>
      ) : (
        <div className="relative">
          <div className="topbar">
            <div className="container">
              <div className="navbar">
                <h3>Filter by Title / Order ID</h3>
                <input
                  type="text"
                  placeholder="Start typing to search"
                  className="search-bar"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <hr className="hr-line" />
          </div>
          <div className="content">
            {filteredChats.map((chat: Details) => (
              <ListItem
                key={chat.id}
                chats={chats}
                chat={chat}
                onChatSelect={(chat) => router.push(`/?id=${chat.id}`)}
                isSelected={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
