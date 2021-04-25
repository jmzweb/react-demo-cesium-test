import React, {useState, useEffect} from "react"
import Modal from '../../../components/modal/modal'

// 测试
// import promiseTest from '../../../test'

export default function HomeIndex () {
    const a = useState(null)
    const handleClickTest = (res) => {
        console.log(res)
        Modal.alert()
    }

    return(
        <>
            <div onClick={handleClickTest}>1234</div>
        </>
    );
}

