<style lang="scss" rel="stylesheet/scss" scoped>

</style>

<template>
  <div>
    <div >
      <el-steps :active="active" finish-status="success" process-status="finish" align-center >
        <el-step title="选择模板"></el-step>
        <el-step title="活动定义"></el-step>
        <el-step title="页面配置"></el-step>
      </el-steps>

      <br/>
      <br/>
      <br/>
      <el-row>
        <el-col :span="6" :offset="6"><el-radio v-model="radio" label="1">自定义模板</el-radio></el-col>
      </el-row>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <el-row type="flex" class="row-bg" justify="center">
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </el-row>

    </div>


  </div>
</template>

<script>

  import Http from '../../api/CommonApi'

  export default {
    name: 'selectTemplate',
    data() {
      return {
        active: 0,
        radio: "1"
      }
    },
    created() {
      var _this = this;
    },
    methods:{
      nextStep(){
        console.log(this.radio);
        this.$router.push('/activityDefinition');//到活动定义
      }
    }
  }
</script>

