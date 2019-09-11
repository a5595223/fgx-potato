import * as React from 'react';
// import Button from 'antd/es/button';
import { Button, Dropdown, Icon, Menu } from 'antd';
import Todos from '../../components/Todos/todos'
import axios from '../../axios/axios'
import history from '../../axios/history'
import Tomatoes from '../Todos/tomatoes/tomatoes'
import Statistics from '../Statistics/Statistics'
import { initTodos } from '../../redux/actions/toods'
import { initTomatoes } from '../../redux/actions/tomatoes'
import { connect } from 'react-redux'

import './Home.scss'



interface IIndexState {
    user: any
}

const logout = () => {
    localStorage.setItem('x-token', '')
    history.push('/login')
}

const menu = (
    <Menu>
        <Menu.Item key="1"><Icon type="user" />个人设置</Menu.Item>
        <Menu.Item key="2" onClick={logout}><Icon type="logout" />注销</Menu.Item>
    </Menu>
);

class Home extends React.Component<any, IIndexState> {

    constructor(props: any) {
        super(props)
        this.state = {
            user: {}
        }
    }
    getTodos = async () => {
        try {
            const response = await axios.get('todos')
            const todos = response.data.resources.map(t => Object.assign({}, t, { editing: false }))
            this.props.initTodos(todos)
        } catch (e) {
            throw new Error(e)
        }
    }

    async componentWillMount() {
        await this.getMe()
        await this.getTodos()
        await this.getTomatoes()
    }

    getMe = async () => {
        const response = await axios.get('me');
        this.setState({ user: response.data })
    }
    getTomatoes = async () => {
        try {
            const response = await axios.get('tomatoes')
            this.props.initTomatoes(response.data.resources)
        } catch (e) {
            throw new Error(e)
        }


    }

    render() {
        return (
            <div className="Home" id="Home">
                <header>
                    <span className="logo">LOGO</span>
                    <Dropdown overlay={menu}>
                        <span>
                            {this.state.user && this.state.user.account}
                            <Icon type="down" style={{ marginLeft: 8 }} />
                        </span>
                    </Dropdown>
                </header>
                {/* <main>
                    <Tomatoes />
                    <Todos />
                </main> */}
                <Statistics></Statistics>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    todos: state.todos,
    ...ownProps
})

const mapDispatchToProps = {
    initTodos,
    initTomatoes
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);