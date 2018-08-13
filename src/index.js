import React,{createElement} from 'react';
import ReactDOM from 'react-dom';

/* eslint-disable no-unused-vars */

import './static/index.css';
import {mo as mapObject, ma as mapArray} from './lib/utils.js'; // map to object, map to array


class App extends React.Component{
  constructor(){
    super()
    this.state={
      stocks:{
        '0':{id:'0',in_ids:[0,1],vals:[72],name:'home_temp'},
        '1':{id:'1',in_ids:[2],vals:[90],name:'outside_temp'},
      },
      flows:{
        '0':{id:'0',modifier:(outval,inval)=>outval>72?Math.round(outval-1):outval,in_id:-1,name:'air_conditioner'},
        '1':{id:'1',modifier:(outval,inval)=>outval+(inval>outval?0.1:-0.1),in_id:1,name:'conduction'},
        '2':{id:'2',modifier:outval=>outval,in_id:-1,name:'steady_temp'},
        // '3':{id:'3',type:'flow',modifier:(outval,inval)=>outval-inval>0?0.1:-0.1,in_id:1,name:'insulation'},
      },
      time:0,
      runs:20
    };

    this.run_model = ()=>{
      this.setState({time:0});
      let timer = setInterval(()=>{
        this.setState((prev)=>{
          return {
            time:prev.time+1,
            stocks:mapObject(stock=>{
              let flow;
              return {...stock,vals:[...stock.vals, stock.in_ids.reduce((next_val,flow_id)=>{
                flow=prev.flows[flow_id];
                return flow.modifier(next_val,flow.in_id===-1? null : prev.stocks[flow.in_id].vals[prev.time]);
              },stock.vals[prev.time])]};
            })(prev.stocks)
          };
        });
        if(this.state.time>this.state.runs){clearInterval(timer);}
      },100);
    }
  }

  render(){return (
    <div>
      <p> &nbsp;</p>
      <div><button onClick={this.run_model}>run</button></div>
      <p> &nbsp;</p>
      <p>Stocks</p>
      <div>
        {mapArray(s=><div key={s.id}>{s.name} {s.vals[s.vals.length-1]}</div>)(this.state.stocks)}
      </div>
      <p> &nbsp;</p>
      <p> &nbsp;</p>
      <p>Flows</p>
      <div>
        {mapArray(f=><div key={f.id}><pre>{f.name}</pre><pre>{f.modifier.toString()}</pre></div>)(this.state.flows)}
      </div>
    </div>
  )}
}

ReactDOM.render(createElement(App), document.getElementById('root'));
