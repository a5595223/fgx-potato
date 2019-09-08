import * as React from 'react';
import TomatoAction from './tomatoAction'
import './tomatoes.scss'
import { connect } from 'react-redux'
class Tomatoes extends React.Component {
    render() {
        return (
            <div className='Tomatoes' id='Tomatoes'>
                <TomatoAction></TomatoAction>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    tomatoes: state.tomatoes,
    ...ownProps
})

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes)