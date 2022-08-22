import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {login, reset} from '../features/auth/authSlice';

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : [e.target.value]
        }));
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isLoading, isError, isSuccess , message} = useSelector(
        (state) => state.auth
    ) 

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset())

    },[user, isError, isSuccess, message, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,password
        }

        dispatch(login(userData))
    }

  return (
    <div className="container">
        <h1>Login</h1>
        <p>login and get started!</p>
        <form onSubmit={onSubmit} >
            <input type="email" name='email' value={email} placeholder="Enter your email" onChange={onChange} /><br/><br/>
            <input type="password" name='password' value={password} placeholder="Enter your password" onChange={onChange}/><br/><br/>
            <button type="submit" className="btn btn-dark">Submit</button>
        </form>
    </div>
  )
}

export default Login