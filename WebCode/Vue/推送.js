import messageService from 'Services/messageService'
import Vue from 'vue'

const state = {
  pushAssistantWorking: false,  // 是否进行推送
  isPausePush: false,           // 是否暂停推送任务
  timeRangeMessage:[],          // 每条消息的时间间隔
  timeRangeFriend:[],           // 好友间的间隔时间
  targetIsChatroom: false,      // 是否聊天室
  pushTargets: {},              // 群发消息目标列表
  pushMessages: [],             // 发送的消息
  pushMessageState: {},         // 推送消息状态树
  pushTargetNumber: 0,          // 已经推送人数
};

const getters = {
  pushAssistantWorking: state => state.pushAssistantWorking,
  isPausePush: state => state.isPausePush,
  pushTargets: state => state.pushTargets,
  // 状态树 推送消息状态树
  pushMessageState: state => state.pushMessageState,
  // 所有推送人数
  pushTargetLength: (state,getters)  => {
    let num = 0;
    Object.values(getters.pushTargets).forEach(val => num+= Object.keys(val).length);
    return num
  },
  // 已推送人数
  pushTargetNumber: state => state.pushTargetNumber,
  // 剩余推送时间
  remainingPustTime: (state,getters) => {
    let {timeRangeMessage,timeRangeFriend,pushMessages} = state;
    if(_.isEmpty(timeRangeMessage)){
      return ""
    }
    let {pushTargetNumber,pushTargetLength} = getters;
    let pushMessagesLength = pushMessages.length;
    let minTime = timeRangeMessage[0]*(pushTargetLength-pushTargetNumber)*pushMessagesLength;
    let maxTime = timeRangeMessage[1]*(pushTargetLength-pushTargetNumber)*pushMessagesLength;
    let minTimeStr = minTime < 60 ? minTime+'秒' : Math.ceil(minTime/60)+'分';
    let maxTimeStr = maxTime < 60 ? maxTime+'秒' : Math.ceil(maxTime/60)+'分';
    return minTimeStr+'至'+maxTimeStr;
  },
  // 状态树 当前推送微信ID
  pushAccountId: state => state.pushMessageState.pushAccountId,
  // 状态树 当前推送微信
  pushAccount: (state,getters) => {
    return getters.pushMessageState[getters.pushAccountId];
  },
  // 状态树 当前推送好友ID
  pushTargetId: (state,getters) => {
    return (getters.pushAccount || {}).targetId;
  },
  // 状态树 当前推送好友
  pushTarget: (state,getters) => {
    return (getters.pushAccount || {})[getters.pushTargetId];
  },
};

const mutations = {
  // 设置工作状态
  SET_PUSH_ASSISTANT_WORKING(state, flag) {
    state.pushAssistantWorking = flag
  },
  // 设置暂停推送状态
  SET_IS_PAUSE_PUSH(state,value){
    state.isPausePush = value;
  },
  // 设置消息时间间隔
  SET_TIME_RANGE_MESSAGE(state, range) {
    state.timeRangeMessage = range
  },
  // 设置好友时间间隔
  SET_TIME_RANGE_FRIEND(state, range) {
    state.timeRangeFriend = range
  },
  // 设置消息列表
  SET_PUSH_MESSAGES(state, messages) {
    state.pushMessages = messages
  },
  // 设置下一个推送账号
  SET_NEXT_ACCOUNT(state,{accountId}){
    state.pushMessageState.pushAccountId = accountId;
  },
  // 设置下一个推送好友
  SET_NEXT_FRIEND(state,{accountId,targetId}){
    state.pushMessageState[accountId].targetId = targetId;
  },
  // 消息坐标+1
  SET_NEXT_MESSAGE_INDEX(state,{accountId,targetId}) {
    state.pushMessageState[accountId][targetId].messageIndex++;
  },
  // 设置当前好友推送完结
  SET_FRIEND_IS_END(state,{accountId,targetId}){
    state.pushMessageState[accountId][targetId].isEnd = true;
  },
  // 设置好友推送个数
  SET_PUSH_TARGET_NUMBER(state,number){
    state.pushTargetNumber = number;
  },
  // 设置 推送对象 以及 推送对象下的接收对象
  SET_PUSH_TARGETS(state, friendsOrChatrooms) {
    let tempTargets = {};
    friendsOrChatrooms.forEach(value => {
      if(!tempTargets[value.wechatAccountId]) {
        tempTargets[value.wechatAccountId] = {};
      }
      tempTargets[value.wechatAccountId][value.id] = value;
    });
    state.pushTargets = tempTargets;
  },
  // 设置推送消息状态树
  SET_PUSH_MESSAGE_STATE(state,pushMessageState){
    Vue.set(state,'pushMessageState',pushMessageState);
  },
};

