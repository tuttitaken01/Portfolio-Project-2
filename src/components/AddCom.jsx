import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Send } from '@mui/icons-material';

export default function PostForm({ setComments }) {
    const { loggedUser } = useContext(UserContext);
    const [ text, setText ] = useState('');
    const [ msg, setMsg ] = useState(null);
    const [ error, setError ] = useState(null);
    const { reviewId } = useParams();

    const handleSubmit = (e) => {
        const newComment = { username: loggedUser?.username, body: text};
        e.preventDefault();
        setMsg('Comment posted successfully!');
        setError(null);
        setText('');
        setComments(currComments => {
            return [newComment, ...currComments]})
        axios.post(`https:gameview.onrender.com/api/reviews/${reviewId}/comments`, newComment)
        .catch(err => {
            console.log(err);
            setError('Failed to post comment. Try again');
            setMsg(null);
            setComments(currComments => {
                currComments.splice(0,1)
                console.log(currComments);
                return [...currComments]
            })
        })
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>comment</label>
            <input className="inputCom" type="text" value={text} placeholder="insert your comment..." onChange={e => setText(e.target.value)} /><br />
            <Button variant="text" className="submit" type="submit" endIcon={<Send />}>Post</Button>  
        </form>
        {msg && <p style={{ color:"green" }}>{msg}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}