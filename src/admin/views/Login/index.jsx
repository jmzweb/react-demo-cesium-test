import React from "react"

class Login extends React.Component {

    constructor(){
        super();
        this.state = { num: "0" }
    }

    handleSubmit(){}
    handleSubmitRegister(){}
    handleSubmitWangji(){}

    handleClick(e){
        e.preventDefault()
        this.setState({
            num: e.target.getAttribute("data-id")
        })
    }

    componentDidMount() {
      // let iframe = document.createElement('iframe')
      // iframe.src = 'about:back'
      // document.body.append(iframe);
      // iframe.contentWindow.document.body.innerHTML = decodeURIComponent(location.href.split('=')[1])

      var _script_ = document.createElement("script"), htmlData = this.pageName("htmlData")
      _script_.src = "https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js"
      document.head.append(_script_)
      // 小程序
      if (/miniProgram/i.test(navigator.userAgent) && /micromessenger/i.test(navigator.userAgent)) {
        let _mini_script_ = document.createElement("script")
        _mini_script_.src = "https://res.wx.qq.com/open/js/jweixin-1.4.0.js"
        document.head.append(_mini_script_)
        if (this.pageName("callback")) {
          window.postMessage({data: {msg: "close windows"} })
          wx.miniProgram.navigateTo({url: '/pages/index/index'})
        }
      }
      console.log(htmlData)
      if (htmlData) {
        // 把文件放到div中，并开始执行
        var _div = document.createElement("div")
        _div.innerHTML = decodeURIComponent(this.pageName("htmlData"))

        document.body.append(_div)
        var _scriptArr = document.querySelectorAll("script")
        var _script = document.createElement("script")
        _script.innerHTML = _scriptArr[_scriptArr.length - 1].innerHTML
        document.head.append(_script)
      }

      // let _div = document.createElement("div")
      // _div.innerHTML = decodeURIComponent(location.href.split('=')[1])
      // document.body.append(_div)
      // let _scriptArr = document.querySelectorAll("script")
      // let _script = document.createElement("script")
      // _script.innerHTML = _scriptArr[_scriptArr.length - 1].innerHTML
      // document.head.append(_script)
      //
      // if (/miniProgram/i.test(navigator.userAgent) && /micromessenger/i.test(navigator.userAgent)) {
      //   let _mini_script_ = document.createElement("script")
      //   _mini_script_.src = "https://res.wx.qq.com/open/js/jweixin-1.4.0.js"
      //   document.head.append(_mini_script_)
      // }
      //
      // let _script_ = document.createElement("script")
      // _script_.src = "https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js"
      // document.head.append(_script_)
      //
      // setTimeout(() => {
      //   window.postMessage("color windows");
      // }, 10000)
    }
  pageName(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    console.log(window.location.href.split("?")[1])
    var r = window.location.href.split("?")[1] && 
            window.location.href.split("?")[1].match(reg);
    if (r != null) return r[2];
    return null;
  }
    handleClickMessage () {
      console.log(window)
      window.postMessage({data: {msg: "close windows"} })
      alert(1)
      alert(wx)
      wx.miniProgram.navigateTo({url: '/pages/index/index'})
      uni.reLaunch({
        url: '/pages/index/index'
      });
      uni.postMessage({
        data: {
          action: 'message'
        }
      });
    }


  hasDOM () {
        const {num} = this.state
        switch (num){
            case "0":
                return (
                    <div>
                        <header>Login</header>
                        <div>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <ul>
                                    <li>
                                        <input placeholder={"账号"} type={"text"}/>
                                    </li>
                                    <li>
                                        <input placeholder={"密码"} type={"password"}/>
                                    </li>
                                    <li>
                                        <button type={"submit"}>登录</button>
                                    </li>

                                </ul>
                            </form>
                        </div>
                    </div>
                )
            case "1":
                return (
                    <div>
                        <header>register</header>
                        <form onSubmit={this.handleSubmitRegister.bind(this)}>
                            <ul>
                                <li>
                                    <input placeholder={"账号"} type={"text"}/>
                                </li>
                                <li>
                                    <input placeholder={"用户名"} type={"text"}/>
                                </li>
                                <li>
                                    <input placeholder={"邮箱"} type={"email"}/>
                                </li>
                                <li>
                                    <input placeholder={"手机号"} type={"number"}/>
                                </li>
                                <li>
                                    <input placeholder={"验证码"} type={"text"}/>
                                </li>
                                <li>
                                    <input placeholder={"密码"} type={"password"}/>
                                </li>
                                <li>
                                    <input placeholder={"再次输入密码"} type={"password"}/>
                                </li>
                                <li>
                                    <button type={"submit"}>注册</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                )
            case "2":
                return (
                    <div>
                        <header>找回密码</header>
                        <form onSubmit={this.handleSubmitWangji.bind(this)}>
                            <ul>
                                <li>
                                    <input placeholder={"手机号"} type={"number"}/>
                                </li>
                                <li>
                                    <input placeholder={"验证码"} type={"text"}/>
                                </li>
                                <li>
                                    <button type={"submit"}>忘记密码</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                )
        }
    }

    render(){
        const {num} = this.state
        return (
            <div>
                { this.hasDOM() }
                <li onClick={this.handleClick.bind(this)}>
                    {num !== "0" ? <a data-id="0" href="javascript:;">登录账号</a> :""}
                    &nbsp;&nbsp;&nbsp;
                    {num !== "1" ? <a data-id="1" href="javascript:;">注册账号</a> :""}
                    &nbsp;&nbsp;&nbsp;
                    {num !== "2" ? <a data-id="2" href="javascript:;">忘记密码</a> :""}
                </li>
              <div><button onClick={this.handleClickMessage}>点击postMessage</button></div>
            </div>
        )
    }
}

export default Login
