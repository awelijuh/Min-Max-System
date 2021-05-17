import {CartesianGrid, Label, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";



function ChartResult({data, upd}) {
    console.log('upd', upd, data)
    if (!data.isValid()) {
        return null
    }
    let d = [...data.getData()]

    return (
        <div>
            <LineChart
                width={800}
                height={300}
                data={d}
            >
                <XAxis dataKey="x" height={40} domain={[0, data.params?.jobDays]} type="number">
                    <Label value="день" position="insideBottom"/>
                </XAxis>
                <YAxis type="number" width={60}>
                    <Label value="ед." position="insideLeft"/>
                </YAxis>

                <Tooltip/>
                <CartesianGrid stroke="#f5f5f5"/>
                <Line isAnimationActive={false} type="monotone" name="Текущий запас" dataKey="y" stroke="#ff7300" dot={null}/>
                <Line isAnimationActive={false} type="monotone" name="Максимально желательный запас" dataKey="maxWant" stroke="#987654" dot={null}/>
                <Line isAnimationActive={false} type="monotone" name="Пороговый уровень запаса" dataKey="porog" stroke="#987654" dot={null}/>
                <Line isAnimationActive={false} type="monotone" name="Гарантийный запас" dataKey="garant" stroke="#987654" dot={null}/>
            </LineChart>
        </div>

    )
}

export default ChartResult
