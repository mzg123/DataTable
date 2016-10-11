
var config={
    port:3000,
    ssl:4441,
    serverSsl:444,
    ip:"10.0.130.129",//node 启动的ip
    serverIp:"10.0.130.129",//node请求数据的ip
    serverPort:30001,
    env:"production",//development  production
    main:"test",//入口模板文件名称
    noAuthPath:[
        '/',
        '/products'
    ],
    logger:{
        "appenders":
            [
                {
                    "type":"console",
                    "category":"console"
                },
                {
                    "category":"log_file",
                    "type": "file",
                    "filename": "./logs/log_file/file.log",
                    "maxLogSize": 104800,
                    "backups": 100
                },
                {
                    "category":"log_date",
                    "type": "dateFile",
                    "filename": "./logs/log_date/date",
                    "alwaysIncludePattern": true,
                    "pattern": "-yyyy-MM-dd-hh.log"

                }
            ],
        "replaceConsole": true,
        "levels":
        {
            "log_file":"ALL",
            "console":"ALL",
            "log_date":"ALL"
        }
    }
};
module.exports = config;