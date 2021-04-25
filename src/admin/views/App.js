import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { _upLoginState } from "../action"
import Loadable from "react-loadable"
import Cookies from "js-cookie"

import Home from "./pages/home/Home"
import WuZiQi from "./WuZiQi/"
import NotFound from "./notfound/NotFound"
// import Login from "./Login"

import {
    HashRouter, Switch, Route, Redirect
} from 'react-router-dom'
// import {Switch, Route, Redirect} from "react-router"

const Loading = () => <div> loading... </div>

const Login = Loadable({loader: ()=> import("./Login/index"), loading: Loading})

class App extends Component {


    componentWillMount(){
        const {upLoginState} = this.props
        if( Cookies.get("token") ){
            upLoginState(true)
        }
    }

    async async1 () {
        console.log(1)
        await this.async2()
        console.log(3)
    }
    async async2 () {
        console.log(2)
    }

    componentDidMount(){
        Promise.resolve(1).then(res => {
            console.log(4)
        })
        setTimeout(() => { console.log(5) })
        this.async1()
        console.log(6)
    }

    render(){

        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/home/index" push/>}/>
                    <Route path={"/wuziqi"} component={WuZiQi}/>
                    <Route path={"/home"} component={Home}/>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/404"} component={NotFound}/>
                    <Route Component={NotFound}/>
                </Switch>
            </HashRouter>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => ({
    upLoginState: bindActionCreators(_upLoginState,dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)