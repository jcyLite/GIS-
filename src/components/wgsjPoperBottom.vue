
<style lang=less>
	.poperBottom.cksxb{
		&.active{
			height:100%;
		}
		.close{
			position:absolute;
			right:10px;
			top:6px;
			z-index: 1;
			cursor: pointer;
			img{
				width: 24px;
			}
		}
		.box{
			width:100%;
			height:auto;
		}
		.row-box{
			&::-webkit-scrollbar {
				/* 滚动条整体部分 */
				width: 5px;
				margin-right: 2px
			}
			.layui-table-view{
				margin:0;
			}
		}
		.row{
			&.active{
				background:#eee;
			}
			&.title{
				position: relative;
				width:100%;
				line-height: 31px;
				background-color: rgba(221, 221, 221, 1);
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				.drag-div{
					position: absolute;
					top: -10px;
					left: 0;
					height: 15px;
					width: 100%;
					cursor:s-resize;
				}
			}
			height:30px;
			width:186%;
			border-bottom:1px solid #ddd;
			.a{
				margin-left: 16px;
				font-size: 16px;
				font-weight: bold;
				color: #666;
			}
			.right{
				width:400px;
				line-height: 29px;
				margin-right:46px;
				float:right;
				.b{
					position: relative;
					top:1px;
					font-size:14px;
					cursor: pointer;
					margin-right: 3px;
				}
				.d{
					cursor: pointer;
				}
				.c{
					position: relative;
					top:1px;
					font-size:14px;
					cursor: pointer;
					margin:0 3px;
				}
				.screen-img{
					width:18px;
				}
				.right-input{
					height: 25px;
					display: inline-block;
					margin: 5px;
				}
			}
			.col:first-child{
				width:20px;
			}
			.col:nth-child(2){
				width:40px;
			}
			.col{
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				line-height:30px;
				height:100%;
				text-align: center;
				padding-left:10px;
				padding-right:10px;
				border-right:1px solid #ddd;
				white-space: nowrap;
			}
			.select-input{
				border:1px solid #ddd;
				border-radius:2px;
				width:12px;
				height:12px;
				margin-top:9px;
				&.active{
					background:#ddd;
				}
			}
		}
	}
	.sxsearch{
		width:20px;
	}
	.poperBottom{
		position:absolute;
		bottom:0;

	}
</style>

<template>
	<div v-if="acksxbd" :class="{active:bactive}" class="poperBottom cksxb" id="poper-bottom">
		<div @click="acksxbd=false" class="close">
			<img src="../img/closebtn.png" alt="">
		</div>
		<div class="box">
			<div class="row title" id="box-title">
				<div class="drag-div"></div>
				<span class="a">{{d.tname}}</span>
				<div class="right">
					<span @click="deleteModul" class="b">删除所选</span>
					|
					<span @click="sortFun" class="c">筛选</span>
					|
					<input v-model="searchVal" type="text" placeholder="请输入搜索内容" class="layui-input right-input" />
					<span @click="bactive=!bactive" class="d">
						<img v-show="!bactive" src="../img/fullScreen.png" class="screen-img" title="全屏展示" />
						<img v-show="bactive" src="../img/smallScreen.png" class="screen-img" title="退出全屏" />
					</span>
				</div>
			</div>
			<div class="row-box">
				<table lay-filter="gis-table">
					<thead>
						<tr>
							<th lay-data="{type: 'checkbox', fixed: 'left'}"></th>
							<th lay-data="{field:'trueIndex', width:80,fixed: 'left',style:'display:none'}">隐藏的真实序号</th>
							<th lay-data="{field:'index', width:80,fixed: 'left'}">序号</th>
							<th lay-data="{field:'id', width:0,style:'display:none;'}"></th>
							<th lay-data="{field:'name', width:160}">网格名称</th>
							<th lay-data="{field:'code', width:210}">网格编码</th>
							<th lay-data="{field:'regionName', width:100}">网格类型</th>
							<th lay-data="{field:'state', width:100}">上级网格</th>
							<th lay-data="{field:'address', width:200}">所在行政区</th>
							<th lay-data="{field:'adminDept', width:100}">面积（平方米）</th>
							<th lay-data="{field:'ownerDept', width:100}">数据状态</th>
							<th lay-data="{field:'guardDept', width:100}">数据来源</th>
							<th lay-data="{field:'status', width:100}">创建时间</th>
							<th lay-data="{field:'source', width:100}">更新时间</th>
							<th lay-data="{field:'createDate', width:100, sort:true}">数据录入人</th>
							<th lay-data="{field:'updateDate', width:100, sort:true}">审批状态</th>
							<th lay-data="{field:'recorder', width:100}">审批时间</th>
							<th lay-data="{field:'checker', width:100}">数据审批人</th>
							<th lay-data="{field:'remark', width:200}">备注</th>
						</tr> 
					</thead>
					<tbody>
						<template v-for="(item,index) of d.datas">
							<tr 
								:class="{active:oactive==index}" 
								@click="oactive=index,dingwei(item,index)" 
								:key="index"
								v-if="!item.hideTr"
							>
								<td></td>
								<td>{{index+1}}</td>
								<td>{{index+1}}</td>
								<td >{{item.id}}</td>
								<td>{{item.name}}</td>
								<td>{{item.code}}</td>
								<td>{{item.regionName}}</td>
								<td>{{item.state}}</td>
								<td>{{item.address}}</td>
								<td>{{item.adminDept}}</td>
								<td>{{item.ownerDept}}</td>
								<td>{{item.guardDept}}</td>
								<td>{{item.status}}</td>
								<td>{{item.source}}</td>
								<td>{{item.createDate}}</td>
								<td>{{item.updateDate}}</td>
								<td>{{item.recorder}}</td>
								<td>{{item.checkStatus}}</td>
								<td>{{item.checkDate}}</td>
								<td>{{item.checker}}</td>
								<td>{{item.remark}}</td>
							</tr>
						</template>
					</tbody>
				</table>	
			</div>
		</div>
	</div>
