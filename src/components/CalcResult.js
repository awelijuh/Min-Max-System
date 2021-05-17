import React from "react";
import {Button, Form, Table} from "react-bootstrap"

function Text({name, value}) {
    let v = value?.toFixed(2)

    return (
        <div className="d-flex w-100 border-top">
            <label className="font-weight-bolder mr-4">{name + ":"}</label>
            <span className="ml-auto">{v}</span>
        </div>
    )
}

function CalcResult({params}) {

    return (
        <div className="p-2 mt-2 mb-2 ml-1 mr-1 h-100 border w-auto">
            <h5>Расчетные параметры</h5>

            <Text name={"Интервал между заказами, день"} value={params?.interval}/>
            <Text name={"Ожидаемое дневное потребление, шт./день"} value={params?.demandInDay}/>
            <Text name={"Ожидаемое потребление за время поставки, шт."} value={params?.demandInAll}/>
            <Text name={"Максимальное потребление за время поставки, шт."} value={params?.maxDemand}/>
            <Text name={"Гарантийный запас, шт."} value={params?.garant}/>
            <Text name={"Пороговый уровень запаса, шт."} value={params?.porog}/>
            <Text name={"Максимально желательный запас, шт."} value={params?.maxWant}/>
        </div>
    )
}


export default CalcResult
