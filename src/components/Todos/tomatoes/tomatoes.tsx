import * as React from 'react';
import TomatoAction from './tomatoAction'
import './tomatoes.scss'
import { connect } from 'react-redux'
import { addTomato, updateTomato } from '../../../redux/actions/tomatoes'
import axios from '../../../axios/axios';
import TomatoList from './TomatoList';
import _ from 'lodash';
import { format } from 'date-fns';

interface ITomatoesProps {
    addTomato: (payload: any) => any;
    updateTomato: (payload: any) => any;
    initTomatoes: (payload: any[]) => any;
    tomatoes: any[];
}

class Tomatoes extends React.Component<ITomatoesProps> {
    constructor(props) {
        super(props)
    }



    get unfinishedTomato() {
        return this.props.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0]

    }

    get finishedTomatoes() {

        const tomato = this.props.tomatoes

        const finishedTomatoes = tomato.filter((t) => { return t.description && t.ended_at && !t.aborted })
        console.log(finishedTomatoes)
        return _.groupBy(finishedTomatoes, (tomato) => {
            const date = tomato.started_at
            console.log(date)
            return format(date, 'YYYY-MM-D')
        })
    }



    startTomato = async () => {
        try {
            const response = await axios.post('tomatoes', { duration: 1500000 })
            this.props.addTomato(response.data.resource)
        } catch (e) {
            throw new Error(e)
        }
    }

    public render() {
        return (
            <div className="Tomatoes" id="Tomatoes">
                <TomatoAction startTomato={this.startTomato} unfinishedTomato={this.unfinishedTomato} updateTomato={this.props.updateTomato} />
                <TomatoList finishedTomatoes={this.finishedTomatoes} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    tomatoes: state.tomatoes,
    ...ownProps
})

const mapDispatchToProps = {
    addTomato,
    updateTomato
}

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);