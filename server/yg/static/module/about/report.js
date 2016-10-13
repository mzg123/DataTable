define("about/report",["ui/pager/pager"],function(require,exports,module){
	
	var Pager = require("ui/pager/pager");

	var Report = {

		init : function(){
			
			this._initPager();
		},

		_initPager : function () {
			new Pager({
				"containerId" : "pager",
				"totalNum" : 20
			})
		}

	};

	$(function(){
		
		Report.init();

	});

});

