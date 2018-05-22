---
home: true 
heroImage: https://gitee.com/uploads/6/1023506_PorcoMar.png?1500276509
actionText: My Site →
actionLink: /catalog/study/
features:
footer: MIT Licensed | Copyright © 2018-present Evan You
---
{
  // 没有在souretree里写，写好后npm run build 到dist,在推送
  git init
  git add *   //add * 不能选到.vuepress 要选到.vuepress 必须要 git add .vuepress 所以要选两次
  git commit -m "first commit"
  git remote add origin https://github.com/PorcoMar/vuepress.git
  git push -u origin master

}