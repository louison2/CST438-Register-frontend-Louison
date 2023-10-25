import React, { useState } from 'react';
import StudentDashboard from './StudentHome';

function Login() {
    const [user, setUser] = useState({email:'', password:''});
    const [isAuthenticated, setAuth] = useState(false);

    const onChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const login = () => {
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => { 
            const jwtToken = res.headers.get('Authorization');
            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
        })
        .catch(err => console.error(err));
    }

    if (isAuthenticated) {
        return <StudentDashboard />;
    } else {
        return (
            <div className="App">
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="email">Email</label></td>
                            <td><input type="text" name="email" value={user.email} onChange={onChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Password</label></td>
                            <td><input type="password" name="password" value={user.password} onChange={onChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <button id="submit" onClick={login}>Login</button>
            </div>
        );
    }
}

export default Login;
