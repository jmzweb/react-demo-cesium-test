import React from "react"

const lilist = {}

class QiPan extends React.Component {

    constructor(){
        super()
        this.state = {
            size: [2,2],
            lilist: {}
        }
    }

    renderDOM (y, ullist) {
        lilist[y] = []
        for( let x =0 ; x< this.state.size[0]; x ++){
            lilist[y].push(<li>{x}</li>)
        }
        if ( y >= this.state.size[1] ){
            console.log(2, ullist)
            return ullist
        }
        ullist.push(<ul key={"ul"+ y}>{lilist[y]}</ul>)
        y++
        this.renderDOM(y, ullist)

        return ullist

    }

    render(){
        const {size} = this.state

        return (
            <div>
                {
                    this.renderDOM(0, [])
                }
            </div>
        )
    }
}

export default QiPan