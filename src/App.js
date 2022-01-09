import { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import images from "./helpers/images";
import botApiService from "./services/botApiService";

function App() {
  const inputRef = useRef();
  const [chat, setChat] = useState([]);
  const [botUserId, setBotUserId] = useState("");
  const [conversationId, setConversationId] = useState("");
  const { transcript, listening, browserSupportsSpeechRecognition } =
      useSpeechRecognition();
  const [value, setValue] = useState("");

  const speech = new SpeechSynthesisUtterance();
  speech.text = value;
  speech.pitch = 1;
  speech.volume = 1;
  // speech.lang = "en-US";
  speech.rate = 1;
  if (!browserSupportsSpeechRecognition) {
    return <alert>Browser doesn&apos;t support speech recognition.</alert>;
  }

  const onSendClick = async () => {
    const val = inputRef.current.value;
    setValue(val);
    const data = {
      from: {
        id: botUserId,
      },
      text: inputRef.current.value,
      type: "message",
    };
    setChat((oldArray) => [
      ...oldArray,
      { from: "user", message: inputRef.current.value },
    ]);
    const botMessageResponse = await botApiService.activitySend(
      data,
      conversationId
    );
    setChat((oldArray) => [
      ...oldArray,
      { from: "bot", message: botMessageResponse?.data?.text },
    ]);
    speechSynthesis.speak(botMessageResponse?.data?.text);
  };

  const onInputKeyPress = async (e) => {
    if (e.key === "Enter" && e.target.value.toString().trim().length > 0) {
      setValue(e.target.value);
      setChat((oldArray) => [
        ...oldArray,
        { from: "user", message: e.target.value },
      ]);
      const data = {
        from: {
          id: botUserId,
        },
        text: value,
        type: "message",
      };
      const botMessageResponse = await botApiService.activitySend(
        data,
        conversationId
      );
      if (botMessageResponse) {
        document.getElementById("textInput").value = "";
        setValue("");

        setChat((oldArray) => [
          ...oldArray,
          { from: "bot", message: botMessageResponse?.data?.text },
        ]);
      }
      speechSynthesis.speak(botMessageResponse?.data?.text);
    }
  };

  const onSpeakerClick = async (event) => {
    SpeechRecognition.startListening();
    if (listening) {
      SpeechRecognition.stopListening();
    }
    event.target.classList.toggle("record");
    const data = {
      from: {
        id: botUserId,
      },
      text: value,
      type: "message",
      language: "en",
    };
    await botApiService.activitySend(data, conversationId);
  };

  const userChat = (userMessage) => (
    <div className="bubble user-chat-bubble">{userMessage}</div>
  );

  const botChat = (message) => (
    <div className="bot-chat-bubble-container">
      <div className="bubble bot-chat-bubble">{message}</div>
    </div>
  );

  useEffect(async () => {
    const res = await botApiService.getBotConversations();
    setBotUserId(res?.data?.data?.botUserId);
    setConversationId(res?.data?.data?.conversationId);
  }, []);

  useEffect(() => {
    if (transcript?.toString().trim().length > 0) {
      setValue(transcript);
    }
  }, [transcript]);

  return (
    <div className="bot">
      <div className="bot-content-container">
        <div className="bot-container">
          <div className="bot-header">Talk to Cassie</div>
          <div className="chat-container">
            {chat.length > 0 &&
              chat.map((message) =>
                message.from === "user"
                    ? userChat(message.message)
                    : botChat(message.message)
            )}
      </div>
      <div className="bot-input">
      <input
  ref={inputRef}
  id="textInput"
  placeholder="Type your query.."
  onChange={(event) => setValue(event.target.value)}
  onKeyPress={onInputKeyPress}
  value={value ?? transcript}
  />
  <span
  role="button"
  className="material-icons-round send-icon"
  title="Send Message"
  onClick={onSendClick}
  onKeyPress={onSendClick}
  tabIndex={0}
      >
      send
      </span>
      <span
  role="button"
  className="material-icons-round speaker-icon"
  title="Hold to send voice message"
  onClick={onSpeakerClick}
  onKeyPress={onSpeakerClick}
  tabIndex={-1}
>
  keyboard_voice
  </span>
  </div>
  </div>

        <img src={images.cassie} className="cassie" alt="cassie" />
      </div>
    </div>
  );
}

export default App;
