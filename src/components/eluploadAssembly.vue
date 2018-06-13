<template>
  <div>
    <el-upload
            class="upload-demo"
            :name="actname2"
            :action="actionUrl2"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :on-remove="removeImg"
            :on-preview="imgPreview"
            :on-error="imgError"
            :file-list="imgList2"
            :on-exceed="onExceed"
            :on-change="handleChange"
            list-type="picture">
      <el-button size="mini">点击上传</el-button>
      <div slot="tip" class="el-upload__tip" style="float: right;">&nbsp;&nbsp;{{title2}}</div>
    </el-upload>
  </div>
</template>

<script>

  export default {
    name: 'eluploadAss',
    props: ['assName','actionUrl','title','defaultUrl'],
    data() {
      return {
        assName2: this.assName,
        title2: this.title,
        actionUrl2: this.actionUrl,
        actname2:'multiFile',
        imgList2: [],
//        imgUrl: '',//上传成功后获得的url地址
      };
    },
    created(){
      if(!!this.defaultUrl){
        this.imgList2.push({name: '已保存的',url: this.defaultUrl});
      }
    },
    methods:{
      beforeAvatarUpload(file) {
        console.log('beforeAvatarUpload', file)
        let isJPG = false;
        if(file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif'){
          isJPG = true;
        }

        let isLt2M = file.size

        if (!isJPG) {
          this.$message.error('只能上传JPG/GIF/PNG文件');
          return false;
        }

        return true;
      },
      //3 文件上传成功时的钩子
      handleAvatarSuccess(res, file, fileList) {
        console.log('on-success',res, file, fileList)
        const t = this;
//        if (res.code == 200) {
//          let imgEntity = {
//            name: file.name,
//            url: res.dataMap
//          }
//          t.imgList2 = [imgEntity];
//          t.imgUrl = res.dataMap;
//          t.$emit('listShowChildVal',{name: t.assName2,url: res.dataMap});//保存url
//        } else {
//          if(!!t.imgList2 && t.imgList2.length>0){
//            t.imgList2 = [...t.imgList2];
//            t.$message.error('替换失败，'+file.response.message);
//          }else{
//            t.imgList2 = [];
//            t.imgUrl = '';
//            t.$emit('listShowChildVal',{name: t.assName2,url: ''});//保存url
//            t.$message.error(res.message);
//          }
//        }
      },
      //移除已上传的文件
      removeImg(file, fileList){
        console.log('移除已上传的图片')
        this.imgList2 = [];
        this.$emit('listShowChildVal',{name: this.assName2,url: ''});//保存url
      },
      //点击已上传的
      imgPreview(file){
//        console.log(file)
      },
      imgError(res){
        console.log(res)
      },
      onExceed(files, fileList){
        console.log('onExceed',files, fileList)
//        this.imgList2 = [];
//        this.imgUrl = '';
//        this.$emit('listShowChildVal',{name: this.assName2,url: ''});//保存url
      },
      handleChange(file, fileList){
        console.log(' on-change  handleChange ----------------------------------------')
        console.log(file, fileList)
        console.log('defaultUrl ' ,this.defaultUrl)
        const t = this;
        const res = file.response;
        console.log(res)
        if(!!res){
          if (res.code == 200) {
            let imgEntity = {
              name: file.name,
              url: file.response.dataMap
            }
            t.imgList2 = [imgEntity];
            t.$emit('listShowChildVal',{name: t.assName2,url: file.response.dataMap});//保存url
          } else {
            if(!!t.imgList2 && t.imgList2.length>0){
              t.imgList2 = [...t.imgList2];
              t.$message.error('替换失败，'+file.response.message);
            }else{
              t.imgList2 = [];
              t.$emit('listShowChildVal',{name: t.assName2,url: ''});//保存url
              t.$message.error(res.message);
            }
          }
        }

      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
