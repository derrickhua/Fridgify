import { Component, useState } from "react";
import { signUp } from '../../utilities/usersService'

export default function SignUpForm({setUser, changeForm, showForm}) {
    const [suState, setState] = useState(
      {
          name: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirm: '',
      })
    const [error, setError] = useState('');
    


    // arrow functions will nwo refer to the SignUpForm
    const handleChange = (evt) => {
      setState({ ...suState, [evt.target.name]: evt.target.value });
      setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
          const formData = {...suState}
          delete formData.error
          delete formData.confirm 
          const user = await signUp(formData)
          setUser(user)
        } catch(err){
          console.log(err)
          this.setState({error: "Sign Up Failed - Try again"})
        }
    }

    const disable = suState.password !== suState.confirm;
    return (
      <div className='formContainer signUpFormContainer'>
          <div className="maxWidth">
            <h5 className='noBotMargin hideOnMobile'>Sign Up</h5> 
            <p className="hideOnMobile">Enter your details below.</p> 

            <div className="form-container">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <label className='hideOnMobile'>Name</label><br className='hideOnMobile'/>
                <input className='inputFormat lowerMargin signUp' type="text" name="name" placeholder="Name" value={suState.name} onChange={handleChange} required /><br/>
                <label className='hideOnMobile'>Email</label><br className='hideOnMobile'/>
                <input className='inputFormat lowerMargin signUp' type="email" name="email" placeholder="Email"value={suState.email} onChange={handleChange} required /><br/>
                <label className='hideOnMobile'>Phone Number</label><br className='hideOnMobile'/>
                <input className='inputFormat lowerMargin signUp' type="number" name="phoneNumber"placeholder="Phone Number" value={suState.phoneNumber} onChange={handleChange} required /><br/>
                <label className='hideOnMobile'>Password</label><br className='hideOnMobile'/>
                <input className='inputFormat lowerMargin signUp' type="password" name="password" placeholder="Password" value={suState.password} onChange={handleChange} required /><br/>
                <label className='hideOnMobile'>Confirm Password</label><br className='hideOnMobile'/>
                <input className='inputFormat signUp' type="password" name="confirm" placeholder="Password" value={suState.confirm} onChange={handleChange} required />
                <p className='buttonBegone lessMargin hideOnMobile' onClick={changeForm}>{showForm.signUp ? 'Have an account? Sign in!' : 'No account? Sign up!'}</p><br />
                <button className="mainButton signUpBtn" type="submit" disabled={disable}>Sign Up</button>
              </form>
            </div>
            <span className='or showOnMobile'>
              <img src='../../../bar.png' />
              <span className='orGap'>or</span>
              <img src='../../../bar.png' />
            </span>
            <button className='mobileBtn showOnMobile' onClick={changeForm}>{showForm.signUp ? 'Already have an account?' : 'Create new account'}</button>
            {error && <p className="error-message">&nbsp;{error}</p>}
          </div>
      </div>

    )
}

