<template>
        <div v-if="isShow" class="poperBottom">
                <table class="layui-hide" id="demo" lay-filter="test">

                </table>
        </div>
</template>

<script>
import 'layui-src/dist/layui.all.js';
import 'layui-src/dist/css/layui.css';
export default {
        props:['src'],
        data(){
                return {
                        isShow:false
                }
        },
        watch:{
                src(newV){
                        if(newV){
                                 var table = layui.table;
                                layui.table.render({
                                        elem: '#demo',
                                        height: 420,
                                        method:'post',
                                        url: this.baseURL+newV //数据接口
                                                ,
                                        title: '用户表',
                                        page: true //开启分页
                                                ,
                                        toolbar: true //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
                                                ,
                                        totalRow: true //开启合计行
                                                ,
                                        cols: [
                                                [ //表头
                                                        {
                                                                type: 'checkbox',
                                                                fixed: 'left'
                                                        }, 
                                                        {
                                                                field: 'id',
                                                                title: 'ID',
                                                                width: 80,
                                                                sort: true,
                                                                fixed: 'left',
                                                                totalRowText: '序号：'
                                                        }, {
                                                                field: 'username',
                                                                title: '部件名称',
                                                                width: 80
                                                        }, 
                                                        {
                                                                field: 'experience',
                                                                title: '部件标识码',
                                                                width: 90,
                                                                sort: true,
                                                                totalRow: true
                                                        }, {
                                                                field: 'sex',
                                                                title: '所在行政区',
                                                                width: 80,
                                                                sort: true
                                                        }, {
                                                                field: 'score',
                                                                title: '部件状态',
                                                                width: 80,
                                                                sort: true,
                                                                totalRow: true
                                                        }, {
                                                                field: 'city',
                                                                title: '地址描述',
                                                                width: 150
                                                        }, {
                                                                field: 'sign',
                                                                title: '主管部门',
                                                                width: 200
                                                        }, {
                                                                field: 'classify',
                                                                title: '权属单位',
                                                                width: 100
                                                        }, {
                                                                field: 'wealth',
                                                                title: '养护单位',
                                                                width: 135,
                                                                sort: true,
                                                                totalRow: true
                                                        }, {
                                                                fixed: 'right',
                                                                width: 80,
                                                                title:'数据状态',
                                                                align: 'center',
                                                                toolbar: '#barDemo'
                                                        }, {
                                                                fixed: 'right',
                                                                width: 80,
                                                                title:'数据来源',
                                                                align: 'center',
                                                                toolbar: '#barDemo'
                                                        }, {
                                                                fixed: 'right',
                                                                width: 80,
                                                                title:'创建时间',
                                                                align: 'center',
                                                                toolbar: '#barDemo'
                                                        }, {
                                                                fixed: 'right',
                                                                width: 80,
                                                                title:'更新时间',
                                                                align: 'center',
                                                                toolbar: '#barDemo'
                                                        }, {
                                                                fixed: 'right',
                                                                width: 80,
                                                                title:'数据录入人',
                                                                align: 'center',
                                                                toolbar: '#barDemo'
                                                        }
                                                ]
                                        ]
                                });
                        }
                       
                }
        },
        mounted() {
                
        }
}
</script>

<style style="less">
        .poperBottom{
                position:absolute;
                bottom:0;
                z-index:10000000000;
                background:#fff;
                width:100%;
        }
</style>
