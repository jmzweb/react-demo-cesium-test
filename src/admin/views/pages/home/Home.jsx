import React from "react"
import Routers from "../../routes/Router"
import { TransitionGroup, CSSTransition } from "react-transition-group"

class Home extends React.Component {
    render(){

      console.log('....', this.props)
        return (
            <div>
                <div>Home</div>
                <TransitionGroup>
                    <CSSTransition
                      timeout={500}
                      transitionName="fade"
                                   transitionAppear={true}
                                   transitionAppearTimeout={1500}
                                   transitionEnter={false}
                                   transitionLeave={true}
                                   transitionLeaveTimeout={300}>
                        <Routers {...this.props} />
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )
    }
}

export default Home
