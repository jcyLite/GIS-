export function markerClick(marker,obj,isHistory,that){//点击标注时触发事件 isHistory：true--是上次标记的点
    //var that=this;
    var lnglat=obj.lnglat;
	var sContent = require('./components/dialog.tpl')();
    var InfoContent=new T.InfoWindow();
    that.infoWindowObj=InfoContent;
    InfoContent.setContent(sContent);
    let type_=marker.getType(); // 覆盖物类型  点 ==2  线==4  面==5
    if(type_==2){
        if(that.$el.id =='poper-bottom'){
            that.$parent.map.openInfoWindow(InfoContent,lnglat)
        }else{
            that.map.openInfoWindow(InfoContent,lnglat)
        }
    }else{
        marker.openInfoWindow(InfoContent);
    }  
    //marker.openInfoWindow(InfoContent);
	$(()=>{
        if(that.$el.id =='poper-bottom'){  // 如果用户在poperBottom.vue组件点击的覆盖物（即地图上点击的时候）
            // 把app.vue组件实例传到dialog.vue
            scbc(marker,isHistory,that.$parent)
        }else{
            scbc(marker,isHistory,that)
        }
	})
};

import Vue from 'vue'
import dialog from './components/dialog.vue'
/**
 * 绘制点 线 面 的时候触发， 并弹框
 */
export function scbc(overLay,isHistory,that){  // that---app对象
    //var that=this;
    new Vue({
        el:'#dialogCont',
        data(){
            return {
                overLay,
                that,
                isHistory:isHistory||false, // isHistory：true--是上次标记的点
            }
        },
        render:h=>h(dialog),
    })
}
/**
 * 点的描绘工具
 */
export function editMarker(that){
    var handler = that.handler;
    if(handler) handler.close();
    handler = new T.MarkTool(that.map, {
        follow: true
    });
    handler.addEventListener('mouseup', function(obj) {
        // 点击标注一个点的时候触发，线和面的触发是其他方法
        that.infoWindowObj = new T.InfoWindow();
        var infoWindowObj = that.infoWindowObj;
        var sContent = require('./components/dialog.tpl')();
        var lnglat = obj.currentLnglat;
        var markers = handler.getMarkers();
        infoWindowObj.setContent(sContent);
        let currentTid=$(".leftBox .bottom .box.active").attr("tid"); // 当前的图层id
        for(var i = 0; i < markers.length; i++) {
            let marker = markers[i];
            if(!marker.tid){  // 如果不存在，就肯定是新标注的点,防止重复绑定
                that.map.openInfoWindow(infoWindowObj, lnglat);
                //marker.openInfoWindow(infoWindowObj);
                //that.scbc(marker,false);
                scbc(marker,false,that);
                // 点击新增标注点的时候触发，区别于点击上次增加的标注点
                marker.tid=currentTid;
                (function(th_){
                    th_.addEventListener('click', function(obj) {
                        markerClick(th_,obj,false,that)
                    });
                })(marker)
                marker.enableDragging();
            }
            
        }
    });
    handler.open();  // 开启标注点功能
}
/**
 * 
 * 面的描绘工具
 */
export function openPolygonTool(that) {
    //var that = this;
    var handler = that.handler;
    if(handler) handler.close();
    handler = new T.PolygonTool(that.map);
    handler.addEventListener('draw', function(obj) {
        var currentLnglats = obj.currentLnglats;
        var lnglat = currentLnglats[currentLnglats.length - 1];
        var sContent = require('./components/dialog.tpl')();
        var InfoContent = new T.InfoWindow();
        that.infoWindowObj=InfoContent;
        InfoContent.setContent(sContent);
        //obj.currentPolygon.openInfoWindow(InfoContent);
        that.map.openInfoWindow(InfoContent,lnglat);
        obj.currentPolygon.tid=$(".leftBox .bottom .box.active").attr("tid"); // 赋值图层id
        //that.scbc(obj.currentPolygon,false);
        scbc(obj.currentPolygon,false,that);
        (function(th_){
            th_.addEventListener('click', (objInner) => {
                var InfoContent = new T.InfoWindow();
                that.infoWindowObj=InfoContent;
                InfoContent.setContent(sContent);
                that.map.openInfoWindow(InfoContent, lnglat);
                //that.scbc(th_,false);
                scbc(th_,false,that);
            })
        })(obj.currentPolygon)
    });
    handler.open();
}
/**
 * 线的描绘工具
 */
export function openPolylineTool(that) {
    //var that = this;
    var handler = that.handler;
    if(handler) handler.close();
    handler = new T.PolylineTool(that.map);
    handler.addEventListener('draw', function(obj) {  // 画线 双击确定后 触发
        var currentLnglats = obj.currentLnglats;
        var lnglat = currentLnglats[currentLnglats.length - 1];
        var sContent = require('./components/dialog.tpl')();
        var InfoContent = new T.InfoWindow();
        that.infoWindowObj=InfoContent;
        InfoContent.setContent(sContent);
        //obj.currentPolyline.openInfoWindow(InfoContent);
        that.map.openInfoWindow(InfoContent,lnglat);
        obj.currentPolyline.tid=$(".leftBox .bottom .box.active").attr("tid"); // 赋值图层id
        //that.scbc(obj.currentPolyline,false);
        scbc(obj.currentPolyline,false,that);
        (function(th_){
            th_.addEventListener('click', (obj) => {
                var InfoContent = new T.InfoWindow();
                that.infoWindowObj=InfoContent;
                InfoContent.setContent(sContent);
                that.map.openInfoWindow(InfoContent, lnglat);
                //that.scbc(th_,false);
                scbc(th_,false,that);
            })
        })(obj.currentPolyline)
    });
    handler.open();
}
/**
 * 加载历史点
 */
