<style lang="less">
	@import "./app.less";
	.search {
		position: relative;
		.search-icon {
			width: 18px;
			position: absolute;
			right: 0px;
			bottom: 7px;
			cursor: pointer;
		}
	}
	
	.top {
		.floor{
			line-height: 34px;
			height: 34px;
			&:nth-child(1){
				margin-bottom: 10px;
			}
			.shuru.layui-input{
				width:calc(100% - 100px);
			}
			.left-span{
				float: left;
				width: 70px;
			}
			.layui-form-select{
				float: left;
    				width: calc(100% - 70px);
			}
			select {
				font-size: 12px;
				option {
					margin-right: 12px;
				}
			}
		}
	}
	
	.shuru {
		width: 150px;
		border: 1px solid #e5e5e5;
	}
</style>
<template>
	<div id="app">
		<leftSearch v-model="noSearch" class="leftBox"></leftSearch>
		<div :style="{width:leftwidth+'px'}" ref="leftBox" v-show="noSearch" class="leftBox layui-form" id="drag-left">
			<div class="top">
				<div class="floor">
					<span class="left-span">部件大类：</span>
			    	<select v-model="dl" name="aa" id="" lay-filter="bigLei">
						<option v-for="(item,index) in bigLei" :key="index" :value='item.value'>{{item.value}}</option>
					</select>
				</div>
				<div class="floor">
					<span class="left-span">图层名称：</span>
					<input v-model="xl" class="shuru layui-input" />
				</div>
				<div class="search">
					<img @click="searchlei" class="search-icon" src="./img/search.png" alt="" />
				</div>
			</div>
			<div class="bottom">
				<div class="bottom-top clearfix">
					<div>
						共{{d.length}}个图层
					</div>
					<div>
						<img @click="fiter" src="./img/filter.png" alt="" title="筛选图层"/>
						<img @click="addatuceng" src="./img/addb.png" alt="" title="新增图层" style="width: 18px;"/>
						<img @click="deleteAllLayer" src="./img/huishou.png" alt="" title="删除全部图层" />
					</div>
				</div>
				<div class="container">
					<div :class="{active:active==index}" @click="clickLeftLayer(item,index)" class="box" :tid="item.tid" :moduleName='item.moduleName' v-for="(item,index) of d" :key="index">
						<div class="t">
							<div @click.stop="clickEye(item,index)" class="eye">
								<img v-if="eye.indexOf(index)==-1" src="./img/eye.png" alt="" title="展示图层覆盖物" />
								<img v-if="eye.indexOf(index)!=-1" src="./img/eye_active.png" alt="" title="隐藏图层覆盖物" />
							</div>
							<div class="contenteditable too-long1">
								{{item.tname }}
							</div>
							<div class="u">
								<img @click.stop="changeName(item,index)" src="./img/edit.png" alt="" title="编辑图层名称" style="margin-right:6px;" />
								<img @click="poperDetail(item,index)" src="./img/detail.png" alt="" title="查看图层信息" style="width:17px;margin-right:5px;"/>
								<!-- <img src="./img/earth.png" alt="" /> -->
								<img @click.stop="deleteLayer(item,index)" src="./img/hsz.png" alt="" title="删除图层" style="width: 15px;" />
							</div>
						</div>
						<div class="b">
							<span>
								<img src="./img/upload.png" alt="" />
								批量上传
							</span>
							<span @click="cksxb(item,index)">
								<img src="./img/shuxing.png" alt="" style="width:17px;"/>
								<span>查看属性表</span>
							</span>
							<span>
								<img src="./img/download.png" alt="" style="margin-right: 4px;" />导出
							</span>
						</div>
					</div>
				</div>
			</div>
			<div ref="toright" class="right">

			</div>
		</div>
		<div :style="{width:`calc(100% - ${leftwidth}px)`}" class="rightBox" id=right-box>
			<div class="topTool">
				<div class="toola">
					<img @click="editMarker" v-show="layerType=='点'" src="./img/position.png" alt="" />
					<img @click="openPolylineTool" v-show="layerType=='线'" src="./img/zx.png" alt="" />
					<img @click="openPolygonTool" v-show="layerType=='面'" src="./img/m.png" alt="" />
				</div>
				<div class="toolb">
					<img @click="openCircleTool" src="./img/circle.png" alt="" title="绘制圆" />
					<img @click="openRectangleTool" src="./img/reck.png" alt="" title="绘制矩形" />
					<img @click="mlineTool" src="./img/cz.png" alt="" title="测量距离" />
					<img @click="mpolygonTool" src="./img/cm.png" alt="" title="测量面积" />
					<!-- 暂时隐藏掉 -->
					<!-- <img @click="searchShow=true" src="./img/search.png" alt=""/> -->

				</div>
			</div>
			<div v-show="searchShow" class="search">
				<input type="text" class="layui-input" />
				<span style="cursor: pointer;" @click="search">搜索</span>
			</div>
			<div id="mapDiv"></div>
			<div id="poper-bottom-cont">
				<poper-bottom :d="d[active]" v-model=cksxbd @deleteModel="deleteModel"></poper-bottom>
			</div>
		</div>
	</div>
