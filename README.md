## 简介

简单快捷为网站添加推送到 Firekylin 博客

## 使用方法

需要用户输入 Firekylin 博客地址，和 app_key, app_secret 三个参数，代码使用方法如下：

    var push2Firekylin = require('push-to-firekylin');

    var p2fk = new push2Firekylin(url, app_key, app_secret);

    //用户输入信息之后先调用认证接口
    var result = p2fk.authorize();
    if( !result.errno ) {
      console.log('认证成功');
    }

    //发布文章的时候直接调用 push 接口
    var post = {
      status: 3,
      title: 'Hello World!',
      pathname: 'hello-world',
      markdown_content: '## 你好世界',
    }
    let result = p2fk.push(post);
    if( !result.errno ) {
      console.log('推送成功');
    }
