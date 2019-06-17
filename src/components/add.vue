<template>
	<div v-if="poper" class="poper ">
		<div @click="poper=false" class="shade"></div>
		<div class="box">
			<div style="overflow: hidden;" class="scroller">
				<div class="row">
					<div class="col">图层名称：</div>
					<input v-model="poperData.tname" class="col layui-input" type="text" />
				</div>
				<div class="row">
					<div class="col">部件大类：</div>
					<select v-model="poperData.bigType" placeholder="请选择" class="col" name="" >
						<option v-for="item in tempAry"  :value='item.value'>{{item.value}}</option>
					</select>
				</div>
				<div class="row">
					<div class="col">部件小类：</div>
					<select v-model="poperData.minType" placeholder="请选择" class="col" name="" id="">
						<option v-for="item in secondAry"  :value='item.value'>{{item.value}}</option>

					</select>
				</div>
				<div class="row">
					<div class="col">图层类型：</div>
					<select v-model="poperData.tleixing" placeholder="请选择" class="col" name="" id="">
						<option value="点">点</option>
						<option value="线">线</option>
						<option value="面">面</option>
					</select>
				</div>
				<div class="row">
					<div class="col">基础数据类型：</div>
					<!--<input class="col" type="text" />-->
					<div v-model="poperData.jcsjlx" class="col">部件数据</div>
				</div>
				<!--<div class="row">-->
					<!--<div class="col">所属网格类型：</div>-->
					<!--<select v-model="poperData.sswglx" placeholder="请选择" class="col" name="" id="">-->
						<!--<option value="请选择">行政区划网格</option>-->
						<!--<option value="请选择">考评工作网格</option>-->
					<!--</select>-->
				<!--</div>-->
				<div class="row">
					<div class="col">描述：</div>
					<input v-model="poperData.miaoshu" class="col layui-input" type="text" />
				</div>
			</div>
			<div class="buttons">
				<div @click="poper=false" click="btna" class="button-1">取消</div>
				<div @click="addbtuceng" class="button-2">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	    props:['abc'],
		data(){
			return {
				poper:false,
				tempAry:[],
				secondAry:[],
				poperData:{
					tname:'',
					tleixing:'',
					jcsjlx:'部件数据',
					miaoshu:'',
                    bigType:'',
                    minType:'',
					bigCode:'',
					minCode:''
				}
			}
		},
		name:'add',
		mounted() {
            this.tempAry = this.abc;
            // this.secondAry =  this.abc[0].sub;
	        console.log("sstempAryssss=="+this.tempAry);
			console.log("this.secondAry=="+this.secondAry);
			layui.form.render(); // 重载一下layui的表单元素
		},
		updated(){
			layui.form.render(); // 重载一下layui的表单元素
		},
        watch:{
            'poperData.bigType' :{
                handler(newName,oldName){
                    console.log('newName='+newName);
                    console.log('oldName='+oldName);

                    this.tempAry.forEach((item,index)=>{
                        if(item.value == newName){
                            this.secondAry=item.sub;
                            console.log('item.sub=='+this.secondAry);
                            this.poperData.bigCode = item.key;
                        }

                    })
                }
            },
            'poperData.minType' :{
                handler(newName,oldName){
                    this.secondAry.forEach((item,index)=>{
                        if(item.value == newName){
                            console.log('item.sub=='+this.secondAry);
                            this.poperData.minCode = item.key;
                        }

                    })
                }
			}
        },
		methods:{
			show(){
				this.poper=true;
			},
			addbtuceng(){
				this.$emit('addbtuceng',this.poperData)
			}
		}
	}
</script>

<style>
</style>