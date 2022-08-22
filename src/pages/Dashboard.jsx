import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import GoalForm from '../components/GoalForm';

function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals);

  useEffect(() => {
    if(!user){
      navigate('/');
    }
  },[user, navigate]);

  return (
    <>
      <section className='heading'>
        <h1>welcome {user && user.name}</h1>
        <p>Goals Dasboard</p>
      </section>
      <GoalForm/>
    </>
  )
}

export default Dashboard