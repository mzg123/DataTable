define("admin/product/product_index",  function (require, exports, module) {
    var ue = UE.getEditor('editor');
    var user_index={
       init:function(){
           this.ue||(this.ue=UE.getEditor('editor'));
       }
    }

    $(function(){
        user_index.init();
    });
});

