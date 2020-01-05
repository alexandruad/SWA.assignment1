
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import model from './model'
import store from './store'
import view from './view'
import dispatcher from './dispatcher'



async function init() {
    try {
        const weather_data = await fetch('http://localhost:8080/data')
        const weatherdata = await weather_data.json()
        const forecastdata = await fetch('http://localhost:8080/forecast').then(res => res.json())
        const theModel = model(weatherdata, forecastdata)
        let renderer = dom => ReactDOM.render(dom, document.getElementById('root'))
        let theDispatcher
        const theView = view(() => theDispatcher)
        const theStore = store(theModel, theView, renderer)
        theDispatcher = dispatcher(theStore)
        renderer(theView(theModel))
    } catch (err) {
        console.log(err)
    }
}

init()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
