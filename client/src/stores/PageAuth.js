import { useDispatch } from 'react-redux';
import { authActions } from '@/stores/store';

const PageAuth = () => {
    const dispatch = useDispatch();
    const loginHandler = (event) => {
        event.preventDefault();
    };
    dispatch(authActions.login());
    return <></>;
};
