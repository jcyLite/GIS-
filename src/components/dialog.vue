<template id='dialog-template'>
  <div class="dialog">
    <div class="scroller">
      <div class="row">
        <div class="col">所在行政区：</div>
        <div class="addPP">常州市</div>
      </div>
      <div class="row addrow">
        <div id="info" class="info">
          <span>区：</span>
          <select class="addSelect" id="pro" >
            <option>请选择</option>
            <option v-for="(item,index) in countySelect" :key="index" :value="item.code">{{item.name}}</option>
          </select>
          <span>街道：</span>
          <select class="addSelect" id="city" >
            <option>请选择</option>
            <option v-for="(item,index) in streetSelect" :key="index" :value="item.code">{{item.name}}</option>
          </select>
          <span>社区：</span>
          <select class="addSelect" id="dis" >
            <option>请选择</option>
            <option v-for="(item,index) in communitySelect" :key="index" :value="item.code">{{item.name}}</option>
          </select>
        </div>
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
      <div class="button-0" @click="diyFun(overLay)" v-show="false">自定义</div>
      <div class="button-1 sc" @click="cancleDialog" v-show="!editBool">取消</div>
      <div class="button-2 bc" @click="submitDialog('add')" v-show="!editBool">保存</div>
      <div class="button-2 bc" @click="submitDialog('edit')" v-show="editBool">保存</div>
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
          editBool:this.$root.editBool,
          countySelect:null,
          streetSelect:null,
          communitySelect:null,
      }
  },
  mounted() {
    let that=this;
    if(!this.countySelect){
      this.that.$http.post('gis/queryByCode',{
          dictionaryCode:'行政区划及代码'
      }).then(res=>{
        this.countySelect=res;
      })
    }
    //如果是修改 则渲染数据
    if(this.editBool){
      this.mainData=this.that.d.datas[this.that.oactive];
    }
    //获取当前省份的城市。通过选取省份触发change()事件
    $("#pro").change(function(){
      let val=$(this).val();
      that.countySelect.forEach((item,index)=>{
        if(item.code==val){
          that.streetSelect=item.sub;
          that.communitySelect=null;
        }
      })
    });
    // layui.form.on('select(pro)', function(data){
    //   console.log(data.elem); //得到select原始DOM对象
    //   console.log(data.value); //得到被选中的值
    //   console.log(data.othis); //得到美化后的DOM对象
    //   let val=data.value;
    //   that.countySelect.forEach((item,index)=>{
    //     if(item.code==val){
    //       that.streetSelect=item.sub;
    //       that.communitySelect=null;
    //     }
    //   })
    //   console.log(888888)
    //   console.log(that.streetSelect)
    //   that.$nextTick(() => {
    //   that.$forceUpdate(); //强制刷新，解决页面不会重新渲染的问题
    //     layui.form.render(); // 重载一下layui的表单元素
    //   });
    // });

    //获取当前城市的乡镇。通过选取城市触发change()事件
    $("#city").change(function(){
        let val=$(this).val();
        that.streetSelect.forEach((item,index)=>{
          if(item.code==val){
            that.communitySelect=item.sub;
          }
        })
    });
    // layui.form.on('select(city)', function(data){
    //   console.log(data.elem); //得到select原始DOM对象
    //   console.log(data.value); //得到被选中的值
    //   console.log(data.othis); //得到美化后的DOM对象
    //   let val=data.value;
    //   that.streetSelect.forEach((item,index)=>{
    //       if(item.code==val){
    //         that.communitySelect=item.sub;
    //       }
    //   })
    //   console.log(888888)
    //   console.log(that.communitySelect)
    //   that.$forceUpdate(); //强制刷新，解决页面不会重新渲染的问题
    //   layui.form.render(); // 重载一下layui的表单元素
    // });
  },
  updated(){
		//	layui.form.render(); // 重载一下layui的表单元素
  },
  watch: {
    
  },
  methods: {
    /**
     * 弹出自定义弹框
     */
    diyFun(overLay) {
      this.$createDiyLayer({
        $props: {
          overLay
        }
      }).show();
    },
    /**
     * 取消
     */
    cancleDialog() {
        if(this.editBool){
            return false;
        }
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
        if(!this.that.editBool){  // 新增
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
            dic.id=this.that.$parent.moduleId;
        }
        var aa = JSON.stringify(dic);
        let moduleName=$(".leftBox .bottom .box.active").attr("moduleName");
        var url=`/${moduleName}/saveModule`;
        this.that.$http.post(url,{
            aa
        }).then(d=>{
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