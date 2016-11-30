var React = require('react');
require("./roller.css");


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

var RollerClick=React.createClass({
    getInitialState:function(){
        return {
            rollerClick:""
        }
    }
    ,render:function(){
        var className=this.props.rollerClick+" position_a ";
        return (
            <div className={className} >left</div>
        );
    }
})

var RollerFooter=React.createClass({
    render:function(){
        return (
            <div className="roller_footer align_c position_a " >
            {
                this.props.footerItem.map(function(item,i){
                    return (
                        <div></div>
                    );
                })
            }
            </div>
        );
    }
});

var RollerConment=React.createClass({

    render:function(){

        var totalWidth=0;
        var borderWidth=this.props.borderWidth;
       var items=  this.props.items.map(function(item,index){
          totalWidth=totalWidth+item.width+borderWidth;
            return (
                <div className="display_ilb">
                    <a target="_blank" href={item.href}>
                        <img  src={item.imgUrl}/>
                    </a>
                </div>
            );
        });
        return  (<div className="comtent position_r" style={{"width":totalWidth}}>
                    {items}
        </div>);
    }
});

var roller = React.createClass({
    getInitialState:function(){
        return {
            currentIndex:0
        }
    },
    setCurrentIndex:function(index){
        console.log(index);
        var borderWidth=this.props.borderWidth;
        var leftWidth=0;
        var items=this.props.items.length
        for(var i=0;i<index;i++){
            (i!=items-1)&&(leftWidth=leftWidth+this.props.items[i].width+borderWidth);
        }
        $(".roller .comtent").css({"left":-leftWidth})

    },
    componentDidMount:function(){
        var w=$(".roller .roller_footer").width();
        var pw=$(".roller .roller_footer").parent().width();
        var ph=$(".roller .roller_footer").parent().height();
        var cmh=$(".roller .leftClick").height(),items=this.props.items.length;
        var imgw=this.props.items[0].width;
        var conCount=parseInt(pw/imgw);
        var lCount=items-conCount;
        $(".roller .roller_footer").css({"left":(pw-w)/2});
        var state=this.state;
        var setCurrentIndex=this.setCurrentIndex;
        $(".roller .leftClick").css({"top":"50%","z-index":9}).on("click",function(evt){
            var currentIndex=state.currentIndex;

            if(currentIndex<items-lCount){
                currentIndex=++state.currentIndex;
                setCurrentIndex(currentIndex);
            }

        });
        $(".roller .rightRight").css({"top":"50%","right":"0","z-index":9}).on("click",function(){
            var currentIndex=state.currentIndex;
            if(currentIndex>=1){
                currentIndex=--state.currentIndex;
                setCurrentIndex(currentIndex);
            }
        });

    },

    render: function () {

        var footerItem=this.props.items;
        return (
            <div className="roller position_r">
                <RollerClick rollerClick="leftClick"></RollerClick>
                <RollerClick rollerClick="rightRight"></RollerClick>
                <RollerFooter footerItem={footerItem}></RollerFooter>
                <RollerConment borderWidth={this.props.borderWidth} currentIndex={this.state.currentIndex} items={footerItem}></RollerConment>
            </div>
        );
    }
});

module.exports = roller;




