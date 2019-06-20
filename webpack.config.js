module.exports = {
    "rem": 16,
    "auto_open_browser": false,
    "postCss": true,
    "entry": "index",
    "commonJs": "base",
    "port": 1004,
    "static": true,
    "compress": false,
    "proxy": [{
        "api": ["/jdzzw"],
        "target": "http://172.16.4.5:8081"
    }, {
        "api": ["/simpleWeather"],
        "target": "http://apis.juhe.cn"
    }]
}