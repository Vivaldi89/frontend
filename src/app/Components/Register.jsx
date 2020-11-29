import React from 'react';
import '../../styles/login.css';
import  {Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import Login from './Login';

class Register extends React.Component {
    constructor(){
        super();
        this.handleReg = this.handleReg.bind(this);
    }
    state = {
        justreg: 0,
        err: ""
    };
    
    
    async handleReg(e){
        e.preventDefault();
        if (e.target.password.value.length < 4) {
            this.setState({err: "Password must be at least 4 char long."}); 
            return;
        }
        try {
            await Axios.post('/auth/register', {name: e.target.username.value , password: e.target.password.value, email: e.target.usermail.value});
            this.setState({ justreg: 1 });
        }
        catch {
            this.setState({err: "Email already registered."});
        }
    }

    render() {
        if(this.state.justreg !== 0) {
            return <Login />;
             }
        return (
            <div>
                <form onSubmit={this.handleReg} className="mx-auto login-form">
                <p className="login-text">
                    <span className="locker fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-lock fa-stack-1x"></i>
                    </span>
                </p>
                <input type="text" name="username" className="login-password" autoFocus={true} required={true} placeholder="Name" />
                <input type="email" name="usermail" className="login-username" required={true} placeholder="Email" />
                <input type="password" name="password" className="login-password" required={true} placeholder="Password" />
                <p className="errorField">{this.state.err}</p>
                <input type="submit" onSubmit={this.handleReg} name="Register" value="Register" className="login-submit" />
                
                </form>
                <Link to="/login" className="login-forgot-pass">Already registered?</Link>
                <div className="underlay-photo"></div>
                <div className="underlay-black"></div> 
            </div>
        )
}}

export default withRouter(Register);