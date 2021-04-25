import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

export default function Modal (props) {
    const el = document.createElement('div')
    this.alert = (res) => {
        console.log(res)
    }
    useEffect(() => {
        document.body.appendChild(el)
        return () => {
            el.remove()
        }
    }, []);
    return ReactDOM.createPortal(props.children, el)
}