<template>
    <div class="login">
        <div class="login-form">
            <div class="login-form-header">
                <img style="width: 75px; height: 75px;float: left;padding-right: 30px;" src="../assets/img/logo.png"
                     alt=""/>
                <div class="login-form-text">小小影院 - 后台管理</div>
            </div>
            <div style="color: #91949c;font-weight: bolder">

                <p>Username</p>
                <el-input class="login-form-input" v-model="username" placeholder="账 号"></el-input>
                <el-alert
                        v-if="usernameError"
                        title="请您输入不少于6位的用户名"
                        type="error"
                        show-icon>
                </el-alert>

                <p>Password</p>
                <el-input class="login-form-input" placeholder="密 码" v-model="password" show-password></el-input>
                <el-alert
                        v-if="passwordError"
                        title="请您输入不少于6位的密码"
                        type="error"
                        show-icon>
                </el-alert>

                <p>Role</p>
                <el-select style="width: 100%" class="login-form-input" v-model="role" placeholder="请选择你的身份">
                    <el-option label="系统管理员" value="admin"></el-option>
                    <el-option label="工作人员" value="worker"></el-option>
                </el-select>
                <el-alert
                        v-if="roleError"
                        title="请您选择登入的身份"
                        type="error"
                        show-icon>
                </el-alert>

                <div style="padding-top: 10px">
                    <el-checkbox v-model="remember">记住密码</el-checkbox>
                    <div style="float: right">
                        <el-tooltip class="item" effect="dark" content="请联系管理员修改" placement="bottom">
                            <el-link style="font-weight: bolder;font-size: 14px;color: #91949c;"
                                     :underline="false">
                                忘记密码?
                            </el-link>
                        </el-tooltip>
                    </div>
                </div>
                <el-button :loading="loading" @click="postLogin" class="login-form-button" type="primary">SIGN IN
                </el-button>
            </div>
            <div class="login-form-footer">
                <div style="font-weight: bolder;font-size: 16px;color: #91949c;"
                     :underline="false">
                    Copyright 2021 小小影院 - 后台管理
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {Login} from "@/api/user"

    export default {
        data() {
            return {
                loading: false,
                role: '',
                username: '',
                password: '',
                remember: false,
                usernameError: false,
                passwordError: false,
                roleError: false,
            }
        },
        methods: {
            postLogin() {
                this.loading = true;
                const LoginData = {
                    username: this.username,
                    password: this.password,
                    remember: this.remember,
                };

                if (LoginData.username.length <= 5) {
                    setTimeout(() => {
                        this.loading = false;
                        this.usernameError = true;
                    }, 700)
                    return
                } else {
                    this.usernameError = false;
                }

                if (LoginData.password.length <= 5) {
                    setTimeout(() => {
                        this.loading = false;
                        this.passwordError = true;
                    }, 700)
                    return
                } else {
                    this.passwordError = false;
                }

                if (!this.role) {
                    setTimeout(() => {
                        this.loading = false;
                        this.roleError = true;
                    }, 700)
                    return
                } else {
                    this.roleError = false;
                }

                Login(this.role, LoginData).then(res => {
                    if (!res.success) {
                        setTimeout(() => {
                            this.loading = false;
                        }, 700)
                    } else {
                        setTimeout(() => {
                            //登陆成功
                            console.log(res.data)
                            localStorage.setItem("token", res.data.token)
                            if (this.role === 'worker') {
                                localStorage.setItem("wid", res.data.worker.id)
                            }
                            localStorage.setItem("role", this.role)
                            this.$router.push("/")
                            this.loading = false;
                        }, 700)
                    }
                })

            }
        }
    }
</script>

<style scoped>

    .login {
        width: 100%;
        height: 100%;
        background: #FFFFFF;
    }

    .login-form {
        width: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        letter-spacing: 2px;
    }

    .login-form-header {
        height: 20px;
        padding-left: 40px;
        padding-bottom: 100px;
    }

    .login-form-text {
        color: #000000;
        font-weight: bold;
        font-size: 30px;
        padding-top: 15px;
    }

    .login-form-input {
        margin-bottom: 10px;
    }

    .login-form-button {
        border-radius: 3px;
        width: 100%;
        font-weight: 600;
        font-size: 15px;
        letter-spacing: 2px;
        height: 60px;
        background: #5a84fd;
        box-shadow: 0 5px 30px rgb(0 66 8.5%);
        margin-top: 35px;
    }

    .login-form-footer {
        font-weight: bolder;
        color: #91949c;
        padding-top: 40px;
        text-align: center;
    }

    >>> .el-input__inner {
        height: 48px;
    }

    .el-checkbox {
        color: #91949c;
        font-weight: bolder;
        font-size: 15px;
    }

</style>
