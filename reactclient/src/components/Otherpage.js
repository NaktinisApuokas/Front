import React, { useContext } from 'react'
import { NameContext } from '../App';
import IsOpen from './IsOpen';


export default function Otherpage() {
    const {name,setClassName} = useContext(NameContext);
    function Noarrow(e){
        setClassName(e.target.value);
    }

    return (
        <div> {name}
            <div>
                <select onChange={(e) => Noarrow(e)}>
                    <option disabled selected value="">--Chose css class--</option>
                    <option >.input</option>
                    <option >.dropdown</option>
                    <option>.noBorder</option>
                </select>

            </div>
        </div>
    )
}
