var React = require('react');
var reactRedux = require('react-redux')
require("./tree.css");
var Redux=require("redux");
var actions=require("../redux/actions.js");
var reactRouter=require('react-router');
//import reactRouter from 'react-router';
//import { Link } from 'react-router';
var connect=reactRedux.connect,provider =reactRedux.Provider,Link=reactRouter.Link;



//getInitialState()
//getDefaultProps()
//propTypes
//mixins
//statics
//componentWillMount()
//componentDidMount()
//componentWillReceiveProps(object nextProps)
//shouldComponentUpdate(object nextProps, object nextState)
//componentWillUpdate(object nextProps, object nextState)
//componentDidUpdate(object prevProps, object prevState)
//componentWillUnmount()
//component.forceUpdate()

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

var Tree = React.createClass({

    createTree:function(data,itemClick){
        var treeEntity=this.treeEntity,r='', self=this.createTree;
        return data.map(function(item,index){
            if(item.child){
                var lic="position_r item expand "+item.text;
                return(<li className={lic} >
                    <a  onClick= {itemClick.bind(this)} >{item.text}</a>
                    <ul  className="items position_r">
                 {self(item.child,itemClick)}
                    </ul>
                </li>)
            }
            else{
                return (<li className={lic}>
                    <a id={item.text} onClick= {itemClick.bind(this)}>{item.text}</a>
                </li>)
            }
        })
    },
    itemClick:function(e){
        var ul=$(e.target).parent().find("ul");
        if( ul.children().length>0){
            ul.toggle(100);
            var t=ul.parent();
            t.hasClass("closed")?t.removeClass("closed").addClass("expand"):t.removeClass("expand").addClass("closed");
        }else{
            this.props.onItemClick($(e.target).attr("id"));
        }

    },
    componentDidMount() {
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
    },
    routerWillLeave(nextLocation) {
        // 返回 false 会继续停留当前页面，
        // 否则，返回一个字符串，会显示给用户，让其自己决定
        if (true)
            return '确认要离开？';
    },
    render: function () {
        var d=this.props.itemData;

        var itemClick=this.itemClick;
        var treehtml=this.createTree(d,itemClick);
        return (
            <div  id="treeCon">

                <div  id="tree"> <Link to="/m">333</Link>
                    <div className="tree position_r" >
                        <ul className="items position_r">
                    {treehtml}
                        </ul>
                    </div>
                </div>
                <Content content={this.props.currentcontent}></Content>
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

var Tree=connect(
    mapStateToProps,
    mapDispatchToProps
)(Tree);
module.exports =Tree;