</template>

<script>
	import {markerClick} from '../module.js'
	import { setTimeout } from 'timers';
	export default {
		props:['value','d'],
		computed:{
			
		},
		watch:{
			value(newV){
				this.acksxbd=newV;
			},
			acksxbd(newVal){
				this.$emit('input', newVal)
			},
			/**
			 * 筛选的内容
			 */
			searchVal(newVal) {
				// 筛选 只修改了是否展示 并不操作数据，一般不会产生bug
				this.d.datas.forEach((item,index)=>{
					if(item.name.indexOf(newVal)==-1){
						item.hideTr=true;
					}else{
						item.hideTr=false;
					}
				})
			}
		},
		mounted(){
			let that=this;
			window.poper=this;
			import('layui-src/dist/layui.all.js').then(d=>{
				let table = layui.table;
				table.on('checkbox(gis-table)', function(obj){
					//console.log(obj.checked); //当前是否选中状态
					console.log(obj.data); //选中行的相关数据
					//console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
					if(obj.type=='all'){  // 全选
						if(obj.checked){
							that.active=[];
							that.idsDelete=[];
							that.d.datas.forEach((item,index)=>{
								that.active.push(index);
								that.idsDelete.push(item.id);
							})
						}else{
							that.active=[];
							that.idsDelete=[];
						}
					}else if(obj.type=='one'){ // 单选
						if(obj.checked){
							that.active.push(obj.data.index);
							that.idsDelete.push(obj.data.id);
						}else{
							let subIndex=that.active.indexOf(obj.data.index)
							let subIndex2=that.active.indexOf(obj.data.id)
							that.active.splice(subIndex,1)
							that.idsDelete.splice(subIndex2,1)
						}
					}
				});
				/**
				 * 监听行 单击 事件 如果要 ‘双击’ 就用rowDouble
				 */
				table.on('rowDouble(gis-table)', function(obj){
					console.log(obj.tr) //得到当前行元素对象
					console.log(obj.data) //得到当前行数据
					//that.oactive=parseInt(obj.data.index)-1;
					that.oactive=parseInt(obj.data.trueIndex)-1;  // 筛选修改
					that.dingwei(that.d.datas[that.oactive],that.oactive)
					that.moduleId=obj.data.id;
				});
			})
		},
		updated(){
			this.$nextTick(() => {
				/**
				 * 根据全屏展示按钮，就重新初始化table高度
				 */
				var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				var hei=this.bactive?(h-41):160;  
				this.initTable(hei)
			})
		},
		methods:{
			/**
			 * 筛选---多属性筛选
			 */
			sortFun() {
				let that=this;
				// Object.assign({},obj)和concat都只是深拷贝第一层，而JSON.parse结合JSON.stringify只能深拷贝属性，不能拷贝方法
				let attrbuteArr=that.d.datas.concat([]);
				this.$createSortTable({
					$props: {
						attrbuteArr
					},
					$events:{
						sortTable(obj) {  // 只写了一部分。。。。。。。还有很多判断。。。。。。
							let indexArr=[];
							obj.forEach((item,index)=>{
								if(item.name_=="部件名称"){
									that.d.datas.forEach((innerItem,innerIndex)=>{
										if(that.d.datas[innerIndex].hideTr==false||!that.d.datas[innerIndex].hideTr){
											if(!innerItem.name||innerItem.name.indexOf(item.value_)==-1){
												that.$set(that.d.datas[innerIndex],"hideTr",true)
											}else{
												
												that.$set(that.d.datas[innerIndex],"hideTr",false)
											}	
										}
									})	
								}else if(item.name_=="主管部门"){
									that.d.datas.forEach((innerItem,innerIndex)=>{
										if(that.d.datas[innerIndex].hideTr==false||!that.d.datas[innerIndex].hideTr){
											if(!innerItem.adminDept||innerItem.adminDept.indexOf(item.value_)==-1){
												that.$set(that.d.datas[innerIndex],"hideTr",true)
											}else{
												that.$set(that.d.datas[innerIndex],"hideTr",false)
											}
										}
									})	
								}
							})
						}
					}
				}).show();
			},
			/**
			 * 拖拽调整表格高度
			 */
			dragTable() {
				var that=this;
				var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				var maxHei=h-41;
				var oBox = $("#poper-bottom")[0];
				var targetDom =$(oBox).find(".drag-div")[0];
				var tableBox = $(oBox).find(".layui-table-body.layui-table-main")[0];
				targetDom.onmousedown = function (e) {
					e = e || event;
					var x = e.clientX;
					var y = e.clientY;
					var oBoxH = oBox.offsetHeight;
					document.onmousemove = function (e) {
						e = e || event;
						var xx = e.clientX;
						var yy = e.clientY;
						oBox.style.height = oBoxH + y - yy + 'px';
						tableBox.style.height=oBoxH + y - yy + 'px';
						return false;
					}
					document.onmouseup = function () {
						document.onmousemove = null;
						document.onmouseup = null;
						let hei=parseInt(oBox.style.height)-40; // 这个40是title的高度
						hei=hei>=maxHei?maxHei:hei; // 限制最大高度
						that.initTable(hei)
						oBox.style.height="auto";
					}
					if (e.preventDefault) {
						e.preventDefault();
					}
				}
			},
			/**
			 * 初始化table
			 */
			initTable(hei){
				let that=this;
				var table = layui.table;
				var hei=hei||160
				table.init('gis-table', {
					height: hei //设置高度
					,limit: 10 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
					//支持所有基础参数
					,done: function () {
						// 为了点击复选框获取到id 必须把id列写入表格，但是不能展示出来
						// 结合lay-data="{field:'id', style:'display:none;'}"
						$("[data-field='id']").css('display','none');
						$("[data-field='trueIndex']").css('display','none');
						that.dragTable();
					}
				}); 
				layui.form.render(); // 重载一下layui的表单元素
			},
			dingwei(item,index){
				let lxType=this.$parent.layerType;
				var lnglat=null;
				if(lxType=='点'){
					//markerClick.call(this,activeMarkers[index],item,true); // 定位 点
					markerClick(activeMarkers[index],item,true,this); // 定位 点
					lnglat=item.lnglat;
				}else if(lxType=='线'){
					//markerClick.call(this,xianLayers[index],item,true); // 定位 线
					markerClick(xianLayers[index],item,true,this); // 定位 线
					lnglat=item.lnglat[0];
				}else if(lxType=='面'){
					//markerClick.call(this,mianLayers[index],item,true); // 定位 面
					markerClick(mianLayers[index],item,true,this); // 定位 面
					lnglat=item.lnglat[0];
				}
				//定位到显示弹窗的中心位置
				window.map.centerAndZoom(new T.LngLat(lnglat.lng,lnglat.lat), 12);
			},
			deleteModul(){
				let that = this;
				layer.confirm('确定要删除所选中的属性行吗？', {
					btn: ['确定','取消'] //按钮
				}, function(){ // 确定 回调
					let tempstr = '/' + that.d.moduleName + '/' + 'delModule';
					let idStr=that.idsDelete.join(",");
					that.$http.post(tempstr, {
						ids:idStr
					}).then(d => {
						that.idsDelete.forEach((item,index)=>{
							that.d.datas.forEach((innerItem,innerIndex)=>{
								if(item==innerItem.id){
									that.d.datas.splice(innerIndex,1);
								}
							})
						})
						that.$emit("deleteModel",that.idsDelete);
						that.cksxbd = true;
						that.active=[];
						that.idsDelete=[];
						that.initTable();
						layer.closeAll();
					})
				}, function(){ // 取消 回调
					// nothing
				});
			},
		},
		data(){
			return {
				acksxbd:false,
				active:[],
				idsDelete:[], // 要删除的id数组
				oactive:-1,
				searchVal:'',
				bactive:false,
				moduleId:'', // 属性表 某行的id
			}
		}
	}
</script>
