import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Send } from '@mui/icons-material';

export default function PostForm() {
    const [ list, setList ] = useState([]);
    const [ avatar, setAvatar ] = useState('guest');
    const [ text, setText ] = useState('');
    const [ msg, setMsg ] = useState(null);
    const [ error, setError ] = useState(null);
    const { reviewId } = useParams();

    useEffect(() => {
        axios.get(`https://gameview.onrender.com/api/users`)
        .then(({data: {users}}) => {
            let people = users.map(user => user.username);
            setList([...people]);
        })
    }, [avatar]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post(`https://gameview.onrender.com/api/reviews/${reviewId}/comments`, {
                username: avatar , body: text,
            })
            setMsg('Comment posted successfully!');
            setText('');
        } catch (err) {
            console.log(err);
            setError('Failed to post comment. Try again');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>username</label>
            <select value={avatar} onChange={e => setAvatar(e.target.value)}>
                <option selected value> -- select an option -- </option>
                {list.map(user => (
                    <option value={user}>{user}</option>
                ))}
            </select> <br/>
            <label>comment</label>
            <input type="text" value={text} placeholder="insert your comment..." onChange={e => setText(e.target.value)} /><br />
            <Button variant="text" className="submit" type="submit" endIcon={<Send />}>Post</Button>
            {msg && <p style={{ color:"green" }}>{msg}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    )
}