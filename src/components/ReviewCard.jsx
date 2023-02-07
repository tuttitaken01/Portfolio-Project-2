import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ArrowCircleDown, ArrowCircleUp, ThumbDown, ThumbUp } from '@mui/icons-material';

export default function SingleRev() {
    const [ review, setReview ] = useState({});
    const [ comments, setComments ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ msg, setMsg ] = useState(null);
    const { reviewId } = useParams();

    useEffect(() => {
        const fetchReview = async () => {
            setLoading(true);
            try {
                const [ revRes, comRes ] = await Promise.all([
                    axios.get(`https://gameview.onrender.com/api/reviews/${reviewId}`),
                    axios.get(`https://gameview.onrender.com/api/reviews/${reviewId}/comments`),
                ]);
                // console.log(response.data.review);
                let rev = revRes.data.review;
                let com = comRes.data.comments;
                // console.log(com);
                rev.created_at = (new Date(rev.created_at)).toUTCString();
                // console.log(typeof(result.created_at))
                setReview(rev);
                setComments(com);
                if (rev.comment_count === "0") {
                    setMsg(`It's very dry here...🏜️`);
                } else {

                }
            } finally {
                setLoading(false);
            }
        }
        fetchReview();
    }, [reviewId]);


    return (
        <div>
            {loading && <div className="loading">Loading...⏳</div>}
            <h1>{review.title}</h1>
            <h5>{review.category}</h5>
            <h5>{review.created_at}</h5>
            <img src={review.review_img_url} alt="game" width="600px"/>
            <p>{review.review_body}</p>
            <p><IconButton aria-label='up'>
                <ThumbUp fontSize='small' color='success' />
                </IconButton>{review.votes}<IconButton aria-label="down">
                <ThumbDown fontSize='small' color='error' />
                </IconButton>
            </p> 
            <h3>Comments ({review.comment_count})</h3>
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