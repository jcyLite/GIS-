<style lang='less'>
	@time:.35s;
	.diyLngLat-enter,.diyLngLat-leave-active{
		.shade{
			opacity:0;
		}
		.midbox{
			opacity:0;
			transform:scale(0);
		}
	}
	.diyLngLat{
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
<transition name="diyLngLat">
	<div v-if="isShow" class="poperDetail diyLngLat" :id="'diyPoper'+timeStr">
		<div @click="hide"  class="shade">
			
		</div>
		<div class="midbox">
			<div class="inner">
				<div class="top-cont">
					<button class="layui-btn layui-btn-normal layui-btn-sm" @click="addTr" v-if="overLayType!=2">
						新增
					</button>
				</div>
				<table lay-filter="lnglat-table">
					<thead>
						<tr>
							<th lay-data="{field:'index', width:70}">序号</th>
							<th lay-data="{field:'lat', width:115}">经度</th>
							<th lay-data="{field:'lng', width:115}">纬度</th>
							<th lay-data="{field:'operate', width:80}" v-if="overLayType!=2">操作</th>
						</tr> 
					</thead>
					<tbody  v-if="overLayType==2">
						<tr>
							<td>1</td>
							<td><input type="text" class="layui-input lat-input" v-model="lngLatArr.lat"></td>
							<td><input type="text" class="layui-input lng-input" v-model="lngLatArr.lng"></td>
							<td v-if="overLayType!=2"><button class="layui-btn layui-btn-sm layui-btn-danger delete-btn">删除</button></td>
						</tr>
					</tbody>
					<tbody  v-if="overLayType!=2">
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
</transition>
</template>

<script>
import { setTimeout } from 'timers';
	export default {
		name:'diyLayer',
		data(){
			return {
				isShow:false,
				lngLatArrNew:this.lngLatArr
			}
		},
		props:['lngLatArr','overLayType','timeStr'],
		mounted(){
			let that=this;
			this.$nextTick(()=>{
				that.setData();
			})
			/**
			 * 删除一行---由于layui的table组件的限制，导致vue的点击事件绑定不上，所以这里只能用jq了
			 */
			$("body").on('click',`#diyPoper${that.timeStr} .delete-btn`, function(obj){
				let index=$(this).closest("tr").find("td").eq(0).text()*1-1;
				console.log("删除")
				console.log(that.lngLatArrNew)
				that.lngLatArrNew.splice(index,1);
			});
		},
		updated() {
			this.$nextTick(()=>{
				this.setData();
			})
		},
		watch:{
			lngLatArrNew(newV) {
				this.$nextTick(()=>{
					this.setData();
				})
			}
		},
		methods:{
			/**
			 * 赛入经纬度数据
			 */
			setData() {
				let that=this;
				this.$nextTick(()=>{   // 必须放在nextTick里面，否则获取不到dom元素
					this.initTable(function(){
						/**
						 * 由于layui table的某种限制，导致input的默认数据显示不出来，只能用jq把数据塞进去
						 */
						if(that.overLayType==4||that.overLayType==5){  // 线  面
							that.lngLatArrNew.forEach((item,index)=>{
								// 如果数据是31.26000 传来的数据可能是31.26，这样通不过验证，要补一下“0”
								item.lng=that.addZero(item.lng);
								item.lat=that.addZero(item.lat);
								$(`#diyPoper${that.timeStr} .layui-table tbody tr`).eq(index).find(".lat-input").val(item.lat);
								$(`#diyPoper${that.timeStr} .layui-table tbody tr`).eq(index).find(".lng-input").val(item.lng);
							})
						}else{  // 点
							let lng=that.addZero(that.lngLatArrNew.lng);
							let lat=that.addZero(that.lngLatArrNew.lat);
							if(lat.split(".")[1].length==4){
								lat=lat+"0";
							}
							if(lng.split(".")[1].length==4){
								lng=lng+"0";
							}
							$(`#diyPoper${that.timeStr} .layui-table tbody tr .lat-input`).val(lat);
							$(`#diyPoper${that.timeStr} .layui-table tbody tr .lng-input`).val(lng);
						}
					});
					
				})
			},
			/**
			 * 数据如果是31.23000，那么后台传过来的则是31.23，这样通不过后面的五位小数验证，要补充“0”
			 */
			addZero(item) {
				if(item==""){
					return "";
				}
				item=item+""; // 转字符串
				let len_=5-item.split(".")[1].length;
				for(let i=0;i<len_;i++){
					item=item+"0";
				}
				return item;
			},
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
			initTable(callBack){
				let that=this;
				let table = layui.table;
				table.init('lnglat-table', {
					height: 210 //设置高度
					,limit: 10 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
					//支持所有基础参数
					,done: function () {
						callBack();
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
					$(`#diyPoper${that.timeStr} .layui-table tbody tr`).each(function(){
						let latV=$(this).find(".lat-input").val();
						let lngV=$(this).find(".lng-input").val();
						that.lngLatArrNew.push({
							lat:latV,
							lng:lngV
						})
					})
					for(let i=0;i<that.lngLatArrNew.length;i++){
						// 验证判断
						let callbackFlag=that.testFun(that.lngLatArrNew[i]);
						if(callbackFlag!=-1){
							return false;
						}
						// 判断经纬度范围
						let bool_=that.judgeRange(that.lngLatArrNew[i]);
						if(!bool_){
							return bool_;
						} 
					}
					if(that.overLayType==4&&that.lngLatArrNew.length<2){ // 线
						layer.msg("线类型请至少设置两个坐标点");
						return false;
					}else if(that.overLayType==5&&that.lngLatArrNew.length<3){  // 面
						layer.msg("面类型请至少设置三个坐标点");
						return false;
					}
				}else{  // 点
					let latV=$(`#diyPoper${that.timeStr} .layui-table tbody tr .lat-input`).val();
					let lngV=$(`#diyPoper${that.timeStr} .layui-table tbody tr .lng-input`).val();
					that.$set(that.lngLatArrNew,'lat',latV);
					that.$set(that.lngLatArrNew,'lng',lngV);
					// 验证判断
					let callbackFlag=that.testFun(that.lngLatArrNew);
					if(callbackFlag!=-1){
						return false;
					}
					// 判断经纬度范围
					let bool_=that.judgeRange(that.lngLatArrNew);
					if(!bool_){
						return bool_;
					} 
				}
				that.$emit("setLngLatFun",that.lngLatArrNew);	
				that.isShow=false;			
			},
			/**
			 * 判断是否超出常州范围
			 */
			judgeRange(item) {
				if(item.lng<119.135||item.lng>120.193){
					layer.msg("经度超出常州市范围(119.135-120.193)");
					return false;
				}else if(item.lat<31.153||item.lat>32.06){
					layer.msg("纬度超出常州市范围(31.153-32.06)");
					return false;
				}
				return true;
			},
			/**
			 * 验证  判断输入数据是否合法  
			 */
			testFun(item) {
				let that=this;
				let flag=-1;  // 不同数值代表不同的报错类型  -1 代表通过了
				let regNum=/^\d+(\.\d{1,5})?$/;
				if(item.lng==""||item.lat==""){
					flag=1;
				}
				if(item.lng.substr(-1,1)=="."||item.lat.substr(-1,1)=="."){
					flag=2;
				}
				if(item.lng.substr(0,1)=="."||item.lat.substr(0,1)=="."){
					flag=2;
				}
				if(item.lng*1==0||item.lat*1==0){
					flag=2;
				}
				if(!regNum.test(item.lng*1)||!regNum.test(item.lat*1)){
					flag=2;
				}
				if(item.lng.split(".")[1].length<5||item.lat.split(".")[1].length<5){
					flag=2;
				}
				if(flag==1){
					layer.msg("经纬度不能为空值");
					return false;
				}else if(flag==2){
					layer.msg("经纬度必须保留五位小数");
					return false;
				}
				return flag;
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


