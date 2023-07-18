import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm"
import { useState } from "react";

export default function AuthPage({setUser}) {
    const [showForm, setShowForm] = useState({
        signUp: true,
        login: false,
      })
      function changeForm(){
        if (showForm.signUp) {
          setShowForm({
            signUp: false,
            login: true
          })
        }
        else {
          setShowForm({
            signUp: true,
            login: false
          })
        }
      }

    return (
        <>
    
            {showForm.signUp && <SignUpForm setUser={setUser}/>}
            {showForm.login && <LoginForm setUser={setUser} />}
            <button onClick={changeForm}>{showForm.signUp ? 'Login' : 'SignUp'}</button>
        </>
        )
    
  }
  