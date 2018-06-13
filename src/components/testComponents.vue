<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<template>
  <div>{{testName}}</div>
</template>

<script>

  export default {
    name: 'testCom',
    props: ['testName'],
    data() {
      return {
        name: '1'
      }
    }
  }
</script>