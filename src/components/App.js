import '../styles/App.css';
import React, {useState} from "react";
import Params from "./Params";
import "bootstrap/dist/css/bootstrap.min.css"
import {hot} from "react-hot-loader/root";
import Result from "./Result";
import {Data} from "../logic/Data";

function App() {
    const [params, setParams] = useState();

    return (
        <div className="d-flex h-auto">
            <Params onChange={setParams} />
            <Result data={new Data(params)}/>
        </div>
    );
}

export default hot(App);
