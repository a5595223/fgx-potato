import * as React from 'react';
import { Checkbox, Icon } from 'antd';
import classNames from 'classnames'
import './todoItem.scss'

interface ITodoItemProps {
    id: number;
    description: string;
    editing: boolean;
    completed: boolean;
    update: (id: number, params: any) => void;
    toEditing: (id: number) => void;
}
interface ITodoItemState {
    editText: string
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
    constructor(props) {
        super(props)
        this.state = {
            editText: this.props.description
        }
    }
    update = (params: any) => {
        this.props.update(this.props.id, params)
    }
    toEditing = () => {
        this.props.toEditing(this.props.id)
    }
    onkeyUpHandle = (e) => {
        if (e.keyCode === 13 && this.state.editText !== '') {
            this.update({ description: this.state.editText })


        }
    }

    render() {
        const Editing = (
            <div className="editing">
                <input type="text" value={this.state.editText} onChange={e => { this.setState({ editText: e.target.value }) }}
                    onKeyUp={this.onkeyUpHandle} />
                <div className="iconWrapper">
                    <Icon type="enter" />
                    <Icon type="delete" theme="filled" onClick={e => this.update({ deleted: true })} />
                </div>
            </div>
        )
        const text = <span className="text" onDoubleClick={this.toEditing}>{this.props.description}</span>
        const todoItemClass = classNames({
            TodoItem: true,
            editing: this.props.editing,
            completed: this.props.completed
        })
        return (
            <div className={todoItemClass} id='TodoItem'>
                <Checkbox checked={this.props.completed} onChange={e => this.update({ completed: e.target.checked })}></Checkbox>
                {
                    this.props.editing ? Editing : text

                }
            </div>
        )
    }
}

export default TodoItem;