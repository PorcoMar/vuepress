module.exports = {
  head: [
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `https://gitee.com/uploads/6/1023506_PorcoMar.png?1500276509" rel="shortcut icon` }]
  ],
  //网站标题
  title: 'PorcoMar world',
  // 主页描述
  description: 'this guy is too lazy to say anything',
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
      {text: 'About', link: '/catalog/about/'},
      {text: 'Gitee', link: 'https://gitee.com/PorcoMar/events'},
      {text: 'Github', link: 'https://github.com/PorcoMar'}
    ],
    // 侧边栏配置,侧边栏组，不同（导航）页面对应不同的侧边栏
    // 以对象形式配置，前边的key为nav处的路径,后边提供一个数组作为此侧边栏中的子标题
    sidebar: 
    {
      '/catalog/study/': genSidebarConfig('开发笔记'),
      '/catalog/about/': aboutMe('关于我'),
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
      '使用 webpack3 配置多页应用',
      'Markdown写法'
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