export function selectMenu(obj) {
    let $=window.$;
    let fatherDom=obj.fatherDom;
    let index=obj.index;
    $(fatherDom).find(".select-menu-input").val($(fatherDom).find(".select-this").html());//在输入框中自动填充第一个选项的值
    $(fatherDom).off("click",".select-menu-div");  // 解绑
    $(fatherDom).on("click",".select-menu-div", function (e) {
        e.stopPropagation();
        if ($(fatherDom).find(".select-menu-ul").css("display") === "block") {
            $(fatherDom).find(".select-menu-ul").hide();
            $(fatherDom).find(".select-menu-div").find("i").removeClass("select-menu-i");
            $(fatherDom).find(".select-menu-ul").animate({ marginTop: "50px", opacity: "0" }, "fast");
        } else {
            let wid_=$(fatherDom).find(".select-menu-div").width()+10;
            $(fatherDom).find(".select-menu-ul").show().css("width",wid_);
            $(fatherDom).find(".select-menu-div").find("i").addClass("select-menu-i");
            $(fatherDom).find(".select-menu-ul").animate({ marginTop: "5px", opacity: "1" }, "fast");
        }
        for(var i=0;i<$(".select-menu-ul").length;i++){
            if(i!==index&& $(".select-menu-ul").eq(i).css("display")==="block"){
                  $(".select-menu-ul").eq(i).hide();
                  $(".select-menu-div").eq(i).find("i").removeClass("select-menu-i");
                  $(".select-menu-ul").eq(i).animate({marginTop:"50px",opacity:"0"},"fast");
            }
       }
    });
    $(fatherDom).find(".select-menu-ul").off("click", "li");  // 解绑
    $(fatherDom).find(".select-menu-ul").on("click", "li", function () {//给下拉选项绑定点击事件
        $(fatherDom).find(".select-menu-input").val($(this).html());//把被点击的选项的值填入输入框中
        $(fatherDom).find(".select-menu-div").click();
        $(this).siblings(".select-this").removeClass("select-this");
        $(this).addClass("select-this");
        obj.callback&&obj.callback(this); // 点击选项后的回调
    });
    $("body").on("click", function (event) {
        event.stopPropagation();
        if ($(fatherDom).find(".select-menu-ul").css("display") === "block") {
            $(fatherDom).find(".select-menu-ul").hide();
            $(fatherDom).find(".select-menu-div").find("i").removeClass("select-menu-i");
            $(fatherDom).find(".select-menu-ul").animate({ marginTop: "50px", opacity: "0" }, "fast");
        }
    });
}
