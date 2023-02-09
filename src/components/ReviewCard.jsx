import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import { IconButton } from '@mui/material';
import { ThumbDown, ThumbUp } from '@mui/icons-material';

export default function SingleRev() {
    const [ review, setReview ] = useState({});
    const [ votes, setVotes ] = useState(0);
    const [ err, setErr ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const { reviewId } = useParams();

    useEffect(() => {
        const fetchReview = async () => {
            setLoading(true);
            try {
                const revRes = await axios.get(`https://gameview.onrender.com/api/reviews/${reviewId}`);
                let rev = revRes.data.review;
                rev.created_at = (new Date(rev.created_at)).toUTCString();
                setReview(rev);
                setVotes(rev.votes);
            } finally {
                setLoading(false);
            }
        }
        fetchReview();
    }, [reviewId]);

    const handleInc = () => {
        setVotes((currentCount) => currentCount + 1);
        axios.patch(`https://gameview.onrender.com/api/reviews/${reviewId}`, {
            inc_votes : 1
        })
        .catch(err => {
            console.log(err);
            setErr('something went wrong')
        })
    }
    const handleDec = () => {
        setVotes((currentCount) => currentCount - 1);
        axios.patch(`https://gameview.onrender.com/api/reviews/${reviewId}`, {
            inc_votes : -1 
        })
        .catch(err => {
            console.log(err)
            setErr('something went wrong')
        })
    }


    return (
        <div>
            {loading && <div className="loading">Loading...⏳</div>}
            <h1>{review.title}</h1>
            <h5>{review.category}</h5>
            <h5>{review.created_at}</h5>
            <img src={review.review_img_url} alt="game" width="600px"/>
            <p>{review.review_body}</p>
            <section>
            {err ? <p style={{ color: 'red' }}>{err}</p> : null}
            <p><IconButton aria-label='up' onClick={() => handleInc()}>
                <ThumbUp fontSize='small' color='success'/>
                </IconButton>{votes}<IconButton aria-label="down" onClick={() => handleDec()}>
                <ThumbDown fontSize='small' color='error' />
                </IconButton>
            </p></section>
            <Comments />            
        </div>
        
    )
}