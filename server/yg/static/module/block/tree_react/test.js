var React = require('react');
var reactRedux = require('react-redux')
require("./tree.css");
var Redux=require("redux");
var actions=require("../redux/actions.js");
//var reactRouter=require('react-router');
//import reactRouter from 'react-router';
import { Link } from 'react-router';
var connect=reactRedux.connect,provider =reactRedux.Provider ;





var TreeItem=React.createClass({
    componentDidMount:function(e){
    },

    render:function(){
        var d=this.props.itemData.child;
        var itemClick=this.props.itemClick;
        var items= d.map(function(item,index){
            return (
                <li onClick={itemClick} className="position_r item">{item.text}</li>
            );
        });
        return (
            <li className="position_r item">

                <a onClick={itemClick} className="closed">{this.props.itemData.text}</a>
                <ul  className="items position_r">
                {items}
                </ul>
            </li>
        );
    }
})


var Content=React.createClass({
    render:function(){
        return(
            <div id="content">
                <textarea value={this.props.content}>

                </textarea>
            </div>
        );
    }
})

var Test = React.createClass({


    render: function () {

        return (
            <div >
              1111111111111111111111
            </div>


        );
    }
});



const mapStateToProps =function (state) {
    return {
        itemData:state.treeCounter.treeItems
        ,options:state.treeCounter.options
        ,state:state.treeCounter.state
        ,content:state.treeCounter.content
        ,currentcontent:state.treeCounter.currenttxt
    }
}

const mapDispatchToProps = function(dispatch ,ownProps) {
    return {
        onItemClick: function(id){
            dispatch(actions.getAjaxLog(id));
        }
    }
}

var Test=connect(
    mapStateToProps,
    mapDispatchToProps
)(Test);
module.exports =Test;
