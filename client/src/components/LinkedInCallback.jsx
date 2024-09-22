import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';

export default function LinkedInCallback() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLinkedInData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            try {
                const res = await fetch('/api/auth/linkedin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code }),
                });
                const data = await res.json();
                if (res.ok) {
                    dispatch(signInSuccess(data));
                    navigate('/');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchLinkedInData();
    }, [dispatch, navigate]);

    return <div>Loading...</div>;
}
