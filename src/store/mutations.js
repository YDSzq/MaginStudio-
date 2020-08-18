import state from './state.js';
import axios from 'axios';
import el from 'element-ui';

const mutations = {
    getuser() {
        axios({ method: "GET", url: "/api/users/details" }).then(function (response) {
            state.user = response.data;
        }).catch(function () {
            var f = window.sessionStorage.setItem("user");
            if (f) {
                state.user = JSON.parse(f);
            } else {
                console.log("用户未登录")
            }
        })
    },
    signin(s, signins) {
        s = signins
        var data = {
            identity: signins.id,
            password: signins.password,
        }
        axios({ url: "/api/login", method: "POST", timeout: 0, data: data }).then(function (response) {
            if (response.status == 200) {
                el.Message.success('登录成功');
                state.user = response;
                window.sessionStorage.setItem("user", JSON.stringify(response));
                location.reload()
            } else {
                el.Message.error('用户或密码错误');
            }
            //console.log(response)
        })
            .catch(function (error) {
                if (error.response.status == 400) {
                    el.Message.error('用户或密码错误');
                } else {
                    el.Message.success('未知错误');
                }
                //console.log(error)
            });
    },
    signout() {
        axios({ method: "POST", url: "/api/logout", data: {} }).then(function () {
            el.Message.success('退出成功');
        }).catch(function () {
            el.Message.error('未知错误');
        })
    }
};

export default mutations;
