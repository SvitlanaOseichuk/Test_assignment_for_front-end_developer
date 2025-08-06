import { useRef, useState } from "react";
import Menu from "./components/Menu/Menu";
import Hero from "./components/Hero/Hero";
import UserList from "./components/UserList/UserList";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";


function App() {
  
  const signupRef = useRef(null);
  const usersRef = useRef(null);
  const [refreshUsers, setRefreshUsers] = useState(false);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onUserRegistered = () => {
    setRefreshUsers(prev => !prev);
  };

  return (
    <div>
     <Menu scrollToSection={scrollToSection} signupRef={signupRef} usersRef={usersRef} />
     
      <Hero scrollToSection={scrollToSection} signupRef={signupRef} />

      <section ref={usersRef}>
        <UserList refreshTrigger={refreshUsers} />
      </section>

      <section ref={signupRef}>
        <RegistrationForm onUserRegistered={onUserRegistered} />
      </section>
    </div>
  )
}

export default App