const actions = {
  //region 初始化推送助手状态,推送消息状态树
  initPushAssistantState({state, commit, dispatch}, friendsOrChatrooms) {
    commit('SET_PUSH_TARGETS', friendsOrChatrooms);
    let pushMessageState = {};
    for(let wechatAccountId in state.pushTargets) {
      if(state.pushTargets.hasOwnProperty(wechatAccountId)) {
        !pushMessageState.pushAccountId && (pushMessageState.pushAccountId = wechatAccountId);
        pushMessageState[wechatAccountId] = {};
        for(let pushTarget in state.pushTargets[wechatAccountId]){
          !pushMessageState[wechatAccountId].targetId && (pushMessageState[wechatAccountId].targetId = pushTarget);
          pushMessageState[wechatAccountId][pushTarget] = {messageIndex:0,isEnd:false};
        }
      }
    }
    commit('SET_PUSH_MESSAGE_STATE',pushMessageState);
  },
  // endregion
  //region 开始消息推送
  startPushAssistant({state, commit, getters, dispatch}) {

    // 设置工作状态为true,设置是否暂停推送为false
    commit('SET_PUSH_ASSISTANT_WORKING', true);
    commit('SET_IS_PAUSE_PUSH',false);

    // 好友间时间间隔
    let min_friend = state.timeRangeFriend[0];
    let range_friend = state.timeRangeFriend[1]-min_friend;

    // 消息间时间间隔
    let min_message = state.timeRangeMessage[0];
    let range_message = state.timeRangeMessage[1] - min_message;

    // 发送消息列表长度
    let messageLen = state.pushMessages.length;

    // 获取随机间隔时间
    let getTangeTime = (min,range) => Math.max((Math.round(Math.random()*range)+min)*1000,200);

    // 初始化推送内容
    let initContent = () =>{
      let {pushAccountId,pushTargetId} = getters;
      let {nickname,conRemark} = state.pushTargets[pushAccountId][pushTargetId];
      let {msgType , content} = state.pushMessages[getters.pushTarget.messageIndex];
      content = content.replace(/{nickname}/g, nickname);
      content = content.replace(/{conRemark}/g, conRemark);
      return {
        msgType,
        content,
      }
    };

    // 发送消息
    let sendMessage = () => {
      dispatch('assistantSendMessage',initContent());
      // 设置推送消息坐标
      commit("SET_NEXT_MESSAGE_INDEX",{accountId:getters.pushAccountId,targetId:getters.pushTargetId});
      // 判断当前好友消息是否推送完毕
      if(getters.pushTarget.messageIndex === messageLen){

        // 当前好友推送完毕
        commit("SET_FRIEND_IS_END",{accountId:getters.pushAccountId,targetId:getters.pushTargetId});

        // 推送好友数+1
        commit("SET_PUSH_TARGET_NUMBER",getters.pushTargetNumber+1);
      }
      pushNextMessage();
    };

    let pushNextMessage = () => {
      // 判断当前是否推送状态,如果不是暂停推送
      if(!getters.pushAssistantWorking || getters.isPausePush){
        return;
      }
      // 判断当前好友是否发送完毕
      if(getters.pushTarget.isEnd){
        // 判断当前好友是否当前账号最后一个好友
        let pushTargets = Object.keys(getters.pushAccount).filter(val => val !== 'targetId');
        let index = pushTargets.findIndex(val => val === getters.pushTargetId);
        if(++index === pushTargets.length){
          // 如果是最后一个推送好友,设置下一个推送账号
          // 判断当前账号是否最后一个账号
          let accounts = Object.keys(getters.pushMessageState).filter(val => val !== 'pushAccountId');
          let index = accounts.findIndex(val => val === getters.pushAccountId);
          if(++index === accounts.length){
            // 如果是最后一个推送账号,设置推送状态完结,暂停推送工作
            commit("SET_PUSH_ASSISTANT_WORKING",false);
            commit("SET_IS_PAUSE_PUSH",true);
          }else{
            // 如果不是最后一个推送账号,设置下一个推送账号
            commit("SET_NEXT_ACCOUNT",{accountId:accounts[index]});
            setTimeout(pushNextMessage,getTangeTime(min_friend,range_friend));
          }
        }else{
          // 如果不是最后一个推送好友,设置下一个推送好友
          commit("SET_NEXT_FRIEND",{accountId:getters.pushAccountId,targetId:pushTargets[index]});
          setTimeout(pushNextMessage,getTangeTime(min_friend,range_friend));
        }
      }else{
        if(getters.pushTarget.messageIndex === 0){
          sendMessage();
        }else{
          setTimeout(sendMessage,getTangeTime(min_message,range_message));
        }
      }
    };

    // 开始推送任务
    pushNextMessage();
  },
  //endregion
  //region 消息推送
  assistantSendMessage({state,getters}, {msgType,content}) {
    let params = {
      cmdType: 'CmdSendMessage',
      wechatAccountId: getters.pushAccountId,
      wechatChatroomId: state.targetIsChatroom? getters.pushTargetId: 0,
      wechatFriendId: state.targetIsChatroom? 0: getters.pushTargetId,
      msgType,
      content,
    };
    messageService.sendMessage(params);
  },
  //endregion
  //region 完成推送工作,结束/终止 推送任务
  finishPushWork({commit}) {
    commit('SET_PUSH_ASSISTANT_WORKING', false);
    commit('SET_IS_PAUSE_PUSH',false);
    commit('SET_PUSH_TARGETS',[]);
    commit('SET_PUSH_MESSAGES',[]);
    commit('SET_PUSH_MESSAGE_STATE',{});
    commit('SET_PUSH_TARGET_NUMBER',0);
  },
  //endregion
};

export default {
  state,
  getters,
  actions,
  mutations,
}
