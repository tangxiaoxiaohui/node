// 随机数
function randomNumber (min, max) {
	const num = parseInt(Math.random() * (max - min + 1) + min);
	// console.log('randomNumber',num)
	return num;
}

// 随机时间函数
function randomTimeFun (min, max, fun) {
	return setTimeout(fun,randomNumber(min, max) * 1000)
}

// 异步随机时间函数
async function randomTimeFunAsync (min, max, fun) {
	return await new Promise((resolve, reject) => {
    	const timer = setTimeout(() => {
			fun();
			resolve(timer)
		},randomNumber(min, max) * 1000)
    })
}

// 推送列表
const [messageMin,messageMax] = [1,5];
const [targetMin,targetMax] = [1,5];
const messageList = ['m1','m2','m3','m4','m5']
const targetList = ['t1','t2','t3','t4','t5']

// 开始推送消息列表
async function pushTargetList () {
	for (let target of targetList) {
		await randomTimeFunAsync(targetMin,targetMax,pushTarget.bind(null,target));
		console.log("推送好友",target)
	}
}

// 开始推送消息
async function pushTarget (target) {
	await pushMessageList(target)
}

// 推送消息列表
async function pushMessageList (target) {
	for (let message of messageList) {
		await sendMessage(target,message)
	}
}

// 推送消息
async function sendMessage (target,message) {
	await randomTimeFunAsync(messageMin,messageMax,() => {
		console.log("推送消息",target,message)
	})
}

pushTargetList();