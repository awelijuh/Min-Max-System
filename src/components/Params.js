import React, {useState} from "react";
import {Button, Form} from "react-bootstrap"

function Input({name, value, onChange}) {

    return (
        <Form.Group>
            <Form.Label>{name}</Form.Label>
            <Form.Control value={value} onChange={e => onChange?.(e.target.value)} type="text" placeholder={"Введите число"}/>
        </Form.Group>
    )
}

function Params({onChange}) {

    const [params, setParams] = useState({})

    function handleChange(field) {
        return value => {
            let d = {...params}
            if (!isNaN(parseFloat(value))) {
                value = parseFloat(value)
            }
            d[field] = value
            setParams(d)
            onChange?.(d)
        }
    }

    return (
        <div className="p-2 m-2 border w-100 col-3">
            <h5>Входные параметры</h5>
            <Form>
                <Input value={params?.demand} onChange={handleChange("demand")} name="Объем потребности, ед."/>
                <Input value={params?.optZak} onChange={handleChange("optZak")} name="Оптимальный размер заказа, ед."/>
                <Input value={params?.leadTime} onChange={handleChange("leadTime")} name="Время выполнения заказа, дн."/>
                <Input value={params?.delay} onChange={handleChange("delay")} name="Возможная задержка поставки, дн."/>
                <Input value={params?.jobDays} onChange={handleChange("jobDays")} name="Количество рабочих дней, дн."/>
            </Form>
        </div>
    )
}

export default Params;
