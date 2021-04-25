import React,{ Component } from "react"
import { Provider, connect } from "react-redux"

import App from "./views/App"

class I18n extends Component {
    render(){
        const {store} = this.props
        return (
            <Provider store={store}>
                <App store={store}/>
            </Provider>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(I18n)