import React, {useEffect, useState} from "react";

import {IconButton, TextField} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

function AddOrRemove({add, ...props}) {
    if (add) {
        return <AddIcon {...props}/>
    }
    return <RemoveIcon {...props}/>
}

function DelayInput({value, pos, size, onAdd, onRemove, onChangeValue, maxDemand}) {
    function handleChange(f, e) {
        let d = {...value}
        d[f] = e.target.value;
        onChangeValue(d);
    }

    return (
        <div className="d-flex">
            <TextField
                value={value?.pos} onChange={(e) => handleChange("pos", e)} size="small" type="number"
                label="Номер поставки"/>
            <TextField
                value={value?.delay} onChange={(e) => handleChange("delay", e)} size="small" type="number"
                label="Время задержки"/>
            <div className="mt-auto">
                <IconButton size="small" onClick={pos === size - 1 ? onAdd : onRemove}>
                    <AddOrRemove add={pos === size - 1}/>
                </IconButton>
            </div>
        </div>
    )
}

function getObjectKey(object) {
    if (object?.key == null) {
        object.key = Math.random();
    }
    return object.key
}


function Delay({params, onChange}) {

    const [delays, setDelays] = useState([{}])

    function handleAdd() {
        setDelays([...delays, {}])
    }

    function handleRemove(index) {
        if (delays.length === 1) {
            setDelays([{}])
            return;
        }
        console.log('remove ', index)
        let c = [...delays]
        c.splice(index, 1);
        setDelays(c)
        onChange?.(c)
    }

    function handleChangeValue(index, value) {
        let c = [...delays]
        c[index] = value
        setDelays(c)
        onChange?.(c)
    }

    return (
        <div className="p-2 ml-1 mr-1 mt-2 mb-2 border h-100 w-auto" style={{overflowY: 'auto'}}>
            {
                delays?.map((value, index) => (
                    <DelayInput onRemove={() => handleRemove(index)}
                                onAdd={handleAdd}
                                value={value}
                                key={getObjectKey(value)}
                                pos={index}
                                size={delays?.length}
                                onChangeValue={(value) => handleChangeValue(index, value)}
                                maxDemand={params?.delay}
                    />
                ))
            }
        </div>
    )
}

export default Delay;
