define("personal/personal", function (require, exports, module) {

    function initNav(){

        var curSubNav = null;

        $(".nav-left dl dd").each(function(){
            if($(this).children('.sub-nav').length){
                $(this).append('<i class="ar" ></i>')
            }
        });

        $(".nav-left").on('mouseenter','dd',function(evt){
            hideCurSubNav();
            var self = $(this),
                subNav = self.children('.sub-nav');
            if(!subNav[0]){
                return;
            }
            var sw = self.outerWidth(),sh = self.outerHeight();
            subNav.css({
                left:139,
                top:-1
            });
            subNav.show();
            curSubNav = subNav;
        });
        $('.nav-left').on('mouseleave',hideCurSubNav)

        function hideCurSubNav(){
            if(curSubNav) {
                curSubNav.hide();
                curSubNav = null;
            }
        }

    }

    function initDatePicker(){

        var start =  $("#startDate");
        var end =  $("#endDate");
        if(!start[0]) return;

        var dayLen = 24*3600*1000;
        var now = new Date,
            ntime = now.getTime();
        now = new Date(ntime);
        var ofs = new Date(ntime-365*dayLen);

        //$("#startDate").val((new Date(ntime-90*dayLen)).format('yyyy-MM-dd'));
        //$("#endDate").val(now.format('yyyy-MM-dd'));

        start.fdatepicker({
            format: 'yyyy-mm-dd',
            language: 'zh-CN',
            startDate:ofs.format('yyyy-MM-dd'),
            endDate:now.format('yyyy-MM-dd')
        }).on('changeDate', function(evt){
            //console.log(arguments);
            end.fdatepicker('setStartDate',evt.date);
        });

        end.fdatepicker({
            format: 'yyyy-mm-dd',
            language: 'zh-CN',
            startDate:ofs.format('yyyy-MM-dd'),
            endDate:now.format('yyyy-MM-dd')
        }).on('changeDate',function(evt){
            //console.log(arguments);
            start.fdatepicker('setEndDate',evt.date);
        })

        start.fdatepicker('setEndDate',(new Date(end.val())));
        end.fdatepicker('setStartDate',start.val());

    }


    $.extend(exports,{
        run:function () {
            initNav();
            initDatePicker();
            return exports;
        }
    })

});