export function jzdian(data,tid,that) { // data是属性表里面的数据; tid 是整个图层的id
    // that如果是通过.call传过来，则会有bug，地图的点只能加载出阴影部分
    if(!data){
        return false;
    }
    var lx = 0,
        ly = 0;
   // var that = this;
    var tlayers = [];
    window.activeMarkers = [];
    data&&data.forEach((item,index) => {
        var x = item.lnglat.lng;
        var y = item.lnglat.lat;
        lx += parseFloat(x);
        ly += parseFloat(y);
        var marker = new T.Marker(new T.LngLat(parseFloat(x), parseFloat(y)));
        marker.id=item.id;
        marker.subIndex=index;
        marker.addEventListener('mouseup',function(param){
            let subIndex=this.subIndex;
            that.$children.forEach((item,index) => {  // 选择poperBottom组件实例,修改oactive
                if(item.$el.parentNode.id=='poper-bottom-cont'){
                    item.oactive=subIndex;
                }
            });
            this.enableDragging(); // 让用户拖动 点 （ 但是需要先点击一下才能拖动 ）
        })
        marker.addEventListener('dragend',function(param){  // 拖拽事件
            console.log('发生了拖拽事件完毕')
            this.setLngLat(new T.LngLat(param.lnglat.lng,param.lnglat.lat));
        })
        marker.bid = item.bid;
        marker.tid = tid;
        // 点击上次增加的标注点的时候触发，区别于点击新增标注点
        marker.addEventListener('click', function(obj) {  // 点击事件
            markerClick(this, obj,true,that);   // 触发弹框
        });
        
        activeMarkers.push(marker);
        window.map.addOverLay(marker);
        marker.hide(); // 隐藏 点
        tlayers.push(marker)
    });
    var px = lx / data.length;
    var py = ly / data.length;
    return {
        tlayers,
        p: {
            px,
            py
        }
    };
} 
/**
 * 加载历史线
 */
export function jzxian(data,tid,that) { // data是属性表里面的数据; tid 是整个图层的id
    if(!data){
        return false;
    }
    //var that = this;
    var lx = 0,
        ly = 0,
        bb = 0;
    var tlayers = [];
    data && data.forEach((item,index) => {
        var points = [];
        item.lnglat.forEach(ii => {
            lx += parseFloat(ii.lng);
            ly += parseFloat(ii.lat);
            bb++;
            points.push(new T.LngLat(parseFloat(ii.lng), parseFloat(ii.lat)))
        });
        var pointers = new T.Polyline(points);
        pointers.bid = item.bid;
        pointers.id = item.id;
        pointers.tid = tid;
        pointers.subIndex=index;
        // 点击上次增加的标注点的时候触发，区别于点击新增标注点
        pointers.addEventListener('click', function(obj) {
            var lnglat = obj.lnglat;
            var sContent = require('./components/dialog.tpl')();
            var InfoContent = new T.InfoWindow();
            that.infoWindowObj=InfoContent;
            InfoContent.setContent(sContent);
            that.map.openInfoWindow(InfoContent, lnglat);
            //alert("历史的线")
            scbc(this,true,that); // true 代表是历史数据线
            // 同步一下poperbottom组件的两个属性
            let subIndex=this.subIndex;
            that.$children.forEach((item,index) => {  // 选择poperBottom组件实例,修改oactive
                if(item.$el.parentNode.id=='poper-bottom-cont'){
                    item.oactive=subIndex;
                }
            });
        });
        that.map.addOverLay(pointers);
        pointers.hide();
        tlayers.push(pointers)
    });
    window.xianLayers=tlayers
    var px = lx / bb;
    var py = ly / bb;
    return {
        tlayers,
        p: {
            px,
            py
        }
    };
}
/**
 * 加载历史面
 */
export function jzmian(data,tid,that) { // data是属性表里面的数据; tid 是整个图层的id
    if(!data){
        return false;
    }
    //var that = this;
    var lx = 0,
        ly = 0,
        bb = 0;
    var tlayers = [];
    data&&data.forEach((item,index) => {
        var points = [];
        item.lnglat.forEach(ii => {
            lx += parseFloat(ii.lng);
            ly += parseFloat(ii.lat);
            bb++;
            points.push(new T.LngLat(parseFloat(ii.lng), parseFloat(ii.lat)))
        });
        var polygons = new T.Polygon(points, {
            color: "blue",
            weight: 3,
            opacity: 0.5,
            fillColor: "#FFFFFF",
            fillOpacity: 0.5
        });
        polygons.bid = item.bid;
        polygons.id = item.id;
        polygons.tid = tid;
        polygons.subIndex=index;
        // 点击上次增加的标注点的时候触发，区别于点击新增标注点
        polygons.addEventListener('click', function(obj) {
            var lnglat = obj.lnglat;
            var sContent = require('./components/dialog.tpl')();
            var InfoContent = new T.InfoWindow();
            that.infoWindowObj=InfoContent;
            InfoContent.setContent(sContent);
            that.map.openInfoWindow(InfoContent, lnglat);
            //that.scbc(this,true) // true 代表是历史数据面
            scbc(this,true,that) // true 代表是历史数据面
            // 同步一下poperbottom组件的两个属性
            let subIndex=this.subIndex;
            that.$children.forEach((item,index) => {  // 选择poperBottom组件实例,修改oactive
                if(item.$el.parentNode.id=='poper-bottom-cont'){
                    item.oactive=subIndex;
                }
            });
        });
        that.map.addOverLay(polygons);
        polygons.hide();
        tlayers.push(polygons)
    });
    window.mianLayers=tlayers
    var px = lx / bb;
    var py = ly / bb;
    return {
        tlayers,
        p: {
            px,
            py
        }
    };
}

