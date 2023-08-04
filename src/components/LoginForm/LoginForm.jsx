// LoginForm.jsx

import { useState } from 'react';
import * as usersService from '../../utilities/usersService';

export default function LoginForm({ setUser, changeForm, showForm }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
      console.log(user)
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className='formContainer'>
      <div className='loginForm'>
        <div>
            <h5 className='noBotMargin'>Sign In</h5> 
            <p >Enter your details below.</p>           
        </div>

        <div>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Email</label><br />
            <input className='inputFormat moreMargin' type="text" name="email" value={credentials.email} onChange={handleChange} required /><br />
            <label>Password</label><br />
            <input className='inputFormat' type="password" name="password" value={credentials.password} onChange={handleChange} required /><br />
            <button className='buttonBegone moreMargin' onClick={changeForm}>{showForm.signUp ? 'Have an account? Sign in!' : 'No account? Sign up!'}</button><br />
            <button className="mainButton" type="submit">SIGN IN</button>
          </form>
        </div>
        {error && <p className="error-message">&nbsp;{error}</p>}
      </div>
    </div>

  );
}
