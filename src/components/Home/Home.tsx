import * as React from 'react';
// import Button from 'antd/es/button';
import { Button, Dropdown, Icon, Menu } from 'antd';
import Todos from '../../components/Todos/todos'
import axios from '../../axios/axios'
import history from '../../axios/history'
import Tomatoes from '../Todos/tomatoes/tomatoes'
import './Home.scss'

interface IRouter {
    history: any;
}
interface IIndexState {
    user: any;
}
const Logout = () => {
    localStorage.setItem('x-token', '')
    history.push('/login')
}

const menu = (
    <Menu>
        <Menu.Item key="1">
            <Icon type="user" />
            个人设置
      </Menu.Item>
        <Menu.Item key="2" onClick={Logout}>
            <Icon type="logout" />
            注销
      </Menu.Item>

    </Menu>
);

// const Option = (
//     <Dropdown overlay={menu}>
//         <Button>
//             Button <Icon type="down" />
//         </Button>
//     </Dropdown>
// )

class Home extends React.Component<IRouter, IIndexState> {
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

        const response = await axios.get('me')
        this.setState({ user: response.data })

    }


    render() {
        return (
            <div>
                <div className='Home' id='Home'>
                    <header>
                        <span className='logo'>LOGO</span>
                        <Dropdown overlay={menu}>
                            <span>{this.state.user && this.state.user.account}<Icon type="down" style={{ marginLeft: 8 }} /></span>

                        </Dropdown>

                        {/* {Option} */}
                        {/* <p>欢迎,{}</p>
                        <Button onClick={this.Logout}>注销</Button> */}
                    </header>
                    <main>
                        <Tomatoes />
                        <Todos></Todos>
                    </main>
                </div>
            </div>
        )
    }
}

export default Home