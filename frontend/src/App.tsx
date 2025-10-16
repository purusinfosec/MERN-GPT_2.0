import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";

function App() {
  const auth = useAuth();

  return (
  
      <main>
        <Header />
         <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
    
         {auth?.isLoggedIn && auth.user && (
         <Route path="/chat" element={<Chat />} />
         )}
         
         <Route path="*" element={<NotFound />} />
        {/* Add more routes as needed */}
        </Routes>
      </main>

  );

}

export default App;