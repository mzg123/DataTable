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
var roller = React.createClass({
    setFooterStyle:function(){

    },
    componentDidMount:function(){
        var w=$(".roller .roller_footer").width();
        var pw=$(".roller .roller_footer").parent().width();
        console.log(pw);
         console.log($(".roller .roller_footer").css({"left":(pw-w)/2}));
    },
    render: function () {
        return (
            <div className="roller position_r">
                <div className="leftClick position_a">left</div>
                <div className="leftRight position_a">right</div>
                <div className="roller_footer align_c position_a " >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="comtent">
                    <div className="display_ilb">
                        <a href="http://www.baidu.com">
                            <img src="http://cdn.yingu.com/upload/image/20160928/2b94e8d8f4d702d5331fccbd387169dc.jpg" />
                        </a>
                    </div>
                    <div>
                        <a href="http://www.baidu.com">
                            <img src="http://cdn.yingu.com/upload/image/20161125/2548b11109bbe48a442c3b8a0f023bc.jpg" />
                        </a>
                    </div>
                    <div>
                        <a href="http://www.baidu.com">
                            <img src="http://cdn.yingu.com/upload/image/20161029/ed9cd9aa1a6895560932461d8de834fa.jpg" />
                        </a>
                    </div>
                    <div>
                        <a href="http://www.baidu.com">
                            <img src="http://cdn.yingu.com/upload/image/20160928/2b94e8d8f4d702d5331fccbd387169dc.jpg" />
                        </a>
                    </div>
                </div>

            </div>
        );
    }
});

module.exports = roller;




