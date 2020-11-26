import React from 'react';
import '../../styles/login.css';
import  {Link, Redirect, withRouter } from 'react-router-dom';
import Axios from 'axios';

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
        try {
            const resp = await Axios.post('/auth/register', {name: e.target.username.value , password: e.target.password.value, email: e.target.usermail.value})
            .then(response => this.setState({ justreg: 1 })
            // .catch(() => this.setState({ err: "Email already registered." }))
            )
            console.log(resp);
        }
        catch {
            this.setState({err: "Email already registered."})
        }
    }

    render() {
        if(this.state.justreg !== 0) {
            return <Redirect to="/login" />
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
                {/* <input type="password" name="repeat" className="login-password" required={true} placeholder="Repeat Password" /> */}
                <p className="errorField">{this.state.err}</p>
                <input type="submit" onSubmit={this.handleReg} name="Register" value="Register" className="login-submit" />
                
                </form>
                <Link to="/login" className="login-forgot-pass">Already registered?</Link>
                <div className="underlay-photo"></div>
                <div className="underlay-black"></div> 
            </div>
        )
}}

// function Register(){
//     const history = useHistory();
//     // const [msg , setMsg] = useState("")
//     // let error_msg = "Passwords don't match. Please try again"
//     function handleReg(e){
//         // console.log(e.target.username.value);
//         // console.log(e.target.password.value);
//         // console.log(e.target.usermail.value);
        
//         e.preventDefault();
//         const x = Axios.post('/auth/register', {name: e.target.username.value , password: e.target.password.value, email: e.target.usermail.value})
//         console.log(x);
//         history.push("/login");
//         // try {
//         //     const x = await Axios.post('/auth/register', {name: e.target.username.value , password: e.target.password.value, email: e.target.usermail.value})
//         //     console.log(x);
//         //     if (x) history.push("/login");
            
//         // } catch (e) {
//         //     alert(e.message);
//         // }
//         // Axios.post('/auth/register', {name: e.target.username.value , password: e.target.password.value, email: e.target.usermail.value})
//         //     .then((e) => {history.push('/login')})
//         //     .catch((e) => {console.log(e)})
//         // e.preventDefault()
//         // if (e.target.passwd === e.target.repeat) console.log("Match");
//         //onSubmit={() => handleReg()} 
//     }
//     return (
//         <div>
//             <form className="mx-auto login-form"> 
//             <p className="login-text">
//                 <span className="locker fa-stack fa-lg">
//                     <i className="fa fa-circle fa-stack-2x"></i>
//                     <i className="fa fa-lock fa-stack-1x"></i>
//                 </span>
//             </p>
//             <input type="text" name="username" className="login-password" autoFocus={true} required={true} placeholder="Name" />
//             <input type="email" name="usermail" className="login-username" required={true} placeholder="Email" />
//             <input type="password" name="password" className="login-password" required={true} placeholder="Password" />
//             {/* <input type="text" className="login-password" autoFocus={true} required={true} placeholder="Name" />
//             <input type="email" className="login-username" required={true} placeholder="Email" />
//             <input type="password" className="login-password" required={true} placeholder="Password" />
//             <input type="password" className="login-password" required={true} placeholder="Repeat Password" /> */}
//             <p className="errorField">{}</p>
//             <input type="submit" onClick={() => handleReg()} name="Register" value="Register" className="login-submit" />
            
//             </form>
//             <Link to="/login" className="login-forgot-pass">Already registered?</Link>
//             <div className="underlay-photo"></div>
//             <div className="underlay-black"></div> 
//         </div>
//     )
// }

export default withRouter(Register)