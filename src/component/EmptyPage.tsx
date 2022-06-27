import { Link } from 'react-router-dom';

const EmptyPage = () => {
    return (
        <>
        <p> 잘못된 접근입니다. </p>
        <Link to ='/'> 돌아가기 </Link>
        </>
    )
}


export default EmptyPage;