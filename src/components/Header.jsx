import {Link,useNavigate} from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);

  const onLogout =() => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home</Link>
        </li>
        {user ? (
          <>
          <li className="nav-item">
          <button className='btn' onClick={onLogout}>Logout</button>
        </li>
          </>
        ) : (<>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        </>)}
        
       </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Header