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
			height:31px;
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
			.top-cont{
				margin-bottom: 10px;
			}
			.table-cont{
				color:#666;
				.table-header{
					background-color: #f2f2f2;
					border-top: 1px solid #ddd;
					border-left: 1px solid #ddd;
					border-right: 1px solid #ddd;
					.fl{
						height: 30px;
						line-height: 30px;
					}
				}
				.table-body{
					height: 200px;
					overflow: auto;
				}
				.table-tr{
					padding:2px;
					border-top: 1px solid #ddd;
					border-left: 1px solid #ddd;
					border-right: 1px solid #ddd;
				}
				.table-tr:first-child{
					padding-top: 5px;
					border-top: none;
				}
				.table-tr:last-child{
					border-bottom: 1px solid #ddd;
				}
				.fl{
					width: 120px;
					text-align: center;
					padding: 5px 7px;
				}
				.fl:last-child{
					width:60px;
				}
				.select-menu-input{
					height: 28px;
					line-height: 28px;
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
				<!-- <table class="layui-table">
					<thead>
						<tr>
							<th>字段名</th>
							<th>条件</th>
							<th>值</th>
							<th>操作</th>
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
								<div class="select-menu">
									<div class="select-menu-div">
										<input readonly class="select-menu-input" />
										<i class="layui-icon layui-icon-triangle-d"></i>  
									</div>
									<ul class="select-menu-ul">
										<li diyValue="">请选择</li>
										<li diyValue="包含" class="not-number">包含</li>
										<li diyValue="等于" class="not-number">等于</li>
										<li diyValue="不等于" class="not-number">不等于</li>
										<li diyValue="小于" class="not-number">小于</li>
										<li diyValue="小于或等于" class="not-number">小于或等于</li>
										<li diyValue="大于" class="not-number">大于</li>
										<li diyValue="大于或等于" class="not-number">大于或等于</li>
									</ul>
								</div>
							</td>
							<td><input type="text" class="layui-input sort-input"></td>
							<td><button class="layui-btn layui-btn-sm layui-btn-danger delete-btn">删除</button></td>
						</tr>
					</tbody>
				</table> -->
				<div class="table-cont">
					<div class="table-header clearfix">
						<div class="fl">字段名</div>
						<div class="fl">条件</div>
						<div class="fl">值</div>
						<div class="fl">操作</div>
					</div>
					<div class="table-body">
						<div class="table-tr clearfix" v-for="(item,index) in tableArr" :key="index">
							<div class="fl first-fl">
								<div class="select-menu">
									<div class="select-menu-div">
										<input readonly class="select-menu-input"  placeholder="请选择"/>
										<i class="layui-icon layui-icon-triangle-d"></i>  
									</div>
									<ul class="select-menu-ul">
										<li diyValue="">请选择</li>
										<li :diyValue="item" v-for="(item,index) in typeArr" :key="index">{{item}}</li>
									</ul>
								</div>
							</div>
							<div class="fl condition-fl">
								<div class="select-menu">
									<div class="select-menu-div">
										<input readonly class="select-menu-input" placeholder="请选择" />
										<i class="layui-icon layui-icon-triangle-d"></i>  
									</div>
									<ul class="select-menu-ul">
										<li diyValue="">请选择</li>
										<li diyValue="包含" class="not-number">包含</li>
										<li diyValue="等于" class="is-number">等于</li>
										<li diyValue="不等于" class="is-number">不等于</li>
										<li diyValue="小于" class="is-number">小于</li>
										<li diyValue="小于或等于" class="is-number">小于或等于</li>
										<li diyValue="大于" class="is-number">大于</li>
										<li diyValue="大于或等于" class="is-number">大于或等于</li>
									</ul>
								</div>
							</div>
							<div class="fl input-fl">
								<input type="text" class="layui-input sort-input" id="test1">
							</div>
							<div class="fl">
								<button class="layui-btn layui-btn-sm layui-btn-danger delete-btn">删除</button>
							</div>
						</div>
					</div>
				</div>
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
				tableArr:[{}],
				typeArr:[],
				canInit:true, // 只准初始化一次table，否则影响select的选项的隐藏
			}
		},
		props:['attrbuteArr'],
		mounted(){
			let that=this;
			// that.attrbuteArr.forEach(item => {
			// 	that.tableArr.push({});
			// });
			that.typeArr=that.getTypeArr();
			/**
			 * 删除一行---由于layui的table组件的限制，导致vue的点击事件绑定不上，所以这里只能用jq了
			 */
			$("body").on('click',".delete-btn", function(obj){
				let index=$(this).closest(".table-tr").index();
				$(this).closest(".table-tr").remove();
				that.initSelect();
				that.hideOption();
			});
		},
		updated() {
			this.$nextTick(()=>{
				this.initSelect();
			})
			// if(!this.canInit){
			// 	return false;
			// }
			// this.$nextTick(()=>{
			// 	this.initTable();
			// 	this.canInit=false;
			// 	console.log(222222)
			// 	console.log($(".select-menu"))
				
			// })
		},
		watch:{
		},
		methods:{
			/**
			 * 最终确定
			 */
			confirmFun() {
				let that=this;
				let flag=true;
				let obj=[];
				let json_={};
				$(".poperDetail .midbox .table-cont .table-tr").each(function(){
					json_={};
					let name_=$(this).find(".first-fl .select-menu-input").val();
					let condition_=$(this).find(".condition-fl .select-menu-input").val();
					let value_=$(this).find(".input-fl .sort-input").val();
					if(name_=="请选择"||!name_){
						layer.msg("请完善筛选字段名");
						flag=false;
					}else if(condition_=="请选择"||!condition_){
						layer.msg("请完善筛选条件");
						flag=false;
					}else if(value_=="请选择"||!value_){
						layer.msg("请完善筛选值");
						flag=false;
					}
					json_.name_=name_;
					json_.condition_=condition_;
					json_.value_=value_;
					obj.push(json_)
				})
				if(!flag){
					return false;
				}
				this.isShow=false;
				this.$emit("sortTable",obj);
			},
			/**
			 * 隐藏已选项
			 */
			hideOption() {
				// 已经选过的name就不展示在select中
				let selectedArr=[]; // 已选的下拉框选项
				$(".table-cont .first-fl .select-menu-input").each(function(){
					let val=$(this).val();
					if(val&&val!="请选择"){
						selectedArr.push(val);
					}
				})
				// 隐藏掉已选项
				$(".sortTable .first-fl").each(function(){
					$(this).find(".select-menu-ul li").each(function(){
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
			},
			/**
			 * 下拉框选择后的回调
			 */
			selectCallback(th_) {
				let that=this;
				let val=$(th_).attr("diyValue");
				let fatherTd=$(th_).closest(".table-tr").find(".fl").eq(1);
				fatherTd.find(".select-menu-input").val(""); // 清空
				fatherTd.find(".select-menu-ul li").removeClass("select-this"); // 清空
				if(val==""||val=="请选择"){
					fatherTd.find("li").show();
				}else if(val.indexOf('时间')==-1){
					fatherTd.find(".not-number").show();
					fatherTd.find(".is-number").hide();
				}else{
					fatherTd.find(".not-number").hide();
					fatherTd.find(".is-number").show();
				}
				that.hideOption();
			},
			/**
			 * 初始化select
			 */
			initSelect() {
				let that=this;
				$(".select-menu").each(function(index){
					let dom=this;
					selectMenu({
						fatherDom:$(this)[0],
						index,
						callback:function (th_) {
							if($(dom).closest(".fl").hasClass("first-fl")){
								that.selectCallback(th_);
							}
						}
					});
				})
				
			},
			/**
			 *	获取table头部标题集合
			 */
			getTypeArr() {
				let that=this;
				let arr=[];
				$("table[lay-filter='gis-table'] thead tr th").each(function(){
					let val=$(this).text();
					if(val!="序号"&&val!="隐藏的真实序号"){
						val&&arr.push(val);
					}
				})
				return arr;
			},
			
			/**
			 * 新增一行
			 */
			addTr() {
				//this.canInit=true;
				this.tableArr.push({})
				this.$nextTick(()=>{
					this.initSelect();
				})
				this.hideOption();
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


