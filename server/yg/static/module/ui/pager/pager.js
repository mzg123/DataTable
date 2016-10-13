define("ui/pager/pager",[],function(require,exports,module){

	var Pager = function(options){
		
		$.extend(this,{
			containerId : null,//放置分页器的容器id
			showPage : 5, //会显示出来的页数，默认是显示出来所有的页数
			totalNum : 0, //总页数
			currentPage: 1,
			notShowAlone : true,//当只有一页的时候不显示分页器
			onChange : function(pageNum){}//选择某页的时候触发，选择的页数会传入这个回调

		},options || {});


		//private properties
		this.id = 'pager_' + $.rand();
		this._currentPage = this.currentPage > this.totalNum ? 1 : this.currentPage; //当前页数
		//如果用户配置的数字小于5，那么就重新赋值为5
		if(this.showPage < 5 && this.showPage > 0){
			this.showPage = 5;
		}
		
		this._isIE9 = ($.browser.msie && parseInt($.browser.version.split('.')[0]) == 9) ? true : false;

		this._init();
	};
	
	$.extend(Pager.prototype,{
		
		_init : function(){

			//根据配置参数生成模板并加载到页面
			this._create();
			this._addEvent();
			this.goTo(this._currentPage);

		},
		
		_create : function(){
			var that = this,
				showPage  = this.showPage,
				totalNum = this.totalNum;
			
			var html = '<div id="' + this.id + '" class="pager clearfix"><span class="pager-page ie-css31 pager-previous">上一页</span>';
			var showPageCount = 0,
				pageHtml = '';
			
			
			//如果用户没有配置这个参数，则显示所有的页数
			if(showPage == 0 || showPage >= totalNum){
				(function(){

					for(var i = 0;i < totalNum;i++){
						if(i == 0){
							pageHtml += '<span class="pager-page ie-css31 pager-current">' + (i + 1) + '</span>';
						}
						else{
							pageHtml += '<span class="pager-page ie-css31">' + (i + 1) + '</span>';
						}
					}
				})();
			}
			//showPage比totalNum小
			else{
			
				(function(){

					for(var i = 0;i < showPage;i++){
						if(i == 0){
							pageHtml += '<span class="pager-page ie-css31 pager-current">' + (i + 1) + '</span>';
						}
						else{
							pageHtml += '<span class="pager-page ie-css31">' + (i + 1) + '</span>';
						}
					}
					
					//如果显示出来的最后一页和总页数是挨着的，比如总共6页，showPage是5,那么就不加省略号，否则要加上省略号
					if(totalNum - 1 > showPage){
						pageHtml += '<i>...</i>';
					}
					
					//最后一页，页数与totalNum相等
					pageHtml += '<span class="pager-page ie-css31">' + totalNum + '</span>';
					
				})();
				
			}
	
			
			html += pageHtml + '<span class="pager-page ie-css31 pager-next">下一页</span></div>';
			
			$('#' + this.containerId).html(html);
			
			this._setWidth();
		},
		
		_setWidth : function(){
		
			//设置pager的宽度
			var pager = $('#' + this.id),
				pagerWidth = 0;
				
			pager.find('.pager-page').each(function(){
				
				var page = $(this);
				if(page.css('display') != 'none'){
					pagerWidth += page.outerWidth(true);
				}
				
			});
			
			pager.find('i').each(function(){
				var ellipsis = $(this);				
				pagerWidth += ellipsis.outerWidth(true);
			});
			
			pager.css({width:pagerWidth + 2});
			
		},
		
		//设置当前显示样式
		_updateStyle : function(pageNum){
			
			pageNum = pageNum == undefined ?  1 : pageNum;
			
			var pager = $('#' + this.id);
			//设置当前被选中的样式
			var pages = pager.find('.pager-page');
			
			//如果只有一页，那么将隐藏分页器
			if(this.notShowAlone && pages.size() == 3){
		
				pager.hide();
				return;
			}
			pages.each(function(){
				var page = $(this);
				if(page.html() == pageNum.toString()){
					page.addClass('pager-current');
				}
				else{
					page.removeClass('pager-current');
				}
			});
			
			if(pageNum != 1){
				pager.find('.pager-previous').css('display','inline-block');
			}
			else{
				pager.find('.pager-previous').hide();
			}
			
			if(pageNum != this.totalNum){
				pager.find('.pager-next').css('display','inline-block');
			}
			else{
				pager.find('.pager-next').hide();
			}
			
			
			//更新样式后，重新为pager赋值宽度
			this._setWidth();
			
		},
		
		//根据用户点选的页码，更新分页器的显示状态
		_update : function(pageNum){
	
			var showPage = this.showPage,
				totalNum = this.totalNum,
				that = this;
			//用于标识当前选中页码距离左边第一个显示页码和距离右边最后一个显示页码的距离，一般情况下当前显示项应居中
			//如果showPage为奇数，那么当左边省略号也出现的时候，当前选中项目恰为居中；如果为偶数的话，左边显示页码比右边显示页码多一个
			
			if(showPage < 5){
				showPage = 5;
			}
			if(showPage >= totalNum){
				showPage = totalNum;
			}
			
			
			var	duration = Math.floor(showPage / 2),
				ifOdd = showPage % 2 == 0 ? false : true,
				pageHtml = '<span class="pager-page ie-css31 pager-previous">上一页</span><span class="pager-page ie-css31 pager-current">1</span>';
	
			//从哪个页码开始生成
			var start = 0,
				end  = 0;

			if(ifOdd){
				start = pageNum  - duration;
				end = pageNum + duration;
			}
			else{
				start = pageNum  - duration;
				end = pageNum + duration - 1;
			}

			if(pageNum < showPage){
				end = showPage + 1 < end ? end : showPage + 1;
			}
			
			if(start <= 2){
				start = 2;
			}
			if(end > totalNum - 1){
				end = totalNum - 1;
			}
			
			
			if(end < showPage){
				end = showPage;
			}
	
			
			if(start >= totalNum - showPage){
				start = totalNum - showPage;
			}
			
			if((totalNum - showPage == 0 || totalNum - showPage == 1) && totalNum != 1){
				start = 2;
			}
			

			//需要出左边的省略号
			if(start >= 3){
				
				pageHtml += '<i class="leftEllipsis">...</i>';
				
			}
			
			(function(){
	
				if(totalNum != 1){
					for(var i = start;i <= end;i++){
						pageHtml += '<span class="pager-page ie-css31">' + i + '</span>';
					}
				}
				
				//如果显示出来的最后一页和总页数是挨着的，比如总共6页，showPage是5,那么就不加省略号，否则要加上省略号
				if(end + 1 != totalNum && end != totalNum){
					pageHtml += '<i>...</i>';
				}
				
				//最后一页，页数与totalNum相等
				if(end != totalNum){
					pageHtml += '<span class="pager-page ie-css31">' + totalNum + '</span>';
				}
				
			})();
			
			pageHtml += '<span class="pager-page ie-css31 pager-next">下一页</span>';
			
			var pager = $('#' + that.id);
			pager.html('');
			pager.html(pageHtml);
			
			
		},
		
		_addEvent : function(){
			
			var that = this;
			
			//绑定点击事件

			$('#' + this.id).delegate('.pager-page','click',function(e){

				var page = $(this),
					pageNum = page.html(),
					currentPage  = that.getCurrentPage();
				
				if(pageNum.indexOf('上一页') != -1){
					pageNum = (currentPage - 1 <= 0) ? 1 : (currentPage - 1);
				}
				else if(pageNum.indexOf('下一页') != -1){
					pageNum = (currentPage + 1 > that.totalNum) ? that.totalNum : (currentPage + 1);
				}
				else{
					pageNum = parseInt(pageNum);
				}


				that.setCurrentPage(pageNum);
				//如果点击的不是当前已经选中的页码
				if(currentPage != pageNum){
					//更新分页器显示状态
					if(that.totalNum > 5 && that.showPage != 0){
						that._update(pageNum);
					}
					//更新样式
					that._updateStyle(pageNum);
					
					//触发用户自定义事件
					that.onChange(pageNum);
				}
				$('#' + that.containerId).attr('current-page',pageNum);
				
			});
			
		
		},
		
		//判断当前是否是在linux下的FF，在这个浏览器下计算width会出现问题
		_ifFFUnderMac : function(){
			
			var appVer = navigator.userAgent;
			if(appVer.indexOf("Mac") != -1 && $.browser.mozilla){
				return true;
			}
			else{
				return false;
			}
		},
		
		//获得当前页数
		getCurrentPage : function(){
			
			return this._currentPage;
			
		},
		
		//设置当前页码
		setCurrentPage : function(pageNum){

			this._currentPage = pageNum;
		},
		
		//可以手动调用此函数跳转到指定页面
		goTo : function(pageNum){
		
			pageNum = parseInt(pageNum);
			if(pageNum > this.totalNum){
				pageNum = this.totalNum;	
			}
			
			if(pageNum < 1){
				pageNum = 1;
			}
		
			this._update(pageNum);
			this._updateStyle(pageNum);
			this.setCurrentPage(pageNum);
		},
		
		hide : function(){
			
			$('#' + this.id).hide();
			
		},
		
		show : function(){
		
			$('#' + this.id).show();
			this._setWidth();
		},
		
		//判断当前分页器是否只有一页
		ifOnePage : function(){
		
			var pages = $('#' + this.id).find('.pager-page');
			if(pages.size() == 3){
				return true;
			}
			else{
				return false;
			}
			
		}

	});

	return Pager;
	
});

