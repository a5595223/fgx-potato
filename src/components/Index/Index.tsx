import * as React from 'react';
// import Button from 'antd/es/button';
import { Button } from 'antd';
import axios from '../../axios/axios'

interface IRouter {
    history: any;
}
interface IIndexState {
    user: any;
}


class Index extends React.Component<IRouter, IIndexState> {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }

    async componentWillMount() {
        await this.getMe()
    }

    getMe = async () => {
        try {
            const response = await axios.get('me')
            this.setState({ user: response.data })
        } catch (e) { console.error(' 获取信息失败') }
    }
    Logout = () => {
        localStorage.setItem('x-token', '')
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <div className='Component'>
                    <p>欢迎,{this.state.user && this.state.user.account}</p>
                    <Button onClick={this.Logout}>注销</Button>
                </div>
            </div>
        )
    }
}

export default Index