import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import images from "./helpers/images";

function App() {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const [value, setValue] = useState("");

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  const onSpeakerClick = (event) => {
    setValue(transcript);
    SpeechRecognition.startListening();
    if (listening) {
      SpeechRecognition.abortListening();
    }
    event.target.classList.toggle("record");
  };

  return (
    <div className="bot">
      <div className="bot-container">
        <div className="chat-container">
          <div className="bubble user-chat-bubble">Kem cho</div>
          <div className="bot-chat-bubble-container">
            <div className="bubble bot-chat-bubble">Majaa ma chu.</div>
          </div>
        </div>
        <div className="bot-input">
          <input
            placeholder="Type your query.."
            onChange={(event) => setValue(transcript ?? event.target.value)}
            value={value}
          />
          <span className="material-icons-round send-icon" title="Send Message">
            send
          </span>
          <span
            role="button"
            className="material-icons-round speaker-icon"
            title="Hold to send voice message"
            onClick={onSpeakerClick}
            onKeyPress={onSpeakerClick}
            tabIndex={0}
          >
            keyboard_voice
          </span>
        </div>
      </div>
      <div className="images-row images-right-row">
        <img src={images.cassie} alt="cassie" />
      </div>
    </div>
  );
}

export default App;
