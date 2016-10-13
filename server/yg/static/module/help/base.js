/**
 * Created by liujiangtao on 2016/3/23 0023.
 */

define("help/base", ['common/config','ui/tabs/tabs'], function (require, exports, module) {

    var config = require('common/config');
    var Tabs = require('ui/tabs/tabs');

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

    function initQuestList(){

        $(".question-title").on('click',function(){
            if($(this).hasClass('un-clickable')) return;
            $(this).toggleClass('expand').next().slideToggle();
        })

    }

    function operationTab() {
        var curTabIndex = $.utils.getUrlParam("tab") || 1;

        new Tabs({
           tabsContainerId: "operation_tabs",
           tabClass: "operation_tab",
           selectedClass: "hover",
           contentContainerId: "operation_content_container",
           contentClass: "operation_content",
           eventType: 'click',
           defaultSelect:parseInt(curTabIndex)
       });
    }


    function init() {

        initNav();

        initQuestList();

        operationTab();

    }

    init();


});