import useFatch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const CreateDay = () => {
        const days = useFatch('http://www.localhost:3001/days');
        const navigate = useNavigate();
        
        function onSubmit(e :React.FormEvent) {
            e.preventDefault();    
    
            fetch(`http://localhost:3001/days/`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    day : days.length + 1
                } ),
            })
            .then(res => {
                if (res.ok) {
                    alert('생성이 완료 되었습니다!');
                    navigate(`/`)
                }
            })
        }

    return (
        <div>
            <h3> 현재 일수 : {days.length}일</h3>
            <button type="submit" onClick={onSubmit}> Day 추가</button>
        </div>
    )
}

export default CreateDay