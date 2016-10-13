define("index/index-new",[
	"ui/roller/roller",
	"ui/hoverlist/hoverlist",
	'ui/odometer/odometer',
	"ui/clock/clock",
	, "ui/pager/pager"
	,"ui/tabs/tabs",
	'lib/excanvas'
],function(require,exports,module){

	var Roller = require("ui/roller/roller");
	var Clock= require('ui/clock/clock');
	var Tabs = require("ui/tabs/tabs");
	var Pager = require('ui/pager/pager');
	var Hoverlist = require("ui/hoverlist/hoverlist");
	require('lib/excanvas');

	var Index = {

		init : function(){

			this._addEventListener();
			this._initClock();
		},
        _initClock:function(){
			var yyy=new Clock({
				width:150,
				height:34,
				timesize:16,
				tagsize:14,
				pretag:"剩余时间",
				bordercolor:"#0768ca",
				type:1,
				timecolor:"#0768ca",
				id:"gsf"
			});
			var ydl1=new Clock({
				width:150,
				height:34,
				timesize:16,
				tagsize:14,
				pretag:"剩余时间",
				bordercolor:"#0768ca",
				type:1,
				pretagPosition:"down",

				timecolor:"#0768ca",
				id:"ydl1"
			});
			var ydl3=new Clock({
				width:150,
				height:34,
				timesize:16,
				tagsize:14,
				pretag:"剩余时间",
				bordercolor:"#0768ca",
				type:1,
				pretagPosition:"down",
				timecolor:"#0768ca",
				id:"ydl3"
			});
			var ydl6=new Clock({
				width:150,
				height:34,
				timesize:16,
				tagsize:14,
				pretag:"剩余时间",
				bordercolor:"#0768ca",
				type:1,
				pretagPosition:"down",
				timecolor:"#0768ca",
				id:"ydl6"
			});
			var ydl12=new Clock({
				width:150,
				height:34,
				timesize:16,
				tagsize:14,
				pretag:"剩余时间",
				bordercolor:"#0768ca",
				type:1,
				pretagPosition:"down",
				timecolor:"#0768ca",
				id:"ydl12"
			});
			var ydl24=new Clock({
				width:150,
				height:34,
				timesize:16,
				tagsize:14,
				pretag:"剩余时间",
				bordercolor:"#0768ca",
				type:1,
				pretagPosition:"down",
				timecolor:"#0768ca",
				id:"ydl24"
			});
			var syf=new Clock({
				width:150,
				height:34,
				timesize:16,
				tagsize:14,
				pretag:"倒计时",
				type:2,
				bordercolor:"#f45146",
				timecolor:"#f45146",
				id:"yyy"
			});
		},
		_getRollerBackgroundColorArray : function () {
			var colorArray = [];
			$("#rollerBanner .ui_roller_list_item").each(function(){
				var color = $(this).attr("bgcolor");
				colorArray.push(color);
			});
			return colorArray;
		},

		_addEventListener : function(){
			var that = this;

			//滚动banner
			var rollerWrapper = $("#roller_wrapper");
			var colorArray = this._getRollerBackgroundColorArray();
			var roller = new Roller({
				id : "rollerBanner",
				buttonListId : "rollerBanner_btn_list",
				clipWidth : 1200,
				clipHeight : 340,
				btnWidth : 30,
				btnMargin : 8,
				aniDuration : 500,
				duration : 5000,
				style : "fade",
				onScrollBegan : function(fromIndex,toIndex){
					if(colorArray[toIndex - 1]){
						rollerWrapper.animate({
							"backgroundColor" : colorArray[toIndex - 1]
						},
						roller.aniDuration);
					}

				}
			});

			//头部的产品搜索
			// this.investType = new Hoverlist({
			// 	hoverBtnId : "invest_type",
			// 	listId : "invest_type_list",
			// 	hoverClass : 'select_open',
			// 	delay : 100,
			// 	interactType : "click",
			// 	onOpen : function(){
			// 		that.closeAllSelect();
			// 	},
			// 	onClose : function(){

			// 	},
			// 	onSelect : function(li){
			// 		var selected = li.find("a").html();
			// 		$("#invest_type .select_current").html("--" + selected + "--");
			// 		that.investType.toggle();
			// 	}
			// });

			// this.investMonth = new Hoverlist({
			// 	hoverBtnId : "invest_month",
			// 	listId : "invest_month_list",
			// 	hoverClass : 'select_open',
			// 	delay : 100,
			// 	interactType : "click",
			// 	onOpen : function(){
			// 		that.closeAllSelect();
			// 	},
			// 	onSelect : function(li){
			// 		var selected = li.find("a").html();
			// 		$("#invest_month .select_current").html("--" + selected + "--");
			// 		that.investMonth.toggle();
			// 	}
			// });

			// this.investEarn = new Hoverlist({
			// 	hoverBtnId : "invest_earn",
			// 	listId : "invest_earn_list",
			// 	hoverClass : 'select_open',
			// 	delay : 100,
			// 	interactType : "click",
			// 	onOpen : function(){
			// 		that.closeAllSelect();
			// 	},
			// 	onSelect : function(li){
			// 		var selected = li.find("a").html();
			// 		$("#invest_earn .select_current").html("--" + selected + "--");
			// 		that.investEarn.toggle();
			// 	}
			// });

			// $(window).bind("click",function(){
			// 	that.closeAllSelect();
			// });

			//自适应banner高度
			// function imgH(){
			// 	var _h = $(".ui_roller .ui_roller_list .ui_roller_list_item img").height();
			// 	$(".roller_wrapper .ui_roller").height(_h);
			// }
			// imgH();
			//  $(window).bind("resize",function(){
			// 	 imgH();
			//  });


			$("#fixed_product_list").delegate("li","mouseenter",function(){
				$(this).addClass("hover");
			})
			.delegate("li","mouseleave",function(){
				$(this).removeClass("hover");
			});

			$("#unfixed_product_list").delegate(".unfixed_product_item_wrapper","mouseenter",function(){
				$(this).find(".product_desc").show();
			})
			.delegate(".unfixed_product_item_wrapper","mouseleave",function(){
				$(this).find(".product_desc").hide();
			});

			this.productTabs = new Tabs({
				tabsContainerId: "product_tabs",
				tabClass: "product_tab",
				selectedClass: "hover",
				contentContainerId: "product_content_container",
				contentClass: "product_content",
				eventType: 'click',
				onChange : function(index){

					if(index == 1){
						that._initPager();
					}
					else if(index == 2){
						that._initPager2();
					}
				}
			});
		},

		_initPager : function(){
			var that = this;
			var pg = $("#pager");
			var cp = parseInt(pg.attr('current-page'));
			var p = new Pager({
				containerId : "pager",
				showPage : parseInt(pg.attr('show-page')) || 5,
				totalNum : parseInt(pg.attr('total-num')) || 10,
				currentPage:  1,
				onChange : function(pageNum){

					that._reloadList(pageNum);
				}
			});

			p.goTo(cp);
		},

		_initPager2 : function(){
			var that = this;
			var pg = $("#pager2");
			var cp = parseInt(pg.attr('current-page'));
			var p = new Pager({
				containerId : "pager2",
				showPage : parseInt(pg.attr('show-page')) || 5,
				totalNum : parseInt(pg.attr('total-num')) || 10,
				currentPage:  1,
				onChange : function(pageNum){
					that._reloadList(pageNum);
				}
			});

			p.goTo(cp);
		},

		closeAllSelect : function(){

			this.investType.close();
			this.investMonth.close();
			this.investEarn.close();

		}

	};

	function initOdometer(){
			$(".notice_wrap .notice li").each(function(i,v){
			var self = $(this),
				val = parseInt(self.attr('data')) || 0;

			var html = '',format;
			if(i!=2){
				val +="";
				var tmp='',len = val.length,units=['元','万','亿','万'];
				for(var j= 1,jc;(jc=val[len-j]);j++){
					tmp = jc+tmp;
					if(!(j%4)){
						html = '<span class="red" data="'+tmp+'" ></span>'+units[j/4-1] + html;
						tmp = ''
					}
				}
				if(tmp){
					html = '<span class="red" data="'+tmp+'" ></span>'+ units[Math.ceil(j/4)-1] + html;
				}
				format = 'd';
				//html = '<span class="red" data="'+val+'" ></span>'
				//format = 'dddd亿dddd万dddd元';
			}else{
				html = '<span class="red" data="'+val+'" ></span>人';
				format = 'd';
			}
			self.append(html);
			self.find('span.red').each(function(m,v){
				var od = new Odometer({
					el: this,
					format:format,
					value: 0
				});
				od.update($(this).attr('data'));
			});
		})
	}

	function makeCircleProgress(progress,option){
		var data = $.extend({
			width:36,
			height:36,
			strokeWidth:4,
			strokeColor:'#0098f4',
			textColor:'#555',
			progress:progress,
			fontSize:'12'
		},option);

		var proV = Math.floor( parseFloat(progress.replace('%',''))),
			deg = 360*proV/100,
			a2d = Math.PI/180,
			r = (data.width-data.strokeWidth)/ 2,
			cx = data.width/ 2,
			cy = data.height/ 2;
		var pathData = {
			sx:cx,
			sy:data.strokeWidth/2,
			rx:r,
			ry:r,
			L:deg>180 ? 1 : 0,
			ex:cx+Math.sin(a2d*deg)*r,
			ey:cy-Math.cos(a2d*deg)*r
		};
		var pathTemp = 'M{sx},{sy} A{rx},{ry},0,{L},1,{ex},{ey}';
		var path = pathTemp.format(pathData),
			bgPath = pathTemp.format($.extend(pathData,{
				L:1,
				ex:cx+Math.sin(a2d*358)*r,
				ey:cy-Math.cos(a2d*358)*r
			}));
		data.path = path;
		data.bgPath = bgPath;
		var template = '<svg height="{height}" version="1.1" width="{width}" xmlns="http://www.w3.org/2000/svg" >'+
			'<path fill="none" stroke-width="{strokeWidth}" stroke="#bababa" stroke-linecap="round" d="{bgPath}" ></path>'+
			'<path fill="none" stroke-width="{strokeWidth}" stroke="{strokeColor}" stroke-linecap="round" d="{path}" ></path>'+
			'<text x="50%" y="50%" dy=".3em" fill="{textColor}" font-size="{fontSize}" text-anchor="middle">{progress}</text>'+
			'</svg>';

		return template.format(data);
	}

	function makeCircleProgressCanvas(canvas,progress,option){
		var data = $.extend({
			width:36,
			height:36,
			strokeWidth:4,
			strokeColor:'#0098f4',
			textColor:'#555',
			progress:progress,
			fontSize:'12'
		},option);
		$(canvas).css({
			width:data.width,
			height:data.height
		}).attr({
			width:data.width,
			height:data.height
		})
		var ctx = canvas.getContext('2d');
		var proV = Math.floor( parseFloat(progress.replace('%',''))),
			deg = 360*proV/100,
			a2d = Math.PI/180,
			r = data.width/ 2,
			cx = data.width/ 2,
			cy = data.height/ 2,
			sa = -Math.PI/ 2,
			ea = proV == 100 ? ((deg-0.05)*a2d+sa):(proV === 0 ? (0.05*a2d+sa):(deg*a2d+sa));

		ctx.fillStyle="#bababa";
		ctx.beginPath();
		ctx.arc(cx,cy,r,0,Math.PI*2,false);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = "#0098f4";
		ctx.beginPath();
		ctx.moveTo(cx,cy);
		ctx.lineTo(cx,0);
		ctx.arc(cx, cy, r, sa,ea, false);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.arc(cx,cy,r-data.strokeWidth,0,Math.PI*2,false);
		ctx.closePath();
		ctx.fill();

		ctx.font="12px 微软雅黑";
		ctx.fillStyle='#555';
		ctx.textAlign='center';
		ctx.fillText(progress,cx,cy+5);
	}

	$(function(){

		Index.init();
		initOdometer();
		//环形进度条
		$('.circle').each(function(index, el) {
			var num = $(this).find('span').text() * 3.6;
			if (num<=180) {
				$(this).find('.right').css('transform', "rotate(" + num + "deg)");
			} else {
				$(this).find('.right').css('transform', "rotate(180deg)");
				$(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
			}
		});

		$(".crclp").each(function(){
			var tmp = $(this);
			var cv = tmp[0];
			if(!cv.getContext){
				var itvId = setInterval(function(){

					console.log('waiting for excanvas ...');
					if(cv.getContext){
						clearInterval(itvId);
						makeCircleProgressCanvas(tmp[0],tmp.attr('progress'));
					}
					else{
						cv=window.G_vmlCanvasManager.initElement(cv);
					}
				},100);
			}else{
				makeCircleProgressCanvas(tmp[0],tmp.attr('progress'));
			}
		});

	});

});

function _formatTime(leftTime) {
	var minLen = 60,
		hrLen = 60 * minLen,
		dayLen = hrLen * 24;
	var vals = [];
	vals.push(Math.floor(leftTime / dayLen));
	vals.push(Math.floor(leftTime % dayLen / hrLen));
	vals.push(Math.floor(leftTime % dayLen % hrLen / minLen));
	vals.push(Math.floor(leftTime % dayLen % hrLen % minLen));
	while (vals[0] === 0) {
		vals.splice(0, 2);
	}
	return vals;
}



