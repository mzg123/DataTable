/*
 *  悬浮到某个按钮，展现其下拉菜单；移除此按钮或是整个下拉菜单，则恢复原状
 *
 */
define("ui/hoverlist/hoverlist",[],function(require,exports,module){

	var HoverList = function(options){
		
		$.extend(this,{
			
			hoverBtnId : null,
			listId : null,
			hoverClass : null,//悬浮到按钮上时添加的样式
			delay : 20, //鼠标移出button后，间隔多长时间下拉菜单消失
			minWidth:0,
			interactType : "hover",
			onOpen : function(){},
			onClose : function(){},
			onSelect : function(){}

			
		},options || {});
		
		this._timerId = 0;
		this._listTimer = 0
		
		this._init();

	};
	
	$.extend(HoverList.prototype,{
		
		_init : function(){		

			this.hoverBtn = $('#' + this.hoverBtnId),
			this.list = $('#' + this.listId);	
			this._addEvent();

		},
		
		_addEvent : function(){
			
			//给下拉按钮添加交互
			var that  = this;

			if(this.interactType == "hover"){
				this.hoverBtn.hover(function(){
					
					that._listBtnSelected();
					
				},function(){
					
					that._listBtnUnselected();
					
				});
				
				this.list.hover(function(){
					that._listOpen();
					
				},function(){
					that._listClose();
				});
			}

			if(this.interactType == "click"){

				this.hoverBtn.bind("click",function(){
					if(that.hoverBtn.hasClass(that.hoverClass)){
						that.onClose();
					}
					else{
						that.onOpen();
					}
					that.toggle();
					return false;
				});

				//选中某个列表项
				this.list.delegate("li","click",function(){
					that.onSelect($(this));
				});
			}

		},

		close : function(){
			this.hoverBtn.removeClass(this.hoverClass)
			this._listClose();
		},

		toggle : function(){

			this.hoverBtn.toggleClass(this.hoverClass)
			if(this.hoverBtn.hasClass(this.hoverClass)){
				this._listOpen();
			}
			else{
				this._listClose();
			}
		},

		_listBtnSelected : function () {

			var that  = this;
			if(this.interactType == "hover"){
				clearTimeout(that._timerId);
				clearTimeout(that._listTimer);
				this.hoverBtn.addClass(that.hoverClass);
				if(that.minWidth!=0) {
						var w = $('#' + that.hoverBtnId).width();
						w+=23;
						if(w>=that.minWidth) {
							$('#' + that.listId).css({width:w});
						}
						else {
							 $('#' + that.listId).css({'background-position':w+'px 0'});
						}
				}

				this.list.show();
			}

			if(this.interactType == "click"){
				this.list.show();
			}

		},

		_listBtnUnselected : function  () {

			var that = this;
			if(this.interactType == "hover"){
				that._timerId = setTimeout(function(){
						
					that.hoverBtn.removeClass(that.hoverClass);
					that.list.hide();
					
				},that.delay);
			}

			if(this.interactType == "click"){
				that.list.hide();
			}

		},

		_listOpen : function  () {

			if(this.interactType == "hover"){
				clearTimeout(this._timerId);
				this.list.show();
			}

			if(this.interactType == "click"){
				this.list.show();
			}
		},

		_listClose : function(){

			var that = this;
			if(this.interactType == "hover"){
				this.hoverBtn.removeClass(this.hoverClass);
				this._listTimer = setTimeout(function(){
				
					that.list.hide(); 			
				
				},that.delay);
			}

			if(this.interactType == "click"){
				that.list.hide(); 
			}

		}
		
	});
	
	return HoverList;

});