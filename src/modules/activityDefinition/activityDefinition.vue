<style lang="scss" rel="stylesheet/scss" scoped>
  .from-box {
    width: 52%;
    margin: auto;
  }

  .custom-lab {
    width: 100px;
    text-align: right;
    font-size: 14px;
    color: #5a5e66;
    float: left;
    padding-right: 12px;
    box-sizing: border-box;
  }
</style>

<template>
  <div>
    <el-steps :active="1" finish-status="success" process-status="finish" align-center>
      <el-step title="选择模板"></el-step>
      <el-step title="活动定义"></el-step>
      <el-step title="页面配置"></el-step>
    </el-steps>
    <br/>
    <br/>
    <br/>
    <div class="from-box">

      <el-form size="medium" ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="form.activityName"></el-input>
        </el-form-item>

        <el-form-item label="活动时间" prop="activityTime">
          <el-date-picker
                  v-model="form.activityTime"
                  :picker-options="pickerOptions0"
                  type="datetimerange"
                  range-separator="至"
                  :editable="false"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="页面标题" prop="pageTitle">
          <el-input v-model="form.pageTitle" placeholder="页面标题，最多30个字符"></el-input>
        </el-form-item>

        <el-form-item label="页面描述" prop="pageDesc">
          <el-input type="textarea" v-model="form.pageDesc"></el-input>
        </el-form-item>

        <el-form-item label="页面关键词" prop="pageKey">
          <el-input v-model="form.pageKey"></el-input>
        </el-form-item>

        <el-form-item label="分享标题" prop="shareTitle">
          <el-input v-model="form.shareTitle" placeholder="分享标题，最多20个字符"></el-input>
        </el-form-item>

        <el-form-item label="分享内容" prop="shareContent">
          <el-input v-model="form.shareContent" placeholder="分享内容，最多50个字符"></el-input>
        </el-form-item>

        <div style="display: inline-block;">
          <div class="custom-lab"><span style="color:#fa5555">*</span>&nbsp;分享图片</div>
          <div style="float: left;width:490px">
            <div v-if="formStatus==0">
              <elupload-ass key="imgnull"
                            assName="shareImage"
                            actionUrl="/api-aps/up/file/uploadImage/0/100/100/100/100"
                            title="只能上传JPG/GIF/PNG文件，100*100"
                            :defaultUrl="null"
                            v-on:listShowChildVal="saveImgUrl"></elupload-ass>
            </div>
            <div v-if="formStatus==1">
              <elupload-ass key="imgyes"
                            assName="shareImage"
                            actionUrl="/api-aps/up/file/uploadImage/0/100/100/100/100"
                            title="只能上传JPG/GIF/PNG文件，100*100"
                            :defaultUrl="form.shareImage"
                            v-on:listShowChildVal="saveImgUrl"></elupload-ass>
            </div>
          </div>
        </div>

        <el-form-item style="clear: both;margin-top: 50px">
          <el-row type="flex" class="row-bg" justify="center">
            <el-button size="small" @click="onSubmit('form')">保存</el-button>
            <el-button size="small" type="primary" @click="onSubmitNext('form')">保存并下一步</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>

  import Http from '../../api/CommonApi';
  import Util from '../../utils/util';
  import EluploadAssembly from '../../components/eluploadAssembly';

  export default {
    name: 'selectTemplate',
    data() {
      let validatorTime = (rule, value, callback) => {
        if(!!value){
          console.log(new Date().getTime())
          if(value[0].getTime()<new Date().getTime()){
            callback(new Error('活动开始时间必须大于当前时间'));
          }else{
            console.log(value[0],value[1])
            if(value[0].getTime()>value[1].getTime()){
              callback('活动开始时间必须小于活动结束时间');
            }else{
              callback();
            }
          }
        }else{
          callback(new Error('请选择时间'));
        }
//        if (this.oneform.banneTriggerType == 2 && !!this.oneform.bannerLink) {
//          callback();
//        } else {
//          callback(new Error('请输入跳转链接'));
//        }
      };
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < (Date.now() - 86400000);
          }
        },
        formStatus: 0,//0创建  1 编辑模式
        form: {
          id: '',
          activityName: '',
          activityTime: '',
          startTime: '',
          endTime: '',
          pageTitle: '',
          pageDesc: '',
          pageKey: '',
          shareTitle: '',//分享标题
          shareContent: '',//分享内容
          shareImage: '',//分享图片
          urlLink: '',
        },
        rules: {
          activityName: [
            {required: true, message: '请输入活动名称', trigger: 'blur'}
          ],
          activityTime: [
            {required: true, validator: validatorTime, trigger: 'blur'}
//            {type: 'array', required: true, message: '请选择日期', trigger: 'blur'}
          ],
          pageTitle: [
            {required: true, message: '请输入活动描述', trigger: 'blur'},
            {max: 30, message: '最多 30 个字符', trigger: 'blur'}
          ],
          pageDesc: [
            {required: true, message: '请输入页面描述', trigger: 'blur'}
          ],
          pageKey: [
            {required: true, message: '请输入关键字', trigger: 'blur'}
          ],
          shareTitle: [
            {required: true, message: '请输入分享标题', trigger: 'blur'},
            {max: 20, message: '最多 20 个字符', trigger: 'blur'}
          ],
          shareContent: [
            {required: true, message: '请输入分享内容', trigger: 'blur'},
            {max: 50, message: '最多 50 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      const t = this;
      //编辑
      if (!!t.$route.query.id) {
        console.log('进入编辑')
        let loadingInstance = t.$loading({ fullscreen: true });//loading
        t.form.id = t.$route.query.id;

        Http.getActivity(t.form.id).then((data)=> {
          loadingInstance.close();//loading关闭
          if (data.code == 200) {
            t.form.activityName = data.dataMap.activityName;
            t.form.activityTime = [new Date(parseInt(data.dataMap.startTime)), new Date(parseInt(data.dataMap.endTime))];
//            t.form.startTime= '';
//            t.form.endTime= '';
            t.form.pageTitle = data.dataMap.pageTitle;
            t.form.pageDesc = data.dataMap.pageDesc;
            t.form.pageKey = data.dataMap.pageKey;
            t.form.shareTitle = data.dataMap.shareTitle;//分享标题
            t.form.shareContent = data.dataMap.shareContent;//分享内容
            t.form.shareImage = data.dataMap.shareImage;//分享图片
            t.formStatus = 1;
          } else {
            t.$message.error('获取数据失败!' + data.message);
          }
        })
      }
    },
    components: {
      "elupload-ass": EluploadAssembly
    },
    methods: {

      nextStep(){
//        this.$router.push('/activityManage')
      },
      submitForm(formName,type){
        const t = this;
        console.log(type)
        this.$refs[formName].validate((valid) => {

          if (!!valid) {
            let paramData = t.form;

            if (!paramData.shareImage) {
              t.$message.error('请先上传分享图片!');
              return false;
            }

            if(paramData.activityTime[0].getTime() > paramData.activityTime[1].getTime()){
              t.$message.error('活动开始时间必须小于活动结束时间!');
              return false;
            }

            paramData.startTime = paramData.activityTime[0].getTime();
            paramData.endTime = paramData.activityTime[1].getTime();

            //编辑模式
            if (t.formStatus == 1) {
              Http.updateActivity(paramData).then((data)=> {
                console.log(data)
                if (data.code == 200) {
                  console.log('修改成功')
                  t.$message.success('修改成功');
                  if(!!type){
                    sessionStorage.setItem('activityName',t.form.activityName)
                    sessionStorage.setItem('activityTime', (Util.transformTime(paramData.startTime)+' ~ '+Util.transformTime(paramData.endTime)));
                    t.$router.push({path:'/pageConfigure',query: {id: t.form.id}});//到活动详情
                  }
                } else {
                  t.$message.error(data.message);
                }
              })
            } else {
              Http.creatActivity(paramData).then((data)=> {
                console.log(data)
                if (data.code == 200) {
                  t.$message.success('保存成功');
                  t.form.id = data.dataMap;
                  t.formStatus = "1";
                  if(!!type){
                    sessionStorage.setItem('activityName',t.form.activityName)
                    sessionStorage.setItem('activityTime', (Util.transformTime(paramData.startTime)+' ~ '+Util.transformTime(paramData.endTime)));
                    t.$router.push({path:'/pageConfigure',query: {id: t.form.id}});//到活动详情
                  }
                  if(!!type){
                    t.$router.push({path:'/pageConfigure',query: {id: t.form.id}});//到活动详情
                  }
                } else {
                  t.$message.error(data.message);
                }
              })
            }

          } else {
            t.$message.error('请完善表单数据!');
          }
        })
      },
      //保存
      onSubmit(formName) {
        const t = this;
        t.submitForm(formName);
      },
      //保存并下一步
      onSubmitNext(formName) {
        const t = this;
        t.submitForm(formName,'1');
      },
      //保存图片路径
      saveImgUrl(res){
        const t = this;
        t.form.shareImage = res.url;
      }
    }
  }
</script>

