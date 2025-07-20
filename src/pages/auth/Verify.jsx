import {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { BeatLoader } from 'react-spinners';

const Verify = () => {
  // const { token } = useParams();  
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState(''); 
  // const response = await axios.post(
  //   `https://edutrack-jlln.onrender.com/api/v1/school/verify/${token}`
  // );
  if (response.status === 200) {
    setLoading(false)
   setMessage (response.data.message)
   if (response.data.message === 'school verified successfully') {
    setTimeout(() => {
      navigate('/login'); 
    }, 3000);
   }
   
  }
  else if (response.status === 400) {
    setLoading(false)
    setMessage(response.data.message,'Redirecting to login...')
    setTimeout(() => {
      navigate('/login'); 
    }, 3000);
  }
  else if (response.status == 404) {
    setLoading(false)
    setMessage(response.data.message)
  }
  else{
    setLoading(false)
    setMessage('something came up please recheck your email :)')
  }

   return (
    <div className='verify'>
      {!loading ? (
        <h1>{message || 'Please wait'} <BeatLoader color='white' /></h1> 
      ) : (
        <h1>{message}</h1>
      )}
    </div>
  );
}

export default Verify