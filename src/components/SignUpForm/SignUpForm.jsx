import { Component } from "react";
import { signUp } from '../../utilities/usersService'

export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirm: '',
        error: '',
    }

    // arrow functions will nwo refer to the SignUpForm
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
            }
        )
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log(this.state)
        try {
          const formData = {...this.state}
          delete formData.error
          delete formData.confirm 
          const user = await signUp(formData)
          this.props.setUser(user)
        } catch(err){
          console.log(err)
          this.setState({error: "Sign Up Failed - Try again"})
        }
    }

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
          <div>
            <p>Sign In</p> 
            <p>Enter your details below.</p> 
             
            <div className="form-container">
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                <label>Email</label>
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                <label>Phone #</label>
                <input type="number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                <label>Confirm</label>
                <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                <button className="mainButton" type="submit" disabled={disable}>SIGN UP</button>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );
      }      
}

