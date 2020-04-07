/* eslint-disable no-console */

// 当前任务状态
const PUSH_STARE = {
	READY: 0,   // 就绪
	ALIVE: 1,   // 激活
	PAUSE: 2,   // 暂停
	FINISH: 3,  // 完结
};

// 随机数
function randomNumber(min, max) {
	return parseInt(Math.random() * (max - min + 1) + min);
}

// 随机时间函数
function randomTimeFun (min, max, fun, timers) {
	const timer = setTimeout(fun,randomNumber(min, max) * 1000);
	timers.push(timer);
	return timer;
}

// 同步随机时间函数
async function randomTimeFunAsync(min, max, fun, timers, isAsync) {
	return await new Promise((resolve) => {
		const task = () => {
			try {
				fun();
			} catch (e) {
				// todo 函数执行失败
			}
			resolve(timer)
		};

		const asyncTask = async () => {
			try {
				await fun();
			} catch (e) {
				// todo 函数执行失败
			}
			resolve(timer)
		};
		const timer = setTimeout(isAsync ? task : asyncTask, randomNumber(min, max) * 1000);
		timers.push(timer);
	})
}

class PushTask {
	// 推送状态 0: 未开启 1:已开启 2:暂停 3:执行完毕
	pushState = PUSH_STARE.READY;
	// 任务状态
	taskState = {
		// 全部推送 好友/群聊 数
		allTarget: 0,
		// 已完成推送的 好友/群聊 数
		finishTarget: 0,
		// 全部推送 消息 数
		allMessages: 0,
		// 已推送的消息
		finishMessage: 0,
	};
	// 继续推送任务
	resumeList = [];
	// 当前的定时器列表
	timers = [];


	/**
	 * 构造函数, 用于初始化对象
	 * @param messageMin 消息间隔最小时间
	 * @param messageMax 消息间隔最大时间
	 * @param targetMin 好友/群聊 间隔最小时间
	 * @param targetMax 好友/群聊 间隔最大时间
	 * @param messageList 消息列表
	 * @param targetList 好友/群聊 列表
	 * @param pushTaskFunction 推送函数
	 * @param isAsync 是否同步发送 true: 同步 false: 不同步
	 */
	constructor({messageMin, messageMax, targetMin, targetMax, messageList, targetList, isAsync} = {}) {
		// 是否同步发送
		this.isAsync = isAsync || false;

		// 推送数据
		this.messageMin = messageMin || 3; // 消息间隔最小时间
		this.messageMax = messageMax || 5; // 消息间隔最大时间
		this.targetMin = targetMin || 3;  // 好友/群聊 间隔最小时间
		this.targetMax = targetMax || 5;  // 好友/群聊 间隔最大时间
		this.messageList = messageList || []; // 消息列表
		this.targetList = targetList || []; // 好友/群聊 列表
	}

	/**
	 * 开始推送任务
	 * @returns {Promise<void>}
	 */
	async startPushTask() {
		// 激活推送任务
		this.pushState = PUSH_STARE.ALIVE;
		// 开始推送任务
		await this.pushTargetList();
		// 推送任务已经执行完毕
		this.pushState = PUSH_STARE.FINISH;
	}

	/**
	 * 暂停推送任务
	 */
	pausePushTask() {
		this.pushState = PUSH_STARE.PAUSE;
	}

	/**
	 * 任务睡眠
	 * @returns {Promise<void>}
	 */
	async sleepPushTask(min, max) {
		const {resumeList,timers} = this;
		if (this.pushState === PUSH_STARE.PAUSE || this.pushState === PUSH_STARE.FINISH) {
			await new Promise((resolve) => {
				resumeList.push(() => randomTimeFun(min, max, resolve, timers));
			})
		}
	}

	/**
	 * 继续推送任务
	 */
	resumePushTask() {
		this.pushState = PUSH_STARE.ALIVE;
		const {resumeList, timers} = this;
		for (let resume of resumeList) {
			const timer = resume();
			this.timers = timers.filter(val => val !== timer);
		}
		this.resumeList = [];
	}

	/**
	 * 终止推送任务
	 */
	stopPushTask() {
		const {timers} = this;
		this.pushState = PUSH_STARE.FINISH;
		for (const timer of timers) {
			clearTimeout(timer);
		}
	}

	/**
	 * 开始推送消息列表
	 * @returns {Promise<void>}
	 */
	async pushTargetList() {
		const {targetList, targetMin, targetMax, timers, isAsync} = this;
		for (let target of targetList) {
			// 判断任务状态为暂停时,阻断执行
			await this.sleepPushTask(targetMin, targetMax);
			// 正在推送数+1
			const timer = await randomTimeFunAsync(targetMin, targetMax, this.pushMessageList.bind(this,target), timers, isAsync);
			this.timers = timers.filter(val => val !== timer);
		}
	}

	/**
	 * 推送消息列表
	 * @param target 好友/群聊
	 * @returns {Promise<void>}
	 */
	async pushMessageList(target) {
		const {taskState, messageMin, messageMax, messageList, timers} = this;
		for (let message of messageList) {
			// 判断任务状态为暂停时,阻断执行
			await this.sleepPushTask(messageMin, messageMax);
			const timer = await randomTimeFunAsync(messageMin, messageMax, this.sendMessage.bind(this,target,message), timers);
			taskState.finishMessage++;
			this.timers = timers.filter(val => val !== timer);
		}
		taskState.finishTarget++;
	}

	/**
	 * 推送消息
	 * @param target 好友/群聊
	 * @param message 消息
	 * @returns {Promise<void>}
	 */
	async sendMessage(target, message) {
		const {messageMin, messageMax} = this;
		const {wechatAccountId, id, isChatroom} = target;
		const {content, msgType} = message;
		// 判断任务状态为暂停时,阻断执行
		await this.sleepPushTask(messageMin, messageMax);
		console.log(target, message);
	}
}

export default PushTask;
