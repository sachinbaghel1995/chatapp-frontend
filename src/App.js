import { Routes,Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import './App.css'



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignUp/>}>

        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
