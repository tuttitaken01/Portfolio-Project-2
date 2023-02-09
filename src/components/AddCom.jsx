import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Send } from '@mui/icons-material';

export default function PostForm({ setComments }) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setMsg('Comment posted successfully!');
        setError(null);
        setText('');
        axios.post(`https:gameview.onrender.com/api/reviews/${reviewId}/comments`, {
            username: avatar, body: text,
        })
        .then(({data}) => {
            return data.comment[0];
        })
        .then((commentFromApi) => {
            setComments((currComments) => {
                return [commentFromApi, ...currComments];
            })
        })
        .catch(err => {
            console.log(err);
            setError('Failed to post comment. Try again');
            setMsg(null);
        })
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>username</label>
            <select className="form-name" value={avatar} onChange={e => setAvatar(e.target.value)}>
                <option selected value> -- select an option -- </option>
                {list.map(user => (
                    <option value={user}>{user}</option>
                ))}
            </select> <br/>
            <label>comment</label>
            <input type="text" value={text} placeholder="insert your comment..." onChange={e => setText(e.target.value)} /><br />
            <Button variant="text" className="submit" type="submit" endIcon={<Send />}>Post</Button>  
        </form>
        {msg && <p style={{ color:"green" }}>{msg}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}