import useFatch from "../hooks/useFetch";
import { useNavigate } from 'react-router';
import React, { useRef, useState } from "react";
import { IDay } from "./DayList";

const CreateWord = () => {
    const days :IDay[] = useFatch('http://www.localhost:3001/days');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    


    function onSubmit(e: React.FormEvent) {
        e.preventDefault();    

        if(!isLoading 
            && dayRef.current
            && korRef.current
            && engRef.current) {
            setIsLoading(true);

        const day = dayRef.current.value;
        const eng = engRef.current.value;
        const kor = korRef.current.value;


            fetch(`http://localhost:3001/words/`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    day,
                    eng,
                    kor,
                    isDone : false,
                } ),
            })
            .then(res => {
                if (res.ok) {
                    alert('생성이 완료 되었습니다!');
                    navigate(`/day/${day}`)
                    setIsLoading(false);
                }
            })
        }
    }

    const dayRef = useRef<HTMLSelectElement>(null);
    const engRef = useRef<HTMLInputElement>(null);
    const korRef = useRef<HTMLInputElement>(null);

    return (
        <form onSubmit={onSubmit}>
          <div className="input_area">
            <label>Eng</label>
            <input type="text" placeholder="computer" ref={engRef} />
          </div>
          <div className="input_area">
            <label>Kor</label>
            <input type="text" placeholder="컴퓨터" ref={korRef} />
          </div>
          <div className="input_area">
            <label>Day</label>
            <select title="aa" ref={dayRef}>
              {days.map(day => (
                <option key={day.id} value={day.day}>
                  {day.day}
                </option>
              ))}
            </select>
          </div>
          <button
            style={{
              opacity: isLoading ? 0.3 : 1,
            }}
          >
            {isLoading ? "Saving..." : "저장"}
          </button>
        </form>
    )
}

export default CreateWord;