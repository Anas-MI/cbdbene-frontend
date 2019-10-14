import React, { Component } from 'react'
import Fuse from 'fuse.js'
import learnQuestions from '../../chatBotLearnQuestionSet'
import ChatMsgList from './ChatMsgList'

const chatMsgList = new ChatMsgList()

const {
    learnMoreNotMatch
} = chatMsgList
const options = {
    keys: ['title'],
    id: 'author'
}
const fuse = new Fuse(learnQuestions, options)
export default class LearnResponse extends Component {
    componentDidMount(){
        const {
            previousStep, triggerNextStep
        } = this.props
        this.result = fuse.search(previousStep.message)
        if(this.result && this.result.length > 0){
            setTimeout(() => {
                triggerNextStep({
                    trigger: "learnMoreNext"
                })
            }, 400);
        }else{
            setTimeout(() => {
                triggerNextStep({
                    trigger: "learnMoreQuit"
                })
            }, 400);

        }
    }
    render(){
        const {
            previousStep,
        } = this.props
        // console.log({
        //     propsAAA: this.props,
        //     previousStep: previousStep.message,
        //     result: this.result
        // })
        
        if(this.result && this.result.length > 0){
            return(
                <div>{this.result[0]}</div>
            )
        }else{;
            return <div>{learnMoreNotMatch()}</div>
        }
    }
}