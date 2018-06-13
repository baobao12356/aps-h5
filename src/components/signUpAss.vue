<template>
  <div style="position: relative;">
    <div class="one-btn-box" :style="{'background-image':'url(\''+oneform.bannerImage+'\')'}">
      <p class="sus-p" @click="showMe(assSort)" :style="showSort==assSort ? showSty : ''">{{showSort==assSort ? '正在编辑' : '点击编辑'}}</p>
      <!--<img v-if="!!oneform.bannerImage" :src="oneform.bannerImage" width="100%" height="100%" border="0" class="banner-img">-->
      <span v-if="isSave" class="is-save">已保存</span>

      <div style="width: 80%;margin: auto;margin-top: 20px">
        <div v-if="ownerType==1 && !!radioField">
          <span class="sign-tit">{{radioField=='1' ? '城市' : '商场'}}：</span>
          <!--<el-select  key="city" style="width: 100%" v-model="value2" :placeholder="'请选择'+(radioField=='1' ? '城市' : '商场')" size="small" >-->
            <!--<el-option-->
                    <!--v-for="item in cityOptions"-->
                    <!--:key="item"-->
                    <!--:label="item"-->
                    <!--:value="item">-->
            <!--</el-option>-->
          <!--</el-select>-->
          <el-input size="small"
                    placeholder="请选择"
                    suffix-icon="el-icon-arrow-down"
                    v-model="value2">
          </el-input>
        </div>

        <div v-if="checkedname">
          <span class="sign-tit">您的姓名：</span>
          <el-input size="small" placeholder="请输入您的姓名"></el-input>
        </div>
        <div v-if="checkedphone">
          <span class="sign-tit">您的号码：</span>
          <el-input size="small" placeholder="请输入手机号码"></el-input>
        </div>

      </div>
      <el-button class="one-btn-cl"
                 :style="{'background-image':'url(\''+oneform.image+'\')','background-size':'cover'}">按钮</el-button>



      <el-popover
              placement="top"
              width="150"
              trigger="click"
              title="确认删除该组件？"
              v-model="visible">
        <el-button size="mini" type="text" @click="deleteAss(assSort)">确定</el-button>
        <el-button size="mini" type="text" @click="visible=false">取消</el-button>
        <span slot="reference" class="btn-delete" size="mini">删除</span>
      </el-popover>
    </div>

    <div class="one-con" v-if="showSort==assSort">
      <p style="color: #ff4400;margin:0;font-size: 15px;"><i class="el-icon-warning"></i> 编辑完成之后请点击保存</p>
      <span class="title-sp">banner设置</span>

      <el-form size="mini" ref="form" :model="oneform" :rules="rules" label-width="80px">
        <div style="display: inline-block;margin-bottom: 10px">
          <span class="lab-sp">banner图</span>
          <div class="right-con">
            <elupload-ass assName="bannerImage"
                          actionUrl="/api-aps/up/file/uploadImage/0/750/750/350/640"
                          title="750*(350-640)"
                          :defaultUrl="oneform.bannerImage"
                          v-on:listShowChildVal="saveImgUrl"></elupload-ass>
          </div>
        </div>
        <div style="display: inline-block;margin-bottom: 10px">
          <span class="lab-sp">按钮图片</span>
          <div class="right-con">
            <elupload-ass assName="image"
                          actionUrl="/api-aps/up/file/uploadImage/0/686/686/84/84"
                          title="686*84"
                          :defaultUrl="oneform.image"
                          v-on:listShowChildVal="saveImgUrl"></elupload-ass>
          </div>
        </div>

        <span class="title-sp">字段设置</span>

        <div v-if="ownerType==1">
          <el-radio style="margin-left: 20px" v-model="radioField" label="1">城市</el-radio>
          <el-radio style="margin-left: 20px" v-model="radioField" label="2">商场</el-radio>
          <div v-if="!!radioField" style="margin: 10px 0;">
            <el-tag :key="tag"
                    v-for="tag in (radioField==1 ? oneform.dynamicTags : oneform.dynamicTags2)"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+{{radioField==1 ? '城市' : '商场'}}</el-button>
          </div>
        </div>

        <el-checkbox style="margin-left: 20px" v-model="checkedname">姓名</el-checkbox>
        <el-checkbox style="margin-left: 20px" v-model="checkedphone">手机</el-checkbox>

        <span class="title-sp">弹层按钮设置</span>

        <el-form-item label="提示内容" prop="alertContent">
          <el-input type="textarea" v-model="oneform.alertContent"></el-input>
        </el-form-item>

        <el-form-item label="跳转链接" prop="jumpAddress">
          <el-input type="textarea" v-model="oneform.jumpAddress"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
          <el-button @click="showMe('')">关闭窗口</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>


