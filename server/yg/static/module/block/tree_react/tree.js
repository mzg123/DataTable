var React = require('react');
require("./tree.css");


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




var Tree = React.createClass({
    treeHtml:"",
    createTree:function(data){
        data.map(function(item,index){

        })
    },
    itemClick:function(e){
          this.props.options.itemClick(e);
    },
    render: function () {
        var d=this.props.itemData;
        var items= d.map(function(item,index){
            return (
                <TreeItem itemData={item} className="position_r item">{item.text}</TreeItem>
            );
        });
        var itemClick=this.itemClick;
        return (
            <div className="tree position_r">
                <ul className="items position_r">
                {
                    d.map(function(item,index){
                      return(
                        <li class="position_r item">
                            <a onClick={itemClick}>{item.text}</a>
                            <ul  class="items position_r">
                             {
                                 item.child.map(function(itemc,indexc){
                                     return (<TreeItem  itemClick={itemClick} itemData={itemc} className="position_r item">{itemc.text}</TreeItem>);
                                 })
                                 }
                            </ul>
                        </li>)
                    })
                 }
                </ul>
            </div>
        );
    }
});

module.exports = Tree;




