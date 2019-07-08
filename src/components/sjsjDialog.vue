<template id='dialog-template'>
  <div class="dialog">
    <div class="scroller layui-form">
      <div class="row">
        <div class="col">所在行政区：</div>
        <div class="addPP">常州市</div>
      </div>
      <div class="row">
        <div class="col">区：</div>
        <select class="addSelect" id="pro" lay-filter='pro'>
          <option value="">请选择</option>
          <option v-for="(item,index) in countySelect" :key="index" :value="item.code">{{item.name}}</option>
        </select>      
      </div>
      <div class="row">
        <div class="col">街道：</div>
        <select class="addSelect" id="city" lay-filter='city'>
            <option value="">请选择</option>
            <option v-for="(item,index) in streetSelect" :key="index" :value="item.code">{{item.name}}</option>
        </select>  
      </div>
      <div class="row">
        <div class="col">社区：</div>
        <select class="addSelect" id="dis" >
            <option value="">请选择</option>
            <option v-for="(item,index) in communitySelect" :key="index" :value="item.code">{{item.name}}</option>
        </select>    
      </div>
      <div class="row">
        <div class="col">事件大类：</div>
        <select class="" id=" " >
            <option value="">请选择</option>
            <option v-for="(item,index) in communitySelect" :key="index" :value="item.code">{{item.name}}</option>
        </select>    
      </div>
      <div class="row">
        <div class="col">事件小类：</div>
        <select class="" id=" " >
            <option value="">请选择</option>
            <option v-for="(item,index) in communitySelect" :key="index" :value="item.code">{{item.name}}</option>
        </select>    
      </div>
      <div class="row">
        <div class="col">所在网格：</div>
        <input class="col layui-input" type="text" id="zhuguanPart" :value="mainData&&mainData.adminDept">
      </div>
      <div class="row">
        <div class="col">事件标识码：</div>
        <input class="col layui-input" type="text" id="quanshuPart" :value="mainData&&mainData.ownerDept">
      </div>
      <div class="row">
        <div class="col">事件名称：</div>
        <input class="col layui-input" type="text" id="yanghuPart" :value="mainData&&mainData.guardDept">
      </div>
      <div class="row">
        <div class="col">事件地址：</div>
        <input class="col layui-input" type="text" id="shujuSource" :value="mainData&&mainData.source">
      </div>
      <div class="row">
        <div class="col">事件缘由：</div>
        <input class="col layui-input" type="text" id="shujuReceive" :value="mainData&&mainData.recorder">
      </div>
      <div class="row">
        <div class="col">事件图片：</div>
        <div class="layui-upload">
          <button type="button" class="layui-btn layui-btn-normal layui-btn-sm" id="testList">选择多文件</button> 
          <button type="button" class="layui-btn layui-btn-sm" id="testListAction">开始上传</button>
          <div class="layui-upload-list">
            <table class="layui-table">
              <thead>
                <tr>
                  <th>预览</th>
                  <th>大小</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody id="demoList"></tbody>
            </table>
          </div>
        </div> 
      </div>
      <div class="row">
        <div class="col">事件开始时间：</div>
        <input class="col layui-input" type="text" id="beginDate">
      </div>
      <div class="row">
        <div class="col">事件终止时间：</div>
        <input class="col layui-input" type="text" id="endDate">
      </div>
      <div class="row">
        <div class="col">当事方：</div>
        <button type="button" @click="addTr" class="layui-btn layui-btn-normal layui-btn-sm">添加</button> 
        <div class="table-cont">
          <table class="layui-table">
            <thead>
              <tr>
                <th>当事人</th>
                <th>联系电话</th>
                <th>联系人身份证号码</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody v-show="trArr.length==0">
              <tr>
                <td colspan="4" class="empty-td">无数据</td>
              </tr>
            </tbody>
            <tbody v-show="trArr.length>0">
              <tr v-for="(item,index) in trArr" :key="index">
                <td><input type="text" class="layui-input" v-model="item.name" ></td>
                <td><input type="text" class="layui-input" v-model="item.phone" ></td>
                <td><input type="text" class="layui-input" v-model="item.idNumber" ></td>
                <td><button type="button" @click="deleteTr(index)" class="layui-btn layui-btn-danger layui-btn-xs">删除</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col">主管部门：</div>
        <input class="col layui-input" type="text" id="shujuReceive" :value="mainData&&mainData.recorder">
      </div>
      <div class="row">
        <div class="col">数据状态：</div>
        <select class="" id=" " >
            <option value="">请选择</option>
            <option v-for="(item,index) in communitySelect" :key="index" :value="item.code">{{item.name}}</option>
        </select>        
      </div>
      <div class="row">
        <div class="col">事件来源：</div>
        <input class="col layui-input" type="text" id="shujuReceive" :value="mainData&&mainData.recorder">
      </div>
      <div class="row">
        <div class="col">事件上报人：</div>
        <input class="col layui-input" type="text" id="shujuReceive" :value="mainData&&mainData.recorder">
      </div>
      <div class="row">
        <div class="col">事件上报时间：</div>
        <input class="col layui-input" type="text" id="submitDate">
      </div>
      <div class="row">
        <div class="col">数据录入人：</div>
        <input class="col layui-input" type="text" id="shujuReceive" :value="mainData&&mainData.recorder">
      </div>
      <div class="row">
        <div class="col">备注：</div>
        <input class="col layui-input" type="text" id="shujuReceive" :value="mainData&&mainData.recorder">
      </div>
    </div>
    <div class="buttons">
      <div class="button-0" @click="diyFun" v-show="true">自定义</div>
      <div class="button-1 sc" @click="cancleDialog" v-show="!isHistory">取消</div>
      <div class="button-2 bc" @click="submitDialog('add')" v-show="!isHistory">保存</div>
      <div class="button-2 bc" @click="submitDialog('edit')" v-show="isHistory">保存</div>
    </div>
  </div>
