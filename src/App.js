import ambulance from "./assets/images/ambulance-hospital.gif";

function App() {
  return (
    <div className="bot">
      <img className="ambulance-gif" src={ambulance} alt="ambulance" />
      <div className="bot-container">
        <input className="bot-input" placeholder="Type your query.." />
      </div>
    </div>
  );
}

export default App;
