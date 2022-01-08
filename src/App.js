import images from "./helpers/images";

function App() {
  return (
    <div className="bot">
      <div className="images-first-row">
        <img src={images.add} alt="add" />
        <img src={images.ambulance} alt="ambulance" />
        <img src={images.medical} alt="medical" />
      </div>
      <div className="bot-container">
        <div className="bot-input">
          <input placeholder="Type your query.." />
          <span className="material-icons-round send-icon" title="Send Message">
            send
          </span>
          <span
            className="material-icons-round speaker-icon"
            title="Hold to send voice message"
          >
            keyboard_voice
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
