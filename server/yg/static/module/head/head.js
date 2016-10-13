define("head/head",["ui/hoverlist/hoverlist"],function(require,exports,module){

	var Hoverlist = require("ui/hoverlist/hoverlist");

	if(typeof __globalData == 'undefined'){
		__globalData = {};
	}

	var Head = {

		init : function(){

			this._addEventListener();
		},

		_addEventListener : function(){

			var that = this;

			var personalist = new Hoverlist({
				hoverBtnId : "personalist_btn",
				listId : "list_wrapper",
				hoverClass : 'link_hover',
				delay : 100
			});

		}

	};
	//�˵�������
	function headHover(){
		var hover = $(".nav_list li");
		hover.hover(function(){
			$(this).children("dl").show();
			$(this).children("dl").children("dd").last().css("borderBottom","none");
		},function(){
			$(this).children("dl").hide();

		});
	}

	function checkStatus(){

		var hr = $('.head .toolbar .head_right'),
			login = hr.find('.login'),
			register = hr.find('.register');
		//<a class="message" href="/user/notice">消息<span class="message_num red">(${msg})</span></a>
		if(!login[0]) return;

		$.ajax({
			url:"/loginstatus",
			type:'post',
			dataType:"json",
			success:function(res){
				var data = res.data;
				login.text(data.user).attr('href','/user/overview');
				register.attr('href','/logout').text('安全退出');
				hr.append('<a class="message" href="/user/notice">消息<span class="message_num red" id="newMsgCount" data="'+data.msg+'" >('+data.msg+')</span></a>');
				__globalData.isLogin = true;
			},
			exception:function(){
				console.log('未登录...');
				__globalData.isLogin = false;
				return false;
			}
		})

	}

	$(function(){

		Head.init();
		headHover();
		checkStatus();

	});

});

