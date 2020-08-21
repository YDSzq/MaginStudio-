import state from './state.js';
import axios from 'axios';
import el from 'element-ui';

const mutations = {
    getuser() {
        axios({ method: "GET", url: "/api/users/details" }).then(function (response) {
            state.user = response.data;
        }).catch(function () {
            console.log("用户未登录")
        })
    },
    signin(s, signins) {
        s = signins
        var data = {
            identity: signins.id,
            password: signins.password,
            pid:"65edCTyg"
        }
        axios({ url: "/api/tiger/v3/web/accounts/login", method: "POST", timeout: 0, data: data }).then(function (response) {
            if (response.status == 200) {
                el.Message.success('登录成功');
                state.user = response.data.user_info;
                console.log(state.user)
            } else {
                el.Message.error('用户或密码错误');
            }
            //console.log(response)
        })
            .catch(function (error) {
                if (error.response.status == 403) {
                    el.Message.error('用户或密码错误');
                } else {
                    el.Message.error('未知错误');
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
    },
    join(s, form) {
        var data = form;
        data.id = 745;
        axios({ method: "POST", url: "/api/join", data: data }).then(function () {
            el.Message.success('申请成功，请等待（副）室长的审核')
        }).catch(function (error) {
            if (error.response.status == 422) {
                el.Message.success('您申请过了~')
            } else {
                el.Message.success('未知错误')
            }
        })
    }
};

export default mutations;
