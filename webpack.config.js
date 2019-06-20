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
        "api": ["/czcgnl"],
        "target": "http://202.102.101.92:20001"
    }]
}