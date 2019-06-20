export default function useJs(src) {
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.charset = "GBK";
    script.src = src;
    body.appendChild(script);
};