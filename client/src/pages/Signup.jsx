import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import OAuth from '../components/OAuth';
import { signInSuccess } from '../redux/user/userSlice'; // Import your signInSuccess action

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); // Get the dispatch function
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('All fields are required');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post('http://localhost:3000/server/auth/signup', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.status === 200) {
        setLoading(false);
        dispatch(signInSuccess(formData)); // Update user's authentication state
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Internal Server Error');
      } else {
        setErrorMessage('Network Error');
      }
    }
  };
  
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-lg w-full p-8 bg-white bg-opacity-50 rounded shadow-md'>
        <div className='flex flex-col items-center'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <img
              src={'/favicon.jpeg'}
              alt="Aetherial Icon"
              className="h-56 m-10"
            />
          </Link>
          <p className='text-center text-sm mt-5'>
            You can sign up with your email and password or with Google.
          </p>
        </div>
        <form className='mt-5 space-y-4' onSubmit={handleSubmit}>
          <div>
            <Label value='Your username' />
            <TextInput
              type='text'
              placeholder='Username'
              id='username'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value='Your email' />
            <TextInput
              type='email'
              placeholder='name@company.com'
              id='email'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value='Your password' />
            <TextInput
              type='password'
              placeholder='*********'
              id='password'
              onChange={handleChange}
            />
          </div>
          <Button
            type='submit'
            disabled={loading}
            style={{backgroundColor:'black'}}
            className='w-full'
          >
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
          <OAuth/>
        </form>
        <div className='flex gap-2 text-sm mt-5 justify-center'>
          <span>Have an account?</span>
          <Link to='/signin' className='text-blue-500'>
            Sign In
          </Link>
        </div>
        {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
