import { Routes,Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import './App.css'
import ChatsPage from "./pages/ChatsPage";



function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chats" element={<ChatsPage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
