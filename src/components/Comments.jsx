import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ArrowCircleDown, ArrowCircleUp, Delete } from '@mui/icons-material';
import PostForm from './AddCom';
import { useContext } from 'react';
import { UserContext } from './UserContext';

export default function Comments() {
    const [ comments, setComments ] = useState([]);
    const { loggedUser } = useContext(UserContext);
    const [ errMsg, setErrMsg ] = useState(null);
    const [ okMsg, setOkMsg ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ msg, setMsg ] = useState(null);
    const { reviewId } = useParams();

    useEffect(() => {
        const getComments = async () => {
            setLoading(true);
            try {
                const com = await axios.get(`https://gameview.onrender.com/api/reviews/${reviewId}/comments`);
                let c = com.data.comments;
                setComments(c);
                if (c.length === 0) {
                    setMsg(`It's very dry here...🏜️`);
                } else {

                }
            } finally {
                setLoading(false);
            }
        }
        getComments();
    }, [reviewId]);

    function handleOnClick (id) {
            axios.delete(`https://gameview.onrender.com/api/comments/${id}`)
            .then(() =>
            setComments(newComments => newComments.filter(one => one.comment_id !== id)),
            setOkMsg('comment deleted!'))
            .catch(err =>
                setErrMsg('You are not authorised to delete this comment!'))
    }

    return (
        <div>
            <PostForm setComments={setComments} />
            {loading && <div className="loading-c">Loading...⏳</div>}
            {msg && <p>{msg}</p>}
            {okMsg && <p style={{ color: 'orange'}}>{okMsg}</p>}
            <ul className='comments'>
                {comments.map(c => (
                    <li key={c.comment_id} className="comitem">
                        <h3 className="author">{c.author}</h3>
                        <p>{c.body}</p>                        
                        <p className="votes"><IconButton aria-label='up'>
                            <ArrowCircleUp fontSize='small' color='success' />
                        </IconButton>{c.votes}<IconButton aria-label="down">
                                <ArrowCircleDown fontSize='small' color='error' /></IconButton></p>
                        <p className="delete-b"><IconButton aria-label="delete" disabled={c.author !== loggedUser?.username} onClick={() => handleOnClick(c.comment_id)}><Delete font-size="small" color="error" /></IconButton></p>
                        {errMsg && <p className="error-delete">{errMsg}</p>}</li>
                ))}
            </ul>
        </div>
    )

}