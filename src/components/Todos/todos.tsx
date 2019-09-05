import * as React from 'react';
import TodoInput from './TodoInput'
import axios from '../../axios/axios'
import TodoItem from './todoItem'
import { async } from 'q';
import './todos.scss'

interface ITodosState {
    todos: any[];
}

class Todos extends React.Component<any, ITodosState> {
    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
    }

    addTodo = async (params: any) => {
        const { todos } = this.state
        try {
            const response = await axios.post('todos', params)
            this.setState({ todos: [response.data.resource, ...todos] })
        } catch (e) { throw new Error(e) }
    }
    componentDidMount() {
        this.getTodos()
    }

    getTodos = async () => {

        try {
            const response = await axios.get('todos')
            this.setState({ todos: response.data.resources })
        } catch (e) {
            throw new Error(e)
        }
    }

    updateTodo = async (id: number, params: any) => {
        const { todos } = this.state
        try {
            const response = await axios.put(`todos/${id}`, params)
            const newTodos = todos.map(t => {
                if (id === t.id) {
                    return response.data.resource
                } else { return t }
            })
            this.setState({ todos: newTodos })
        } catch (e) { throw new Error(e) }
    }

    render() {
        return (
            <div className='Todos' id='Todos'>
                <TodoInput addTodo={(params) => { this.addTodo(params) }}></TodoInput>
                <main>
                    {
                        this.state.todos.map(t => {
                            return <TodoItem key={t.id} {...t} update={this.updateTodo}></TodoItem>
                        })
                    }
                </main>
            </div >
        )
    }
}

export default Todos;