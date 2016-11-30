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
                        <div data-index={i}></div>
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
        var borderWidth=this.props.borderWidth;
        var leftWidth=0;
        var items=this.props.items.length;
        index==items-1&&(index--);
        for(var i=0;i<index;i++){
            (i!=items-1)&&(leftWidth=leftWidth+this.props.items[i].width+borderWidth);
        }

        (this.props.rollerType==1)&&$(".roller .comtent").css({"left":-leftWidth})

    },
    setCurrentFlag:function(clickflag,index){
        var last=index,current=index;
        if(clickflag==1){
            last=index-1;
            current=index;

        }else{
            last=index+1;
            current=index;
        }
        $(".roller .comtent>div").eq(current).addClass("current_item");
        $(".roller .comtent>div").eq(last).removeClass("current_item");

        $(".roller .roller_footer>div").eq(current).addClass("current_item_footer");
        $(".roller .roller_footer>div").eq(last).removeClass("current_item_footer");


    },
    componentDidMount:function(){
        var w=$(".roller .roller_footer").width();
        var pw=$(".roller .roller_footer").parent().width();
        var ph=$(".roller .roller_footer").parent().height();
        var cmh=$(".roller .leftClick").height(),items=this.props.items.length;
        $(".roller .comtent>div").eq(0).addClass("current_item");
        $(".roller .roller_footer>div").eq(0).addClass("current_item_footer");
        var imgw=this.props.items[0].width;
        var conCount=parseInt(pw/imgw);
        $(".roller .roller_footer").css({"left":(pw-w)/2,"z-index":9});
        var state=this.state;
        var footerTipClick=this.footerTipClick, change=this.change, setCurrentIndex=this.setCurrentIndex,setCurrentFlag=this.setCurrentFlag;

        $(".roller .leftClick").css({"top":"50%","z-index":9}).on("click",function(evt){
            change(1,items-conCount);
        });
        $(".roller .rightRight").css({"top":"50%","right":"0","z-index":9}).on("click",function(){
            change(-1,1);
        });

        $(".roller .roller_footer>div").on("click",function(evt){
            var last=state.currentIndex;
            var current=parseInt($(evt.target).attr("data-index"));
            (last!=current)&&footerTipClick(last,current);

        });
    },
    footerTipClick:function(last,current){
        $(".roller .comtent>div").eq(current).addClass("current_item");
        $(".roller .comtent>div").eq(last).removeClass("current_item");

        $(".roller .roller_footer>div").eq(current).addClass("current_item_footer");
        $(".roller .roller_footer>div").eq(last).removeClass("current_item_footer");
       // console.log( current,this.state.currentIndex);
        this.state.currentIndex=current;
        current==this.props.items.length-1&&(current=current-1);
        this.setCurrentIndex(current);
    },
    change:function(flag,count){
        var setCurrentIndex=this.setCurrentIndex,setCurrentFlag=this.setCurrentFlag,state=this.state;
        var currentIndex=state.currentIndex;
        if(flag==1){

            if(currentIndex<=count){
                currentIndex=++state.currentIndex;
                setCurrentFlag(flag,currentIndex);
                setCurrentIndex(currentIndex);
            }
            console.log(state.currentIndex);
        }
        else if(flag==-1){
           // currentIndex==this.props.items.length-1&&(currentIndex=state.currentIndex-1&&(--state.currentIndex));
            if(currentIndex>=count){
                currentIndex=--state.currentIndex;
                setCurrentFlag(flag,currentIndex);
                setCurrentIndex(currentIndex);
            }
        }

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




