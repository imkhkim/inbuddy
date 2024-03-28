import { useSelector, useDispatch } from 'react-redux';
import { testActions } from '@/stores/test';

function JourneyCollectionPage() {
    const dispatch = useDispatch();
    console.log(useSelector((state) => state.test.word));
    dispatch(testActions.changeReducer(100));
    console.log(useSelector((state) => state.test.word));

    return (
        <>
            <h3>여정 컬렉션 페이지</h3>
        </>
    );
}

export default JourneyCollectionPage;
