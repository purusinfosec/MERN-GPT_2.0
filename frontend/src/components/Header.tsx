
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo"; 
import { useAuth } from "../context/AuthContext";  
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
   const auth = useAuth();

  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex"}}>
        <Logo />
        <div>
         {auth?.isLoggedIn ? (
           <>
           <NavigationLink to="/chat" bg="#00fffc" text="Go To Chat" textcolor="black" />
           <NavigationLink to="/" bg="#51538f" text="logout" textcolor="white" onClick={auth?.logout} />
           
           </>

         ) : (
           <>
           <NavigationLink to="/login" bg="#00fffc" text="Login" textcolor="black" />
           <NavigationLink to="/signup" bg="#51538f" text="Sign Up" textcolor="white" />
           </>
         )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;