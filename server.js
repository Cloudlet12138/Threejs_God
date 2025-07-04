const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// 使用 express.static 来托管 public 文件夹
app.use(express.static(path.join(__dirname, 'public')));

// 设置路由处理没有 .html 后缀的请求
app.get('/:file', (req, res) => {
    const file = req.params.file;
    res.sendFile(path.join(__dirname, 'public', `${file}.html`));  // 自动加上 .html 后缀并返回文件
});

// 启动服务器并监听端口
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
