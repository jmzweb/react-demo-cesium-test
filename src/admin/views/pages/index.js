import Loadable from "react-loadable"

import Index from "./systemSet/HomeIndex"

const Loading = () => <div> Login... </div>

const UserApi = Loadable({loader: ()=> import("./user/UserApi"), loading: Loading})

export default {
    Index,
    UserApi
}