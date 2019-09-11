import * as React from 'react';
import './Statistics.scss'
import { connect } from 'react-redux';
import axios from '../../axios/axios'
import { initTomatoes } from '../../redux/actions/tomatoes'

interface IStatisticsProps {
    todos: any[];
}

class Statistics extends React.Component<IStatisticsProps> {
    constructor(props) {
        super(props)
    }

    get finishedTodos() {
        return this.props.todos.filter(t => t.completed && !t.deleted)
    }

    render() {
        return (
            <div className='Statistics' id='Statistics'>
                <ul>
                    <li>统计</li>
                    <li>目标</li>
                    <li>番茄历史</li>
                    <li>
                        任务历史
累计完成{this.finishedTodos.length}个任务
                    </li>
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    todos: state.todos,
    ...ownProps
})
export default connect(mapStateToProps)(Statistics);