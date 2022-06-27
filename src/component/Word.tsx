import { useState } from 'react';

interface Iprops {
    word : Iwords;
}

export interface Iwords {
    id :number;
    day :number;
    eng :string;
    kor :string;
    isDone :boolean;
}

const Word = ({word : w} :Iprops) => {

    const [word, setWord] = useState(w);
    const [isShow, SetisShow] = useState(false);
    const [isDone, SetisDone] = useState(word.isDone);

    const ShowWord = () => {
        SetisShow(!isShow);
        /*
        if (isShow === true) {
            SetisShow(false)
        }
        else {
            SetisShow(true)
        }
        */
    }

    const del = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            fetch(`http://localhost:3001/words/${word.id}`, {
                method : 'DELETE',
            }).then(res => {
                if (res.ok) {
                    setWord({...word, id : 0})
                }
            })
        }
    }

    if (word.id === 0) {
        return null;
    }

    const ShowDone = () => {
        // SetisDone(!isDone);
        fetch(`http://localhost:3001/words/${word.id}`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                ...word,
                isDone : !isDone
            } ),
        })
        .then(res => {
            if (res.ok) {
                SetisDone(!isDone);
            }
        })
    }


    return (
        <>
        <table>
            <tr key={word.id} className={isDone ? "off" : "on"}>
                <td>
                    <input onChange={ShowDone} type="checkbox" checked={isDone} aria-label="Search"/>
                </td>
                <td>{word.kor}</td>
                <td>{isShow && word.eng}</td>
                <td>
                    <button onClick={ShowWord}> {isShow ? "숨기기" : "해석"} </button>
                    <button onClick={del} className='btn_del'> 삭제</button>
                </td>
            </tr>
        </table>
        </>
    )
}

export default Word;