</template>
<script>
import 'layui-src/src/css/modules/laydate/default/laydate.css';
import { setTimeout } from 'timers';
export default {
  data() {
      return {
          mainData:null,
          overLay:this.$root.overLay,
          that:this.$root.that,
          isHistory:this.$root.isHistory,
          countySelect:window.App.cityAry,
          streetSelect:null,
          communitySelect:null,
          trArr:[],
      }
  },
  mounted() {
    let that=this;
    //如果是修改 则渲染数据
    if(this.isHistory){
      //this.mainData=this.that.d.datas[this.that.oactive];
      this.that.d.forEach((item,index)=>{
        if(item.tid==this.overLay.tid){
           this.mainData=item.datas[this.overLay.subIndex];
        }
      })
      console.log('mainData')
      console.log(this.mainData)
    }else{
      this.mainData=null;
    }
    if(!that.that.cityAry){
      that.that.$http.post('gis/queryByCode',{
          dictionaryCode:'行政区划及代码'
      }).then(res=>{
        that.countySelect=res;
        that.initSelect();
      })
    }else{
      that.initSelect();
    }

    layui.form.on('select(pro)', function(data){
      console.log(data.elem); //得到select原始DOM对象
      console.log(data.value); //得到被选中的值
      console.log(data.othis); //得到美化后的DOM对象
      let val=data.value;
      that.countySelect.forEach((item,index)=>{
        if(item.code==val){
          that.streetSelect=item.sub;
          that.communitySelect=null;
        }
      })
      that.$nextTick(() => {
        $("#city").val("");  // 默认第二个下拉框未选择，否则无法触发第三个下拉框change事件
        layui.form.render(); // 重载一下layui的表单元素
      });
    });

    layui.form.on('select(city)', function(data){
      console.log(data.elem); //得到select原始DOM对象
      console.log(data.value); //得到被选中的值
      console.log(data.othis); //得到美化后的DOM对象
      let val=data.value;
      that.streetSelect.forEach((item,index)=>{
          if(item.code==val){
            that.communitySelect=item.sub;
          }
      })
      that.$nextTick(() => {
        layui.form.render(); // 重载一下layui的表单元素
      });
    });
    //多图片上传
    var demoListView = $('#demoList')
    ,uploadListIns = layui.upload.render({
      elem: '#testList'
      ,url: '/upload/'
      ,accept: 'file'
      ,multiple: true
      ,auto: false
      ,bindAction: '#testListAction'
      ,choose: function(obj){   
        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
        //读取本地文件
        obj.preview(function(index, file, result){
          var tr = $(['<tr id="upload-'+ index +'">'
            ,'<td><img src="'+ result +'"/></td>'
            ,'<td>'+ (file.size/1014).toFixed(1) +'kb</td>'
            ,'<td>等待上传</td>'
            ,'<td>'
              ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
              ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
            ,'</td>'
          ,'</tr>'].join(''));
          
          //单个重传
          tr.find('.demo-reload').on('click', function(){
            obj.upload(index, file);
          });
          
          //删除
          tr.find('.demo-delete').on('click', function(){
            delete files[index]; //删除对应的文件
            tr.remove();
            uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
          });
          
          demoListView.append(tr);
        });
      }
      ,done: function(res, index, upload){
        if(res.code == 0){ //上传成功
          var tr = demoListView.find('tr#upload-'+ index)
          ,tds = tr.children();
          tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
          tds.eq(3).html(''); //清空操作
          return delete this.files[index]; //删除文件队列已经上传成功的文件
        }
        this.error(index, upload);
      }
      ,error: function(index, upload){
        var tr = demoListView.find('tr#upload-'+ index)
        ,tds = tr.children();
        tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
        tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
      }
    });
  },
  updated(){
    setTimeout(()=>{  // 跟树形图插件一样，延迟个一段时间再初始化就可以正常运行layui插件了。？？？？??
      this.initDate()
    },500)
  },
  watch: {
    
  },
  methods: {
    /**
     * 初始化日期插件
     */
    initDate() {
      this.$nextTick(() => {
        layui.laydate.render({ 
          elem: '#beginDate'
          ,type: 'datetime'
          ,trigger: 'click' //采用click弹出
        });
        layui.laydate.render({ 
          elem: '#endDate'
          ,type: 'datetime'
          ,trigger: 'click' //采用click弹出
        });
        layui.laydate.render({ 
          elem: '#submitDate'
          ,type: 'datetime'
          ,trigger: 'click' //采用click弹出
        });
      });
    },
    /**
     * 新增一行tr
     */
    addTr() {
      this.trArr.push({
        name:"",
        phone:"",
        idNumber:"",
      });
    },
    /**
     * 删除tr
     */
    deleteTr(index) {
      this.trArr.splice(index,1);
    },
    /**
     * 初始化地区选择
     */
    initSelect() {
      let that=this;
      if(this.mainData==null){
          this.$nextTick(()=>{
            layui.form.render(); // 重载一下layui的表单元素
          })
          return false;
        }
        that.countySelect.forEach((item,index)=>{
          if(item.code==that.mainData.districtCode){
            that.streetSelect=item.sub;
            item.sub.forEach((innerItem,innerIndex)=>{
              if(innerItem.code==that.mainData.streetCode){
                that.communitySelect=innerItem.sub;
              }
            })
          }
        })
        this.$nextTick(()=>{
          // 初始化select选中效果
          $("#pro option").each(function(){
            if($(this).val()==that.mainData.districtCode){
              $(this).prop("selected","selected");
            }
          })
          $("#city option").each(function(){
            if($(this).val()==that.mainData.streetCode){
              $(this).prop("selected","selected");
            }
          })
          $("#dis option").each(function(){
            if($(this).val()==that.mainData.communityCode){
              $(this).prop("selected","selected");
            }
          })
          layui.form.render(); // 重载一下layui的表单元素
        })
    },
    /**
     * 弹出自定义弹框
     */
    diyFun() {
      let that=this;
      let overLayType=this.overLay.getType(); // 覆盖物类型  点 ==2  线==4  面==5
      let lngLatArr=null;
      if(this.overLay.getLngLat){  // 如果是点
				lngLatArr=this.overLay.getLngLat();
			}else{
				lngLatArr=this.overLay.getLngLats();
      }
      if(lngLatArr[0] instanceof Array){  // 面的数据 多包了一层数组
        lngLatArr=lngLatArr[0];
      }
      let timeStr=new Date().getTime(); // 获取字符串
      const instance=this.$createDiyLayer({
        $props: {
          overLayType,
          lngLatArr,
          timeStr
        },
        $events:{
          setLngLatFun(lngLatEdited) {
            if(lngLatEdited instanceof Array){  // 线 面
              let arr=[]; 
              lngLatEdited.forEach((item,index)=>{
                arr.push(new T.LngLat(item.lng, item.lat))
              })
              that.overLay.setLngLats(arr);
              let zbObj=new T.LngLat(arr[0].lng, arr[0].lat); // 如果是线 面 则取第一个点的经纬度对象
              //   that.that.infoWindowObj.setLngLat(zbObj)
              //   that.that.infoWindowObj.closeInfoWindow();  // 定位完  关闭信息框
              that.that.map.closeInfoWindow();
              let nowZoom=that.that.map.getZoom();  // 获取地图当前层级
              that.that.map.centerAndZoom(zbObj, nowZoom); // 定位到修改点位置
            }else{ // 点
              let zbObj=new T.LngLat(lngLatEdited.lng, lngLatEdited.lat); // 经纬度对象
              that.overLay.setLngLat(zbObj);
              //  that.that.infoWindowObj.setLngLat(zbObj)
              //  that.that.infoWindowObj.closeInfoWindow();  // 定位完  关闭信息框

              //that.overLay.closeInfoWindow();

              that.that.map.closeInfoWindow();
              let nowZoom=that.that.map.getZoom();  // 获取地图当前层级
              that.that.map.centerAndZoom(zbObj, nowZoom); // 定位到修改点位置
            }
          }
        }
      }).show();
    },
    /**
     * 删除
     */
    cancleDialog() {
        map.removeOverLay(this.overLay);
        map.closeInfoWindow()
    },
    /**
     * 保存
     */
    submitDialog(type) {  // type --- 为 ‘add’或者‘edit’
        var select3 = document.getElementById("dis");
        var thirdName = select3.value;
        var thirdValue = $('#dis').find('option[value='+thirdName+']').html();
        var select2 = document.getElementById("city");
        var secondName = select2.value;
        var secondValue = $('#city').find('option[value='+secondName+']').html();
        var select1 = document.getElementById("pro");
        var firstName = select1.value;
        var firstValue = $('#pro').find('option[value='+firstName+']').html();
        var bujianName = document.getElementById("bujianName").value;
        var dizhiScript = document.getElementById("dizhiScript").value;
        var zhuguanPart = document.getElementById("zhuguanPart").value;
        var quanshuPart = document.getElementById("quanshuPart").value;
        var yanghuPart = document.getElementById("yanghuPart").value;
        var shujuSource = document.getElementById("shujuSource").value;
        var shujuReceive = document.getElementById("shujuReceive").value;
        var beizhu = document.getElementById("beizhu").value;
        var lnglat =null;
        if(!this.that.isHistory){  // 新增
            lnglat=this.overLay.getLngLat?this.overLay.getLngLat():this.overLay.getLngLats();
        }else{  // 编辑
            lnglat = this.overLay
        }
        if(lnglat instanceof Array){  // 如果是线和面，则lnglat是个数组
            lnglat=lnglat.length>1?lnglat:lnglat[0]  // 如果是面，则lnglat是个两层的数组。。这里要改下结构
        }
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
            lnglat:lnglat
        };
        if(type=='edit'){  // 此时是编辑页面，需要传编辑的那个属性的id
          this.that.d.forEach((item,index) => {  // 选择poperBottom组件实例,获取属性表的某行id
            if(item.tid==this.overLay.tid){
              dic.id=item.datas[this.overLay.subIndex].id;
            }
          });
        }
        var aa = JSON.stringify(dic);
        let moduleName='';
        this.that.d.forEach((item,index)=>{
          if(item.tid==this.overLay.tid){
            moduleName=item.moduleName;
          }
        })
        var url=`/${moduleName}/saveModule`;
        this.that.$http.post(url,{
            aa
        }).then(d=>{
            if (d.code == 0) {
                layui.layer.msg("添加成功")
                var arr=window.App.eye.concat([]); //  Object.assign({},obj)和concat都只是深拷贝第一层，而JSON.parse结合JSON.stringify只能深拷贝属性，不能拷贝方法
                arr.splice(arr.indexOf(App.active),1);
                var active=window.App.active;
                window.App.searchlei(function(){
                  arr.forEach((item,index)=>{
                    $(".leftBox .bottom .container>.box").eq(item).click()
                  })
                  $(".leftBox .bottom .container>.box").eq(active).click()
                });
            } else if(d.code == -1){
                layui.layer.msg("部件名称已存在")
            }else{
                layui.layer.msg("添加失败")
            }
        })
    },
    
  }
};
</script>
<style lang="less">
</style>