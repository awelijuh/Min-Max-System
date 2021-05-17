import React, {Component} from "react";
import CalcResult from "./CalcResult";
import ChartResult from "./ChartResult";
import Delay from "./Delay";


class Result extends Component {
    state = {
        delays: null,
    }
    handleChangeDelay(delays) {
        this.setState({delays: delays})
    }

    render() {
        const data = this.props.data
        data.clear()
        data.setDelays(this.state.delays)
        data.calcAll()

        return (
            <div className="w-auto h-100 d-flex flex-wrap">
                <div className="d-flex align-items-stretch mb-2" style={{height: '280px'}}>
                    <Delay params={this.state.delays} onChange={this.handleChangeDelay.bind(this)}/>
                    <CalcResult params={data.params}/>
                </div>
                <div className="w-100"/>
                <ChartResult data={data}/>
            </div>
        )
    }

}

export default Result
