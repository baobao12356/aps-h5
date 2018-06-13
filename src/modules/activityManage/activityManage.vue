<template>
  <div>
    <el-row type="flex" class="row-bg" justify="end">
      <div v-if="assessEntity.apsupactivitycreateActivity"><el-button type="primary" @click="nextStep">创建活动</el-button></div>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="tabsClick">
      <el-tab-pane v-if="userInfo.ownerType==1" key="jt" label="平台活动" name="1" >
        <tab-list propActiveName="1" :ownerType="userInfo.ownerType"></tab-list>
      </el-tab-pane>
      <el-tab-pane key="sc" label="商场活动" name="2">
        <tab-list propActiveName="2" :ownerType="userInfo.ownerType"></tab-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  import Http from '../../api/CommonApi';
  import Util from '../../utils/util';
  import TabList from '../../components/tabList'

  export default {
    name: 'activityManage',
    data() {
      return {
        activeName: '2',
        assessEntity: {},
        userInfo: {
          ownerType: 2
        },
      }
    },
    created() {
      let t = this;
      t.assessEntity = Util.getUrmsButton('accessCodesEnty');
      Http.getUserInfo().then((data)=>{
//        console.log(data)
        if(data.code==200){
          t.userInfo = Object.assign({}, data.dataMap);
          sessionStorage.setItem('userInfo',JSON.stringify(t.userInfo));
          if(t.userInfo.ownerType==1){
            t.activeName="1";
          }
//          console.log(t.userInfo)
        }else{
          t.$message.error('获取必要参数失败！'+data.message);
        }
      })

    },
    components:{
      "tab-list": TabList
    },
    methods: {
      nextStep(){
        this.$router.push('/selectTemplate');//到活动定义
      },
      //切换标签页
      tabsClick(tab,event){
        console.log('切换',tab.label);
           console.log(this,'this是什么');
        console.log( this.$router,' this.$router是什么');
      },

    }
  }
</script>
