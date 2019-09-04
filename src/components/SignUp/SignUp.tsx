import * as React from 'react';
import { Input, Tooltip, Icon, Button } from 'antd';
import { Interface } from 'readline';
import axios from '../../axios/axios'
import { Link } from 'react-router-dom'
import './SignUp.scss'

interface ISignUpState {
    account: string | number | string[],
    password: string | number | string[],
    passwordConformation: string | number | string[]
}

class SignUp extends React.Component<any, ISignUpState> {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            password: '',
            passwordConformation: ''
        }
    }

    onChangeAccount = e => {
        this.setState({ account: e.target.value })
    };
    onChangePassword = e => {
        this.setState({ password: e.target.value })
    };
    onChangePasswordConformation = e => {
        this.setState({ passwordConformation: e.target.value })
    };
    submit = async () => {
        const { account, password, passwordConformation } = this.state
        try {
            await axios.post('sign_up/user', {
                account,
                password,
                password_confirmation: passwordConformation
            })
            console.log('成功')
        } catch (e) { throw new Error(e) }
    }
    // linkTo = () => {
    //     this.props.history.push('login')
    // }
    render() {
        const { account, password, passwordConformation } = this.state
        return (
            <div className='SignUp' id='SignUp'>
                <Input
                    placeholder="请输入你的用户名"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={
                        <Tooltip title="Extra information">
                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>

                    }
                    value={account}
                    allowClear onChange={this.onChangeAccount}
                />

                <Input.Password prefix={<Icon type="medium" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" value={password} onChange={this.onChangePassword} />
                <Input.Password prefix={<Icon type="medium" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请确认密码" value={passwordConformation} onChange={this.onChangePasswordConformation} />
                <Button onClick={this.submit}>注册</Button>
                <p>如果你有账号，请立即<Link to="/login">登录</Link></p>
            </div>
        )
    }
}

export default SignUp