const fs = require('fs');
const net = require('net');

const server = net.createServer();
server.listen(8080,'127.0.0.1');

server.on('listening',function(){
	console.log('服务器已启动');
});

server.on('connection',function(socket){
	console.log('有新的连接');
    socket.setTimeout(2000);
	socket.on('data',function(request){
        request = request.toString();
		const fileName = request.split('/r/n')[0].split(' ')[1];
		console.log(fileName);
        socket.write('HTTP/1.1 200 OK\r\n\r\n');
        const fileData = fs.readFileSync('../node.html');
        socket.write(fileData);
        socket.end();
	});
    socket.on('close',function(){
    	console.log('socket已关闭');
	});
    socket.on('setTimeout',function(){
        console.log('socket连接超时');
        socket.end()
    });
});