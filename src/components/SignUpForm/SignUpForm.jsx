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
        console.log(suState)
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
          <div>
            <h5 className='noBotMargin'>Sign Up</h5> 
            <p>Enter your details below.</p> 

            <div className="form-container">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <label>Name</label><br/>
                <input className='inputFormat lowerMargin' type="text" name="name" value={suState.name} onChange={handleChange} required /><br/>
                <label>Email</label><br/>
                <input className='inputFormat lowerMargin' type="email" name="email" value={suState.email} onChange={handleChange} required /><br/>
                <label>Phone Number</label><br/>
                <input className='inputFormat lowerMargin' type="number" name="phoneNumber" value={suState.phoneNumber} onChange={handleChange} required /><br/>
                <label>Password</label><br/>
                <input className='inputFormat lowerMargin' type="password" name="password" value={suState.password} onChange={handleChange} required /><br/>
                <label>Confirm Password</label><br/>
                <input className='inputFormat ' type="password" name="confirm" value={suState.confirm} onChange={handleChange} required />
                <button className='buttonBegone lessMargin' onClick={changeForm}>{showForm.signUp ? 'Have an account? Sign in!' : 'No account? Sign up!'}</button><br />
                <button className="mainButton" type="submit" disabled={disable}>SIGN UP</button>
              </form>
            </div>
            {error && <p className="error-message">&nbsp;{error}</p>}
          </div>
      </div>

    )
}

