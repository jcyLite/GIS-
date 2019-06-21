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
        <div class="col">部件名称：</div>
        <input   class="col layui-input" type="text" id="bujianName" :value="mainData&&mainData.name">
      </div>
      <div class="row">
        <div class="col">地址描述：</div>
        <input   class="col layui-input" type="text" id="dizhiScript" :value="mainData&&mainData.address">
      </div>
      <div class="row">
        <div class="col">主管部门：</div>
        <input   class="col layui-input" type="text" id="zhuguanPart" :value="mainData&&mainData.adminDept">
      </div>
      <div class="row">
        <div class="col">权属单位：</div>
        <input   class="col layui-input" type="text" id="quanshuPart" :value="mainData&&mainData.ownerDept">
      </div>
      <div class="row">
        <div class="col">养护单位：</div>
        <input   class="col layui-input" type="text" id="yanghuPart" :value="mainData&&mainData.guardDept">
      </div>
      <div class="row">
        <div class="col">数据来源：</div>
        <input   class="col layui-input" type="text" id="shujuSource" :value="mainData&&mainData.source">
      </div>
      <div class="row">
        <div class="col">数据录入人：</div>
        <input   class="col layui-input" type="text" id="shujuReceive" :value="mainData&&mainData.recorder">
      </div>
      <div class="row">
        <div class="col">备注：</div>
        <input   class="col layui-input" type="text" id="beizhu" :value="mainData&&mainData.remark"> 
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
export default {
  data() {
      return {
          mainData:null,
          overLay:this.$root.overLay,
          that:this.$root.that,
          isHistory:this.$root.isHistory,
          countySelect:null,
          streetSelect:null,
          communitySelect:null,
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
    if(!that.countySelect){
      let loading = layer.load(2);
      that.that.$http.post('gis/queryByCode',{
          dictionaryCode:'行政区划及代码'
      }).then(res=>{
        that.countySelect=res;
        if(this.mainData==null){
          this.$nextTick(()=>{
            layui.form.render(); // 重载一下layui的表单元素
          })
          layer.close(loading);
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
        layer.close(loading);
      })
    }

    //获取当前省份的城市。通过选取省份触发change()事件
    // $("body").on("change","#pro",function(){
    //   let val=$(this).val();
    //   that.countySelect.forEach((item,index)=>{
    //     if(item.code==val){
    //       that.streetSelect=item.sub;
    //       that.communitySelect=null;
    //     }
    //   })
    // });

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

    //获取当前城市的乡镇。通过选取城市触发change()事件
    // $("#city").change(function(){
    //     let val=$(this).val();
    //     that.streetSelect.forEach((item,index)=>{
    //       if(item.code==val){
    //         that.communitySelect=item.sub;
    //       }
    //     })
    // });

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
  },
  updated(){
  	// this.$nextTick(() => {
    //   alert(999)
    //     layui.form.render(); // 重载一下layui的表单元素
    // });
  },
  watch: {
    
  },
  methods: {
    /**
     * 弹出自定义弹框
     */
    diyFun() {
      let that=this;
      let overLayType=this.overLay.getType(); // 覆盖物类型  点 ==2  线==4  面==5
      let lngLatArr=null;
      if(this.overLay.getLngLat){
				lngLatArr=this.overLay.getLngLat();
			}else{
				lngLatArr=this.overLay.getLngLats();
      }
      if(lngLatArr[0] instanceof Array){  // 面的数据 多包了一层数组
        lngLatArr=lngLatArr[0];
      }
      let timeStr=new Date().getTime(); // 获取字符串
      this.$createDiyLayer({
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
              //let overLayArr=that.that.map.getOverlays();
              //overLayArr.forEach((item,index)=>{
                // if(item.tid==that.overLay.tid&&item.subIndex==that.overLay.subIndex){
                //   item.setLngLats(arr);
                //   let zbObj=new T.LngLat(arr[0].lng, arr[0].lat); // 如果是线 面 则取第一个点的经纬度对象
                //   that.that.infoWindowObj.setLngLat(zbObj)
                //   //that.that.infoWindowObj.update();
                //   that.that.infoWindowObj.closeInfoWindow();  // 定位完  关闭信息框
                //   let nowZoom=that.that.map.getZoom();  // 获取地图当前层级
                //   that.that.map.centerAndZoom(zbObj, nowZoom); // 定位到修改点位置
                // }
              //})
              that.overLay.setLngLats(arr);
              let zbObj=new T.LngLat(arr[0].lng, arr[0].lat); // 如果是线 面 则取第一个点的经纬度对象
              that.that.infoWindowObj.setLngLat(zbObj)
              //that.that.infoWindowObj.update();
              that.that.infoWindowObj.closeInfoWindow();  // 定位完  关闭信息框
              let nowZoom=that.that.map.getZoom();  // 获取地图当前层级
              that.that.map.centerAndZoom(zbObj, nowZoom); // 定位到修改点位置
            }else{ // 点
              // let overLayArr=that.that.map.getOverlays();
              // console.log(111111)
              // console.log(overLayArr)
              // overLayArr.forEach((item,index)=>{
              //   if(item.tid==that.overLay.tid&&item.subIndex==that.overLay.subIndex){
              //     let zbObj=new T.LngLat(lngLatEdited.lng, lngLatEdited.lat); // 经纬度对象
              //     item.setLngLat(zbObj);
              //     that.that.infoWindowObj.setLngLat(zbObj)
              //     //that.that.infoWindowObj.update();
              //     that.that.infoWindowObj.closeInfoWindow();  // 定位完  关闭信息框
              //     let nowZoom=that.that.map.getZoom();  // 获取地图当前层级
              //     that.that.map.centerAndZoom(zbObj, nowZoom); // 定位到修改点位置
              //   }
              // })
              let zbObj=new T.LngLat(lngLatEdited.lng, lngLatEdited.lat); // 经纬度对象
              that.overLay.setLngLat(zbObj);
              that.that.infoWindowObj.setLngLat(zbObj)
              that.that.infoWindowObj.closeInfoWindow();  // 定位完  关闭信息框
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
        let loading = layer.load(2);
        this.that.$http.post(url,{
            aa
        }).then(d=>{
            layer.close(loading);
            if (d.code == 0) {
                layui.layer.msg("添加成功")
                window.location.reload();
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