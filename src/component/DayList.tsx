import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFatch from '../hooks/useFetch';
// import dummy from '../db/data.json';

export interface IDay {
    id : number;
    day : number;
}

const DayList = () => {
    
    const days :IDay[] = useFatch('http://www.localhost:3001/days')

    if (days.length === 0) {
        return <span> Loading ... </span>
    }

    return (
        <>
        <ul className='list_day'>
            {days.map(day => (
                <li key={day.id}>
                <Link to={`/day/${day.day}`}>
                    DAY {day.day}
                </Link>
                </li>
            ))}
        </ul>   

        </>
    )
}

export default DayList;