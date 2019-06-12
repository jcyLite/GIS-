<style lang="less">
	@import "./app.less";
	.search {
		position: relative;
		.search-icon {
			width: 20px;
			position: absolute;
			right: 0px;
			top: -20px;
		}
	}
	
	.top {
		select {
			font-size: 12px;
			option {
				margin-right: 12px;
			}
		}
	}
	
	.shuru {
		width: 6rem;
		border: 1px solid #e5e5e5;
	}
</style>
<template>
	<div id="app">
		<leftSearch v-model="noSearch" class="leftBox"></leftSearch>
		<div v-show="noSearch" class="leftBox">
			<div class="top">
				<div>
					部件大类：
					<select v-model="dl" name="aa" id="">

						<option v-for="item in bigLei" :value='item.value'>{{item.value}}</option>

					</select>
				</div>
				<div>
					图层名称：
					<input v-model="xl" class="shuru" />

				</div>
				<div class="search">
					<img @click="searchlei" class="search-icon" src="./img/search.png" alt="" />

				</div>
			</div>
			<div class="bottom">
				<div class="bottom-top">
					<div>
						共{{d.length}}个图层
					</div>
					<div>
						<img @click="fiter" src="./img/filter.png" alt="" />
						<img @click="addatuceng" src="./img/addb.png" alt="" />
						<img @click="d=[]" src="./img/huishou.png" alt="" />

					</div>
				</div>
				<div class="container">
					<div :class="{active:active==index}" @click="active=index,jiazhai(item,index)" class="box" v-for="(item,index) of d">
						<div class="t">
							<div @click="(eye.indexOf(index)==-1)?(eye.push(index)):(eye.splice(eye.indexOf(index),1)),jeye(item,index)" class="eye">
								<img v-if="eye.indexOf(index)==-1" src="./img/eye.png" alt="" />
								<img v-if="eye.indexOf(index)!=-1" src="./img/eye_active.png" alt="" />

							</div>
							<div class="contenteditable">
								{{item.tname }}
							</div>
							<div class="u">
								<img @click="changeName(item,index)" src="./img/edit.png" alt="" />
								<img @click="poperDetail(item,index)" src="./img/detail.png" alt="" />
								<img src="./img/earth.png" alt="" />
								<img @click="d.splice(index,1)" src="./img/hsz.png" alt="" />

							</div>
						</div>
						<div class="b">
							<span>

								<img src="./img/upload.png" alt="" />
								批量上传
							</span>
							<span @click="cksxb">
								<img src="./img/shuxing.png" alt="" />

							<span>查看属性表</span></span>
							<span>

<img src="./img/download.png" alt="" />

导出</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="rightBox">
			<div class="topTool">
				<div class="toola">
					<img @click="editMarker" src="./img/position.png" alt="" />
					<img @click="openPolylineTool" src="./img/zx.png" alt="" />
					<img @click="openPolygonTool" src="./img/m.png" alt="" />

				</div>
				<div class="toolb">
					<img @click="openCircleTool" src="./img/circle.png" alt="" />
					<img @click="openRectangleTool" src="./img/reck.png" alt="" />
					<img @click="mlineTool" src="./img/cz.png" alt="" />
					<img @click="mpolygonTool" src="./img/cm.png" alt="" />
					<img @click="searchShow=true" src="./img/search.png" alt="" />

				</div>
			</div>
			<div v-show="searchShow" class="search">
				<input type="text" />
				<span style="cursor: pointer;" @click="search">搜索</span>
			</div>
			<div id="mapDiv"></div>
			<poper-bottom :d="d[active]" v-model=cksxbd></poper-bottom>
		</div>
	</div>
</template>

