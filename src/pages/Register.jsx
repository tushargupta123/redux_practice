import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {register, reset} from '../features/auth/authSlice';

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name , email, password, password2} = formData;

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

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : [e.target.value]
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(password[0] !== password2[0]){
            toast.error("Password do not match")
        }else {
            const userData = {
                name,email,password
            }
            dispatch(register(userData))
        }
    }

  return (
    <div className="container">
        <h1>Register</h1>
        <p>Please create an account</p>
        <form onSubmit={onSubmit} >
            <input type="text" name="name" value={name} placeholder="Enter your name" onChange={onChange} /><br/><br/>
            <input type="email" name='email' value={email} placeholder="Enter your email" onChange={onChange} /><br/><br/>
            <input type="password" name='password' value={password} placeholder="Enter your password" onChange={onChange}/><br/><br/>
            <input type="password" name='password2' value={password2} placeholder="Enter confirm password" onChange={onChange}/><br/><br/>
            <button type="submit" className="btn btn-dark">Submit</button>
        </form>
    </div>
  )
}

export default Register