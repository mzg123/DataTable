define("ui/clickscroll/clickscroll",[],function(require,exports,module){

	var ClickRoller = function (params) {
		$.extend(this,{
			contentId : null,
			clipWidth : 0, //裁减窗口的宽度
			clipHeight : 0, //裁减窗口的高度
			scrollWidth : 0, //滚动一次的距离(图片宽度 + 图片之间的距离)
			gap : 0, //图片之间的距离
			btnWrapperId : null,
			btnLeftNormalClass : "left",
			btnRightNormalClass : "right",
			btnLeftHoverClass : "hoverLeft",
			btnRightHoverClass : "hoverRight",
			btnLeftInvalidClass : "invalidLeft",
			btnRightInvalidClass : "invalidRight",
			scrollAniDuration : 300
			},params || {});
			//滚动元素的数量
			this._roller = null;
			this._rollerContent = null;
			this._rollerButtonList = null;
			this._itemCount = 0;
			this._contentWidth = 0;
			this._itemList = null;
			this._currentIndex = 1;
			this._scrollLock = false;
			this._leftInvalid = true; //左侧按钮是否不可点击
			this._rightInvalid = true; //右侧按钮是否不可点击
			this._init();
	};

	$.extend(ClickRoller.prototype,{

		_init : function () {

			var that = this;
			var rollerList = $("#" + this.contentId + " .ui_clickscroll_list");
			//设置滚动容器的宽高
			var roller = $("#" + this.contentId);
			var rollerContent = roller.find(".ui_clickscroll_content");
			var rollerAndContent = roller.add(rollerContent)
			rollerAndContent.width(this.clipWidth);
			rollerAndContent.height(this.clipHeight);
			this._roller = roller;
			this._rollerContent = rollerContent;
			this._rollerButtonList = $("#" + this.btnWrapperId);
			//设置滚动内容的宽度
			this._itemList = $("#" + this.contentId + " .ui_clickscroll_list_item");
			this._itemCount = this._itemList.length;
			var contentWidth = this._itemCount * this.scrollWidth - this.gap;
			this._contentWidth = contentWidth;
			rollerList.width(contentWidth);
			//给交互按钮加上下标属性
			this._rollerButtonList.find(".ui_clickscroll_button").each(function(index){
				var button = $(this);
				button.attr("id",that.contentId + "_ui_clickscroll_button_" + (index + 1));
				button.attr("index",index + 1);
			});
			
			this._addEventListener();
			this._updateButton();
			
		},

		_addEventListener : function(){

			var that = this;
			this._rollerButtonList.delegate(".ui_clickscroll_button","click",function(e){

				//如果滚动正在进行中，则不接受点击事件
				if (that._scrollLock) {
					return false;
				}
				//添加点击样式
				var button = $(this);
				var index = parseInt(button.attr("index"));
				//滚动到对应的位置
				that._scroll(index,function(){
				});

				return false;
			});

			this._rollerButtonList.delegate(".ui_clickscroll_button","mouseenter",function(e){
				var button = $(this);
				var index = parseInt(button.attr("index"));
				if(index == 1 && that._leftInvalid == false){
					button.addClass(that.btnLeftHoverClass);
				}
				if(index == 2 && that._rightInvalid == false){
					button.addClass(that.btnRightHoverClass);
				}
			})
			.delegate(".ui_clickscroll_button","mouseleave",function(e){
				var button = $(this);
				var index = parseInt(button.attr("index"));
				if(index == 1 && that._leftInvalid == false){
					button.removeClass(that.btnLeftHoverClass);
				}
				if(index == 2 && that._rightInvalid == false){
					button.removeClass(that.btnRightHoverClass);
				}
			});


		},

		//根据当前的滚动位置更新按钮的状态
		_updateButton : function(){

			var rollerContent = this._rollerContent;

			if(rollerContent.scrollLeft() <= 0){
				this._leftInvalid = true;
			}
			else{
				this._leftInvalid = false;
			}

			if(rollerContent.scrollLeft() + this.clipWidth >= this._contentWidth){
				this._rightInvalid = true;
			}
			else{
				this._rightInvalid = false;
			}

			var leftBtn = $("#" + this.contentId + "_ui_clickscroll_button_1");
			var rightBtn = $("#" + this.contentId + "_ui_clickscroll_button_2");
			if (this._leftInvalid) {
				leftBtn.addClass("invalidLeft");
				leftBtn.removeClass("hoverLeft");
			}
			else{
				leftBtn.removeClass("invalidLeft");
			}

			if (this._rightInvalid) {
				rightBtn.addClass("invalidRight");
				rightBtn.removeClass("hoverRight");
			}
			else{
				rightBtn.removeClass("invalidRight");
			}
			
		},

		_getCurrentIndex : function(){
			return this._currentIndex;
		},

		_setCurrentIndex : function(index){
			this._currentIndex = index;
		},

		_scroll : function(index,callback){

			var that = this;
			var rollerContent = this._rollerContent;

			//滚动
			this._scrollLock = true;

			//计算滚动距离
			var currentIndex = this._getCurrentIndex();
			var scrollLen = 0;
			if (index == 1 && that._leftInvalid == false){
				scrollLen = -that.scrollWidth;
				currentIndex--;
			}
			if (index == 2 && that._rightInvalid == false){
				scrollLen = that.scrollWidth;
				currentIndex++;
			}

			rollerContent.animate({
				scrollLeft : rollerContent.scrollLeft() + scrollLen
			},

			that.scrollAniDuration,

			function(){
				
				that._updateButton();
				that._setCurrentIndex(currentIndex)

				//如果是手动滚动，那么在滚动结束后重新开启自动滚动
				if (callback) {
					callback()
				}
				//清理滚动锁
				that._scrollLock = false;

			});
		}
	
	});

	return ClickRoller;

});

