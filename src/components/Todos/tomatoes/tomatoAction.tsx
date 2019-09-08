import * as React from 'react';
import { Button, Input, Icon, Modal } from 'antd'
import axios from '../../../axios/axios'
import CountDown from './CountDown'
import './tomatoAction.scss'

interface ITomatoActionProps {
    startTomato: () => void
    unfinishedTomato: any
    updateTomato: (payload: any) => void
}
interface ITomatoActionState {
    description: string
}
const { confirm } = Modal;

class TomatoAction extends React.Component<ITomatoActionProps, ITomatoActionState> {
    constructor(props) {
        super(props)
        this.state = {
            description: ''
        }
    }

    onKeyUp = (e) => {
        if (e.keyCode === 13 && this.state.description !== '') {
            this.updateTomato({
                description: this.state.description,
                ended_at: new Date()
            })
            this.setState({ description: '' })


        }
    }
    onFinish = () => {
        this.forceUpdate()
    }
    showConfirm = () => {
        confirm({
            title: '你目前正在一个番茄工作时间中，要放弃这个番茄吗?',

            onOk: () => {
                this.abortTomato()
            },
            onCancel() {
                console.log('取消');
            },
            okText: '确认',
            cancelText: '取消',
        });
    }
    abortTomato = () => {

        this.updateTomato({ aborted: true })
        document.title = `Fgx番茄App`
    }
    updateTomato = async (params: any) => {
        try {
            const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`, params)
            this.props.updateTomato(response.data.resource)
        } catch (e) { throw new Error(e) }
    }
    render() {
        let html = <div></div>


        if (this.props.unfinishedTomato === undefined) {
            html = <Button className='startTomatoButton' onClick={() => this.props.startTomato()}>开始番茄</Button>
        } else {
            const started_at = Date.parse(this.props.unfinishedTomato.started_at)
            const duration = this.props.unfinishedTomato.duration
            const timeNow = new Date().getTime()
            if (timeNow - started_at > duration) {
                html = <div className='InputWrapper'><Input value={this.state.description} onChange={e => { this.setState({ description: e.target.value }) }}
                    onKeyUp={e => this.onKeyUp(e)} placeholder='请输入你刚刚完成的任务'>
                </Input>
                    <Icon type="close-circle" className='abort' onClick={this.showConfirm} />
                </div>
            } else if (timeNow - started_at < duration) {
                const timer = duration - timeNow + started_at
                html = (
                    <div className='countDownWrapper'>
                        <CountDown timer={timer} onFinish={this.onFinish} duration={duration} />
                        <Icon type="close-circle" className='abort' onClick={this.showConfirm} />
                    </div>)
            }
        }

        return (
            <div className='TomatoAction' id='TomatoAction'>
                {html}
            </div>
        )
    }
}
export default TomatoAction