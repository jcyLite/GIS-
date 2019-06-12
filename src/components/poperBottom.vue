
<style lang=less>
	.poperBottom.cksxb{
		&.active{
			height:600px;
		}
		.close{
			position:absolute;
			right:10px;
			top:10px;
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
		}
		.row{
			&.active{
				background:#eee;
			}
			&.title{
				width:100%;
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
				margin-right:30px;
				float:right;
				.b{
					font-size:14px;
					margin-right:10px;
				}
				.c{
					font-size:14px;
				}
				.d{
					
				}
				input{
					margin-top:2px;
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
					<span @click="del" class="b">删除所选</span>
					<span class="c">筛选</span>
					<input v-model="searchVal" type="text" />
					<!--<img @click="sxsearch" class="sxsearch" src="../img/search.png" alt="" />-->
					<span @click="bactive=!bactive" class="d">{{!bactive?'全屏显示':'小屏显示'}}</span>

				</div>

			</div>
			<div class="row-box">
				<div class="row">
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

				</div>

				<div :class="{active:oactive==index}" @click="oactive=index,dingwei(item,index)" v-for="(item,index) of d.datas" class="row">
					<div class="col">
						<div
								@click="(active.indexOf(index)!=-1)?active.splice(active.indexOf(index),1):active.push(index)"
								:class="{active:active.indexOf(index)!=-1}" class="select-input"></div>
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
				</div>
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
	export default {
		props:['value','d'],
		computed:{
			allActive(){
				if(this.d){
					return this.active.length==this.d.datas.length;
				}
			}
		},
		watch:{
			value(newV){
				console.log(newV);
				this.acksxbd=newV;
			},
			acksxbd(newVal){
				this.$emit('input', newVal)
			}
		},
		mounted(){
			window.poper=this;
		},
		methods:{
			dingwei(item,index){
				markerClick.call(this,activeMarkers[index],item)
				var lnglat=item.lnglat;
				console.log(item.lnglat.lng,item.lnglat.lat)
				window.map.centerAndZoom(new T.LngLat(lnglat.lng,lnglat.lat), 12);
			},
			allSelect(){
				if(this.d){
					if(this.allActive){
						this.active=[];
					}else{
						this.active=[];
						this.d.datas.forEach((item,index)=>{
							this.active.push(index);
						})
					}
				}
			},
			del(){
				this.active.forEach(item=>{
					this.$http.post('/del',{
						tid:this.d.tid,
						bid:this.d.datas[item].bid
					})
					this.d.datas.splice(item,1)
				})
				this.active=[];
			}
		},
		data(){
			return {
				acksxbd:false,
				active:[],
				oactive:-1,
				searchVal:'',
				bactive:false
			}
		}
	}
</script>
