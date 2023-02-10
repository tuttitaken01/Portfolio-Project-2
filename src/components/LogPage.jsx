import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { Button } from '@mui/material';
import { Send } from '@mui/icons-material';

export default function Login() {
    const [ input, setInput ] = useState('');
    const { loggedUser, setLoggedUser } = useContext(UserContext);
    const [ okMsg, setMsg ] = useState(null);
    const [ errMsg, setErrMsg ] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .get(`https://gameview.onrender.com/api/users`)
        .then(({ data: { users }}) => {
            const user = users.find((user) => input === user.username);

            if (user) {
                setLoggedUser(user);
                setMsg('Login successful!');
                setErrMsg(null);
            } else {
                setErrMsg('username not found');
                setMsg(null);
                setLoggedUser({});
            }
        });
    };

    const msg = 
        loggedUser !== undefined ? (
            <section>
                <p>{loggedUser.username}</p>
                <img
                src={loggedUser.avatar_url}
                alt={loggedUser.username}
                height="50px"
                />
            </section>
        ) : (
            <p></p>
        );

        console.log(loggedUser, setLoggedUser, 'login page');

    return (
        <div>
            <form onSubmit={handleSubmit} className="log-form">
                <label>username</label>
                <input
                className="login-user"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)} />
                <Button className="log-but" variant='text' type='submit' endIcon={<Send />}>Login</Button>
            </form>
            {okMsg && <p style={{ color: 'green' }}>{okMsg}</p>}
                {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
                <br />
                {msg}
        </div>
    )
}