<style lang="less">
	.tk-form {
		margin-bottom: 10px;
		overflow: hidden;
		.tk-form-name{
			overflow: hidden;
			width:50vw;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.list {
			.pot-switch{
				float:right;
				width:60px;
				padding-top:8px;
				text-align: right;
			}
			background: #fff;
			border-bottom:1px solid #efefef;
			padding-left:13px;
			padding-right:13px;
			min-height: 50px;
			line-height: 50px;
			position:relative;
			.tk-select-input{
				text-align: right;
				width: calc(60% - 13px);
			}
			div {
				width:40%;
				text-align:justify;
				float:left;
			}
			input {
				display: block;
				float:right;
				&:focus{
					outline: none;
				}
				padding-right:15px;
				color:#999;
				margin-right:5px;
				text-align: right;
				height:50px;
				width: calc(60% - 10px);
				background: transparent;
				text-overflow : ellipsis ;
				&::-webkit-input-placeholder{
					color:#999;
					font-size:14px;
				}
			}
			.number{
				color:#999;
				margin-right:15px;
				font-size:12px;
			}
			.del {
				position: absolute;
				right: 5px;
				top: 16px;
				width: 20px;
				height: 20px;
				background-size: contain;
				background-repeat: no-repeat;
			}
			span {
				flex: 0;
				line-height: 50px;
				width: 70px;
				text-align: center;
			}
			.tk-icon-alert{
				background:url('./alert.svg');
				background-size:18px;
				width:20px;
				height:20px;
				flex:inherit;
				margin-top:16px;
				background-repeat: no-repeat;
				transform:translateX(10px);
				&.active{
					transform:translateX(-10px);
				}
			}
			.icon-right{
				position:absolute;
				right:10px;
				top:18px;
			}
		}
		textarea{
			border:none;
			clear:both;
			display:block;
			height:300px;
			width:calc(100%);
			padding:13px;
			font-family:"agency fb";
			outline:none;
		}
		
	}
	
</style>
<template>
	<div class="tk-form">
		<template v-for="(item,index) of list">
			<div @click="touch(item,index)" class="list" >
				<div class="tk-form-name" v-html="item.name"></div>
				<pot-switch v-if="item.type=='switch'" v-model="item.model"></pot-switch>
				<textarea v-model="item.model" v-if="item.type=='textarea'" name="" id="" cols="30" rows="10">
					
				</textarea>
				<input :ref="'input'+index" @blur="blur(item)" v-if="item.type=='input'" :maxlength="item.maxlength" :disabled="item.select||item.selectTime||item.selects||item.click||item.selectDate" :placeholder="item.placeholder" :type="item.input?item.input:'text'" v-model="item.model" />
				<span class="number" v-if="item.type=='input'&&item.maxlength">
					{{item.model&&item.model.length}}/{{item.maxlength}}
				</span>
				<div v-if="(item.type=='input'||item.type=='textarea')&&item.model" @click="item.model=''" class="del" :style="{'background-image':`url(${require('./close.svg')})`}">
					
				</div>
				<div class="tk-select-input" v-if="item.select||item.type=='selectMouth'||item.type=='selectTime'||item.selects||item.click||item.type=='selectData'">
					{{item.model}}
				</div>
				<img v-if="item.select||item.type=='selectMouth'||item.type=='selectOnlyTime'||item.type=='selectTime'||item.selects||item.click||item.type=='selectData'" class="icon-right" :src="require('./right.png')" alt="" />
			</div>
		</template>
	</div>
</template>

<script>
	import form_test from './form_test.js';
	export default {
		name: 'tk-form',
		mixins:[form_test],
		data(){
			return {
				pickerOnce:[]
			}
		},
		props: {
			list: {
				type: Array,
				default() { 
					return []
				}
			}
		},
		beforeDestroy(){
			this.picker=null;
			this.dateTimePicker=null;
		},
		mounted() {
		},
		methods: {
			blur(item){
				if(item.format){
					if(!item.format.test(item.model)){
						this.$createPotTip('输入格式错误')
					}
				}
			},
			valTest(val){
				return !val||/^[\s]*$/.test(val)
			},
			otip(e,val){
				if(!val){
					if(!this.Tip){
						this.Tip=this.$createPotTip({
							type:'text',
							content:!val?'你还没输入内容':'输入字符不能全部为空',
							direction:'top',
							offset:[e.clientX,e.clientY]
						})
					}
					this.Tip.show();
				}
			},
			test(val){
				var regular = /^[\s]*$/;
				return !val||regular.test(val)
			},
			touch(item,index) {
				if(item.type=='select'){
					item.select&&this.select(item,index);
				}else if(item.type=='selects'){
					item.selects&&this.selects(item,index);
				}else if(item.type=='selectTime'){
					this.selectTime(item,index);
				}else if(item.type=='selectData'){
					this.selectTime(item,index,true)
				}else if(item.type=="selectMouth"){
					this.selectMouth(item,index)
				}else if(item.type=='selectOnlyTime'){
					this.selectOnlyTime(item,index)
				}else if(item.type=='input'){
					this.$refs['input'+index][0].focus()
					
				}
				if(item.click){
					item.click()
				}
			},
			selects(item,index){
				if(!this.selects_picker){
					this.selects_picker=[];
				}
				if(!this.selects_picker[index]){
					this.selects_picker[index]=this.$createPotDialog({
						title:item.name+'选择',
						selects:item.selects,
						hasSelect:item.hasSelect,
						type:'selects',
						onConfirm(e,is){
							item.model='已选择'+is.length+'项',
							item.hasSelect=is;
						}
					})
				}
				this.selects_picker[index].show()
			},
			select(item,index){
				if(!item.onlyOnce){
					if(!this.picker){
						this.picker=[];
					}
					if(!this.picker[index]){
						var column1=[];
						for(var i=0;i<item.select.length;i++){
							column1.push({
								text:item.select[i],
								value:i
							})
						}
						this.picker[index] = this.$createPotPicker({
							title: item.name+'选择',
							data: [column1],
							onSelect:(i)=>{
								item.code=i;
								item.model=item.select[i],
								item.success&&item.success(i);
							}
						})
					}
					this.picker[index].show()
				}else{
					var column1=[];
					for(var i=0;i<item.select.length;i++){
						column1.push({
							text:item.select[i],
							value:i
						})
					}
					 var a=this.$createPotPicker({
						title: item.name+'选择',
						data: [column1],
						onSelect(i){
							item.model=item.select[i],
							item.success&&item.success(i);
							a.remove();
						}
					}).show()
				}
				
			},
			getFormatTime(time,type){
				//补齐位数
				var c=time.getMonth()+1;
				if(c<10){
					c='0'+c;
				}
				var d=time.getDate();
				if(d<10){
					d="0"+d;
				}
				//
				var a=time.getFullYear()+'-'+c+'-'+d;
				var b=time.toTimeString().substring(0,8)
				if(type=='mouth'){
					return time.getFullYear()+'-'+c
				}
				if(type) return a;
				return a+' '+b
			},
			selectOnlyTime(item,index){
				var year=new Date().getFullYear();
				if(!this.TimePicker){
					this.TimePicker=[];
				}
				console.log(12)
				this.TimePicker[index] = this.$createPotDatePicker({
					title: '请选择时间',
					showNow:true,
					minuteStep:5,
					delay:15,
					onSelect:(v)=>{
						cosnole.log(v)
						item.model=this.getFormatTime(v)
					}
				})
				this.TimePicker[index].show();
			},
			selectMouth(item,index){
				var year=new Date().getFullYear();
				if(!this.mouthPicker){
					this.mouthPicker=[]
				};
				if(!this.mouthPicker[index]){
					this.mouthPicker[index]=this.$createPotDatePicker({
						title: '请选择月份',
						min: new Date(year-3, 7, 8, 8, 0, 0),
						max: new Date(year+7, 9, 20, 20, 59, 59),
						value: new Date(),
						format: {
						year: 'YY年',
						month: 'MM月'
						
						},
						columnCount: 2,
						onSelect:(v)=>{
							item.model=this.getFormatTime(v,'mouth')
							item.success&&item.success();
						}
				    	})
				}
				this.mouthPicker[index].show();
			},
			selectTime(item,index,onlyDate){
				var year=new Date().getFullYear();
				if(!this.dateTimePicker){
					this.dateTimePicker=[];
				}
				if(!this.dateTimePicker[index]){
					this.dateTimePicker[index] = this.$createPotDatePicker({
						title: onlyDate?'请选择日期':'请选择日期和时间',
						min: new Date(year-3, 7, 8, 8, 0, 0),
						max: new Date(year+7, 9, 20, 20, 59, 59),
						value: new Date(),
						format: {
						year: 'YY年',
						month: 'MM月',
						date: 'DD日'
						
						},
						columnCount: onlyDate?3:6,
						onSelect:(v)=>{
							console.log(v)
							item.model=this.getFormatTime(v,onlyDate)
						}
				    	})
				}
				this.dateTimePicker[index].show();
			}
		}
	}
</script>