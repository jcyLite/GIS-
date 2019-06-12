export function markerClick(marker,obj){//点击标注时触发事件
	var that=this;
	var lnglat=obj.lnglat;
	var sContent = require('./components/dialog.tpl')();
	var InfoContent=new T.InfoWindow();
	InfoContent.setContent(sContent);
	marker.openInfoWindow(InfoContent,lnglat);
	$(()=>{
		scbc.call(that,marker)
	})
};
function abc(cpJson){
    // console.log(cpJson)
    function init(obj){
        $("obj").html("<option>请选择</option>");
    }
    //获取省份的数据
    init($("#pro"));
    //获取有几个省份，通过循环遍历出来
    for(var i = 0; i<cpJson.length;i++){
        // console.log('cpJson[i].name=='+cpJson[i]);
        //获取到的数据
        var proresult = "<option value='"+cpJson[i].code+"'>"+cpJson[i].name+"</option>";
        //添加到显示省份的控件里
        $("#pro").append(proresult);
    }

    //var code = $("#pro"").val();
    //$("#districtCode").val(code);

    //获取当前省份的城市。通过选取省份触发change()事件
    $("#pro").change(function(){
        init($("#city"));
        init($("#dis"));
        //清空前面选取时遗留的数据。gt(index)方法获取下标大于index的数据，index从0开始
        $("#city option:gt(0)").remove();
        $("#dis option:gt(0)").remove();
        for(var j = 0;j<cpJson.length;j++){
            //判断选取的省份和JSon数据相匹配的数据
            //if($(this).attr("value") == cpJson[j].p){
            if($(this).val() == cpJson[j].code){
                //根据当前城市进行循环
                for(var k = 0;k<cpJson[j].sub.length;k++){
                    //获取当前省份对应的城市数据
                    var cityresult = "<option value='"+cpJson[j].sub[k].code+"'>"+cpJson[j].sub[k].name+"</option>";
                    //添加到城市控件里
                    $("#city").append(cityresult);
                }
            }
        }
    });

    //获取当前城市的乡镇。通过选取城市触发change()事件
    $("#city").change(function(){
        init($("#dis"));
        //清空前面选取时遗留的数据。gt(index)方法获取下标大于index的数据，index从0开始
        $("#dis option:gt(0)").remove();
        //根据省份循环
        for(var j = 0;j<cpJson.length;j++){
            //根据城市循环
            for(var k = 0;k<cpJson[j].sub.length;k++){
                //判断选取的城市和JSon数据相匹配的数据，如果没有对应的乡镇就进行下次循环
                //if($(this).attr("value") == cpJson[j].c[k].c1 && cpJson[j].d != null ){
                if($(this).val() == cpJson[j].sub[k].code){
                    ////根据乡镇循环
                    for(var n = 0;n<cpJson[j].sub.length;n++){
                        var cityresult = "<option value='"+cpJson[j].sub[k].sub[n].code+"'>"+cpJson[j].sub[k].sub[n].name+"</option>";
                        $("#dis").append(cityresult);
                    }
                }
            }
        }
    });
}
export function scbc(overLay,type){

    // console.log('ary==='+ary);
    var that=this;

	$('.buttons .sc').click(function(){//点击删除
		that.$http.post('/del',{
			bid:overLay.bid,
			tid:overLay.tid
		})
		map.removeOverLay(overLay);
		map.closeInfoWindow()
	})
	$(".buttons .bj").click(function(){//点击编辑
		console.log($('.dialogb'))
		$('.dialogb').find('input').attr('disabled',false)
		$('.dialogb').find('select').attr('disabled',false)
	})
	$('.buttons .bc').click(function(){//点击保存

        var select3 = document.getElementById("dis");
        var thirdName = select3.value;
        var thirdValue = $('#dis').find('option[value='+thirdName+']').html();

        var select2 = document.getElementById("city");
        var secondName = select2.value;
        var secondValue = $('#city').find('option[value='+secondName+']').html();

        var select1 = document.getElementById("pro");
        var firstName = select1.value;
        var firstValue = $('#pro').find('option[value='+firstName+']').html();


        // console.log('firstValue='+firstValue);
        // console.log('firstName='+firstName);
        //
        // console.log('secondValue='+secondValue);
        // console.log('secondName='+secondName);
        //
        //
        // console.log('thirdValue='+thirdValue);
        // console.log('thirdName='+thirdName);

        var bujianName = document.getElementById("bujianName").value;
        var dizhiScript = document.getElementById("dizhiScript").value;
        var zhuguanPart = document.getElementById("zhuguanPart").value;
        var quanshuPart = document.getElementById("quanshuPart").value;
        var yanghuPart = document.getElementById("yanghuPart").value;
        var shujuSource = document.getElementById("shujuSource").value;
        var shujuReceive = document.getElementById("shujuReceive").value;
        var beizhu = document.getElementById("beizhu").value;






        if(!type){
			console.log(overLay.getLngLat())
            var dic = {
                cityCode:'320400000000',
                cityName:'常州市',
                districtCode:firstName,
                districtName:firstValue,
                streetCode:secondName,
                streetName:secondValue,
                communityCode:thirdName,
                communityName:thirdValue,
                name:bujianName,
                address:dizhiScript,
                adminDept:zhuguanPart,
                ownerDept:quanshuPart,
                guardDept:yanghuPart,
                source:shujuSource,
                recorder:shujuReceive,
                remark:beizhu,
                lnglat:overLay.getLngLat()
            };
			var aa = JSON.stringify(dic);
			that.$http.post('/module10101/saveModule',{
               aa
			}).then(d=>{

                if (d.code == 0) {
                    alert('添加成功');
                    window.location.reload();
                } else if(d.code == -1){
                    alert('部件名称已存在');
                }else{
                    alert('添加失败');
                }

			    // console.log("ddd="+d);
            })
		}

		else if(type=='xian'){
			console.log(overLay.getLngLats())
		}
	})

        // var aa = overLay
        // var that=this;
        // var  cpJson = new Array();
        // var cpJson = ary;
        // console.log('cpJson=='+cpJson);

    that.$http.post('gis/queryByCode',{
        dictionaryCode:'行政区划及代码'
    }).then(d=>{
        // console.log('ddddd城市列表=='+d);
        $(()=>{
            console.log(typeof(d))
            abc(d)
        });


        //初始化


    })

        //省份，城市，乡镇的数据
        // var cpJson = [
        //     {
        //         "code": "320402000000",
        //         "name": "天宁区",
        //         "sub":
        //             [
        //                 {
        //                     "code": "320402001000",
        //                     "name": "雕庄街道",
        //                     "sub":
        //                         [
        //                             {"code": "320402001001","name": "朝阳花园社区居委会"},
        //                             {"code": "320402001200","name": "优胜村村委会"},
        //                             {"code": "320402001201","name": "采菱村村委会含采菱社区居委会"},
        //                             {"code": "320402001202","name": "中村村村委会"},
        //                             {"code": "320402001203","name": "雕庄村村委会"},
        //                             {"code": "320402001204","name": "朝阳村村委会"},
        //                             {"code": "320402001205","name": "清溪村村委会"},
        //                             {"code": "320402001206","name": "团结村村委会"}
        //                         ]
        //                 },
        //                 {
        //                     "code": "320402002000",
        //                     "name": "青龙街道",
        //                     "sub":
        //                         [
        //                             {"code": "320402002002","name": "青竹苑社区居委会"},
        //                             {"code": "320402002003","name": "彩虹城社区居委会"},
        //                             {"code": "320402002004","name": "紫云苑社区居委会"},
        //                             {"code": "320402002005","name": "新丰苑社区居委会"},
        //                             {"code": "320402002006","name": "青龙苑南区社区居委会"},
        //                             {"code": "320402002007","name": "青龙苑北区社区居委会"},
        //                             {"code": "320402002008","name": "阳光龙庭社区居委会"},
        //                             {"code": "320402002009","name": "水晶城社区居委会"},
        //                             {"code": "320402002200","name": "常青村村委会"},
        //                             {"code": "320402002201","name": "三里村村委会"},
        //                             {"code": "320402002202","name": "亚新村村委会"},
        //                             {"code": "320402002208","name": "洋头桥村村委会"},
        //                             {"code": "320402002209","name": "福成村村委会"},
        //                             {"code": "320402002210","name": "北塘村村委会"},
        //                             {"code": "320402002211","name": "勤丰村村委会"},
        //                             {"code": "320402002212","name": "新丰村村委会"},
        //                             {"code": "320402002213","name": "勤业村村委会"},
        //                             {"code": "320402002214","name": "青锋村村委会"},
        //                             {"code": "320402002215","name": "东风村村委会"}
        //                         ]
        //                 },
        //                 {
        //                     "code": "320402003000",
        //                     "name": "茶山街道",
        //                     "sub":
        //                         [
        //                             {"code": "320402003001","name": "丽华一村社区居委会"},
        //                             {"code": "320402003002","name": "丽华二村社区居委会"},
        //                             {"code": "320402003003","name": "丽华三村社区居委会"},
        //                             {"code": "320402003004","name": "朝阳新村第一社区居委会"},
        //                             {"code": "320402003005","name": "朝阳新村第二社区居委会"},
        //                             {"code": "320402003007","name": "清凉新村第一社区居委会"},
        //                             {"code": "320402003008","name": "清凉新村第二社区居委会"},
        //                             {"code": "320402003009","name": "清凉新村第三社区居委会"},
        //                             {"code": "320402003010","name": "清凉东村社区居委会"},
        //                             {"code": "320402003011","name": "同济桥社区居委会"},
        //                             {"code": "320402003012","name": "富强新村社区居委会"},
        //                             {"code": "320402003013","name": "人民家园社区居委会"},
        //                             {"code": "320402003014","name": "新城逸境社区居委会"},
        //                             {"code": "320402003015","name": "华润国际社区居委会"},
        //                             {"code": "320402003200","name": "勤丰村村委会"},
        //                             {"code": "320402003201","name": "丽华村村委会"},
        //                             {"code": "320402003202","name": "富强村村委会"},
        //                             {"code": "320402003203","name": "群力村村委会"},
        //                             {"code": "320402003204","name": "常春村村委会"},
        //                             {"code": "320402003205","name": "红梅村村委会"}
        //                         ]
        //                 },
        //                 {
        //                     "code": "320402004000",
        //                     "name": "红梅街道",
        //                     "sub":
        //                         [
        //                             {"code": "320402004001","name": "北环新村社区居委会"},
        //                             {"code": "320402004002","name": "北环南村社区居委会"},
        //                             {"code": "320402004003","name": "翠竹南区第一社区居委会"},
        //                             {"code": "320402004004","name": "翠竹南区第二社区居委会"},
        //                             {"code": "320402004005","name": "翠竹北区社区居委会"},
        //                             {"code": "320402004006","name": "红梅新村社区居委会"},
        //                             {"code": "320402004007","name": "红梅东村社区居委会"},
        //                             {"code": "320402004008","name": "红梅西村社区居委会"},
        //                             {"code": "320402004009","name": "锦绣花园社区居委会"},
        //                             {"code": "320402004010","name": "新堂社区居委会"},
        //                             {"code": "320402004011","name": "虹景社区居委会"},
        //                             {"code": "320402004012","name": "锦绣东苑社区居委会"},
        //                             {"code": "320402004013","name": "红梅假日花苑社区居委会"},
        //
        //                             {"code": "320402004015","name": "永宁路社区居委会"},
        //                             {"code": "320402004016","name": "聚博社区居委会"},
        //                             {"code": "320402004017","name": "盛世名门社区居委会"},
        //                             {"code": "320402004018","name": "金百花园社区居委会"},
        //                             {"code": "320402004019","name": "凯旋城社区居委会"},
        //                             {"code": "320402004020","name": "金梅花园社区居委会"},
        //                             {"code": "320402004021","name": "香缇湾社区居委会"},
        //
        //                             {"code": "320402004200","name": "林园村村委会"},
        //                             {"code": "320402004201","name": "竹林村村委会"},
        //                             {"code": "320402004202","name": "卫星村村委会"},
        //                             {"code": "320402004203","name": "红菱村村委会"},
        //                             {"code": "320402004204","name": "胜利村村委会"},
        //                             {"code": "320402004205","name": "光明村村委会"}
        //                         ]
        //                 },
        //                 {
        //                     "code": "320402005000",
        //                     "name": "天宁街道",
        //                     "sub":
        //                         [
        //                             {"code": "320402005001","name": "小东门桥社区居委会"},
        //                             {"code": "320402005002","name": "博爱路社区居委会"},
        //                             {"code": "320402005004","name": "斜桥巷社区居委会"},
        //                             {"code": "320402005005","name": "新丰街社区居委会"},
        //                             {"code": "320402005006","name": "舣舟亭社区居委会"},
        //                             {"code": "320402005007","name": "椿桂坊社区居委会"},
        //
        //                             {"code": "320402005010","name": "怡康花园社区居委会"},
        //                             {"code": "320402005011","name": "青山路社区居委会"},
        //                             {"code": "320402005012","name": "前后北岸社区居委会"},
        //                             {"code": "320402005013","name": "北直街社区居委会"},
        //                             {"code": "320402005014","name": "青果巷社区居委会"},
        //                             {"code": "320402005015","name": "陶沙巷社区居委会"},
        //                             {"code": "320402005016","name": "五角场社区居委会"},
        //                             {"code": "320402005017","name": "兆丰花苑社区居委会"},
        //                             {"code": "320402005018","name": "文笔塔社区居委会"},
        //                             {"code": "320402005200","name": "解放村村委会"},
        //                         ]
        //                 },
        //                 {
        //                     "code": "320402006000",
        //                     "name": "兰陵街道",
        //                     "sub":
        //                         [
        //                             {"code": "320402006001","name": "九洲新世界社区居委会"},
        //                             {"code": "320402006002","name": "乾盛兰庭社区居委会"},
        //                             {"code": "320402006003","name": "工人新村第一社区居委会"},
        //                             {"code": "320402006004","name": "工人新村第二社区居委会"},
        //                             {"code": "320402006005","name": "浦南社区居委会"},
        //                             {"code": "320402006006","name": "浦陵社区居委会"},
        //                             {"code": "320402006007","name": "天安河滨社区居委会"},
        //                             {"code": "320402006008","name": "浦北新村社区居委会"},
        //                             {"code": "320402006009","name": "浦前社区居委会"},
        //                             {"code": "320402006010","name": "国泰名都社区居委会"},
        //                             {"code": "320402006011","name": "世纪华城社区居委会"},
        //
        //                             {"code": "320402006200","name": "茶山村村委会"},
        //                             {"code": "320402006201","name": "荡南村村委会"},
        //                             {"code": "320402006202","name": "复兴村村委会"}
        //                         ]
        //                 },
        //                 {
        //                     "code": "320402109000",
        //                     "name": "郑陆镇",
        //                     "sub":
        //                         [
        //                             {"code": "320402109001","name": "郑陆社区居委会"},
        //                             {"code": "320402109002","name": "东青社区居委会（含东青村村委）"},
        //                             {"code": "320402109003","name": "焦溪社区居委会（含焦溪村村委）"},
        //                             {"code": "320402109004","name": "三河口社区居委会（含三河口村村委）"},
        //
        //                             {"code": "320402109200","name": "徐家村村委会"},
        //                             {"code": "320402109201","name": "董墅村村委会"},
        //                             {"code": "320402109202","name": "天安河滨社区居委会"},
        //                             {"code": "320402109203","name": "三皇庙村村委会"},
        //
        //                             {"code": "320402109205","name": "黄天荡村村委会"},
        //                             {"code": "320402109206","name": "羌家村村委会"},
        //                             {"code": "320402109209","name": "花园村村委会"},
        //                             {"code": "320402109211","name": "和平村村委会"},
        //                             {"code": "320402109214","name": "青松村村委会"},
        //                             {"code": "320402109216","name": "武城村村委会"},
        //                             {"code": "320402109217","name": "石堰村村委会"},
        //
        //                             {"code": "320402109220","name": "省岸村村委会"},
        //                             {"code": "320402109221","name": "横沟村村委会"},
        //                             {"code": "320402109222","name": "舜南村村委会"},
        //                             {"code": "320402109223","name": "查家湾村村委会"},
        //                             {"code": "320402109224","name": "粮庄桥村村委会"},
        //                             {"code": "320402109225","name": "舜北村村委会"},
        //                             {"code": "320402109227","name": "翟家湾村村委会"},
        //                             {"code": "320402109230","name": "丰北村村委会"},
        //
        //
        //                             {"code": "320402109231","name": "梧岗村村委会"},
        //                             {"code": "320402109234","name": "牟家村村委会"},
        //                             {"code": "320402109235","name": "新沟桥村村委会"},
        //                             {"code": "320402109237","name": "宁河村村委会"}
        //                         ]
        //                 },
        //             ]
        //     },
        //
        //     {
        //         "code": "320404000000",
        //         "name": "钟楼区",
        //         "sub":
        //             [
        //                 {
        //                     "code": "320404001000",
        //                     "name": "五星街道",
        //                     "sub":
        //                         [
        //                             {"code": "320404001001","name": "新中社区居委会"},
        //                             {"code": "320404001002","name": "新农社区居委会"},
        //                             {"code": "320404001003","name": "新岗社区居委会"},
        //                             {"code": "320404001004","name": "新新社区居委会"},
        //                             {"code": "320404001005","name": "新民社区居委会"},
        //                             {"code": "320404001006","name": "新丰社区居委会"},
        //                             {"code": "320404001007","name": "新庄社区居委会"},
        //                             {"code": "320404001008","name": "五星社区居委会"},
        //                             {"code": "320404001009","name": "平岗社区居委会"},
        //                             {"code": "320404001010","name": "汤家社区居委会"},
        //                             {"code": "320404001011","name": "谭墅社区居委会"},
        //                             {"code": "320404001012","name": "三堡街社区居委会"},
        //                             {"code": "320404001013","name": "勤业新村第一社区居委会"},
        //                             {"code": "320404001014","name": "勤业新村第二社区居委会"},
        //                             {"code": "320404001015","name": "都市桃源花苑社区居委会"},
        //                             {"code": "320404001016","name": "勤德家园社区居委会"},
        //                             {"code": "320404001017","name": "花园新村第一社区居委会"},
        //                             {"code": "320404001018","name": "花园新村第二社区居委会"},
        //                             {"code": "320404001019","name": "花园西村社区居委会"},
        //                             {"code": "320404001020","name": "白云新村社区居委会"},
        //                             {"code": "320404001021","name": "蓝天花园社区居民委员会"}
        //                         ]
        //                 },
        //                 {
        //                     "code": "320404002000",
        //                     "name": "永红街道",
        //                     "sub":
        //                         [
        //                             {"code": "320404002001","name": "东方社区居委会"},
        //                             {"code": "320404002002","name": "永红社区居委会"},
        //                             {"code": "320404002003","name": "新建社区居委会"},
        //                             {"code": "320404002004","name": "白荡社区居委会"},
        //                             {"code": "320404002005","name": "新华社区居委会"},
        //                             {"code": "320404002006","name": "荆川社区居委会"},
        //                             {"code": "320404002007","name": "为民社区居委会"},
        //                             {"code": "320404002008","name": "陈渡社区居委会"},
        //                             {"code": "320404002009","name": "宣塘社区居委会"},
        //                             {"code": "320404002010","name": "清潭新村第一社区居委会"},
        //                             {"code": "320404002012","name": "清潭新村第三社区居委会"},
        //                             {"code": "320404002014","name": "清潭新村第五社区居委会"},
        //                             {"code": "320404002015","name": "电子新村社区居委会"},
        //                             {"code": "320404002017","name": "荆川里社区居委会"},
        //                             {"code": "320404002019","name": "花园南村社区居委会"},
        //                             {"code": "320404002020","name": "锦阳花园社区居委会"},
        //                             {"code": "320404002021","name": "陈渡新苑社区居委会"},
        //                             {"code": "320404002022","name": "香江华廷社区居委会"}
        //                         ]
        //                 }
        //             ]
        //     }
        // ];




}
