import {CSSTransition , TransitionGroup} from 'react-transition-group'
import React, { Component,Fragment } from 'react';
import "./style.css";
import XiaojiejieItem from './XiaojiejieItem';
import axios from 'axios';

import Boss from './Boss'

class Xiaojiejie extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputValue:"zgh",
            list:["aa","bb","cc","<h1>121</h1>"]
        }
    }
    state = {  }
    render() { 
        return ( 
            <Fragment>
                <div>
                    <label htmlFor="jspang">加入服务</label>
                    <input id="jspang" 
                    className="input" 
                    value={this.state.inputValue}
                    onChange={this.inputChange.bind(this)}
                    //关键代码——----------start
                    ref={(input)=>{this.input=input}}
                    //关键代码------------end
                      />
                    <button onClick={this.addList.bind(this)} >增加服务</button>
                    <ul ref ={(ul)=>{this.ul = ul}}>
                        <TransitionGroup>
                        {
                        this.state.list.map((item,index) => {

                            return (
                                <CSSTransition
                                    timeout={1000}
                                    classNames='boss-text'
                                    unmountOnExit
                                    appear={true}
                                    key={index+item}  
                                >
                                <XiaojiejieItem 
                                content={item}
                                key={index+item}
                                index={index}
                                deleteItem = {this.deleteItem.bind(this)}
                                ></XiaojiejieItem>
                                
                                </CSSTransition>
                            ) 
                             
                            })
                        }
                        </TransitionGroup> 
                    </ul>
                </div>
                <Boss/>

            </Fragment>

         );
    }

    inputChange(e){
        console.log(this)
        this.setState({
            inputValue:this.input.value
        })
    }
    addList(e){
        console.log("增加啊啊")
        this.setState({
            list:[...this.state.list,this.state.inputValue]
        },()=>{
         //关键代码--------------start
          console.log(this.ul.querySelectorAll('div').length)
         //关键代码--------------end
        })
     
    }
//删除单项服务
    deleteItem(e){
        console.log(e)
        let list = this.state.list
        list.splice(e,1)
        this.setState({
            list:list
        })
        //不能直接改变this.state 里面的值
    }
    componentDidMount(){
        axios.get('https://www.easy-mock.com/mock/5e2e626016f42c50a5c9da72/ReactDemo01/Xiaojiejie')
            .then((res)=>{
                console.log('axios 获取数据成功:'+JSON.stringify(res))
                this.setState({
                    list:res.data.data
                })
              })
            .catch((error)=>{console.log('axios 获取数据失败'+error)})
    }
    
}

export default Xiaojiejie;
