import dummy from '../db/data.json';
import Word, { Iwords } from './Word';
import useFatch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Day = () => {

    const { day } = useParams<{day :string}>()

    const dayWord :Iwords[] = useFatch(`http://localhost:3001/words?day=${day}`);

    /* 패치 첫 번째 방법
    const [dayWord, SetdayWord] = useState([])

    useEffect(()=> {
        fetch('http://localhost:3001/words')
        .then(res => {
            return res.json()
        })
        .then(word=> {
            console.log(word)
            SetdayWord(word.filter(word=> word.day === Number(num.day)))
        })
    }, [])
    */

    /* 패치 두 번째 방법
    useEffect(()=> {
        fetch(`http://localhost:3001/words?day=${num.day}`)
        .then(res => {
            return res.json()
        })
        .then(word=> {
            SetdayWord(word)
        })
    }, [num])
    */

    return (
        <>
        <h2> Day {day} </h2>
        {dayWord.length === 0 && <span> Loading ...</span>}
        <table>
            <tbody>
                {dayWord.map(word => (
                    <Word word={word} key={word.id}/>
                ))}

            </tbody>
        </table>
        </>
    )
}

export default Day;
