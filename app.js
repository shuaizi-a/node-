// 加载http fs 模块
var fs = require('fs');
var http = require('http');
var url = require('url')
var template = require('art-template')

// 数据
var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

http
    .createServer(function(req,res) {
        // 获取完整url
        var porseObj = url.parse(req.url,true)

        // 单独获取不包含？字后的内容
        var pathnmae = porseObj.pathname

        if( pathnmae === '/' ){
            fs.readFile('./views/index.html',function(err,data) {
                if( err ){
                    return res.end('404 not Found');
                }

                // 渲染模板
                var htmlStr = template.render(data.toString(), {
                    shuaizi: comments
                })

                // 渲染数据
                res.end(htmlStr)
            })
        }else if(pathnmae === '/post'){
            fs.readFile('./views/post.html',function(err,data) {
                if( err ){
                    return res.end('404 not Found');
                }
                res.end(data); 
            })
        }else if( pathnmae.indexOf('/public/') === 0 ){ //加载样式用的
            //判断如果请求路径是以public开头的则我人你要获取public中的某个资源
            fs.readFile('.' + pathnmae ,function(err,data) {
                if( err ){
                    return res.end('404 not Found');
                }
                res.end(data);
            })
        }else if(pathnmae === '/pinglun'){

            var comment = porseObj.query
            comment.dateTime = '2017-11-2 17:11:22'
            comments.push(comment)

            // 提交从新定向
            res.statusCode = 302
            res.setHeader('Location', '/');
            res.end()

        }else{
            fs.readFile('./views/404.html',function(err,data) {
                if( err ){
                    return res.end('404 not Found');
                }
                res.end(data); 
            })
        }
    })
    .listen(5000,function(){
        console.log('启动成功...')
    })