</template>

<script>
	
	import 'layui-src/src/css/modules/layer/default/layer.css';
	// import 'layui-src/dist/layui.all.js';
	import 'layui-src/src/css/layui.css';
	import './components/dialog.less';
	import poperBottom from './components/poperBottom.vue';
	import leftSearch from './components/leftSearch.vue';
	import {
		markerClick,
		scbc,
		jzdian,
		jzxian,
		jzmian,
		editMarker,
		openPolylineTool,
		openPolygonTool,
		openCircleTool,
		openRectangleTool
	}

	from './module.js'
	import {selectMenu} from './select.js';

	var $ = require('jquery');
	
	export default {
		components: {
			poperBottom,
			leftSearch
		},
		data() {
			return {
				leftwidth:270,
				noSearch: true,
				poperChangeName: false,
				active: -1,
				cksxbd: false,
				poper: false,
				map: null,
				zoom: 12,
				control: null,
				markerTool: null,
				handler: null,
				lineTool: null,
				polygonTool: null,
				searchShow: false,
				d: [], // 左边图层信息
				layerType:'', // 图层的类型 --- 点 线 面
				contents: [],
				eye: [],
				tlayer: [],  // 储存某大类里面多个图层的所有点
				dl: '',
				xl: '',
				bigLei: [],
				cityAry: [],
				overLayObj:null, // 地图图层对象
				infoWindowObj:null, // 地图信息框 对象
			}
		},
		watch:{
			// eye(newV){
			// 	newV.forEach((item)=>{
			// 			var tempstr = '/' + this.d[this.active].moduleName + '/' + 'queryModule';
			// 			this.$http.post(tempstr, {}).then(d => {
			// 				this.d[this.active].datas = d.data;
			// 				 // 生成该图层的各个点 线 面
							
			// 			})
			// 	})
			// }
		},
		mounted() {
			window.pageType=2; // 2是事件
			import('layui-src/dist/layui.all.js').then(d=>{
				window.layer=layui.layer;
				window.selectMenu=selectMenu;
				layui.form.on('select(bigLei)', function(data){
					//console.log(data.elem); //得到select原始DOM对象
					//console.log(data.value); //得到被选中的值
					//console.log(data.othis); //得到美化后的DOM对象
					that.dl=data.value;
				});  
				this.firstSearch();
				this.requestCity();
				layui.form.render(); // 重载一下layui的表单元素
			});
			var that=this;
			// 左侧拖拽
			this.$refs.toright.onmousedown=function(e){
				var x = e.clientX;
				var width=that.leftwidth;
				document.onmousemove=function(e){
					var b=e.clientX-x;
					that.leftwidth=width+b;
					if(that.leftwidth<270){
						that.leftwidth=270;
					}
					if(that.leftwidth>800){
						that.leftwidth=800;
					}
				}
				document.onmouseup=function(e){
					document.onmousemove=()=>{}
				}
			}
			// 左侧拖拽 end
			window.App = this;
			window.$ = require('jquery');  // 引入jq
			this.map = new T.Map("mapDiv");
			window.map = this.map;
			//设置显示地图的中心点和级别
			this.map.centerAndZoom(new T.LngLat(119.58, 31.47), this.zoom);
			//创建缩放平移控件对象
			this.control = new T.Control.Zoom();
			//添加缩放平移控件
			//		this.map.addControl(this.control);

			// this.infoWindowObj = new T.InfoWindow();
			// this.markerTool = new T.MarkTool(this.map, {
			// 	follow: true
			// });
			// var infoWindowObj = this.infoWindowObj;
			// var sContent = require('./components/dialog.tpl')();
			// this.markerTool.addEventListener('mouseup', function(obj) {
			// 	// 点击标注一个点的时候触发，线和面的触发是其他方法
			// 	var lnglat = obj.currentLnglat;

			// 	var markers = that.markerTool.getMarkers();
			// 	infoWindowObj.setContent(sContent);
			// 	//let makersArr=[];  // 存储所有的点 后面按照图层tid 来设置suIndex
			// 	let currentTid=$(".leftBox .bottom .box.active").attr("tid"); // 当前的图层id
			// 	for(var i = 0; i < markers.length; i++) {
			// 		let marker = markers[i];
			// 		if(!marker.tid){  // 如果不存在，就肯定是新标注的点,防止重复绑定
			// 			//that.map.openInfoWindow(infoWindowObj, lnglat);
			// 			marker.openInfoWindow(infoWindowObj);
			// 			//that.scbc(marker,false);
			// 			scbc(marker,false,that);
			// 			// 点击新增标注点的时候触发，区别于点击上次增加的标注点
			// 			marker.tid=currentTid;
			// 			marker.addEventListener('click', function(obj) {
			// 				//that.markerClick(this, obj,false)
			// 				markerClick(this,obj,false,that)
			// 				//alert("xindedian")
			// 			});
			// 			marker.enableDragging();
			// 			// if(marker.tid==currentTid){
			// 			// 	makersArr.push(marker);
			// 			// }
			// 		}
					
			// 	}
			// });
			var config = {
				showLabel: true,
				color: "blue",
				weight: 3,
				opacity: 0.5,
				fillColor: "#FFFFFF",
				fillOpacity: 0.5
			};
			this.polygonTool = new T.PolygonTool(map, config);
			this.lineTool = new T.PolylineTool(map, config);
			this.ControlsetPosition();// ?????
			var that = this;
			// ??? ???????
			$('body').on('click', '*[click]', function(e) {
				var method = $(this).attr('click');
				that[method] ? that[method].call(this, e) : '';
			})
		},
		updated(){
			layui.form.render(); // 重载一下layui的表单元素
		},
		methods: {
			/**
			 * 删除属性对应的覆盖物
			 */
			deleteModel(idsDelete) {
				let overLay=null;
				idsDelete.forEach((item,index)=>{
					this.tlayer.forEach((innerItem,innerIndex)=>{
						innerItem.tlayers.forEach((innerItem2,innerIndex2)=>{
							if(item==innerItem2.id)	{
								this.map.removeOverLay(innerItem2); // 移除覆盖物 
								innerItem.tlayers.splice(innerIndex2,1);
							}
						})
					})		
				})
			},
			/**
			 * 点击单个图层眼睛
			 */
			clickEye(item,index) {
				this.active=index;
				this.layerType=item.tleixing;
				(this.eye.indexOf(index)==-1)?(this.eye.push(index)):(this.eye.splice(this.eye.indexOf(index),1));
				this.exchangeDisplay(item,index);
			},
			/**
			 * 点击左侧的图层模块
			 */
			clickLeftLayer(item,index) {
				this.active=index;
				this.layerType=item.tleixing;
				// 眼睛选中
				if(this.eye.indexOf(index)==-1){
					this.eye.push(index)
				}
				// 触发眼睛选中后的 图层显示隐藏切换
				this.exchangeDisplay(item,index);
			},
			/**
			 * 地图定位到各个点的中央区域，让用户有更好的视野
			 */
			setCenterMap() {
				if(!this.d[this.active].datas){
					return false;
				}
				let centerArr=[];
				if(this.layerType=='点'){
					this.d[this.active].datas.forEach((item,index)=>{
						centerArr.push(new T.LngLat(item.lnglat.lng, item.lnglat.lat));
					})
				}else if(this.layerType=='线'||this.layerType=='面'){
					this.d[this.active].datas.forEach((item,index)=>{
						item.lnglat.forEach((innerItem,innerIndex)=>{
							centerArr.push(new T.LngLat(innerItem.lng, innerItem.lat));
						})
					})
				}
				if(centerArr.length==0){
					return false;
				}
				let centerPoint=this.map.getViewport(centerArr).center;  //获取中央的坐标
				let centerzoom=this.map.getViewport(centerArr).zoom;  //获取中央的级别
				//定位到显示弹窗的中心位置
				window.map.centerAndZoom(new T.LngLat(centerPoint.lng,centerPoint.lat), centerzoom);
			},
			/**
			 * 点 线  面 显示 隐藏切换
			 */
			exchangeDisplay(item,index) {
				if(this.tlayer[index]){
					this.jeye(index);  // 点 线 面 显示切换
					this.setCenterMap();
				}else{
					var tempstr = '/' + this.d[index].moduleName + '/' + 'queryModule';
					this.$http.post(tempstr, {}).then(d => {
						this.d[index].datas = d.data;
						if(d.data){
							// 生成对应的图层以及图层内的所有覆盖物 点 线 面
							var a;
							if(item.tleixing == '点') {
								//a = this.jzdian(d.data, this.d[index].tid);
								a = jzdian(d.data, this.d[index].tid,this);
							} else if(item.tleixing == '线') {
								//a = this.jzxian(d.data, this.d[index].tid);
								a = jzxian(d.data, this.d[index].tid,this);
							} else if(item.tleixing == '面') {
								//a = this.jzmian(d.data, this.d[index].tid);
								a = jzmian(d.data, this.d[index].tid,this);
							}
							this.tlayer[index]=a; // 储存覆盖物
						}
						this.jeye(index);  // 点 线 面 显示切换
						this.setCenterMap();
					});
					
				}
			},
			requestCity() {
				this.$http.post('gis/queryByCode', {
					dictionaryCode: '行政区划及代码'
				}).then(d => {
					this.cityAry = d;
				})
			},
			firstSearch() {
				this.$http.post('gis/queryByCode', {
					dictionaryCode: '部件分类代码'
				}).then(d => {
					this.bigLei = d;
					localStorage.setItem('localAry', this.bigLei);
					var get = localStorage.getItem('localAry');
				})
			},
			searchlei(callback) {
				// 添加验证
				//layui.layer.msg('22')

				//大类搜索
				this.$http.post('/layer/findLayer', {
					name: this.xl,
					artTypeName: this.dl
				}).then(dd => {
					if(!dd.datas){
						layui.layer.msg("暂时没有图层");
						return false;
					}
					dd.datas.forEach((item,index)=>{
						item.datas=null;  // 先添加属性，后面存放属性表格数据
					})
					this.d=dd.datas;
					//this.layerType=this.d[0].tleixing;  // 设置默认的图层类型--点 线 面
					this.cksxbd = false; // 隐藏属性表格
					this.tlayer=[]; // 换了大类就清空图层的点
					this.map.clearOverLays(); // 清除所有地图上的覆盖物
					this.eye=[]; // 清除眼睛选中效果
					// 删除掉所有的“手动输入经纬度弹框”
					$(".poperDetail.diyLngLat").remove();
					this.$nextTick(()=>{
						typeof(callback)=="function"&&callback()
					})
				}) 
			},
			// makeData(d) {
			// 	d.forEach((item, index) => {
			// 		var a;
			// 		if(item.tleixing == 'dian') {
			// 			a = this.jzdian(item.data, item.tid);
			// 		} else if(item.tleixing == 'xian') {
			// 			a = this.jzxian(item.data, item.tid);
			// 		} else if(item.tleixing == 'mian') {
			// 			a = this.jzmian(item.data, item.tid);
			// 		}
			// 		this.tlayer.push(a);
			// 	})
			// },
			/**
			 * 生成图层的各个点 线 面
			 */
			makeData(arr,type,tid) {
				console.log(arr)
				console.log(type)
				console.log(tid)
				var a;
				if(type == '点') {
					//a = this.jzdian(arr, tid);
					a = jzdian(arr, tid,this);
				} else if(type == '线') {
					//a = this.jzxian(arr, tid);
					a = jzxian(arr, tid,this);
				} else if(type == '面') {
					//a = this.jzmian(arr,tid);
					a = jzmian(arr,tid,this);
				}
				this.tlayer.push(a);
			},
			poperDetail(data) {
				this.$createPoperDetail({
					$props: {
						data
					}
				}).show();
			},
			search() {
				this.searchShow = false;
				this.noSearch = false;
			},
			fiter() {
				var that = this;
				this.$createFiter({
					$events: {
						screen(a) {  // 筛选
							var tempStr;
							if(a == 0) {
								tempStr = "点";
							} else if(a == 1) {
								tempStr = "线";
							} else {
								tempStr = "面";
							}
							that.$http.post('/layer/findLayer', {
								name: that.xl,
								artTypeName: that.dl,
								type: tempStr
							}).then(d => {
								that.tlayer.splice(0, that.tlayer.length); // 清空缓存的覆盖物
								that.d.splice(0, that.d.length);
								if(d.datas == null) {
									d.datas = [];
									console.log(1110);
								}
								that.d = d.datas;
								that.map.clearOverLays(); // 清除所有地图上的覆盖物
								that.eye=[]; // 清除眼睛选中效果
							})
						}
					}
				}).show()
			},
			changeName(item) {
				//更改图层名称
				var that = this;
				this.$createChangeName({
					$props: {
						data1: item.tname
					},
					$events: {
						confirm(data) {
							item.tname = data;
							that.$http.post('/layer/modifyLayer', {
								id: item.tid,
								name: data
							}).then(res=>{
								if(res.code==-1){
									layui.layer.msg(res.msg)
								}
							})
						}
					}
				}).show()
			},
			// markerClick(marker, obj,isHistory) {  // isHistory：true--是上次标记的点
			// 	//点击标注时触发事件
			// 	//alert('22'+isHistory)
			// 	markerClick.call(this, marker, obj,isHistory)
			// },
			// scbc(overLay,isHistory) {
			// 	//alert('11'+isHistory)
			// 	scbc.call(this, overLay,isHistory);
			// 	//this.overLayObj=overLay;
			// },
			// jzdian(data, tid) {  // data是属性表里面的数据; tid 是整个图层的id
			// 	if(!data){
			// 		return false;
			// 	}
			// 	var lx = 0,
			// 		ly = 0;
			// 	var that = this;
			// 	var tlayers = [];
			// 	window.activeMarkers = [];
			// 	data&&data.forEach((item,index) => {
			// 		var x = item.lnglat.lng;
			// 		var y = item.lnglat.lat;
			// 		lx += parseFloat(x);
			// 		ly += parseFloat(y);
			// 		var marker = new T.Marker(new T.LngLat(parseFloat(x), parseFloat(y)));
			// 		marker.id=item.id;
			// 		marker.subIndex=index;
			// 		marker.addEventListener('mouseup',function(param){
			// 			let subIndex=this.subIndex;
			// 			that.$children.forEach((item,index) => {  // 选择poperBottom组件实例,修改oactive
			// 				if(item.$el.parentNode.id=='poper-bottom-cont'){
			// 					item.oactive=subIndex;
			// 				}
			// 			});
			// 			this.enableDragging(); // 让用户拖动 点 （ 但是需要先点击一下才能拖动 ）
			// 		})
			// 		marker.addEventListener('dragend',function(param){  // 拖拽事件
			// 			console.log('发生了拖拽事件完毕')
			// 			this.setLngLat(new T.LngLat(param.lnglat.lng,param.lnglat.lat));
			// 		})
			// 		marker.bid = item.bid;
			// 		marker.tid = tid;
			// 		// 点击上次增加的标注点的时候触发，区别于点击新增标注点
			// 		marker.addEventListener('click', function(obj) {  // 点击事件
			// 			that.markerClick(this, obj,true);   // 触发弹框
			// 			//alert(222)
			// 		});
					
			// 		activeMarkers.push(marker);
			// 		this.map.addOverLay(marker);
			// 		marker.hide(); // 隐藏 点
			// 		tlayers.push(marker)
			// 	});
			// 	var px = lx / data.length;
			// 	var py = ly / data.length;
			// 	return {
			// 		tlayers,
			// 		p: {
			// 			px,
			// 			py
			// 		}
			// 	};
			// },
			// jzxian(data, tid) {
			// 	if(!data){
			// 		return false;
			// 	}
			// 	var that = this;
			// 	var lx = 0,
			// 		ly = 0,
			// 		bb = 0;
			// 	var tlayers = [];
			// 	data && data.forEach((item,index) => {
			// 		var points = [];
			// 		item.lnglat.forEach(ii => {
			// 			lx += parseFloat(ii.lng);
			// 			ly += parseFloat(ii.lat);
			// 			bb++;
			// 			points.push(new T.LngLat(parseFloat(ii.lng), parseFloat(ii.lat)))
			// 		});
			// 		var pointers = new T.Polyline(points);
			// 		pointers.bid = item.bid;
			// 		pointers.id = item.id;
			// 		pointers.tid = tid;
			// 		pointers.subIndex=index;
			// 		// 点击上次增加的标注点的时候触发，区别于点击新增标注点
			// 		pointers.addEventListener('click', function(obj) {
			// 			var lnglat = obj.lnglat;
			// 			var sContent = require('./components/dialog.tpl')();
			// 			var InfoContent = new T.InfoWindow();
			// 			that.infoWindowObj=InfoContent;
			// 			InfoContent.setContent(sContent);
			// 			that.map.openInfoWindow(InfoContent, lnglat);
			// 			//alert("历史的线")
			// 			that.scbc(this,true); // true 代表是历史数据线
			// 			// 同步一下poperbottom组件的两个属性
			// 			let subIndex=this.subIndex;
			// 			that.$children.forEach((item,index) => {  // 选择poperBottom组件实例,修改oactive
			// 				if(item.$el.parentNode.id=='poper-bottom-cont'){
			// 					item.oactive=subIndex;
			// 				}
			// 			});
			// 		});
			// 		this.map.addOverLay(pointers);
			// 		pointers.hide();
			// 		tlayers.push(pointers)
			// 	});
			// 	window.xianLayers=tlayers
			// 	var px = lx / bb;
			// 	var py = ly / bb;
			// 	return {
			// 		tlayers,
			// 		p: {
			// 			px,
			// 			py
			// 		}
			// 	};
			// },
			// jzmian(data, tid) {
				// if(!data){
				// 	return false;
				// }
				// var that = this;
				// var lx = 0,
				// 	ly = 0,
				// 	bb = 0;
				// var tlayers = [];
				// data&&data.forEach((item,index) => {
				// 	var points = [];
				// 	item.lnglat.forEach(ii => {
				// 		lx += parseFloat(ii.lng);
				// 		ly += parseFloat(ii.lat);
				// 		bb++;
				// 		points.push(new T.LngLat(parseFloat(ii.lng), parseFloat(ii.lat)))
				// 	});
				// 	var polygons = new T.Polygon(points, {
				// 		color: "blue",
				// 		weight: 3,
				// 		opacity: 0.5,
				// 		fillColor: "#FFFFFF",
				// 		fillOpacity: 0.5
				// 	});
				// 	polygons.bid = item.bid;
				// 	polygons.id = item.id;
				// 	polygons.tid = tid;
				// 	polygons.subIndex=index;
				// 	// 点击上次增加的标注点的时候触发，区别于点击新增标注点
				// 	polygons.addEventListener('click', function(obj) {
				// 		var lnglat = obj.lnglat;
				// 		var sContent = require('./components/dialog.tpl')();
				// 		var InfoContent = new T.InfoWindow();
				// 		that.infoWindowObj=InfoContent;
				// 		InfoContent.setContent(sContent);
				// 		that.map.openInfoWindow(InfoContent, lnglat);
				// 		//that.scbc(this,true) // true 代表是历史数据面
				// 		scbc(this,true,that) // true 代表是历史数据面
				// 		// 同步一下poperbottom组件的两个属性
				// 		let subIndex=this.subIndex;
				// 		that.$children.forEach((item,index) => {  // 选择poperBottom组件实例,修改oactive
				// 			if(item.$el.parentNode.id=='poper-bottom-cont'){
				// 				item.oactive=subIndex;
				// 			}
				// 		});
				// 	});
				// 	this.map.addOverLay(polygons);
				// 	polygons.hide();
				// 	tlayers.push(polygons)
				// });
				// window.mianLayers=tlayers
				// var px = lx / bb;
				// var py = ly / bb;
				// return {
				// 	tlayers,
				// 	p: {
				// 		px,
				// 		py
				// 	}
				// };
			// },
			/**
			 *  点 线 面 显示切换
			 */
			jeye(index) {
				//眼睛
				var a = this.tlayer[index]
				if(!a){
					return false;
				}
				if(this.eye.indexOf(index) != -1) {
					a.tlayers.forEach((item, index) => {
						item.show()
					})
				} else {
					a.tlayers.forEach((item, index) => {
						item.hide()
					})
				}
			},
			cksxb(item,index) {
				if(!item.datas){
					let tempstr = '/' + item.moduleName + '/' + 'queryModule';
					this.$http.post(tempstr, {}).then(d => {
						this.d[index].datas = d.data;
						this.cksxbd = true;
					});
				}else{
					this.cksxbd = true;
				}
			},
			contenteditable(item) {
				this.$http.post('/changeName', {
					tname: item.tname,
					tid: item.tid
				}).then(d => {
				})
			},
			shadea() {
				$('.cpt-add').remove()
			},
			mlineTool() {
				this.lineTool.open();
			},
			mpolygonTool() {
				this.polygonTool.open();
			},
			editMarker() {  // 点
				editMarker(this);
				//this.markerTool.open();  // 开启标注点功能
			},
			openPolylineTool(){  // 绘制线
				openPolylineTool(this);
			},
			openPolygonTool(){  // 绘制面
				openPolygonTool(this);
			},
			// openPolylineTool() {
			// 	var that = this;
			// 	var handler = this.handler;
			// 	if(handler) handler.close();
			// 	handler = new T.PolylineTool(this.map);
			// 	handler.addEventListener('draw', function(obj) {  // 画线 双击确定后 触发
			// 		var currentLnglats = obj.currentLnglats;
			// 		var lnglat = currentLnglats[currentLnglats.length - 1];
			// 		var sContent = require('./components/dialog.tpl')();
			// 		var InfoContent = new T.InfoWindow();
			// 		that.infoWindowObj=InfoContent;
			// 		InfoContent.setContent(sContent);
			// 		//obj.currentPolyline.openInfoWindow(InfoContent);
			// 		that.map.openInfoWindow(InfoContent,lnglat);
			// 		obj.currentPolyline.tid=$(".leftBox .bottom .box.active").attr("tid"); // 赋值图层id
			// 		//that.scbc(obj.currentPolyline,false);
			// 		scbc(obj.currentPolyline,false,that);
			// 		(function(th_){
			// 			th_.addEventListener('click', (obj) => {
			// 				var InfoContent = new T.InfoWindow();
			// 				that.infoWindowObj=InfoContent;
			// 				InfoContent.setContent(sContent);
			// 				that.map.openInfoWindow(InfoContent, lnglat);
			// 				//that.scbc(th_,false);
			// 				scbc(th_,false,that);
			// 			})
			// 		})(obj.currentPolyline)
			// 	});
			// 	handler.open();
			// },
			
			// openPolygonTool() {
			// 	var that = this;
			// 	var handler = this.handler;
			// 	if(handler) handler.close();
			// 	handler = new T.PolygonTool(this.map);
			// 	handler.addEventListener('draw', function(obj) {
			// 		var currentLnglats = obj.currentLnglats;
			// 		var lnglat = currentLnglats[currentLnglats.length - 1];
			// 		var sContent = require('./components/dialog.tpl')();
			// 		var InfoContent = new T.InfoWindow();
			// 		that.infoWindowObj=InfoContent;
			// 		InfoContent.setContent(sContent);
			// 		//obj.currentPolygon.openInfoWindow(InfoContent);
			// 		that.map.openInfoWindow(InfoContent,lnglat);
			// 		obj.currentPolygon.tid=$(".leftBox .bottom .box.active").attr("tid"); // 赋值图层id
			// 		//that.scbc(obj.currentPolygon,false);
			// 		scbc(obj.currentPolygon,false,that);
			// 		(function(th_){
			// 			th_.addEventListener('click', (objInner) => {
			// 				var InfoContent = new T.InfoWindow();
			// 				that.infoWindowObj=InfoContent;
			// 				InfoContent.setContent(sContent);
			// 				that.map.openInfoWindow(InfoContent, lnglat);
			// 				//that.scbc(th_,false);
			// 				scbc(th_,false,that);
			// 			})
			// 		})(obj.currentPolygon)
			// 	});
			// 	handler.open();
			// },
			openRectangleTool() {
				openRectangleTool(this);
			},
			openCircleTool() {
				openCircleTool(this);
			},
			// openRectangleTool() {
			// 	//绘制矩形
			// 	var handler = this.handler;
			// 	if(handler) handler.close();
			// 	handler = new T.RectangleTool(map, {
			// 		follow: true
			// 	});
			// 	handler.open();
			// },
			// openCircleTool() {
			// 	//绘制圆
			// 	var handler = this.handler;
			// 	if(handler) handler.close();
			// 	handler = new T.CircleTool(map, {
			// 		follow: true
			// 	});
			// 	handler.open();
			// },
			ControlsetPosition() {
				var controlPositionStr = 'leftTOP';
				this.leftTOP = T_ANCHOR_TOP_LEFT;
				this.rightTOP = T_ANCHOR_TOP_RIGHT;
				this.leftBOTTOM = T_ANCHOR_BOTTOM_LEFT;
				this.rightBOTTOM = T_ANCHOR_BOTTOM_RIGHT
				var controlPosition;
				if(controlPositionStr == "leftTOP") controlPosition = T_ANCHOR_TOP_LEFT;
				else if(controlPositionStr == "rightTOP") controlPosition = T_ANCHOR_TOP_RIGHT;
				else if(controlPositionStr == "leftBOTTOM") controlPosition = T_ANCHOR_BOTTOM_LEFT;
				else if(controlPositionStr == "rightBOTTOM") controlPosition = T_ANCHOR_BOTTOM_RIGHT;
				this.control.setPosition(controlPosition);
			},
			/**
			 * 添加一个图层
			 */
			addatuceng() {
				var abc = this.bigLei;
				var that = this;
				this.$createAdd({
					$props: {
						abc
					},
					$events: {
						addbtuceng(poperData) {
							console.log('poperData==' + poperData);
							if(!poperData.tname) {
								layer.msg('未填写图层名称');
								return;
							}
							/*
							*   tname:'',
								tleixing:'',
								jcsjlx:'',
								miaoshu:'',
								bigType:'',
								minType:'',
								bigCode:'',
								minCode:''
							* */
							that.$http.post('/layer/saveLayer', {
								name: poperData.tname,
								type: poperData.tleixing,
								dataType: poperData.jcsjlx,
								artTypeName: poperData.bigType,
								artSubTypeName: poperData.minType,
								artTypeCode: poperData.bigCode,
								artSubTypeCode: poperData.minCode,
								detail: poperData.miaoshu
							}).then(d => {
								if(d.responseCode == 0) {
									layui.layer.msg('保存成功');
									window.location.reload();
								} else if(d.responseCode == -1) {
									layui.layer.msg('图层名称已存在');
								} else {
									layui.layer.msg('保存失败');
								}
							})
						}
					}
				}).show()
			},
			/**
			 * 转换静态表格--layui-table
			 */
			initTable(){
				var table = layui.table;
				table.init('gis-table', {
					height: 160 //设置高度
					,limit: 10 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
					//支持所有基础参数
					,done: function () {
						// 为了点击复选框获取到id 必须把id列写入表格，但是不能展示出来
						// 结合lay-data="{field:'id', style:'display:none;'}"
						$("[data-field='id']").css('display','none');
					}
				}); 
			},
			/**
			 * 删除单个图层
			 */
			deleteLayer(item,index){
				let that=this;
				layer.confirm('确定要删除该图层吗？', {
					btn: ['确定','取消'] //按钮
				}, function(){ // 确定 回调
					let idStr=item.tid;
					that.$http.post('/layer/delLayer', {
						ids:idStr
					}).then(d => {
						that.d.splice(index,1);
						that.tlayer.forEach((outItem,outIndex)=>{
							outItem.tlayers.forEach((innerItem,innerIndex)=>{
								if(innerItem.tid==idStr){
									that.map.removeOverLay(innerItem); // 删除对应图层的覆盖物
								}
							})
						})
						that.tlayer.splice(index,1);  // 删除对应图层的缓存
						layer.closeAll();
					})
				}, function(){ // 取消 回调
					// nothing
				});
			},
			/**
			 * 删除全部图层
			 */
			deleteAllLayer(){
				let that=this;
				layer.confirm('确定要删除所有图层吗？', {
					btn: ['确定','取消'] //按钮
				}, function(){ // 确定 回调
					let idStr='';
					let arr=[];
					that.d.forEach((item,index)=>{
						arr.push(item.tid)
					})
					idStr=arr.join(",");
					that.$http.post('/layer/delLayer', {
						ids:idStr
					}).then(d => {
						that.d=[];
						that.tlayer=[];
						that.map.clearOverLays(); // 清除所有覆盖物
						layer.closeAll();
					})
				}, function(){ // 取消 回调
					// nothing
				});
			},
		}
	}
</script>