module.exports = {
  head: [
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `https://gitee.com/uploads/6/1023506_PorcoMar.png?1500276509" rel="shortcut icon` }]
  ],
  //网站标题
  title: 'PorcoMar Site',
  // 主页描述
  description: 'Settle 🍀DUO in a golden house~👺',
  // 要部署的仓库名字
  base: '/',
  dest: './.vuepress/dist',
  // 主题配置
  themeConfig: {
    // 导航配置
    nav: [
      // text为导航栏显示文字，link为路径，即文件夹名字，注意不要丢了名字前后的'/'
      {text: 'Home', link: '/'},
      {text: 'Study', link: '/catalog/study/'},
      {text: 'About', link: 'http://www.porcofish.net:1314/'},
      {text: 'Gitee', link: 'https://gitee.com/PorcoMar'},
      {text: 'Github', link: 'https://github.com/PorcoMar?tab=repositories'}
    ],
    // 侧边栏配置,侧边栏组，不同（导航）页面对应不同的侧边栏
    // 以对象形式配置，前边的key为nav处的路径,后边提供一个数组作为此侧边栏中的子标题
    sidebar: 
    {
      '/catalog/study/': genSidebarConfig('开发笔记'),
      // '/catalog/about/': aboutMe('关于我'),
    },
    // 这是嵌套标题链接，自动显示当前激活（导航）页面标题的链接，即显示深度（h1-h6的深度）
    sidebarDepth: 2
  }
}
function genSidebarConfig(title) {
  return [{
    title,
    collapsable: true,
    children: [
      '',
      'vuepress使用说明',
      '微信授权和sdk加密算法',
      'browserify+gulp自动编译打包',
      '使用webpack配置MPA.md',
      'Markdown笔记',
      'vuex的理解',
      'WePY总结',
      'mpvue-docs',
      '一些常用的Linux远程操作命令记录',
      '使用PM2管理Node服务',
      'yarn和npm的比较'
    ]
  }]
}
function aboutMe(title){
  return [{
    title,
    collapsable: true,
    children: [
      '',
      '/catalog/about/second',
    ]
  }]
} 