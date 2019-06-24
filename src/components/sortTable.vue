<style lang='less'>
	@time:.35s;
	.sortTable-enter,.sortTable-leave-active{
		.shade{
			opacity:0;
		}
		.midbox{
			opacity:0;
			transform:scale(0);
		}
	}
	.sortTable{
		transition: @time all;
		.shade{
			transition: @time all;
		}
		.midbox{
			transition: @time all;
		}
	}
	.poperDetail{
		position:fixed;
		top:0;
		right:0;
		bottom:0;
		left:0;
		z-index:997;
		.layui-table{
			width: 100%;
			.layui-table-grid-down{
				display: none;
			}
			.layui-table-cell {
				overflow: visible !important;
			}
			.layui-table-box {
				overflow: visible;
			}
			.layui-table-body {
				overflow: visible;
			}
			.layui-form-select dl{
				max-height: 150px;
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
			z-index:998;
		}
		.midbox{
			padding:10px 20px;
			position:absolute;
			width:500px;
			height: 360px;
			border-radius: 10px;
			top:0;
			right:0;
			bottom:0;
			left:0;
			margin:auto;
			background: #fff;
			overflow: auto;
			z-index:999;
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
<transition name="sortTable">
	<div v-if="isShow" class="poperDetail sortTable">
		<div  class="shade">
			
		</div>
		<div class="midbox layui-form">
			<div class="inner">
				<div class="top-cont">
					<button class="layui-btn layui-btn-normal layui-btn-sm" @click="addTr">
						新增
					</button>
				</div>
				<table lay-filter="sort-table">
					<thead>
						<tr>
							<th lay-data="{field:'index', width:150}">字段名</th>
							<th lay-data="{field:'lat', width:130}">条件</th>
							<th lay-data="{field:'lng', width:130}">值</th>
							<th lay-data="{field:'operate', width:80}">操作</th>
						</tr> 
					</thead>
					<tbody>
						<tr v-for="(item,index) in tableArr" :key="index">
							<td>
								<select name="" id="" lay-filter="name-select">
									<option value="">请选择</option>
									<option v-for="(item,index) in typeArr" :key="index" :value="item">{{item}}</option>
								</select>
							</td>
							<td>
								<select name="" id="" lay-filter="condition-select">
									<option value="">请选择</option>
									<option value="包含" class="not-number">包含</option>
									<option value="等于" class="is-number">等于</option>
									<option value="不等于" class="is-number">不等于</option>
									<option value="小于" class="is-number">小于</option>
									<option value="小于或等于" class="is-number">小于或等于</option>
									<option value="大于" class="is-number">大于</option>
									<option value="大于或等于" class="is-number">大于或等于</option>
								</select>
							</td>
							<td><input type="text" class="layui-input sort-input"></td>
							<td><button class="layui-btn layui-btn-sm layui-btn-danger delete-btn">删除</button></td>
						</tr>
					</tbody>
				</table>	
				<div class="bottom-cont">
					<div @click="confirmFun" class="layui-btn layui-btn-normal layui-btn-sm">确定</div>
					<div @click="hide" class="layui-btn layui-btn-sm layui-btn-primary">取消</div>
				</div>
			</div>
		</div>
	</div>
</transition>
</template>

<script>
	export default {
		name:'sortTable',
		data(){
			return {
				isShow:false,
				tableArr:[],
				typeArr:[],
				canInit:true, // 只准初始化一次table，否则影响select的选项的隐藏
			}
		},
		props:['attrbuteArr'],
		mounted(){
			let that=this;
			that.attrbuteArr.forEach(item => {
				that.tableArr.push({});
			});
			that.typeArr=that.getTypeArr();
			/**
			 * 字段名选择
			 */
			layui.form.on('select(name-select)', function(data){
				console.log(data.elem); //得到select原始DOM对象
				console.log(data.value); //得到被选中的值
				console.log(data.othis); //得到美化后的DOM对象
				let val=data.value;
				let dom=data.elem;
				let fatherTd=$(dom).closest("tr").find("td").eq(1);
 				if(val.indexOf('时间')==-1){
					fatherTd.find(".layui-anim .not-number").show();
					fatherTd.find(".layui-anim .is-number").hide();
				}else{
					fatherTd.find(".layui-anim .not-number").hide();
					fatherTd.find(".layui-anim .is-number").show();
				}
				// 已经选过的name就不展示在select中
				that.typeArr=that.getTypeArr();  // 重新获取所有的表格头部type数组
				let selectedArr=[]; // 已选的下拉框选项
				$(".layui-table-box select[lay-filter='name-select']").each(function(){
					let val=$(this).val();
					val&&selectedArr.push(val);
				})
				// 隐藏掉已选项
				$(".sortTable .layui-anim dd").each(function(){
					let val=$(this).text();
					let flag=false;
					selectedArr.forEach((item,index)=>{
						if(val==item){
							flag=true;
							return false;
						}
					})
					if(flag){
						$(this).hide();
					}else{
						$(this).show();
					}
				})
			})
			/**
			 * 删除一行---由于layui的table组件的限制，导致vue的点击事件绑定不上，所以这里只能用jq了
			 */
			$("body").on('click',".delete-btn", function(obj){
				let index=$(this).closest("tr").find("td").eq(0).text()*1-1;
				that.tableArr.splice(index,1);
			});
			
		},
		updated() {
			if(!this.canInit){
				return false;
			}
			this.$nextTick(()=>{
				this.initTable();
				this.canInit=false;
			})
		},
		watch:{
		},
		methods:{
			/**
			 *	获取table头部标题集合
			 */
			getTypeArr() {
				let that=this;
				let arr=[];
				$("table[lay-filter='gis-table'] thead tr th").each(function(){
					let val=$(this).text();
					val&&arr.push(val);
				})
				return arr;
			},
			/**
			 * 最终确定
			 */
			confirmFun() {

			},
			/**
			 * 新增一行
			 */
			addTr() {
				this.tableArr.push({})
			},
			/**
			 * 转换静态表格--layui-table   并塞入数据
			 */
			initTable(callBack){
				let that=this;
				let table = layui.table;
				table.init('sort-table', {
					height: 260 //设置高度
					,limit: 10 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
					//支持所有基础参数
					,done: function () {
						// 把对应的dd加上对应的class
						$("select[lay-filter='condition-select']").each(function(){
							let fatherTd=$(this).closest("td");
							$(this).find("option").each(function(index){
								let className=$(this).attr("class");
								fatherTd.find("dd").eq(index).attr("class",className);
							})
						})
						callBack&&callBack();
					}
				}); 
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


