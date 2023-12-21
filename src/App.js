import { Routes,Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import './App.css'
import ChatsPage from "./pages/ChatsPage";
import AddMembers from "./components/chats/AddMembers";
import GroupMember from "./components/chats/GroupMember";
import GroupList from "./components/chats/GroupList";
import GroupCreation from "./components/chats/GroupCreation";
import Chats from "./components/chats/Chats";



function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chats/:id" element={<Chats/>}/>
        <Route path='/creategroup' element={ <GroupCreation />}/>
        {/* <Route path='/allgroups' element={ <GroupCreation />}/> */}
     
      </Routes>
      
    </div>
  );
}

export default App;
