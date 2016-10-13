define("personal/notice", ["ui/pager/pager", "ui/modal/modal", 'ui/list/list', 'ui/list/ListPage', 'common/config', 'personal/personal'], function (require, exports, module) {
    var Pager = require('ui/pager/pager');
    var modal = require('ui/modal/modal');
    var config = require('common/config');
    require('ui/list/list');
    require('personal/personal').run();
    var ListPage = require('ui/list/ListPage'), curLp;

    var chooseAll = $("#chooseAll input");

    var messageMap = {}, unread, currentExpanedMsgId;

    chooseAll.on("click", function () {
        var checkbox = $(".personal_table input[type='checkbox']");
        if (this.checked) {
            checkbox.attr("checked", true);

        } else {
            checkbox.attr("checked", false);
        }

    });

    $(".personal_table").on('click', "input[type='checkbox']", function () {

        //全选+全不选
        var checkbox = $(".personal_table input[type='checkbox']");
        var num = checkbox.size();//选项总个数
        var checkedNum = 0;
        for (var i = 0; i < num; i++) {
            if (checkbox[i].checked) {
                checkedNum++;
            }
        }
        if (checkedNum == num) {//全选
            chooseAll.attr("checked", true);
        } else {//不全选
            chooseAll.attr("checked", false);
        }


    });


    //删除
    $("#deleteNote").click(function () {
        var checkedInput = $(".personal_table :checkbox[checked]");
        //判断是否至少选择一项
        var checkNum = checkedInput.length;
        if (checkNum == 0) {
            modal.alert("请选择至少一项！")
            //alert("请选择至少一项！");
            return;
        }
        //批量选择
        if (confirm("确定要删除所选项目？")) {
            var checkedList = new Array();
            checkedInput.each(function () {
                checkedList.push($(this).val());
            });
            //$("#delete").val(checkedList.join(","));
            //$("#deleteForm").submit();
            $.ajax({
                url: config.api.delUserMessage,
                type: 'post',
                dataType: "json",
                showLoading: true,
                data: {
                    'ids': checkedList.join(",")
                },
                success: function () {
                    curLp.getListInstance().refresh();
                    chooseAll.prop('checked', false);
                }
            })
        }

    });


    function initProductList() {

        var list;

        curLp = new ListPage({
            list: {
                root: "#noteTable tbody",
                listItem: "tr",
                itemTemplate: $("#rowTemplate").html(),
                dataSource: {
                    url: config.api.getUserMessage,
                    type: 'post',
                    data: function (tmp) {
                        return {
                            'page.size': tmp.pageSize,
                            'page.current': tmp.currentPage
                        }
                    },
                    beforeApply: function (res) {

                        res = res.data;

                        unread = res.unreadMsg;

                        $("#messageCount").html(res.page.totalRows);
                        $("#unReadCount").html(unread);

                        $(".message .message_num").html("(" + unread + ")");

                        res.userMsg.forEach(function (v, i) {
                            messageMap[v.id] = v;
                        })
                        return {
                            totalRecords: res.page.totalRows,
                            currentPage: res.page.currentPage,
                            pageSize: res.page.pageSize,
                            dataList: res.userMsg
                        }
                    }
                },
                pageSize: 5
            },
            pager: {
                containerId: "pager",
                showPage: 5,
                onChange: function () {
                    chooseAll.attr("checked", false);

                }
            },
            onReady: function (lp) {
                list = lp.getListInstance();
                //消息通知为0提示
                if (!list.count()) {
                    $("#tableNull").show();
                }
            }
        });


    }

    function readMsg(id, cb) {

        $.ajax({
            type: 'post',
            url: config.api.getMessageDetail,
            data: {id: id},
            showLoading: true,
            success: cb
        })

    }

    function showMsgDetail(id, data) {

        var self = $("td a[note-id='" + id + "']");

        var detail = data.detail || {};

        var msgHtml = '<tr class="msg-detail" >' +
            '<td colspan="5" >' +
            '<div>' +
            '<h6 class="msg-to" >' + (detail.sendTo || "") + '</h6>' +
            '<p class="msg-content" >' + detail.content + '</p>' +
            '<p class="msg-from" >' + detail.sendFrom + '</p></div></td></tr>'

        self.parents('tr')
            .addClass('visited expanded')
            .after(msgHtml);
    }

    function hideMsgDetail(id) {
        $("td a[note-id='" + id + "']")
            .parents('tr')
            .removeClass('expanded')
            .next('tr.msg-detail')
            .remove();
    }

    function initEvent() {

        $("#noteTable").on('click', 'td a', function () {
            var self = $(this);
            var id = $(this).attr('note-id');


            if (currentExpanedMsgId == id) {
                hideMsgDetail(id);
                currentExpanedMsgId = null;
                return;
            }

            if (currentExpanedMsgId) {
                hideMsgDetail(currentExpanedMsgId);
            }

            var msg = messageMap[id];

            readMsg(id, function (data) {
                data = data.data;
                var detail = data.detail || {};

                showMsgDetail(currentExpanedMsgId = id, data);

                //$("#sendFrom").html(detail.sendFrom);
                //$("#sendTime").html(detail.sendTime);
                //$("#messageContent").html(detail.content);
                //self.parents('tr').addClass('visited');

                //$("#messageListPanel,#messageDetailPanel").toggle();
                $("#unReadCount").html(data.unreadMsg);
                $(".message .message_num").html("(" + data.unreadMsg + ")");
            })


        })

        $("#goBackBtn").on('click', function () {

            $("#messageListPanel,#messageDetailPanel").toggle();
        })

    }

    function init() {
        initProductList();

        initEvent();
    }

    init();


});

