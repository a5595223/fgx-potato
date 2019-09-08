import * as React from 'react';
import { Input, Icon } from 'antd'
import { connect } from 'react-redux'
import { addTodo } from '../../redux/actions'
import axios from '../../axios/axios'
import history from '../../axios/history'

interface ITodoInputState {
    description: string
}
interface ITodoInputProps {
    addTodo: (payload: any) => any;
}


class TodoInput extends React.Component<ITodoInputProps, ITodoInputState> {
    constructor(props) {
        super(props)
        this.state = {
            description: ''
        }
        console.log(this.props)
    }
    onKeyUp = (e) => {
        if (e.keyCode === 13 && this.state.description !== '') {
            this.postTodo()


        }
    }
    postTodo = async () => {

        try {
            const response = await axios.post('todos', { description: this.state.description })
            this.props.addTodo(response.data.resource)

        } catch (e) {
            history.go(0)
        }
        this.setState({ description: '' })
    }

    render() {
        const { description } = this.state;
        const suffix = description ? <Icon type='enter' onClick={this.postTodo} /> : <span />
        return (
            <div className='TodoInput' id='TodoInput'>
                <Input placeholder="添加新任务" suffix={suffix}
                    value={description} onChange={(e) => { this.setState({ description: e.target.value }) }} onKeyUp={this.onKeyUp} />

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
})

const mapDispatchToProps = { addTodo }

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);