<template>
  <div>
    <el-steps :active="2" finish-status="success" process-status="finish" align-center>
      <el-step title="选择模板"></el-step>
      <el-step title="活动定义"></el-step>
      <el-step title="页面配置"></el-step>
    </el-steps>

    <div v-if="!dialogVisible">
      <div style="height: 50px;margin-bottom: 8px;" >
        <div style="float: left">
          活动名称：{{activityName}}<br/>
          活动时间：{{activityTime}}
        </div>
        <el-button style="float: right" type="primary" size="small" @click="savePage">保存并预览</el-button>
      </div>
      <div class="big-box">
        <div class="content-box1">
          <h4>选择组件</h4>
          <el-button class="btn-yy" round @click="addOneBtnASS()"><i class="el-icon-circle-plus-outline"></i> 单按钮组件</el-button>
          <br/>
          <br/>
          <el-button class="btn-yy" round @click="addTwoBtnASS()"><i class="el-icon-circle-plus-outline"></i> 双按钮组件</el-button>
          <br/>
          <br/>
          <el-button class="btn-yy" round @click="addSignUpASS()"><i class="el-icon-circle-plus-outline"></i> 报名组件</el-button>
          <br/>
          <br/>
          <span style="color: #ff4400;">长按右侧组件即可<br/>上下拖动改变顺序</span>
        </div>
        <div class="content-box">
          <div class="sjbox">

            <draggable v-model="assList" :options="{group:'people'}" @start="drag=true" @end="drag=false">
              <div v-for="ass in assList" :key="ass.id">
                <one-button-ass v-if="ass.elementType =='1'"
                                :key="ass.id"
                                :assSort="ass.sort"
                                :showSort="showSort"
                                :oneform2="ass"
                                :ownerType="ownerType"
                                v-on:listShowAss="showAss"
                                v-on:listDeleteAss="deleteAss"
                                v-on:listSaveAss="saveAss"></one-button-ass>

                <two-button-ass
                        v-if="ass.elementType =='2'"
                        :key="ass.id"
                        :assSort="ass.sort"
                        :showSort="showSort"
                        :oneform2="ass"
                        :ownerType="ownerType"
                        v-on:listShowAss="showAss"
                        v-on:listDeleteAss="deleteAss"
                        v-on:listSaveAss="saveAss"></two-button-ass>

                <sign-up-ass v-if="ass.elementType =='3'"
                             :key="ass.id"
                             :assSort="ass.sort"
                             :showSort="showSort"
                             :oneform2="ass"
                             :ownerType="ownerType"
                             v-on:listShowAss="showAss"
                             v-on:listDeleteAss="deleteAss"
                             v-on:listSaveAss="saveAss"/>
              </div>
            </draggable>

          </div>

        </div>
      </div>
    </div>

    <div v-if="dialogVisible">
      <div style="height: 50px" >
        <span style="font-size: 16px;font-weight: 900">页面预览</span>
        <el-button type="primary" @click="backIndex" style="float: right">完成</el-button>
      </div>

      <br/>
      <br/>
      <div class="content-box" style="margin-left: 30%" v-if="iframeUrl">
        <iframe :src="iframeUrl" width="100%" height="567px" scrolling="yes">

        </iframe>
      </div>

    </div>


  </div>
</template>

