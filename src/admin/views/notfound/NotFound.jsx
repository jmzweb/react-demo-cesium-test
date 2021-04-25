import React, {Component} from "react"
import {Link} from "react-router-dom"

import ChildrenFirst from "../../components/children-first/index"
import ChildrenSecond from "../../components/children-second/index"

class NotFound extends Component {

    render(){
        return (
            <div>
                <h3>404 / not found</h3>
                <div>
                    <ChildrenFirst/>
                    <ChildrenSecond/>
                </div>
                <div>
                    <ul>
                        <li>
                            <Link to={"/home/index"}>
                                <button>首页</button>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/login"}>
                                <button>登录</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default NotFound