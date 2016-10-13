define("ui/zclip/zclip", [], function (require, exports, module) {
    var ZClip = function (params) {
        $.extend(this, {
            clipButton: null,
            copyTextID: null,
            debugObj: null,
            callBack: null
        }, params || {});

        this._clip = null;
        this._init();
    };
    $.extend(ZClip.prototype, {
        _init: function () {
            var that = this;
            //ZeroClipboard.config({swfPath: "http://zeroclipboard.org/javascripts/zc/v2.2.0/ZeroClipboard.swf?noCache=1474871171712"});
            if (that.clipButton && that.copyTextID) {
                ZeroClipboard.config({swfPath: __globalData.swfPath + "/zclip.swf?noCache=" + new Date().getTime()});
                that._clip = new ZeroClipboard(that.clipButton);
                that._clip.on('ready', function () {
                    //that._debugStr('Flash 已经准备完成。');
                    $(that.clipButton).attr("data-clipboard-target", that.copyTextID);
                    $(that.clipButton).attr("data-clipboard-text", "Default clipboard text from attribute");
                    that._clip.on('aftercopy', function (event) {
                        if (that.callBack) that.callBack();
                    });
                });
            }

            $(that._clip).on('error', function (event) {
                //$('.demo-area').hide();
                that._debugStr('error[name="' + event.name + '"]: ' + event.message);
                ZeroClipboard.destroy();
            });
        },
        _debugStr: function (text) {
            if (this.debugObj) $(this.debugObj).append($('<p>').text(text));
        }
    });
    return ZClip;

});
