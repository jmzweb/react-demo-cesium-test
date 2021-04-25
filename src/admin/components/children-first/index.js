import React, { Component } from "react"

import childStyle from "./children-first.less"

class ChildrenFirst extends Component {

    render(){
        return (
            <div>
                <header className={childStyle.title}>this is a first title!</header>
            </div>
        )
    }
}

export default ChildrenFirst