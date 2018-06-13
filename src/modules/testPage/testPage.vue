<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<template>
  <div>

    <!--<ul>-->
      <!--<li v-for="item in list">{{item.id+'/'+item.name}}</li>-->
    <!--</ul>-->

    <!--<div v-for="item in sortItems">-->
      <!--<test-com :testName="item.name"/>-->
    <!--</div>-->

    <draggable v-model="myArray" :options="{group:'people'}" @start="drag=true" @end="drag=false">
      <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
    </draggable>

    <button @click="dlfun">打乱</button>
  </div>
</template>

<script>

  import TestCom from '../../components/testComponents';
  import draggable from 'vuedraggable'

  export default {
    name: 'selectTemplate',
    data() {
      return {
        myArray: [
          {id: 1, name: '一'},
          {id: 4, name: '四'},
          {id: 3, name: '三'},
          {id: 2, name: '二'},
        ],
        name2: 'abcddddd'
      }
    },
    components: {
      "test-com": TestCom,
      "draggable": draggable
    },
    methods: {
      sortId(a, b){
        return a.id - b.id
      },
      sortItems() {
        console.log(this.list.sort(this.sortId))
        return this.list.sort(this.sortId);
      },
      dlfun(){
//        let list2 = [];
//        list2[0] = this.list[1]
//        list2[1] = this.list[0]
//        this.list = list2;
        alert('dlfun')
      }
    }
  }
</script>