<script>
  import Http from '../../api/CommonApi';
  import Util from '../../utils/util';
  import OneButtonAss from '../../components/oneButtonAss.vue';
  import TwoButtonAss from '../../components/twoButtonAss.vue';
  import SignUpAss from '../../components/signUpAss.vue';
  import draggable from 'vuedraggable';

  export default {
    name: 'pageConfigure',
    data() {
      return {
        msg: '页面配置',
        dialogVisible: false,
        iframeUrl: '',
        activityName: sessionStorage.getItem('activityName'),
        activityTime: sessionStorage.getItem('activityTime'),
        sortNm: 0,
        assList: [],//组件list
        showSort: '',//显示的插件
        ownerType: null,
//        saveList: [],//保存的组件list
      };
    },
    created(){
      const t = this;
      t.ownerType = JSON.parse(sessionStorage.getItem('userInfo')).ownerType;

      if(!!t.$route.query.id){
        let loadingInstance = t.$loading({ fullscreen: true });//loading
        Http.getActivityPage(t.$route.query.id).then((data)=>{
//          console.log(data.dataMap)
          loadingInstance.close();//loading关闭
          if(data.code==200){
            if(!!data.dataMap && data.dataMap.length>0){
              let dataMap2 = data.dataMap;
              if(dataMap2.length>0){
                dataMap2.forEach((data,index)=>{
                  data.activityElementConfigVOList = data.activityElementConfigODTOList;
                  data.sort = data.sort+1;
                });
                t.sortNm = dataMap2[dataMap2.length-1].sort;
                t.assList = [...dataMap2];
//              t.saveList = [...dataMap2];
              }
            }
          }else{
            t.$message.error(data.message);
          }
        })
      }

    },
    components: {
      "one-button-ass": OneButtonAss,
      "two-button-ass": TwoButtonAss,
      "draggable": draggable,
      "sign-up-ass": SignUpAss
    },
    methods: {
      backIndex(){
        this.$router.push({path:'/activityManage'});//到活动详情
      },
      //排序
      sortId(a, b){
        return a.sort - b.sort
      },
      //添加单按钮组件
      addOneBtnASS(){
        const t = this;
        console.log('添加单按钮组件')
        console.log(new Date().getTime())

        t.assList.push({
          id: new Date().getTime(),
          sort: t.sortNm + 1,
//          name: ('one' + (t.sortNm + 1)),
          elementType : '1',
//          banneTriggerType: '1',//banner点击事件 1 无点击  2 跳转链接
//          bannerLink: '',
//          bannerImage: '',//banner图片
//          btnShow: '是',//按钮是否显示  1 是  2 否
//          position: '1',//按钮位置
//          triggerType: '1',//按钮 1.跳转链接 2.弹框,
//          jumpAddress: '',//按钮跳转地址
//          alertTitle: '',//按钮弹框标题
//          alertContent: '',//按钮弹框内容
        });
        console.log(t.sortNm,t.showSort)
//        if(!t.sortNm || !t.showSort){
//          t.showSort=t.sortNm + 1;
//        }
        t.sortNm = t.sortNm + 1;
//        setTimeout(()=>{
//          $('.sjbox').scrollTop($('.sjbox')[0].scrollHeight);
//        },500);
      },
      //添加双按钮组件
      addTwoBtnASS(){
        const t = this;
        console.log('添加双按钮组件')
        console.log(new Date().getTime())

        t.assList.push({
          id: new Date().getTime(),
          sort: t.sortNm + 1,
//          name: ('one' + (t.sortNm + 1)),
          elementType : '2',//2双按钮组件
//          banneTriggerType: '1',//banner点击事件 1 无点击  2 跳转链接
//          bannerLink: '',
//          bannerImage: '',//banner图片
//          btnShow: '是',//按钮是否显示  1 是  2 否
//          position: '1',//按钮位置
//          triggerType: '1',//按钮 1.跳转链接 2.弹框,
//          jumpAddress: '',//按钮跳转地址
//          alertTitle: '',//按钮弹框标题
//          alertContent: '',//按钮弹框内容
        });
//        if(!t.sortNm || !t.showSort){
//          t.showSort=t.sortNm + 1;
//        }
        t.sortNm = t.sortNm + 1;
//        setTimeout(()=>{
//          $('.sjbox').scrollTop($('.sjbox')[0].scrollHeight);
//        },500);
      },
      //添加报名组件
      addSignUpASS(){
        const t = this;
        console.log('添加报名组件')

        let isSign=false;
        t.assList.forEach((data)=>{
          if(data.elementType==3){
            isSign=true;
          }
        });
        if(isSign){
          t.$message.warning('只能存在一个报名组件！');
          return false;
        }

        t.assList.push({
          id: new Date().getTime(),
          sort: t.sortNm + 1,
//          name: ('one' + (t.sortNm + 1)),
          elementType : '3',//3 报名组件
//          banneTriggerType: '1',//banner点击事件 1 无点击  2 跳转链接
//          bannerLink: '',
//          bannerImage: '',//banner图片
        });
//        if(!t.sortNm || !t.showSort){
//          t.showSort=t.sortNm + 1;
//        }
        t.sortNm = t.sortNm + 1;
      },
      //显示某一个组件的编辑栏
      showAss(val){
        console.log('showAss 显示组件：' + val);
        this.showSort = val;
      },
      //删除组件
      deleteAss(val){
        console.log('删除的 ID ' + val)
        const t = this;
        //组件数组
        let assList = t.assList;
        if (!!assList && assList.length > 0) {
          let spliceId = 0;
          assList.forEach((data, index)=> {
            if (data.sort == val) {
              spliceId = index;
            }
          });
          assList.splice(spliceId, 1)
        }

        //需提交的数组
//        let saveList = t.saveList;
//        if (!!saveList && saveList.length > 0) {
//          let spliceId2 = 0;
//          saveList.forEach((data, index)=> {
//            if (data.sort == val) {
//              spliceId2 = index;
//            }
//          });
//          saveList.splice(spliceId2, 1)
//        }

//        console.log('saveList',t.saveList)
        console.log('assList',t.assList)
      },
      //获取组件信息
      saveAss(val){
        console.log(' saveAss 获取的数据',val)
        const t = this;
        let isCz = -1;
        let data2 = {};

        if(t.assList.length>0){
          t.assList.forEach((data,index)=>{
            if(data.sort == val.sort){
              isCz = index;
              data2 = Object.assign({}, data2, val);
            }
          });
          t.assList[isCz]=data2;
        }
        //不存在
        if(isCz==-1){
          t.assList.push(val)
        }
        console.log(t.assList)
      },
      //保存页面数据
      savePage(){
        const t = this;
//        console.log('saveList',t.saveList)
        console.log('assList',t.assList)
        let paramList = [];
        if(!!t.assList && t.assList.length>0){
          for(let i=0;i<t.assList.length;i++){
            if(!!t.assList[i].bannerImage){
              t.assList[i].sort = i;
              paramList.push(t.assList[i]);
            }
          }
        }

        if(paramList.length == 0){
          t.$message.error('请先添加组件！');
          return false;
        }
        t.showSort=null;

        Http.createActivityPage(t.$route.query.id,paramList).then((data)=>{
          console.log(data);
          if(data.code==200){
            t.dialogVisible = true;
            t.iframeUrl=data.dataMap;
            t.$message.success('保存成功！');
          }else{
            t.$message.error('保存失败！'+data.message);
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .big-box{
    width: 100%;
    /*background: #f9f9f9;*/
  }
  .content-box1{
    /*border: 1px solid #bbb;*/
    width: 200px;
    height: auto;
    /*min-height: 600px;*/
    margin: 0 0 0 0;
    padding: 10px 10px;
    box-sizing: border-box;
    /*background: #f8f8f8;*/
    float: left;
    text-align: center;
  }
  .content-box {
    /*border: 1px solid #9c9c9c;*/
    width: 394px;
    height: auto;
    /*min-height: 600px;*/
    margin: 0 0 0 240px;
    /*padding: 10px 10px;*/
    /*border-radius: 50px;*/
    box-sizing: border-box;
    /*position: relative;*/
    background: #ffffff;
    float: left;
  }

  .sjbox{
    background: #ffffff;
    /*overflow-y: scroll;*/
    /*height: 580px;*/
    width: 392px;
    /*border: 1px solid #bbbbbb;*/
    /*padding-right: 2px;*/
    -webkit-box-shadow:0 0 10px #bbbbbb;
    -moz-box-shadow:0 0 10px #bbbbbb;
    box-shadow:0 0 10px #bbbbbb;
  }
  .btn-yy{
    width: 130px;
    -webkit-box-shadow:0 0 20px #bbbbbb;
    -moz-box-shadow:0 0 20px #bbbbbb;
    box-shadow:0 0 20px #bbbbbb;
  }
</style>
