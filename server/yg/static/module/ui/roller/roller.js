define("ui/roller/roller",[],function(require,exports,module){

	var Roller = function (params) {

		$.extend(this,{
			id : null,
			buttonListId : null,
			btnWidth : 0,
			btnMargin : 0,
			clipWidth : "auto", //裁减宽度
			clipHeight : "auto", // 裁减高度
			aniDuration : 200,
			isHideButton : false, //是否隐藏交互按钮
			//ui_roller_list将自适应父容易宽度，高度将自动按照裁减宽高比进行计算
			//当窗口大小变化后重新计算ui_roller_list的高度
			auto : false, 
			style : "horizontal", //fade|horizontal|vertical
			duration : 5000,
			onScrollBegan : function(fromIndex,toIndex){}
		},params || {});

		//滚动元素的数量
		this._roller = null;
		this._rollerContent = null;
		this._rollerList = null;
		this._rollerButtonList = null;
		this._itemCount = 0;
		this._itemList = null;
		this._timerId = 0;
		this._currentIndex = 1;
		this._scrollLock = false;
		this._init();
	};

	$.extend(Roller.prototype,{

		_init : function () {

			var that = this;
			var rollerList = $("#" + this.id + " .ui_roller_list");
			this._rollerList = rollerList;
			if(this.style == "fade"){
				rollerList.addClass("fade");
				rollerList.width(this.clipWidth);
				rollerList.height(this.clipHeight);
			}
			//复制第一个元素并插入到滚动内容的最后
			if(this.style == "horizontal" || this.style == "vertical"){
				var firstItem = $("#" + this.id + " .ui_roller_list_item:first");
				var clonedItem = firstItem.clone();
				clonedItem.appendTo(rollerList);
			}
			//设置滚动容器的宽高
			var roller = $("#" + this.id);
			var rollerContent = roller.find(".ui_roller_content");
			var rollerAndContent = roller.add(rollerContent)
			if(!this.auto){
				rollerAndContent.width(this.clipWidth);
				rollerAndContent.height(this.clipHeight);
			}

			this._roller = roller;
			this._rollerContent = rollerContent;
			this._rollerButtonList = $("#" + this.buttonListId);
			//设置滚动内容的宽度
			this._itemList = $("#" + this.id + " .ui_roller_list_item");
			this._itemCount = this._itemList.length;
			this._itemList.each(function(i){
				var item = $(this);
				item.addClass("ui_roller_list_item_" + (i + 1));
				item.css("zIndex",that._itemCount - i);
			});
			if(!this.auto){
				this._itemList.width(this.clipWidth);
			}
			if(this.style == "horizontal"){
				rollerList.width(this._itemCount * this.clipWidth);
			}
			if(this.style == "vertical"){
				rollerList.height(this._itemCount * this.clipHeight);
			}
			if(this.auto){
				//要先设置div的宽度为100%，否则由于内部有图片会直接将div撑开到图片宽度，直接获取时将获得的是图片
				//的最大宽度
				$(window).bind("resize",function(){

					that._setHeightAccordingToWidth();
				});
				that._setHeightAccordingToWidth();
				
			}
			//给交互按钮加上下标属性
			var btns = this._rollerButtonList.find(".ui_roller_button")
			btns.each(function(index){
				var button = $(this);
				button.attr("id",that.id + "_ui_roller_button_" + (index + 1));
				button.attr("index",index + 1);
				if (btns.size() - 1 == index) {
					button.addClass("last");
				}
			});
			if(this.isHideButton){
				btns.hide();
			}
			//设置按钮列表的总宽度
			var btnlistWidth = btns.size() * (this.btnWidth + this.btnMargin) - this.btnMargin;
			this._rollerButtonList.width(btnlistWidth);
			this._addEventListener();

			if (!this._isOnlyOne()) {
				this.start()
			}
			else{
				btns.hide();
			}
			
		},

		_isOnlyOne : function () {
			var itemSize = $("#" + this.id + " .ui_roller_list_item").size();
			if (itemSize <= 1) {
				return true;
			}
			else{
				return false;
			}

		},

		_setHeightAccordingToWidth : function(){
			var rollerList = this._rollerList;
			rollerList.width("100%");
			var rollerListWidth = rollerList.width();

			if(rollerListWidth > this.clipWidth){
				rollerListWidth = this.clipWidth;
			}
			
			var height = rollerListWidth * this.clipHeight / this.clipWidth;
			rollerList.height(height);
		},

		_addEventListener : function(){

			var that = this;
			this._rollerButtonList.delegate(".ui_roller_button","click",function(e){

				//如果滚动正在进行中，则不接受点击事件
				if (that._scrollLock) {
					return false;
				}
				var button = $(this);
				var index = parseInt(button.attr("index"));
				var currentIndex = that._getCurrentIndex();
				if (currentIndex == index) {
					return;
				}

				//清除定时器
				that.stop();
				//添加点击样式
				that._selectButton(index);
				//滚动到对应的位置
				that._scroll(index,function(){
					that.start();
				});
			});
		},

		//给当前按钮添加选中样式
		_selectButton : function(index){

			if((this.style == "horizontal" || this.style == "vertical") && index == this._itemCount){
				index = 1;
			}
			if(this.style == "fade" && index > this._itemCount){
				index = 1;
			}
			var currentButtonId = this.id + "_ui_roller_button_" + this._getCurrentIndex();
			$("#" + currentButtonId).removeClass("selected");
			var selectedButtonId = this.id + "_ui_roller_button_" + index;
			$("#" + selectedButtonId).addClass("selected");
		},

		_getCurrentIndex : function(){
			return this._currentIndex;
		},

		_setCurrentIndex : function(index){
			this._currentIndex = index;
		},

		_getNextIndex : function(index){
			var nextIndex = index;
			if(this.style == "fade"){
				if(index > this._itemCount){
					nextIndex = 1;
				}
			}
			else{
				if (index == this._itemCount) {
					nextIndex = 1;
				}
			}

			return nextIndex;
		},

		_scroll : function(index,callback){

			var that = this;
			var rollerContent = this._rollerContent;
			var currentIndex = this._getCurrentIndex();
			//选中对应的按钮
			this._selectButton(index);
			this._scrollLock = true;
			//当开始滚动的时候
			var nextIndex = this._getNextIndex(index);
			this.onScrollBegan(currentIndex,nextIndex);
			if(this.style == "horizontal"){
				//计算滚动距离
				var scrollLen = (index - currentIndex) * that.clipWidth;
				//滚动
				rollerContent.animate({
					scrollLeft : rollerContent.scrollLeft() + scrollLen
				},
				that.aniDuration,
				function(){

					//如果滚动到最后一张(与第一张相同)后，则将位置重置为第一张
					if (index == that._itemCount) {
						rollerContent.scrollLeft(0)
						that._setCurrentIndex(1)
					}
					else{
						that._setCurrentIndex(index)
					}

					//如果是手动滚动，那么在滚动结束后重新开启自动滚动
					if (callback) {
						callback()
					}
					//清理滚动锁
					that._scrollLock = false;

				});
			}

			if(this.style == "vertical"){
				//计算滚动距离
				var scrollLen = (index - currentIndex) * that.clipHeight;
				//滚动
				rollerContent.animate({
					scrollTop : rollerContent.scrollTop() + scrollLen
				},
				that.aniDuration,
				function(){

					//如果滚动到最后一张(与第一张相同)后，则将位置重置为第一张
					if (index == that._itemCount) {
						rollerContent.scrollTop(0)
						that._setCurrentIndex(1)
					}
					else{
						that._setCurrentIndex(index)
					}

					//如果是手动滚动，那么在滚动结束后重新开启自动滚动
					if (callback) {
						callback()
					}
					//清理滚动锁
					that._scrollLock = false;

				});
			}

			if(this.style == "fade"){

				if(index > that._itemCount){
					index = 1;
				}
				//渐变前调整图片层级
				that._changeZIndexForFading(currentIndex,index);
				var currentItem = $("#" + this.id + " .ui_roller_list " + ".ui_roller_list_item_" + currentIndex);
				currentItem.fadeOut(that.aniDuration,function(){
					//如果滚动到最后一张(与第一张相同)后，则将位置重置为第一张
					if (index > that._itemCount) {
						that._setCurrentIndex(1)
					}
					else{
						that._setCurrentIndex(index)
					}
					//如果是手动滚动，那么在滚动结束后重新开启自动滚动
					if (callback) {
						callback()
					}
					//清理滚动锁
					that._scrollLock = false;
				});
			}

		},

		_changeZIndexForFading : function(currentIndex , targetIndex){

			var that = this;
			//将当前将要进行渐隐的item与目标item以外的其他item都隐藏
			that._itemList.each(function(itemIndex){
				itemIndex++;
				var currentItem = $("#" + that.id + " .ui_roller_list " + ".ui_roller_list_item_" + itemIndex);
				if(itemIndex != currentIndex && itemIndex != targetIndex){
					currentItem.hide();
				}
			});

			//调整当前item与目标item的ZIndex，使得目标item的ZIndex小于当前item
			var currentItem = $("#" + that.id + " .ui_roller_list " + ".ui_roller_list_item_" + currentIndex);
			currentItem.css("zIndex",1);

			//将目标item显示出来
			var targetItem = $("#" + that.id + " .ui_roller_list " + ".ui_roller_list_item_" + targetIndex);
			targetItem.show();
			targetItem.css("zIndex",0);

		},

		_autoPlay : function(){

			var that = this;
			clearTimeout(this._timerId);

			that._timerId = setTimeout(function(){

				var currentIndex = that._getCurrentIndex();
				var index = currentIndex + 1;
				that._scroll(index);
				that._timerId = setTimeout(that._proxy(arguments.callee,that),that.duration);

			},that.duration);
		},

		_proxy : function(fn , context){
			return function(){
				fn.apply(context,arguments);
			};
		},

		start : function(){
			this._autoPlay()
		},

		stop : function(){
			clearTimeout(this._timerId);
		}
	});

	return Roller;

});

