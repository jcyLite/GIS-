<template>
	<div v-show="isShow" class="poperDetail">
		<div @click=hide class="shade">
			
		</div>
		<div class="midbox">
			<div class="inner">
				<div class="floor">
					<span>经度</span>
					<input type="text" v-model="lat">
				</div>
				<div class="floor">
					<span>纬度</span>
					<input type="text" v-model="lng">
				</div>
				<button @click="setPoint">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'diyLayer',
		props:['data','overLay'],
		data(){
			return {
				lat:'',  // 经度
				lng:'',	 // 纬度
				isShow:true
			}
		},
		mounted(){
			console.log(this.data)
			
		},
		methods:{
			/**
			 * 确定经纬度
			 */
			setPoint(){
				
				//this.overLay.setLngLats(new T.LngLat(119.58, 31.47))
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

<style lang=less>
	.poperDetail{
		position:fixed;
		top:0;
		right:0;
		bottom:0;
		left:0;
		z-index:10000000000000;
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
			width:300px;
			height:250px;
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
					height:40px;
					>div{
							float:left;
						}
					}
			}
		}
	}
</style>