
var config={
    port:3000,
    ip:"10.0.130.14",
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