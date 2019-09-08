import * as React from 'react';
import TomatoAction from './tomatoAction'
import './tomatoes.scss'
import { connect } from 'react-redux'
import { addTomato, initTamotoes, updateTomato } from '../../../redux/actions/tomatoes'
import axios from '../../../axios/axios'

interface ITomatoesProps {
    addTomato: (payload: any) => any
    initTamotoes: (payload: any[]) => any
    tomatoes: any[]
    updateTomato: (payload: any) => any
}

class Tomatoes extends React.Component<ITomatoesProps> {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        this.getTomatoes()
    }

    get unfinishedTomato() {
        return this.props.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0]
    }

    getTomatoes = async () => {
        try {
            const response = await axios.get('tomatoes')
            this.props.initTamotoes(response.data.resources)
            console.log(this.unfinishedTomato)
        } catch (e) {
            throw new Error(e)
        }
    }
    startTomato = async () => {
        try {
            const response = await axios.post('tomatoes', { duration: 1500000 })
            this.props.addTomato(response.data.resource)
        } catch (e) {
            throw new Error(e)
        }
    }
    render() {
        return (
            <div className='Tomatoes' id='Tomatoes'>
                <TomatoAction startTomato={this.startTomato} unfinishedTomato={this.unfinishedTomato} updateTomato={this.props.updateTomato}></TomatoAction>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    tomatoes: state.tomatoes,
    ...ownProps
})

const mapDispatchToProps = {
    addTomato, initTamotoes, updateTomato
}
export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes)