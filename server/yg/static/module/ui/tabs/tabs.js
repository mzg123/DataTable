define("ui/tabs/tabs",[],function(require,exports,module){

	var Tabs = function(params){
		$.extend(this,{
			tabsContainerId : '', //tabs的容器Id，此容器用于存放切换页签
			tabClass : '', //tabs中的每个tab的class，用于查找tabs中的每个tab
			selectedClass : '',//当tab被选中的时候所加的样式
			selectedSubDomClass : null,//如果此项不为空，那么tab的选中样式将添加到tab下具有这个class的元素上
			contentContainerId : '',//存放每个tab所对应的显示内容的容器
			contentClass : '',//定位每个tab对应的内容的class
			eventType : 'click', //切换tab所用的交互事件，例如[click|mouseenter]
			defaultSelect : 1, 	//默认选中第几个tab
			onChange : function(currentNum,tab){}
		},params || {});
	
		this._root = this.tabsContainerId;
		this._tabs = null;
		this._contents = null;
		this._currentNum = 1;//记录当前选择的是第几个tab
		
		this._init();
	};
		
	$.extend(Tabs.prototype,{
		
		_init : function(){

			//根据配置参数生成模板并加载到页面
			this._createRelation();
			this._addEventListener();
			//默认选中第一个
			this.goTo(this.defaultSelect);
		},
		
		_createRelation : function(){
			
			var root = this._root;
			var tabs = $('#' + root + ' .' + this.tabClass),
				contents = $('#' + this.contentContainerId + ' .' + this.contentClass);
			$.each(tabs,function(i,v){
				var index = i + 1,
					tab = $(v);
				tab.attr('id',root + '-tab-' + index);
				tab.data('index',index);
			});
			
			$.each(contents,function(i,v){
				var index = i + 1;
				$(v).attr('id',root + '-content-' + index);
			});
			
			this._tabs = tabs;
			this._contents = contents;
		},
		
		_addEventListener : function(){
			
			var root = this._root,	
				that = this;

			$('#' + this.tabsContainerId).delegate('.' + this.tabClass,this.eventType,function(e){
				var tab = $(this);
				var index = tab.data("index");
				that.goTo(index);
				return false;
			});
		},

		//跳到第几个tab
		goTo : function(index){

			//将所有tab置为未选中
			if(this.selectedSubDomClass != null){
				this._tabs.find("." + this.selectedSubDomClass).removeClass(this.selectedClass);
			}
			else{
				this._tabs.removeClass(this.selectedClass);
			}
			
			//隐藏所有内容
			this._contents.each(function(){
				$(this).hide();
			});
		
			//给选中的tab添加样式
			if(this.selectedSubDomClass != null){
				var tab = $("#" + this._root + '-tab-' + index).find("." + this.selectedSubDomClass);
				tab.addClass(this.selectedClass);
			}
			else{
				$("#" + this._root + '-tab-' + index).addClass(this.selectedClass);
			}
			
			//显示对应的内容
		    $("#" + this._root + '-content-' + index).show();
			
			this._currentNum = index;

			//进行回调
			this.onChange(index,$("#notices_tabs-tab-" + index))
		},
		
		getCurrentNum : function(){
			
			return this._currentNum;
		}
	});

	return Tabs;

});