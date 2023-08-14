import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm"
import { useState } from "react";

export default function AuthPage({setUser}) {
    const [showForm, setShowForm] = useState({
        signUp: false,
        login: true,
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
            <div className='logoArea'>
              <img className='logo' src='../../fridgifylogo2.svg'/>
              <h1 className='authPageTitle'>FRIDGIFY</h1>
            </div>
            <div className='middleSegment'>

            <div className='commercialSegment'>
              <div>
                <h2>YOUR FOOD</h2>
                <h2>MANAGEMENT APP</h2>
                <br/>

                <h4>Keep track of your food and find new recipes</h4>
                <h4> using what you have in stock.</h4>                
              </div>
            </div>
            <div className='authSegment'>
                  {showForm.signUp && <SignUpForm setUser={setUser} changeForm={changeForm} showForm={showForm}/>}
                  {showForm.login && <LoginForm setUser={setUser} changeForm={changeForm} showForm={showForm}/>}
                        
            </div>
            </div>
           
        </>
        )
    
  }
  