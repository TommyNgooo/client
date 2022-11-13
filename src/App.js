import io from 'socket.io-client'
import './App.css';
import {useEffect,useState} from "react";

const socket = io.connect("http://localhost:3001")
function App() {
  const [message,setMessage] = useState("");
  const [select,setSelect] = useState("Car Collision");
  const [messageReceived, setMessageReceived] = useState("");
  const [lat,setLat] = useState(0);
  const [long,setLong] = useState(0);

  const sendMessage = () => {
    socket.emit('send_message', {message: `Latitude: ${lat} Longitude: ${long} Message: ${select}`});
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((postion) => {
      setLat(postion.coords.latitude)
      setLong(postion.coords.latitude)
    })
    socket.on("received_message", (data) => {
      console.log(data)
      setMessageReceived(data.message);
    })
  },[socket])

  return (
    <div className="App">
      <select onChange={e=>setSelect(e.target.value)}>
        <option>Car Collision</option>
        <option>Bad Weather</option>
      </select>
      {/* <input placeholder='Message...' onChange={(event) => {setMessage(event.target.value);}}/> */}
      <button onClick={sendMessage}>Send Report</button>
      <h1> Message:</h1> {messageReceived}
    </div>
  );
}

export default App;