<script>
	import './components/dialog.less';
	import poperBottom from './components/poperBottom.vue';
	import leftSearch from './components/leftSearch.vue';
	import {
		markerClick,
		scbc
	}

	from './module.js'
	var $ = require('jquery');
	export default {
		components: {
			poperBottom,
			leftSearch
		},
		data() {
			return {
				noSearch: true,
				poperChangeName: false,
				active: 0,
				cksxbd: false,
				poper: false,
				map: null,
				zoom: 12,
				control: null,
				markerTool: null,
				handler: null,
				lineTool: null,
				infoWin1: null,
				polygonTool: null,
				searchShow: false,
				d: [],
				contents: [],
				eye: [],
				tlayer: [],
				dl: '',
				xl: '',
				bigLei: [],
				cityAry: [],
			}
		},
		mounted() {
			window.uu = this;
			var that = this;
			//读取后台数据
			window.$ = require('jquery');
			this.map = new T.Map("mapDiv");
			window.map = this.map;
			//设置显示地图的中心点和级别
			this.map.centerAndZoom(new T.LngLat(119.58, 31.47), this.zoom);
			//创建缩放平移控件对象
			this.control = new T.Control.Zoom();
			//添加缩放平移控件
			//		this.map.addControl(this.control);
			this.infoWin1 = new T.InfoWindow();
			this.markerTool = new T.MarkTool(this.map, {
				follow: true
			});
			this.firstSearch();
			this.requestCity();
			var infoWin1 = this.infoWin1;
			var sContent = require('./components/dialog.tpl')();
			var bContent = require('./components/dialogb.tpl')();
			var that = this;
			this.markerTool.addEventListener('mouseup', function() {
				var markers = that.markerTool.getMarkers();
				infoWin1.setContent(sContent);
				for(var i = 0; i < markers.length; i++) {
					let marker = markers[i];
					marker.openInfoWindow(infoWin1);
					that.scbc(marker);
					marker.addEventListener('click', function(obj) {
						that.markerClick(this, obj)
					});
					marker.enableDragging();
				}
			});
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
			this.ControlsetPosition();
			var that = this;
			$('body').on('click', '*[click]', function(e) {
				var method = $(this).attr('click');
				that[method] ? that[method].call(this, e) : '';
			})
		},
		methods: {
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
					// console.log('d=='+d);
					this.bigLei = d;
					localStorage.setItem('localAry', this.bigLei);
					var get = localStorage.getItem('localAry');
					// console.log('get=='+get);
					// this.d=d.data;
					// this.makeData(d.data)
				})
			},
			searchlei() {
				//大类小类搜索
				this.$http.post('/layer/findLayer', {
					name: this.xl,
					artTypeName: this.dl
				}).then(dd => {
					dd.datas.forEach((item, index) => {
						var tempstr = '/' + item.moduleName + '/' + 'queryModule';
						console.log('tempstr==' + tempstr);
						this.$http.post(tempstr, {}).then(d => {
							dd.datas[index].datas = d.datas;
							console.log('dddd==' + JSON.stringify(d));
						})
					});
					 setTimeout(() => {
						console.log('dd.datas==' + JSON.stringify(dd.datas));
						this.d = dd.datas;
						this.makeData(dd.datas)
					}, 1000);
				}) 
			},
			makeData(d) {
				d.forEach((item, index) => {
					var a;
					if(item.tleixing == 'dian') {
						a = this.jzdian(item.data, item.tid);
					} else if(item.tleixing == 'xian') {
						a = this.jzxian(item.data, item.tid);
					} else if(item.tleixing == 'mian') {
						a = this.jzmian(item.data, item.tid);
					}
					this.tlayer.push(a);
				})
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
						shaixuan(a) {
							console.log(a);
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
								that.tlayer.splice(0, that.tlayer.length);
								that.d.splice(0, that.d.length);
								console.log('that.tlayer==' + that.tlayer);
								console.log('that.d==' + that.d);
								if(d.datas == null) {
									d.datas = [];
									console.log(1110);
								}
								that.d = d.datas;
								that.makeData(d.datas)
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
						data: item.tname
					},
					$events: {
						confirm(data) {
							item.tname = data;
							that.$http.post('changeName', {
								tid: item.tid,
								tname: data
							})
						}
					}
				}).show()
			},
			markerClick(marker, obj) {
				//点击标注时触发事件
				markerClick.call(this, marker, obj)
			},
			scbc(overLay, type) {
				scbc.call(this, overLay, type);
			},
			jzdian(data, tid) {
				var lx = 0,
					ly = 0;
				var that = this;
				var tlayers = [];
				window.activeMarkers = [];
				data.forEach(item => {
					var x = item.lnglat.lng;
					var y = item.lnglat.lat;
					lx += parseFloat(x);
					ly += parseFloat(y);
					var marker = new T.Marker(new T.LngLat(parseFloat(x), parseFloat(y)));
					marker.bid = item.bid;
					marker.tid = tid;
					marker.addEventListener('click', function(obj) {
						that.markerClick(this, obj)
					});
					activeMarkers.push(marker);
					this.map.addOverLay(marker);
					marker.hide();
					tlayers.push(marker)
				});
				 var px = lx / data.length;
				var py = ly / data.length;
				return {
					tlayers,
					p: {
						px,
						py
					}
				};
			},
			jzxian(data, tid) {
				var that = this;
				var lx = 0,
					ly = 0,
					bb = 0;
				var tlayers = [];
				data && data.forEach(item => {
					var points = [];
					item.lnglat.forEach(ii => {
						lx += parseFloat(ii.lng);
						ly += parseFloat(ii.lat);
						bb++;
						points.push(new T.LngLat(parseFloat(ii.lng), parseFloat(ii.lat)))
					});
					var pointers = new T.Polyline(points);
					pointers.bid = item.bid;
					pointers.tid = tid;
					pointers.addEventListener('click', function(obj) {
						var lnglat = obj.lnglat;
						var sContent = require('./components/dialog.tpl')();
						var InfoContent = new T.InfoWindow();
						InfoContent.setContent(sContent);
						that.map.openInfoWindow(InfoContent, lnglat);
						that.scbc(this, 'xian')
					});
					this.map.addOverLay(pointers);
					pointers.hide();
					tlayers.push(pointers)
				});
				var px = lx / bb;
				var py = ly / bb;
				return {
					tlayers,
					p: {
						px,
						py
					}
				};
			},
			jzmian(data, tid) {
				var lx = 0,
					ly = 0,
					bb = 0;
				var tlayers = [];
				data.forEach(item => {
					var points = [];
					item.lnglat.forEach(ii => {
						lx += parseFloat(ii.lng);
						ly += parseFloat(ii.lat);
						bb++;
						points.push(new T.LngLat(parseFloat(ii.lng), parseFloat(ii.lat)))
					});
					var polygons = new T.Polygon(points, {
						color: "blue",
						weight: 3,
						opacity: 0.5,
						fillColor: "#FFFFFF",
						fillOpacity: 0.5
					});
					polygons.bid = item.bid;
					polygons.tid = tid;
					polygons.addEventListener('click', function(obj) {
						var lnglat = obj.lnglat;
						var sContent = require('./components/dialog.tpl')();
						var InfoContent = new T.InfoWindow();
						InfoContent.setContent(sContent);
						that.map.openInfoWindow(InfoContent, lnglat);
						that.scbc(this, 'xian')
					});
					this.map.addOverLay(polygons);
					polygons.hide();
					tlayers.push(polygons)
				});
				var px = lx / bb;
				var py = ly / bb;
				return {
					tlayers,
					p: {
						px,
						py
					}
				};
			},
			jeye(item, index) {
				//眼睛
				var a = this.tlayer[index]
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
			jiazhai(i, index) {
				//地图位移
				var a = this.tlayer[index];
				var px = a.p.px;
				var py = a.p.py;
				this.map.centerAndZoom(new T.LngLat(px, py), this.zoom);
			},
			cksxb() {
				// console.log('01010101');
				this.cksxbd = true;
			},
			contenteditable(item) {
				this.$http.post('/changeName', {
					tname: item.tname,
					tid: item.tid
				}).then(d => {})
			},
			btna() {
				var markers = this.markerTool.getMarkers();
				this.map.removeOverLay(markers[markers.length - 1]);
				this.map.closeInfoWindow()
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
			editMarker() {
				var markers = this.markerTool.getMarkers();
				for(var i = 0; i < markers.length; i++) {
					let marker = markers[i];
					markers[i].disableDragging();
				}
				this.markerTool.open();
			},
			openPolylineTool() {
				var that = this;
				var handler = this.handler;
				if(handler) handler.close();
				handler = new T.PolylineTool(this.map);
				handler.addEventListener('draw', function(obj) {
					var currentLnglats = obj.currentLnglats;
					var lnglat = currentLnglats[currentLnglats.length - 1];
					var sContent = require('./components/dialog.tpl')();
					var InfoContent = new T.InfoWindow();
					InfoContent.setContent(sContent);
					that.map.openInfoWindow(InfoContent, lnglat);
					that.scbc(obj.currentPolyline, 'xian');
					obj.currentPolyline.addEventListener('click', () => {
						var InfoContent = new T.InfoWindow();
						InfoContent.setContent(sContent);
						that.map.openInfoWindow(InfoContent, lnglat);
					})
				});
				handler.open();
			},
			openPolygonTool() {
				var that = this;
				var handler = this.handler;
				if(handler) handler.close();
				handler = new T.PolygonTool(this.map);
				handler.addEventListener('draw', function(obj) {
					var currentLnglats = obj.currentLnglats;
					var lnglat = currentLnglats[currentLnglats.length - 1];
					var sContent = require('./components/dialog.tpl')();
					var InfoContent = new T.InfoWindow();
					InfoContent.setContent(sContent);
					that.map.openInfoWindow(InfoContent, lnglat);
					that.scbc(obj.currentPolygon, 'xian');
					obj.currentPolygon.addEventListener('click', () => {
						var InfoContent = new T.InfoWindow();
						InfoContent.setContent(sContent);
						that.map.openInfoWindow(InfoContent, lnglat);
					})
				});
				handler.open();
			},
			openRectangleTool() {
				//绘制矩形
				var handler = this.handler;
				if(handler) handler.close();
				handler = new T.RectangleTool(map, {
					follow: true
				});
				handler.open();
			},
			openCircleTool() {
				//绘制圆
				var handler = this.handler;
				if(handler) handler.close();
				handler = new T.CircleTool(map, {
					follow: true
				});
				handler.open();
			},
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
			}, //添加一个图层
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
								alert('未填写图层名称');
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
									alert('保存成功');
									window.location.reload();
								} else if(d.responseCode == -1) {
									alert('图层名称已存在');
								} else {
									alert('保存失败');
								}
							})
						}
					}
				}).show()
			}
		}
	}
</script>