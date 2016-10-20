var fs = require( 'fs' );
var stat = fs.stat;
var fshelper={
    readFile:function(filename){

    },
    saveFile:function(){

    },
    copyFiles:function( src, dst,option ){
        // 读取目录中的所有文件/目录readdir
        fs.readdir( src, function( err, paths ){

            if( err ){
                console.log(err);
            }
            paths.forEach(function( path ){
                var _src = src + '/' + path,
                    _dst = dst + '/' + path,
                    readable, writable;
                var temp=path.split(".");
                var exe=temp[temp.length-1];

                option.type.indexOf(exe)!=-1&&
                stat( _src, function( err, st ){
                    if( err ){
                        console.log(err);
                    }
                    // 判断是否为文件
                    if( st.isFile() ){

                        // 创建读取流
                        readable = fs.createReadStream( _src );
                        // 创建写入流
                        writable = fs.createWriteStream( _dst );
                        // 通过管道来传输流
                        readable.pipe( writable );
                    }
                    // 如果是目录则递归调用自身
                    else if( st.isDirectory() ){
                        this.copyFilesCheckDir( _src, _dst, option );
                    }
                })

            });
        });
    },
    copyFilesCheckDir: function( src, dst,option ){
        var cf=this.copyFiles;
        fs.exists( dst, function( exists ){
            // 已存在
            if( exists ){
                cf( src, dst,option );
            }
            // 不存在
            else{
                fs.mkdir( dst, function(){
                    cf( src, dst,option );
                });
            }
        });
    }

}
module.exports=fshelper;