<script>

  import Http from '../api/CommonApi';
  import Util from '../utils/util';
  import EluploadAssembly from './eluploadAssembly';

  export default {
    name: 'signUpAss',
    props: ['assSort','showSort','ownerType','oneform2'],
    data() {
      let valAlertContent2 = (rule, value, callback) => {
//        console.log(this.oneform.alertContent)
        if (!!this.oneform.alertContent) {
          if(this.oneform.alertContent.length>800){
            callback(new Error('最多800个字符'));
          }else{
            callback();
          }
        }else{
          callback(new Error('请输入'));
        }
      };
      //按钮跳转链接验证
      let valJumpAddress = (rule, value, callback) => {
        if (!!value) {
          if(Util.regUrl(value)){
            if(value.length>500){
              callback(new Error('最多500个字符'));
            }else{
              callback();
            }
          }else{
            callback(new Error('请输入正确的url'));
          }
        } else {
          callback();
        }
      };
      return {
        name: '1',
        isSave: false,
        visible: false,
        oneform: {
          bannerImage:'',
          image:'',//按钮图
          dynamicTags: [],
          dynamicTags2: [],
          alertContent: '',
          jumpAddress: '',
        },
        showSty:{
          background:'#409EFF',
          color:'#fff'
        },
        checkedname: false,
        checkedphone: false,
        radioField: '',
        inputVisible: false,
        inputValue: '',
        rules:{
          alertContent:[
            { required: true, message: '请输入', trigger: 'blur' },
            { validator: valAlertContent2, trigger: 'blur'}
          ],
          jumpAddress:[
            { validator: valJumpAddress, trigger: 'blur'}
          ],
        }
      }
    },
    created(){
      const t = this;

      const newOneForm = Util.cloneFun(t.oneform2);
      console.log(newOneForm)
      if (!!newOneForm) {
        newOneForm.banneTriggerType = '1';
        newOneForm.bannerImage = newOneForm.bannerImage || '';

        let elementConfigList = [];
        if(!!newOneForm.activityElementConfigVOList && newOneForm.activityElementConfigVOList.length > 0){
          elementConfigList = newOneForm.activityElementConfigVOList;
        }else if(!!newOneForm.activityElementConfigODTOList && newOneForm.activityElementConfigODTOList.length > 0){
          elementConfigList = newOneForm.activityElementConfigODTOList;
        }

        if (!!elementConfigList && elementConfigList.length > 0) {
          newOneForm.image = elementConfigList[0].image;
          newOneForm.alertContent = elementConfigList[0].alertContent;
          newOneForm.jumpAddress = elementConfigList[0].jumpAddress;

          let isCity = false;
          let isMall = false;
          console.log(elementConfigList[0].activityExtendFieldList);
          if(!!elementConfigList[0].activityExtendFieldList && elementConfigList[0].activityExtendFieldList.length>0){
            //fieldType 1.城市 2.商场 3.姓名 4.手机号,
            elementConfigList[0].activityExtendFieldList.forEach((data)=>{
              if(data.fieldType==1){
                //城市
                t.radioField = '1';
                !!data.fieldValue ? (newOneForm.dynamicTags = data.fieldValue.split('|')) : null;
                newOneForm.dynamicTags2=[];
                isCity=true;
              }
              if(data.fieldType==2){
                //商场
                t.radioField = '2';
                !!data.fieldValue ? (newOneForm.dynamicTags2 = data.fieldValue.split('|')) : null;
                newOneForm.dynamicTags=[];
                isMall=true;
              }
              if(data.fieldType==3){
                //姓名
                t.checkedname = true;
              }
              if(data.fieldType==4){
                //手机号
                t.checkedphone = true;
              }
            });
          }
          if(t.ownerType==2){
            t.radioField='';
            newOneForm.dynamicTags = [];
            newOneForm.dynamicTags2 = [];
          }else if(t.ownerType==1){

            if(!t.radioField){
              //集团
              if(!isCity){
                t.radioField='';
                newOneForm.dynamicTags = [];
              }
              if(!isMall){
                t.radioField='';
                newOneForm.dynamicTags2 = [];
              }
            }

          }
        }else{
          t.checkedname = false;
          t.checkedphone = false;
          t.radioField='';
          newOneForm.dynamicTags = [];
          newOneForm.dynamicTags2 = [];
          newOneForm.image = '';
          newOneForm.alertContent = '';
          newOneForm.jumpAddress = '';
          if(t.ownerType==1){
            t.radioField='1';
          }
        }
      }
      t.cityOptions = [];
      t.value2 = '';

      console.log('newOneForm')
      console.log(newOneForm);

      t.oneform = newOneForm;
    },
    components: {
      "elupload-ass": EluploadAssembly
    },
    methods: {
      showMe(val){
        this.$emit('listShowAss', val);//保存url
        event.cancelBubble = true;//阻止事件冒泡
      },
      //删除该组件
      deleteAss(val){
        this.$emit('listDeleteAss', val);
        event.cancelBubble = true;//阻止事件冒泡
      },
      //保存图片路径
      saveImgUrl(res){
        const t = this;
        console.log(res)
        if (res.name == "bannerImage") {
          t.oneform.bannerImage = res.url;
        } else if(res.name=="oneBtn"){
          t.oneform.image = res.url;
        }else if(res.name=="applyBanner"){
          t.oneform.applyBanner = res.url;
        }else if(res.name=="image"){
          t.oneform.image = res.url;
        }
      },
      submitForm(formName){
        const t = this;
        t.$refs[formName].validate((valid) => {

          if (!t.oneform.bannerImage) {
            t.$message.error('请先上传banner图');
            return false;
          }
          if (!t.oneform.image) {
            t.$message.error('请先上传按钮图');
            return false;
          }

          if(t.ownerType==1 && t.radioField==1){
            if(!t.oneform.dynamicTags || t.oneform.dynamicTags.length==0){
              t.$message.error('请先添加城市');
              return false;
            }
          }else if(t.ownerType==1 && t.radioField==2){
            if(!t.oneform.dynamicTags2 || t.oneform.dynamicTags2.length==0){
              t.$message.error('请先添加商场');
              return false;
            }
          }


          /**
           * 弹层字段设置
           * fieldType 1.城市 2.商场 3.姓名 4.手机号,
           */
          let activityExtendFieldList=[];//弹层字段list

          if(t.checkedname){
            activityExtendFieldList.push({fieldType:'3'});
          }
          if(t.checkedphone){
            activityExtendFieldList.push({fieldType:'4'});
          }
          if(t.radioField==1){
            let fieldEn={
              fieldType:'1',
              fieldValue: t.oneform.dynamicTags.join('|')
            }
            activityExtendFieldList.push(fieldEn);
          }else if(t.radioField==2){
            let fieldEn={
              fieldType:'2',
              fieldValue: t.oneform.dynamicTags2.join('|')
            }
            activityExtendFieldList.push(fieldEn);
          }

          if(activityExtendFieldList.length==0){
            t.$message.error('请至少选择一个弹层字段');
            return false;
          }

          const afferentParam = {};
          afferentParam.sort = t.assSort;//排序号
          afferentParam.elementType = 3;//单报名组件
          afferentParam.bannerImage = t.oneform.bannerImage;//banner图
          afferentParam.banneTriggerType = '1';
          afferentParam.activityElementConfigVOList = [];
          afferentParam.styleType = "1";//样式1

          const btnParam = {};//按钮信息
          btnParam.sort = 1;
          btnParam.configType = 2;//类型  1 按钮
          btnParam.image = t.oneform.image;//按钮图
//          btnParam.position = t.oneform.position;//按钮位置
          btnParam.triggerType = 3;//按钮 1.跳转链接 2.弹框 3.报名
          btnParam.jumpAddress = t.oneform.jumpAddress;//跳转链接
          btnParam.alertContent = t.oneform.alertContent;//内容

          btnParam.activityExtendFieldList = activityExtendFieldList;

          afferentParam.activityElementConfigVOList.push(btnParam);

          afferentParam.id = t.oneform2.id;
          console.log(afferentParam);
          t.isSave = true;
          t.$emit('listSaveAss', afferentParam);
          t.$emit('listShowAss', '');//显示
          event.cancelBubble = true;//阻止事件冒泡

        });
      },
      //删除标签
      handleClose(tag) {
        if(this.radioField==1){
          this.oneform.dynamicTags.splice(this.oneform.dynamicTags.indexOf(tag), 1);
//          this.cityOptions = Util.cloneFun(this.oneform.dynamicTags)
        }else{
          this.oneform.dynamicTags2.splice(this.oneform.dynamicTags2.indexOf(tag), 1);
//          this.cityOptions = Util.cloneFun(this.oneform.dynamicTags2)
        }

      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          if(this.radioField==1){
            this.oneform.dynamicTags.push(inputValue);
//            this.cityOptions = Util.cloneFun(this.oneform.dynamicTags)
          }else{
            this.oneform.dynamicTags2.push(inputValue);
//            this.cityOptions = Util.cloneFun(this.oneform.dynamicTags2)
          }
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .one-btn-box {
    width: 100%;
    height: auto;
    margin: 0px 0; //后面删掉
    padding-top: 20px;
    position: relative;
    background: #f7f7f7;
    min-height: 100px;
    box-sizing: border-box;
    background-size: cover;
  }

  .banner-img {
    float: left;
    border: none;
  }
  .sign-tit{
    display: block;
    box-sizing: border-box;
    padding-left: 8px;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 3px;
  }

  .el-tag{
    margin-left: 10px;
    height: 24px;
    line-height: 24px;
    margin-bottom: 8px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 24px;
    line-height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .is-save{
    position: absolute;
    color: #fff;
    display: block;
    padding: 6px 10px;
    background: #67c23a;
    top: 8px;
    left: 0px;
  }

  //删除按钮
  .btn-delete {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 40px;
    background: #3c3c3c;
    color: #fff;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }

  .one-btn-cl {
    width: 80%;
    height: 32px;
    margin: 30px;
    margin-left: 10%;
  }

  .sus-p {
    position: absolute;
    top: 0px;
    width: 100%;
    text-align: center;
    background: #eeeeee;
    color: #3c3c3c;
    cursor: pointer;
  }

  .one-con {
    position: absolute;
    width: 340px;
    height: 690px;
    top: 0px;
    right: -355px;
    border: 1px solid #bbbbbb;
    overflow: scroll;
    border-radius: 2px;
    padding: 10px 10px;
    box-sizing: border-box;

    .con-th {
      width: 100%;
      margin-bottom: 10px;
    }
    .title-sp {
      display: inline-block;
      width: 100%;
      height: 25px;
      line-height: 25px;
      padding-left: 10px;
      box-sizing: border-box;
      background: #eeeeee;
      margin-bottom: 10px;
    }

    .lab-sp {
      width: 80px;
      box-sizing: border-box;
      text-align: right;
      float: left;
      padding-right: 12px;
      color: #5a5e66
    }
    .right-con {
      float: left;
      width: 200px;
    }
  }
</style>