//import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Action from './Action';
import Dispatcher from './Dispatcher';
import Store from './Store';
import View from './View';


// ReactDOM.render(<View />, document.getElementById('root'));


async function init(){
    try{
        const historicalData = await fetch('http://localhost:8080/data')
        const weatherdata = await historicalData.json()
        const theAction = Action(weatherdata)
        let renderer = dom => ReactDOM.render(dom, document.getElementById('root'))
        let theDispatcher
        const theView = View(() => theDispatcher)
        const theStore = Store(historicalData)
        theDispatcher = Dispatcher(theStore)
        renderer(theView(theAction))
        
    }catch (err) {
        console.log(err)
    }

}

init()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


serviceWorker.unregister();
