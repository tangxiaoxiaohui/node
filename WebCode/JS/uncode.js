let chat,str;
for(let i = 1;i<45960;i++){
	chat = '%u'+`${i.toString(16)}`.padStart(4, '0'); 
    str += unescape(chat);
}
console.log(str);