
<style lang=less>
	.poperBottom.cksxb{
		&.active{
			height:100%;
		}
		.close{
			position:absolute;
			right:10px;
			top:6px;
			cursor: pointer;
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
				width:100%;
				line-height: 31px;
				background-color: rgba(221, 221, 221, 1);
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
			}
			height:30px;
			width:186%;
			border-bottom:1px solid #ddd;
			.a{
				margin-left:10px;
				font-size:14px;
			}
			.right{
				width:400px;
				line-height: 29px;
				margin-right:30px;
				float:right;
				.b{
					font-size:14px;
					cursor: pointer;
				}
				.d{
					cursor: pointer;
				}
				.c{
					font-size:14px;
					cursor: pointer;
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
	<div v-if="acksxbd" :class="{active:bactive}" class="poperBottom cksxb">
		<div @click="acksxbd=false" class="close">X</div>
		<div class="box">
			<div class="row title">
				<span class="a">{{d.tname}}</span>
				<div class="right">
					<span @click="deleteModul" class="b">删除所选</span>
					|
					<span class="c">筛选</span>
					|
					<input v-model="searchVal" type="text" />
					<!--<img @click="sxsearch" class="sxsearch" src="../img/search.png" alt="" />-->
					<span @click="bactive=!bactive" class="d">{{!bactive?'全屏显示':'小屏显示'}}</span>
				</div>
			</div>
			<div class="row-box">
				<table lay-filter="gis-table">
					<thead>
						<tr>
							<th lay-data="{type: 'checkbox', fixed: 'left'}"></th>
							<th lay-data="{field:'index', width:80,fixed: 'left'}">序号</th>
							<th lay-data="{field:'id', width:0,style:'display:none;'}"></th>
							<th lay-data="{field:'name', width:160}">部件名称</th>
							<th lay-data="{field:'code', width:210}">部件标识码</th>
							<th lay-data="{field:'regionName', width:200}">所在行政区</th>
							<th lay-data="{field:'state', width:100}">部件状态</th>
							<th lay-data="{field:'address', width:200}">地址描述</th>
							<th lay-data="{field:'adminDept', width:100}">主管部门</th>
							<th lay-data="{field:'ownerDept', width:100}">权属单位</th>
							<th lay-data="{field:'guardDept', width:100}">养护单位</th>
							<th lay-data="{field:'status', width:100}">数据状态</th>
							<th lay-data="{field:'source', width:100}">数据来源</th>
							<th lay-data="{field:'createDate', width:100, sort:true}">创建时间</th>
							<th lay-data="{field:'updateDate', width:100, sort:true}">更新时间</th>
							<th lay-data="{field:'recorder', width:100}">数据录入人</th>
							<th lay-data="{field:'checkStatus', width:100}">审批状态</th>
							<th lay-data="{field:'checkDate', width:100, sort:true}">审批时间</th>
							<th lay-data="{field:'checker', width:100}">数据审批人</th>
							<th lay-data="{field:'remark', width:200}">备注</th>
						</tr> 
					</thead>
					<tbody>
						<tr 
							:class="{active:oactive==index}" 
							@click="oactive=index,dingwei(item,index)" 
							v-for="(item,index) of d.datas" 
							:key="index"
						>
							<td></td>
							<td>{{index+1}}</td>
							<td>{{item.id}}</td>
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
					</tbody>
				</table>	


				<!-- <div class="row">
					<div class="col">
						<div
								:class="{active:allActive}"
								@click="allSelect"
								class="select-input"></div>
					</div>
					<div class="col">
						序号
					</div>
					<div class="col">
						部件名称
					</div>
					<div class="col">
						部件标识码
					</div>
					<div class="col">
						所在行政区
					</div>
					<div class="col">
						部件状态
					</div>
					<div class="col">
						地址描述
					</div>
					<div class="col">
						主管部门
					</div>
					<div class="col">
						权属单位
					</div>
					<div class="col">
						养护单位
					</div>
					<div class="col">
						数据状态
					</div>
					<div class="col">
						数据来源
					</div>
					<div class="col">
						创建时间
					</div>
					<div class="col">
						更新时间
					</div>
					<div class="col">
						数据录入人
					</div>
					<div class="col">
						审批状态
					</div>
					<div class="col">
						审批时间
					</div>
					<div class="col">
						数据审批人
					</div>
					<div class="col">
						备注
					</div>

				</div> -->

				<!-- <div 
					:class="{active:oactive==index}" 
					@click="oactive=index,dingwei(item,index)" 
					v-for="(item,index) of d.datas" 
					:key="index"
					class="row"
				>
					<div class="col">
						<div
							@click="(active.indexOf(index)!=-1)?active.splice(active.indexOf(index),1):active.push(index)"
							:class="{active:active.indexOf(index)!=-1}" class="select-input"
						>
						</div>
					</div>
					<div class="col">
						{{index+1}}
					</div>
					<div class="col">
						{{item.name}}
					</div>
					<div class="col">
						{{item.code}}
					</div>
					<div class="col">
						{{item.regionName}}
					</div>
					<div class="col">
						{{item.state}}
					</div>
					<div class="col">
						{{item.address}}
					</div>
					<div class="col">
						{{item.adminDept}}
					</div>
					<div class="col">
						{{item.ownerDept}}
					</div>
					<div class="col">
						{{item.guardDept}}
					</div>
					<div class="col">
						{{item.status}}
					</div>
					<div class="col">
						{{item.source}}
					</div>
					<div class="col">
						{{item.createDate}}
					</div>
					<div class="col">
						{{item.updateDate}}
					</div>
					<div class="col">
						{{item.recorder}}
					</div>
					<div class="col">
						{{item.checkStatus}}
					</div>
					<div class="col">
						{{item.checkDate}}
					</div>
					<div class="col">
						{{item.checker}}
					</div>
					<div class="col">
						{{item.remark}}
					</div>
				</div> -->
			</div>

		</div>
	</div>
</template>

<script>
    /*
                v-if="searchVal?
                (item.bjmc.indexOf(searchVal)!=-1)
                ||(item.bjbzm.indexOf(searchVal)!=-1)
                ||(item.szxzq.indexOf(searchVal)!=-1)
                :true"
                */
	import {markerClick} from '../module.js'
	import { setTimeout } from 'timers';
	export default {
		props:['value','d'],
		computed:{
			// allActive(){
			// 	if(this.d){
			// 		return this.active.length==this.d.datas.length;
			// 	}
			// }
		},
		watch:{
			value(newV){
				this.acksxbd=newV;
			},
			acksxbd(newVal){
				this.$emit('input', newVal)
			},
		},
		mounted(){
			window.poper=this;
			let table = layui.table;
			let that=this;
			/**
			 * 复选框
			 */
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
				that.oactive=parseInt(obj.data.index)-1;
				that.dingwei(that.d.datas[that.oactive],that.oactive)
				that.$parent.moduleId=obj.data.id;
				// let parentObj=that.$parent;
				// // 获取地图中心坐标
				// let lnglat=null;
				// let centerLnglat=null;
				// let id=obj.data.id;
				// that.d.datas.forEach((item,index)=>{
				// 	if(item.id==id){
				// 		lnglat=item.lnglat
				// 	}
				// })
				// if(lnglat instanceof Array){  // 代表是线或者面

				// }else {
				// 	centerLnglat.lng=lnglat.
				// }
				// //重新设置显示地图的中心点和级别
				// parentObj.map.centerAndZoom(new T.LngLat(119.55, 31.47), parentObj.zoom);
				// // 显示弹框
				// var type1='线'
				// var sContent = require('./dialog.tpl')();
				// if(type1=='点'){
				// 	var lngLat=new T.LngLat(119.55, 31.47) // 坐标对象
				// 	var infoWin = new T.InfoWindow();  // 创建信息窗口对象
				// 	infoWin.setContent(sContent);  // 插入内容
				// 	infoWin.setLngLat(lngLat); // 设置弹框坐标
				// 	parentObj.map.openInfoWindow(infoWin);  // 打开弹框
				// 	parentObj.scbc([],true); 
				// }else if(type1=='线'){
				// 	var lngLat=new T.LngLat(119.55, 31.47) // 坐标对象
				// 	var infoWin = new T.InfoWindow();  // 创建信息窗口对象
				// 	infoWin.setContent(sContent);  // 插入内容
				// 	infoWin.setLngLat(lngLat); // 设置弹框坐标
				// 	parentObj.map.openInfoWindow(infoWin);  // 打开弹框
				// 	parentObj.scbc([],true);
				// 	// 根据历史坐标绘制
				// 	let arrXy=[];
				// 	arrXy.push(new T.LngLat(119.58, 31.41));
				// 	arrXy.push(new T.LngLat(119.55, 31.42));
				// 	parentObj.drawHistory(arrXy);
				// }else if(type1=='面'){
				// 	var lngLat=new T.LngLat(119.55, 31.47) // 坐标对象
				// 	var infoWin = new T.InfoWindow();  // 创建信息窗口对象
				// 	infoWin.setContent(sContent);  // 插入内容
				// 	infoWin.setLngLat(lngLat); // 设置弹框坐标
				// 	parentObj.map.openInfoWindow(infoWin);  // 打开弹框
				// 	parentObj.scbc([],true);
				// 	// 根据历史坐标绘制
				// 	let arrXy=[];
				// 	arrXy.push(new T.LngLat(119.58, 31.41));
				// 	arrXy.push(new T.LngLat(119.55, 31.42));
				// 	parentObj.drawHistory(arrXy);
				// }
				
				// // 绘制范围

				
			});
		},
		updated(){
			this.$nextTick(() => {
				/**
				 * 根据全屏展示按钮，就重新初始化table高度
				 */
				var hei=this.bactive?document.documentElement.clientHeight:160;
				this.initTable(hei)
			})
		},
		methods:{
			initTable(hei){
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
					}
				}); 
				layui.form.render(); // 重载一下layui的表单元素
			},
			dingwei(item,index){
				let lxType=this.$parent.layerType;
				var lnglat=null;
				if(lxType=='点'){
					markerClick.call(this,activeMarkers[index],item); // 定位 点
					lnglat=item.lnglat;
				}else if(lxType=='线'){
					markerClick.call(this,xianLayers[index],item); // 定位 线
					lnglat=item.lnglat[0];
				}else if(lxType=='面'){
					markerClick.call(this,mianLayers[index],item); // 定位 面
					lnglat=item.lnglat[0];
				}
				//定位到显示弹窗的中心位置
				window.map.centerAndZoom(new T.LngLat(lnglat.lng,lnglat.lat), 12);
			},
			// allSelect(){
			// 	if(this.d){
			// 		if(this.allActive){
			// 			this.active=[];
			// 		}else{
			// 			this.active=[];
			// 			this.d.datas.forEach((item,index)=>{
			// 				this.active.push(index);
			// 			})
			// 		}
			// 	}
			// },
			deleteModul(){
				let tempstr = '/' + this.d.moduleName + '/' + 'delModule';
				let idStr=this.idsDelete.join(",");
				let that=this;
				this.$http.post(tempstr, {
					ids:idStr
				}).then(d => {
					console.log(this)
					that.idsDelete.forEach((item,index)=>{
						that.d.datas.forEach((innerItem,innerIndex)=>{
							if(item==innerItem.id){
								that.d.datas.splice(innerIndex,1);
							}
						})
					})
					//that.makeData(that.d)???  makeData不存在
					that.cksxbd = true;
					that.active=[];
					that.idsDelete=[];
					that.initTable();
				})
				
			},
		},
		data(){
			return {
				acksxbd:false,
				active:[],
				idsDelete:[], // 要删除的id数组
				oactive:-1,
				searchVal:'',
				bactive:false
			}
		}
	}
</script>
