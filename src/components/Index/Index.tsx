import * as React from 'react';
// import Button from 'antd/es/button';
import { Button } from 'antd';


class Component extends React.Component<any> {
    props: any;

    Login = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <div className='Component'>
                    <Button onClick={this.Login}>登录</Button>
                </div>
            </div>
        )
    }
}

export default Component