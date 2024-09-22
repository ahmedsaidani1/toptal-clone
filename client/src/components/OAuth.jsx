import { Button } from "flowbite-react";
import { AiFillGoogleCircle, AiFillLinkedin} from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
        try {
        const resultsFromGoogle = await signInWithPopup(auth, provider)
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL,
            }),
            });
        const data = await res.json()
        if (res.ok){
            dispatch(signInSuccess(data))
            navigate('/')
        }
        console.log("user logged in")
    } catch (error) {
        console.log(error);
    }
};


const handleLinkedInClick = () => {
    window.open('/api/auth/linkedin', '_self');
};


  return (
    <div className="flex space-x-4">
    <Button type="button" gradientDuoTone='pinkToOrange'outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
        Continue with Google
    </Button>
    <Button type="button" gradientDuoTone='pinkToOrange' outline onClick={handleLinkedInClick}>
         <AiFillLinkedin className="w-6 h-6 mr-2" />
        Continue with LinkedIn
    </Button>
    </div>
  )
}
