define("personal/baseinfo", [
    "ui/modal/modal",
    "ui/validation/validation",
    'ui/select/select',
    //'ui/searchBox/searchBox',
    'ui/datepicker/js/foundation-datepicker',
    'ui/Jcrop/js/jquery.Jcrop',
    'ui/uploader/uploader',
    'personal/personal',
    'common/cityInfo'
], function (require, exports, module) {

    var avatarUrl = "http://ljtdev.com/tapmodo-Jcrop-1902fbc/demos/demo_files/sago.jpg";
    var avatarId,
        curCropArea,
        jc,
        fu,
        scaleRate;
    var cityInfo = require('common/cityInfo'),
        PROVINCE_LIST = cityInfo.PROVINCE_LIST,
        CITY_LIST = cityInfo.CITY_LIST;
    //出生日期
    var modal = require('ui/modal/modal');
    require('ui/validation/validation');
    require('ui/select/select');
    //require('ui/searchBox/searchBox');
    require('ui/uploader/uploader');
    require('personal/personal').run();

    var enableEidt = true;

    var ProvMapByID = {},ProvMapByName = {};

    (function buildProvData(){

        for(var i= 0,ip;(ip = PROVINCE_LIST[i]);i++){
            ProvMapByID[ip.ProID] = ip;
            ProvMapByName[ip.name] = ip;
            ip.cities = [];
            ip.display = ip.name;
            ip.value = ip.name;
        }

        for(var j= 0,jc;(jc = CITY_LIST[j]);j++){
            var pro = ProvMapByID[jc.ProID];
            pro.cities.push(jc);
            jc.display = jc.name;
            jc.value = jc.name;
        }

    })();

    function showAvatarEditor() {

        modal.show({
            title: "修改头像",
            content: function(){
                var html = $("#photoUpdate"),
                    html = html[0] && html[0].text || "";
                return html && $.MT("photoUpdate",html,{
                    avatar:avatarUrl
                }) || ""
            },
            size: {width: 650, height: 470},
            showFoot: true,
            showClose: false,
            buttons: [
                {
                    name: "确认",
                    clicked: function () {

                        setUserAvatar()

                        return false;
                    }
                },
                {
                    name:'取消',
                    btnClass:'btn-cancel'
                }
            ]
        });


        adjustImg(function(crop){

            initCrop(crop);
        });

        initFileUploader();
    }

    function changeImage(){
        jc.setImage(avatarUrl);
        jc.setOptions({
            setSelect: [ 60, 60, 160, 160],
        });
    }

    function getCrop(){
        var x = curCropArea.x,
            y = curCropArea.y,
            w = Math.round(curCropArea.w/scaleRate);
        return {
            width:w,
            height:w,
            x:Math.round(x/scaleRate),
            y:Math.round(y/scaleRate)
        }
    }

    function adjustImg(cb){
        var img = new Image(),vp = $(".photo-big"),vpImg = vp.find('#userAvatar');
        var vpw = vp.width(),vph = vp.height(),vpr = vpw/vph,ccrop;
        img.onload = function(){
            var imgw = img.width,
                imgh = img.height,
                imgr = imgw/imgh,iw,ih;

            if(imgr >= vpr){
                var rate = scaleRate = vpw/imgw;
                vpImg.css({
                    width:iw = vpw,
                    height:Math.floor(ih = imgh*rate)
                })
            }
            else if(imgr < vpr){
                var rate = scaleRate = vph/imgh;
                vpImg.css({
                    height:ih = vph,
                    width:Math.floor(iw = imgw*rate)
                })

            }

            var cw = Math.min(iw,ih)*.9,
                cx = Math.floor((iw-cw)/ 2),
                cy = Math.floor((ih-cw)/2);
            ccrop = [cx,cy,cx+cw,cy+cw];

            cb && cb(ccrop);
        }
        img.src = avatarUrl;
    }

    function initCrop(crop){

        jc && jc.destroy(),jc = null;



        var jcropApi,boundx,boundy,
            prev100 = $("#preview100"),img100 = prev100.find('img'),
            prev50 = $("#preview50"),img50 = prev50.find('img');

		setTimeout(function(){

			$("#userAvatar").Jcrop({
				bgFade:     true,
				bgOpacity: .2,
				setSelect: crop,
				onChange: updatePreview,
				onSelect: updatePreview,
				aspectRatio:1
			},function(){

				var bounds = this.getBounds();
				boundx = bounds[0];
				boundy = bounds[1];

				jc = jcropApi = this;

				updatePreview(curCropArea);
			})
		},0)



        function _updatePreview(prev,img,c){
            var xsize = prev.width(),ysize = prev.height();
            if (parseInt(c.w) > 0)
            {
                var rx = xsize / c.w;
                var ry = ysize / c.h;

                img.css({
                    width: Math.round(rx * boundx) + 'px',
                    height: Math.round(ry * boundy) + 'px',
                    marginLeft: '-' + Math.round(rx * c.x) + 'px',
                    marginTop: '-' + Math.round(ry * c.y) + 'px'
                });

                curCropArea = c;
            }
        }

        function updatePreview(c)
        {
            _updatePreview(prev100,img100,c);
            _updatePreview(prev50,img50,c);
        };
    }

    function initFileUploader(){

        fu = $("#fileUpload").off('uploaded').on('uploaded',function(res,data){
            if(data.code != 0 || !data.data) return;
            data = data.data;
            if(!data.path) return;

            avatarUrl = data.path;
            avatarId = data.id;

            $("#preview100 img,#preview50 img,#userAvatar").attr('src',avatarUrl);

            adjustImg(function(crop){
                initCrop(crop);
            })

        }).off('error').on('error',function(evt,err){
            modal.alert(err.message);
        }).uploader({
            uploadUrl:"/upload/image",
            fieldName:'avatar',
            maxSize:"4M",
            accept:['.jpg','.png','.gif','.jpeg','.bmp']
        })

    }

    function setUserAvatar(){

        var data = getCrop();
        data.imgId = avatarId;
        $.ajax({
            url:"/user/setAvatar",
            type:"POST",
            data:data,
            success:function(res){
                if(res.code != 0){
                    modal.alert(res.msg || "头像设置失败");
                    return;
                }
                $("#avatar").attr('src',res.data);
                modal.hide();
            }
        })

    }

    function submitUserInfo(data){

        $.extend(data,{
            birthday: $.trim($("#birthday").text()),
            sex: $.trim($("#sex").text()),
            liveState:$("#province").val(),
            liveCity:$("#city").val(),
            liveAddress:$("#addr").val(),
            school:$("#graduate").val(),
            companySize:$("#company").val(),
            companyType:$("#companyType").val(),
			companyIndustry:$("#industry").val(),
			marry:$("input[name='married']:checked").val(),
			position:$("#jobTitle").val(),
			highEdu:$("#eduBg").val(),
			monthSalary:$("#monthlyIncome").val(),
			jobExperience:$("#workExperience").val()
        });

        $.ajax({
            type: "post",
            url:"/u/baseinfo",
            data: {info:JSON.stringify(data)},
            dataType: "json",
            showLoading:true,
            success: function (data) {
                //location.reload();
                modal.show({
                    title: "提示",
                    content:$("#resultSuccess").html(),
                    size: {width: 650, height: 200},
                    showFoot: false,
                    showClose: true
                });

                setTimeout(function(){
                    modal.hide();
                },1000)
            }

        });
    }

    function initEvent() {

        $("#changeAvatar").on("click", showAvatarEditor);

        $("#submitMsg").on('click', function () {

            if ($(this).hasClass('btn_disable')) {
                return;
            }else{
                $("#msgForm").submit();

            }

        });

        /*$('#birthday').fdatepicker({
            format: 'yyyy-mm-dd',
            language: 'zh-CN'
        }).on('changeDate', function () {

        });*/

        $(".icon_date").click(function () {
            $('#birthday').trigger('focus');
        });

        modal.on('modal-hide',function(){
            jc && (jc.destroy(), jc = null);
            fu && (fu.destroy(), fu = null);
        });
        var ids1 = "#msgForm #eduBg,#msgForm #industry,#msgForm #company,#msgForm #monthlyIncome,#msgForm #companyType,#msgForm #companyType,#msgForm #workExperience",
            ids2 = "#msgForm #province,#msgForm #city";
        $(ids1).ygSelect({
            width:290,
            height:32
        });
		var liveState = $("#province").attr("data"),
			liveCity = $("#city").attr("data");
        $("#province").ygSelect({
            width: 135,
            height: 32,
            dropdownAni:false,
            dataSource:function(){
                var res = PROVINCE_LIST.slice(0);
				res.forEach(function(v,i){
					if(v.display == liveState){
						v.selected = true;
					}
				});
                res.splice(0,0,{value:"",display:"省/直辖市"});

                return res;
            }
        }).on('change',function(){
            var cv = $(this).val();
            var prov = ProvMapByName[cv];
            if(!prov){
                ains.setData([{value:"",display:"城市"}])
            }
            else{
                var res = prov.cities.slice(0);
                res.splice(0,0,{value:"",display:"城市"});
                ains.setData(res);
            }
        });

        var ains =$("#city").ygSelect({
            width: 135,
            height: 32,
            dropdownAni:false,
            dataSource:function(){
                //return [{value:"",display:"请选择"}];
                var cv = $("#province").val();
                var prov = ProvMapByName[cv];
                if(!prov){
                    return [{value:"",display:"城市"}]
                }
                else{
                    var res = prov.cities.slice(0);
					res.forEach(function(v,i){
						if(v.display == liveCity){
							v.selected = true;
						}
					});
                    res.splice(0,0,{value:"",display:"城市"});
                    return res;
                }
            }
        }).data('select');

        $("#addr,#jobTitle,#graduate").keypress(function(){
            var val = $(this).val();
            if(val.length >= 30){
                return false;
            }
        }).on('change paste',function(){
            var val = $(this).val();
            if(val.length > 30){
                $(this).val(val.substr(0,30));
            }
        });

        var count = 3;

        $("#toggleEdit").on('click',function(evt){

            enableEidt = !enableEidt;

            if(!(--count)){
                location.reload();
                return;
            }

            $("input[name='married'],#addr,#graduate,#jobTitle").attr('disabled',!enableEidt);

            ids1.split(',').concat(ids2.split(',')).forEach(function(v,i){
                var p = $(v).data('select');
                p.enabled(enableEidt);
            })

            $("#submitMsg,#changeAvatar").toggle();

            $(this).text(enableEidt ? '[放弃修改]' : '[修改信息]');

        })

    }

    function initValidator() {

        var btnValid = $("#submitMsg");

        var validator = $("#msgForm").validate({
            submitHandler: function () {
                submitUserInfo(this.getFormData());
                return false;
            },
            errorHandler: function (errs) {
                btnValid["addClass"]("btn_disable");
            },
            passedHandler: function () {
                btnValid["removeClass"]("btn_disable");
            },
            selectById:true,
            fields: {
                //industry:{
                //    required:true,
                //    output:"#industryTip"
                //},
                //monthlyIncome:{
                //    required:true,
                //    output:"#incomeTip"
                //},
                //workExperience:{
                //    required:true,
                //    output:"#weTip"
                //},
                //eduBg:{
                //    required:true,
                //    output:"#eduTip"
                //
                //}
            },
            errorMessage: {
                industry:{
                    required:"必填"
                },
                monthlyIncome:{
                    required:"必填"
                },
                workExperience:{
                    required:"必填"
                },
                eduBg:{
                    required:"必填"

                }
            }
        }).data('validator');

        var isValid = validator.isValid;
        btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
    }



    exports.run = function () {

        initEvent();

        initValidator();

        //$("#toggleEdit").trigger('click');

    }

});

