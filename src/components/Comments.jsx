import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ArrowCircleDown, ArrowCircleUp } from '@mui/icons-material';

export default function Comments() {
    const [ comments, setComments ] = useState([]);
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

    return (
        <div>
            {loading && <div className="loading">Loading...⏳</div>}
            <h3>Comments ({comments.length})</h3>
            {msg && <p>{msg}</p>}
            <ul className='comments'>
                {comments.map(c => (
                    <li key={c.comment_id} className="comitem">
                        <h4 className="author">{c.author}</h4>
                        {c.body}
                        <p className="votes"><IconButton aria-label='up'>
                            <ArrowCircleUp fontSize='small' color='success' />
                        </IconButton>{c.votes}<IconButton aria-label="down">
                                <ArrowCircleDown fontSize='small' color='error' />
                            </IconButton></p></li>
                ))}
            </ul>
        </div>
    )

}