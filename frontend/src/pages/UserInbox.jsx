import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { socket } from "../const.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
const ENDPOINT = `${socket}/`;
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
import { server } from "../const.js";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";

const UserInbox = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState();
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const resonse = await axios.get(
          `${server}/conversation/get-all-conversation-user/${user?._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(resonse.data.conversations);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getConversation();
  }, [user, messages]);

  useEffect(() => {
    if (user) {
      const sellerId = user?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        toast.error(error.messages);
      }
    };
    getMessage();
  }, [currentChat]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    socketId.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            toast.error(error.messages);
          });
      }
    } catch (error) {
      toast.error(error.messages);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
      })
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        toast.error(error.messages);
      });
  };

  const handleImageUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendingHandler = async (e) => {
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(`${server}/message/create-new-message`, {
          images: e,
          sender: user._id,
          text: newMessage,
          conversationId: currentChat._id,
        })
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      toast.error(error.messages);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: user._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  return (
    <div className="w-full p-4">
      {!open && (
        <>
          <h1 className="text-black text-opacity-60 text-sm md:text-3xl font-extrabold text-left mb-6">
            Messages
          </h1>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={user?._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
                isLoading={isLoading}
              />
            ))}
        </>
      )}
      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={user?._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          setMessages={setMessages}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  online,
  setActiveStatus,
  isLoading,
}) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/inbox?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  useEffect(() => {
    const userId = data.members.find((user) => user != me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);
        setUser(res.data.shop);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getUser();
  }, [me, data]);

  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-theme bg-opacity-5" : ""
      }  cursor-pointer`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="w-[20%] max-w-[50px] relative">
        <img
          src={`${user?.avatar?.url}`}
          alt=""
          className="w-full aspect-square rounded-full"
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-success rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="" />
        )}
      </div>
      <div className="w-[80%] pl-2 flex flex-col justify-center">
        <h1 className="text-sm">{user?.name}</h1>
        <p className="text-sm text-black text-opacity-70">
          {!isLoading && data?.lastMessageId !== user?._id
            ? "You "
            : userData?.name
            ? userData?.name?.split(" ")[0]
            : " "}
          <span className="text-theme text-opacity-80">
            {data?.lastMessage}
          </span>
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
}) => {
  return (
    <div className="w-full flex flex-col relative msg-body">
      {/* message header */}
      <div className="w-full h-[60px] bg-theme bg-opacity-5 p-2 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="w-11 h-11 bg-theme rounded-full">
            <img
              src={`${userData?.avatar?.url}`}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-sm font-semibold text-black text-opacity-90">
              {userData?.name}
            </h1>
            <h1 className="text-xs text-success">
              {activeStatus ? (
                "Active Now"
              ) : (
                <span className="text-failure">Offline</span>
              )}
            </h1>
          </div>
        </div>
        <div className="cursor-pointer" onClick={() => setOpen(false)}>
          <IconButton>
            <AiOutlineArrowRight size={20} />
          </IconButton>
        </div>
      </div>

      {/* messages */}
      <div className="overflow-y-auto p-4 msg-body">
        {messages &&
          messages.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex w-full my-2 gap-1 ${
                  item.sender === sellerId ? "justify-end" : "justify-start"
                }`}
                ref={scrollRef}
              >
                {item.sender !== sellerId && (
                  <div className="w-[20px] h-[20px] rounded-full bg-success border-2 border-success">
                    <img
                      src={`${userData?.avatar?.url}`}
                      className="w-full h-full rounded-full"
                      alt=""
                    />
                  </div>
                )}
                {item.images && (
                  <div
                    className={`w-[200px] h-[200px] rounded-xl p-1 ${
                      item.sender === sellerId ? "bg-theme" : "bg-success"
                    }`}
                  >
                    <img
                      src={`${item.images?.url}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                )}
                {item.text !== "" && (
                  <div
                    className={`px-4 py-1 text-xs sm:text-sm max-w-[400px] ${
                      item.sender === sellerId
                        ? "bg-theme rounded-l-lg"
                        : "bg-success rounded-r-lg"
                    }`}
                  >
                    <p className="text-white leading-4">{item.text}</p>
                    <small
                      className={`text-white text-opacity-80 ${
                        item.sender === sellerId ? "float-left" : "float-right"
                      }`}
                    >
                      {format(item.createdAt)}
                    </small>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* send message */}
      <div className="w-full h-[60px] border-t border-black border-opacity-10 flex items-center justify-center">
        <form
          aria-required={true}
          className="relative w-full flex justify-between items-center"
          onSubmit={sendMessageHandler}
        >
          <div className="w-[30px] h-[30px] flex items-center justify-center">
            <input
              type="file"
              name=""
              id="image"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label htmlFor="image">
              <TfiGallery className="cursor-pointer" size={18} />
            </label>
          </div>
          <div className="w-full relative">
            <input
              type="text"
              required
              placeholder="Enter your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full text-sm bg-theme bg-opacity-5 py-2 px-4 placeholder:text-theme placeholder:text-opacity-70"
            />
            <input type="submit" value="Send" className="hidden" id="send" />
            <label htmlFor="send">
              <AiOutlineSend
                size={20}
                className="absolute right-2 bottom-1/2 translate-y-1/2 cursor-pointer"
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInbox;
