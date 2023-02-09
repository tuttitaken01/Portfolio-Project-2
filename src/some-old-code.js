/* export default function Reviews() {
    const [ reviews, setReviews ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ selCat, setSelCat ] = useState ('All');


    useEffect(() => {
        const getAllRev = async () => {
            setLoading(true);
            try {
                const [ allRev, allCat ] = await Promise.all([
                    axios.get('https://gameview.onrender.com/api/reviews'),
                    axios.get('https://gameview.onrender.com/api/categories'),
                ]);
                let revs = allRev.data.reviews;
                let cats = allCat.data.categories.map(category => category.slug);
                setReviews(revs);
                setCategories(['All', ...cats]);
            } finally {
                setLoading(false);
            }
        }
        getAllRev();
    }, []);

    const filteredReviews = selCat === 'All' ? reviews : reviews.filter( review => review.category === selCat);
*/