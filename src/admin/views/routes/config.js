export default {
    menus: [
        {key: "home", path: "/home/index", title: "主页", icon: "home", component: "Index"},
        {key: "home/user", title: "系统设置", icon: "setting",
            childrens: [
                {path: "/home/user/api", key: "userApi", title: "用户API数据", component: "UserApi"}
            ]
        }
    ]
}