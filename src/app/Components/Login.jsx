import React from 'react';
import '../../styles/login.css';
import  {Link} from 'react-router-dom';
import Axios from 'axios';

class Login extends React.Component {
    constructor() {
        super();
        this.state = { 
            errmsg: "", 
            login: false
        };
        this.handleReg = this.handleReg.bind(this);
        
      }

    async handleReg(e){
        e.preventDefault();
        try {
            const resp = await Axios.post('/auth/login', { 
                password: e.target.password.value, 
                email: e.target.usermail.value 
            });
            localStorage.setItem('token', resp.data);
            this.setState({ login: true });
        } catch (error) {
            this.setState({ errmsg: "Incorrect email or password" });
        }
    }

    render() {

        if (this.state.login) {
            return (
                window.location.reload()
            )
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
                <input type="email" name="usermail" className="login-username" autoFocus={true} required={true} placeholder="Email" />
                <input type="password" name="password" className="login-password" required={true} placeholder="Password" />
                <p className="errorField">{this.state.errmsg}</p>
                <input type="submit" name="Login" value="Login" className="login-submit" />
                
                </form>
                <Link to="/register" className="login-forgot-pass">Not registered yet?</Link>
                <div className="underlay-photo"></div>
                <div className="underlay-black"></div> 
            </div>
        )
}}

export default Login;