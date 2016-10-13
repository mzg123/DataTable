define("ui/tip/tip",[],function(require,exports,module){

	var Tip = function(params){

		$.extend(this,{
			content : ""
		},params || {});

		this.id = "ui_tip_" + $.rand()
		this._createTip()
	};

	$.extend(Tip.prototype,{

		_getTmpl : function(){

			var tmpl = '<div id="'+ this.id +'" class="ui_tip">' +
							'<div class="ui_tip_bg"></div>' +
							'<div class="ui_tip_content">' +
								'<div class="ui_tip_head">' +
									'<div class="ui_tip_title"></span>温馨提示</div>' +
									'<div class="ui_tip_close"></div>' +
								'</div>' +
								'<div class="ui_tip_body">' +
									'<p class="ui_tip_notice">'+ this.content +'</p>' +
								'</div>' +
							'</div>' +
						'</div>';

			return tmpl;
		},

		//使对话框水平、垂直居中
		_centerWin : function(){
			var win = $('#' + this.id),
				doc = $(document),				
				clientWin = $(window),
				clientWidth = clientWin.width(),
				clientHeight = clientWin.height();
				
			win.css({
				left : (clientWidth - win.outerWidth()) / 2 + doc.scrollLeft() ,
				top : (clientHeight - win.outerHeight()) / 2 + doc.scrollTop()
			});
			
		},

		_createTip : function(){

			//添加到文档
			var win = $(this._getTmpl());
			$("body").append(win);
			this._centerWin()

			//关闭
			$('#' + this.id).find(".ui_tip_close").bind("click",function(){
				win.remove()
			});

			//处理在IE6中提示框头部背景滤镜加载bug
			if ($.IE6) {
				DD_belatedPNG.fixPng( win.find(".ui_tip_head")[0]);
			}
			
			return win;
		}

	});
	
	return Tip;

});

