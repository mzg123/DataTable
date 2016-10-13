define("about/notice",["ui/pager/pager"],function(require,exports,module){
	
	var Pager = require("ui/pager/pager");

	var Notice = {

		init : function(){
			
			this._initPager();
		},

		_initPager : function () {
			new Pager({
				"containerId" : "pager",
				"totalNum" : pagerInfo.totalPage
			})
		}

	};

	$(function(){
		
		Notice.init();

	});

});

