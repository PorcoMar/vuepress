---
title: "➹ vuex的理解"
lang: en-US
---

vuex是什么
---
::: danger vuex官方
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
:::

状态管理模式、集中式存储管理 听起来真是很吓人。我所理解的 vuex 就是把需要共享的变量全部存储在一个对象里面，然后将这个对象放在顶层组件中供其他组件使用。


在vue的组件化开发中，经常会遇到需要将当前组件的状态传递给其他组件。父子组件通信时，我们通常会采用 props + emit 这种方式。但当通信双方不是父子组件甚至压根不存在相关联系，或者一个状态需要共享给多个组件时，就会非常麻烦，数据也会相当难维护，这对我们开发来讲就很不友好。vuex 这个时候就很实用，不过在使用vuex之后也带来了更多的概念和框架，需慎重！

### 最基本的vuex代码
``` js{4}
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({
	// 存储状态值
	state: {
		count: 0,
		isBoolean: true
	},
	//操作状态值，提交mutations是更改Vuex状态的唯一方法
	mutations: {
		increment (state ,num) {
			state.count  = state.count + num
		},
		set_count(state, num) {
            commit(num, num);
        }
	},
	//getters可以认为是store的计算属性，getters接收state作为其第一个函数
	getters:{
		personInfo(state) {
            return `count is ${state.count}, boolean is ${state.isBoolean}`;
        }
	},
	actions: {
		nameAsyn({commit}) {
			// new Promise((resolve, reject) => {
            setTimeout(() => {
               commit('increment', 180000)
            }, 3000);
			// })
        }

	}
})
store.commit('increment', 200)
console.log('store.state.count : ',store.state.count)
console.log('store.getters.personInfo : ', store.getters.personInfo)

store.dispatch('nameAsyn')
```
### 五个基本的对象：

* <code>state</code>：存储状态。也就是变量；

* <code>getters</code>：派生状态。也就是set、get中的get，有两个可选参数：state、getters分别可以获取state中的变量和其他的getters。外部调用方式：
* store.getters.personInfo。就和vue的computed差不多；

* <code>mutations</code>：提交状态修改。也就是set、get中的set，这是vuex中唯一修改state的方式，但不支持异步操作。第一个参数默认是state。外部调用方式：* store.commit('increment', 200)。和vue中的methods类似。

* <code>actions</code>：和mutations类似。不过actions支持异步操作。第一个参数默认是和store具有相同参数属性的对象。外部调用方式：store.dispatch('nameAsyn')。

* <code>modules</code>：store的子模块，内容就相当于是store的一个实例。调用方式和前面介绍的相似，只是要加上当前子模块名，如：store.a.getters.xxx()。

### vue-cli中使用vuex
``` js{4}
├── index.html
├── main.js
├── components
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── state.js          # 跟级别的 state
    ├── getters.js        # 跟级别的 getter
    ├── mutation-types.js # 根级别的mutations名称（官方推荐mutions方法名使用大写）
    ├── mutations.js      # 根级别的 mutation
    ├── actions.js        # 根级别的 action
    └── modules
        ├── m1.js         # 模块1
        └── m2.js         # 模块2
```
在根目录下src/store/index.js
``` js{4}
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        show:false
    }
})
```
将store实例挂载到main.js里面的vue上
``` js{4}
import store from './store/index.js';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
```
在vue组件中使用时，我们通常会使用mapGetters、mapActions、mapMutations，然后就可以按照vue调用methods和computed的方式去调用这些变量或函数，示例如下：
``` js{4}
import {mapGetters, mapMutations, mapActions} from 'vuex';

/* 只写组件中的script部分 */
export default {
    computed: {
        ...mapGetters([
            name,
            age
        ])
    },
    methods: {
        ...mapMutations({
            setName: 'SET_NAME',
            setAge: 'SET_AGE'
        }),
        ...mapActions([
            nameAsyn
        ])
    }
};
```