<template>
<transition name="poperDetail">
	<div v-show="isShow" class="poperDetail">
		<div @click=hide class="shade">
			
		</div>
		<div class="midbox">
			<div class="inner">
				<div class="floor clearfix">
					<div class="fl">图层名称：</div>
					<div class="fl">{{data.tname}}</div>
				</div>
				<div class="floor clearfix">
					<div class="fl">图层类型：</div>
					<div class="fl">{{data.tleixing}}</div>
				</div>
				<div class="floor clearfix">
					<div class="fl">基础数据类型：</div>
					<div class="fl">{{data.jcsjlx}}</div>
				</div>
				<div class="floor clearfix">
					<div class="fl">所属网格类型：</div>
					<div class="fl">{{data.bleixingx}}</div>
				</div>
				<div class="floor clearfix">
					<div class="fl">描述：</div>
					<div class="fl">{{data.miaoshu}}</div>
				</div>
			</div>
		</div>
	</div>
</transition>
</template>

<script>
	export default {
		name:'poperDetail',
		props:['data'],
		data(){
			return {
				isShow:false
			}
		},
		mounted(){
			console.log(this.data)
		},
		methods:{
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
	@time:.35s;
	.poperDetail-enter,.poperDetail-leave-active{
		.shade{
			opacity:0;
		}
		.midbox{
			opacity:0;
			transform:scale(0);
		}
	}
	.poperDetail{
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
				.floor{
					margin-bottom: 10px;
				}
			}
		}
	}
</style>