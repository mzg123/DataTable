define("admin/product/product_index",  function (require, exports, module) {
    var data =[
        {
            "Id": "id",
            "Title": "title",
            "Time": "time",
            "Oper": "<a class='btn  edit'>编辑</a><a class='btn  delete'>删除</a>"
        }
    ];
    var table,currentRow;
    var editFlag = false;
    var user_index={
         init:function(){
             table = $('#example').DataTable({ //datatable init
                 data: data,
//            ajax: "jquerydatatable.json",
//            scrollY: 900,
//            paging: false,
//            "lengthChange": false,
//            "paging": true,
//            "stateSave": true,
                 "lengthMenu": [ 2, 25, 50, 75, 100,299 ],
                 scrollCollapse: true,
                 scrollY: 300,
//            "search": {
//                "search": "111"
//            },
//            "searchCols": [
//                null,
//                { "search": "H" },
//                null,
//                { "search": "^[0-9]", "escapeRegex": false }
//            ],
                 "stripeClasses": [ 'strip1 ss s1s s2s', 'strip2', 'strip3' ],
//            "orderCellsTop": true,
                 "orderClasses": true,
                 "orderFixed":[ 0, 'desc' ],
                 "pagingType": "simple_numbers",//"numbers",simple simple_numbers
//            "pageLength": 50,
//            "dom": 'trilp',
//            "displayStart": 0,
//            "columnDefs": [ {
//                "targets": [ 0, 2 ],
//                "orderable": false
//            } ],
//            columnDefs: [
//                { targets: [0, 1], className: "my_class",visible: true, "cellType": "td"},
//                { targets: [2, 3], visible: true, "cellType": "th"},
//                { targets: '_all', visible: false }
//            ],

                 "searching": true,
                 "info": false,
//            renderer: {
//                "header": "jqueryui",
//                "pageButton": "bootstrap"
//            },
//            "autoWidth": true,
                 columns: [
                     {"data": "Id"},
                     {"data": "Title"},
                     {"data": "Time"},
                     {"data": "Oper"}
                 ]
             });

            this._initEvent(table);
         },
         _initEvent:function(table){
             table.on( 'click', 'td a', function () {
                 var row =$(this).parents('td');
                 $(this).hasClass("delete")&&deleteRow.call(this,table, $(row).parents('tr'));
                 $(this).hasClass("edit")&&edit.call(this,currentRow= table.row($(row).parents('tr')).data());
                 // alert( table.cell(row).data() );
                 //console.log(table.row( $(this).parents('tr')).data());
             } );
             $("#editSave").on("click",function(){
                 submit();
             });
         }
    }
    function deleteRow(table,row){
        table.row( row).remove().draw();
    }
    function edit(rowdata){
        var templateStr= $('#user_edit .modal-body ').html();
        $('#user_edit .modal-body').html( $.MT('user_add',templateStr ,rowdata));
        $('#user_edit').modal({
            keyboard: false
        })
    }
    function submit(){
        $.ajax({
            url:Config.api.user_edit,
            type:'post',
            dataType:"json",
            async:true,
            data:{
                name:"0"
            },
            success:function(data){
                $('#user_edit').modal('hide');
                table.row( currentRow).draw();
            },
            exception:function(err){
                console.log(err);
                return false;
            }
        })
    }
    $(function(){
        user_index.init();
    });
});

