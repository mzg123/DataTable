define("foot/foot",['ui/select/select','ui/validation/validation'],function(require,exports,module){

	require('ui/select/select');
	require('ui/validation/validation');

	var Foot = {

		init : function(){

			this._addEventListener();
			this._initFloatMenu();
			this._initCalculator();
		},

		_addEventListener : function(){

			var that = this;

			var floatMenu = $("#float_menu");
			var floatUp = floatMenu.find("#float_menu_up");
			var bigCode = $("#big_code");
			var win = $(window);

			floatMenu.delegate("li","mouseenter",function(){
				var link = $(this);
				link.find("a").addClass("hover");
				if(link.hasClass("code")){
					bigCode.show();
				}
			})
			.delegate("li","mouseleave",function(){
				var link = $(this);
				link.find("a").removeClass("hover");
				if(link.hasClass("code")){
					bigCode.hide();
				}
			});

			$("#float_menu_head_phone").bind("click",function(){

			});
			$("#float_menu_up").bind("click",function(){
				win.scrollTop(0);
			});

			$("#float_menu_calculator").bind('click',function(evt){

				var el = evt.target || evt.srcElement;

				if($(el).parent().attr('id') != 'float_menu_calculator') return;
				$(this).toggleClass('active');
				$(".calculator-wrapper").toggle();
			});


			win.bind("scroll",function(){
				if(win.scrollTop() > 100){
					floatUp.show();
				}
				else{
					floatUp.hide();
				}
			});


		},

		_initFloatMenu:function(){

			var floatMenu = $("#float_menu").show();
			var floatUp = floatMenu.find("#float_menu_up");
			var win = $(window);

			if(win.scrollTop()>100){
				floatUp.show();
			}else{
				floatUp.hide();
			}

		},

		_initCalculator:function(){

			var self = this;

			$("#term,#repayType").ygSelect({
				width:208,
				height:32
			});

			$("#amount,#apr").on('keypress',function(event) {
				var code = event.which || event.charCode || event.keyCode;
				if(code == 8 || code == 46 || (code >= 48 && code <= 57) ){
					return true;
				}
				return false;
			}).on('keyup',function(event){
				var val = $(this).val(),nv = val;
				nv = val.replace(/[^0-9\.]/g,'').replace(/(\d+\.\d{2})(.*)/,'$1');
				if(nv !== val){
					$(this).val(nv).trigger('validate');
				}

			});

			var errorMsg = {};

			function _calculate(data){

				$.ajax({
					url:"/calculator",
					dataType:'json',
					type:'post',
					data:data,
					success:function(res){

						var html = '<tr><td class="active" >预期收益</td><td><span class="red" >'+ $.numberFormat(res.data.expectedRevenue,2)+'元</span></td></tr>'+
							//'<tr><td class="active" >出借服务费</td><td>'+$.numberFormat(res.data.serviceFee,2)+'元</td></tr>'+
							'<tr><td class="active" >出借本金</td><td>'+$.numberFormat(res.data.principal,2)+'元</td></tr>';

						$(".result-sect table tbody").html(html);
						var at = $(".result-sect .attention");
						if(!at[0]){
							$(".result-sect .result").append('<p class="attention" >注：平台暂不收取服务费</p>')
						}
						if($(".calculator-toggle").hasClass('disable') || !$(".calculator-toggle").hasClass('active')){
							$(".calculator-toggle").removeClass('disable').trigger('click')
						}
					}
				})

			}

			$("#calculatorForm").validate({
				submitHandler:function(){

					_calculate(this.getFormData());

					return false;
				},
				output:function(err,ok){
					var curMsg;
					if(err){
						curMsg = errorMsg[this.attr('name')] = err.msg;
					}else{
						delete errorMsg[this.attr('name')];
					}
					if(!curMsg){
						for(var p in errorMsg){
							if(curMsg = errorMsg[p]){
								break;
							}
						}
					}
					$(".cal-errorTip").html(curMsg || '');
				},
				enterSubmit:false,
				selectById:true,
				fields:{
					amount:{
						required:true,
						pattern:/^\d+(\.\d{1,2})?$/,
						maxValue:99999999
					},
					apr:{
						required:true,
						//pattern:/^\d+(\.\d{1,2})?$/,
						maxValue:100
					},
					term:{
						required:true
					},
					repayType:{
						required:true
					}
				},
				errorMessage:{
					amount:{
						required:"出借金额不能为空",
						pattern:"请输入有效的出借金额",
						maxValue:"金额不能大于99999999"
					},
					apr:{
						required:"预期年化收益不能为空",
						maxValue:"预期年化收益率不能大于100%"
					},
					term:{
						required:"请选择出借期限"
					},
					repayType:{
						required:"请选择还款方式"
					}
				}
			})

			$("#calBtn").bind('click',function(){
				$("#calculatorForm").submit();
			})

			$(".calculator-toggle").bind('click',function(){
				var _self = $(this);
				if(_self.hasClass('disable')) return;

				if(_self.hasClass('active')){
					$(".calculator-wrapper .result-sect").animate({width:0},function(){

					});
					_self.removeClass('active')
				}else{
					$(".calculator-wrapper .result-sect").animate({width:300},function(){

					});
					_self.addClass('active')
				}

			})

		}

	};

	$(function(){

		Foot.init();


	});

});

