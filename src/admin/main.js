/**
 * xx
 * */

import React from "react"
import ReactDOM from "react-dom"
import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import reducer from "./reducer"

import I18n from "./i18n"

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(<I18n store={store}/>, document.getElementById("root"))

console.log('test==================', module)

module.hot.accept()