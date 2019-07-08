<template>
	<transition name="poper">
		<div v-if="poper" class="poper ">
			<div @click="poper=false" class="shade"></div>
			<div class="box layui-form">
				<div style="overflow: hidden;" class="scroller">
					<div class="row">
						<div class="col">图层名称：</div>
						<input v-model="poperData.tname" class="col layui-input" type="text" />
					</div>
					<div class="row">
						<div class="col">图层类型：</div>
						<select v-model="poperData.tleixing" placeholder="请选择" class="col" name="" id=""  lay-filter="tleixing">
							<option value="点">点</option>
							<option value="线">线</option>
							<option value="面">面</option>
						</select>
					</div>
					<div class="row">
						<div class="col">基础数据类型：</div>
						<div class="col">网格数据</div>
					</div>
					<div class="row">
						<div class="col">所属网格类型：</div>
						<select v-model="poperData.type" placeholder="请选择" class="col" name="" id=""  lay-filter="wgType">
							<option value="">请选择</option>
							<option v-for="(item,index) in tempAry" :key="index" :value="item.value">{{item.value}}</option>
						</select>
					</div>
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
	</transition>
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
					type:'',  // 网格类型
					jcsjlx:'网格数据',
					miaoshu:'',
                    minType:'',
					bigCode:'',
					minCode:''
				}
			}
		},
		name:'add',
		mounted() {
			let that=this;
            this.tempAry = this.abc;
			layui.form.on('select(wgType)', function(data){
				//console.log(data.elem); //得到select原始DOM对象
				//console.log(data.value); //得到被选中的值
				//console.log(data.othis); //得到美化后的DOM对象
				that.poperData.type=data.value;
				that.$nextTick(() => {
					that.$forceUpdate(); //强制刷新，解决页面不会重新渲染的问题
					layui.form.render(); // 重载一下layui的表单元素
				});
			});
			layui.form.on('select(tleixing)', function(data){
				//console.log(data.elem); //得到select原始DOM对象
				//console.log(data.value); //得到被选中的值
				//console.log(data.othis); //得到美化后的DOM对象
				that.poperData.tleixing=data.value;
				that.$nextTick(() => {
					that.$forceUpdate(); //强制刷新，解决页面不会重新渲染的问题
					layui.form.render(); // 重载一下layui的表单元素
				});
			});
			layui.form.render(); // 重载一下layui的表单元素
		},
		updated(){
			layui.form.render(); // 重载一下layui的表单元素
		},
        watch:{
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

<style lang="less">
	@time:.35s;
	.poper-enter,.poper-leave-active{
		.shade{
			opacity:0;
		}
		.box{
			opacity:0;
			transform:scale(0);
		}
	}
	.poper{
		transition: @time all;
		.shade{
			transition: @time all;
		}
		.box{
			transition: @time all;
			height: 350px;
			.layui-form-select{
				dl {
					max-height:160px!important; 
				}
			}
			.scroller{
				height: 270px;
				padding: 20px 0;
			}
			.buttons{
				bottom:20px;
			}
		}
	}
</style>