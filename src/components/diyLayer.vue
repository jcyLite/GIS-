<style lang='less'>
	.poperDetail{
		position:fixed;
		top:0;
		right:0;
		bottom:0;
		left:0;
		z-index:10000000000000;
		.layui-table{
			width: 100%;
			.layui-table-grid-down{
				display: none;
			}
		}
		.layui-btn{
			height: auto;
		}
		.layui-input{
			height:28px;
		}
		.top-cont{
			text-align: right;
		}
		.shade{
			position:fixed;
			top:0;
			right:0;
			bottom:0;
			left:0;
			background:rgba(0,0,0,.2);
			z-index:10000000000000;
		}
		.midbox{
			padding:10px 20px;
			position:absolute;
			width:390px;
			height: 300px;
			border-radius: 10px;
			top:0;
			right:0;
			bottom:0;
			left:0;
			margin:auto;
			background: #fff;
			overflow: auto;
			z-index:10000000000001;
			.inner{
				>div{
					height:auto;
					>div{
							float:none;
						}
					}
			}
			.bottom-cont{
				position: absolute;
				bottom: 10px;
				right: 20px;
			}
		}
	}
</style>
<template>
	<div v-show="isShow" class="poperDetail" id='diyPoper'>
		<div class="shade">
			
		</div>
		<div class="midbox">
			<div class="inner">
				<div class="top-cont">
					<button class="layui-btn layui-btn-normal layui-btn-sm" @click="addTr" v-if="!isDian">
						新增
					</button>
				</div>
				<table lay-filter="lnglat-table">
					<thead>
						<tr>
							<th lay-data="{field:'index', width:70}">序号</th>
							<th lay-data="{field:'lat', width:115}">经度</th>
							<th lay-data="{field:'lng', width:115}">纬度</th>
							<th lay-data="{field:'operate', width:80}" v-if="!isDian">操作</th>
						</tr> 
					</thead>
					<tbody  v-if="isDian">
						<tr>
							<td>1</td>
							<td><input type="text" class="layui-input lat-input" v-model="lngLatArr.lat"></td>
							<td><input type="text" class="layui-input lng-input" v-model="lngLatArr.lng"></td>
							<td v-if="!isDian"><button class="layui-btn layui-btn-sm layui-btn-danger delete-btn">删除</button></td>
						</tr>
					</tbody>
					<tbody  v-if="!isDian">
						<tr v-for="(item,index) of lngLatArr" :key="index">
							<td>{{index+1}}</td>
							<td><input type="text" class="layui-input lat-input" v-model="item.lat"></td>
							<td><input type="text" class="layui-input lng-input" v-model="item.lng"></td>
							<td><button class="layui-btn layui-btn-sm layui-btn-danger delete-btn">删除</button></td>
						</tr>
					</tbody>
				</table>	
				<div class="bottom-cont">
					<div @click="setPoint" class="layui-btn layui-btn-normal layui-btn-sm">确定</div>
					<div @click="hide" class="layui-btn layui-btn-sm layui-btn-primary">取消</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'diyLayer',
		data(){
			return {
				isShow:true,
				lngLatArrNew:this.lngLatArr
			}
		},
		props:['lngLatArr','isDian'],
		mounted(){
			let that=this;
			this.$nextTick(()=>{   // 必须放在nextTick里面，否则获取不到dom元素
				this.initTable();
				/**
				 * 由于layui table的某种限制，导致input的默认数据显示不出来，只能用jq把数据塞进去
				 */
				if(!that.isDian){  // 线  面
					that.lngLatArrNew.forEach((item,index)=>{
						$("#diyPoper .layui-table tbody tr").eq(index).find(".lat-input").val(item.lat);
						$("#diyPoper .layui-table tbody tr").eq(index).find(".lng-input").val(item.lng);
					})
				}else{  // 点
					$("#diyPoper .layui-table tbody tr .lat-input").val(that.lngLatArrNew.lat);
					$("#diyPoper .layui-table tbody tr .lng-input").val(that.lngLatArrNew.lng);
				}
			})
			/**
			 * 删除一行---由于layui的table组件的限制，导致vue的点击事件绑定不上，所以这里只能用jq了
			 */
			$("body").on('click',".delete-btn", function(obj){
				let index=$(this).closest("tr").find("td").eq(0).text()*1-1;
				that.lngLatArrNew.splice(index,1);
			});
		},
		watch:{
			lngLatArrNew(newV) {
				this.$nextTick(()=>{
					this.initTable();
				})
			}
		},
		methods:{
			/**
			 * 新增一行
			 */
			addTr() {
				this.lngLatArrNew.push({
					lat:'',
					lng:''
				})
			},
			/**
			 * 转换静态表格--layui-table   并塞入数据
			 */
			initTable(){
				let that=this;
				let table = layui.table;
				table.init('lnglat-table', {
					height: 210 //设置高度
					,limit: 10 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
					//支持所有基础参数
					,done: function () {
						
					}
				}); 
			},
			/**
			 * 确定经纬度
			 */
			setPoint(){
				let that=this;
				if(that.lngLatArrNew instanceof Array){  // 线  面
					that.lngLatArrNew=[];
					$("#diyPoper .layui-table tbody tr").each(function(){
						let latV=$(this).find(".lat-input").val();
						let lngV=$(this).find(".lng-input").val();
						that.lngLatArrNew.push({
							lat:latV,
							lng:lngV
						})
					})
				}else{  // 点
					let latV=$("#diyPoper .layui-table tbody tr .lat-input").val();
					let lngV=$("#diyPoper .layui-table tbody tr .lng-input").val();
					that.$set(that.lngLatArrNew,'lat',latV);
					that.$set(that.lngLatArrNew,'lng',lngV);
				}
				// $("#diyPoper .layui-table tbody tr").each(function(){
				// 	let latV=$(this).find(".lat-input").val();
				// 	let lngV=$(this).find(".lng-input").val();
				// 	if(that.lngLatArrNew instanceof Array){  // 线  面
				// 		that.lngLatArrNew.push({
				// 			lat:latV,
				// 			lng:lngV
				// 		})
				// 	}else{  // 点
				// 		that.$set(that.lngLatArrNew,'lat',latV);
				// 		that.$set(that.lngLatArrNew,'lng',lngV);
				// 	}
				// })
				that.$emit("setLngLatFun",that.lngLatArrNew);	
				that.isShow=false;			
			},
			show(){
				this.isShow=true;
			},
			hide(){
				this.isShow=false;
			}
		}
	}
</script>


