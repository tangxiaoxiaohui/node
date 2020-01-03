      function satrtSendMessage(){
        let stateTree = {
          '小鱼': 0,
          '小夏': 0,
          '小凡': 0,
          '小力': 0,
          '小火': 0,
          '雨汐': 0,
          '蝶梦': 0,
          '千寻': 0,
          '子渊': 0,
        };
        let morkMessages = ["aaa",'bbb','ccc','ddd','eee','fff'];
        let morkMessageLength = morkMessages.length;
        let morkTargets = ['小鱼','小夏','小凡','小力','小火','雨汐','蝶梦','千寻','子渊'];
        let morkTargetsLength = morkTargets.length;

        let [m_min,m_max,m_time,t_min,t_max,t_time] = [2,10,0,2,10,0];
        let targetList = [];
        let friendIndex = 0;
        let initFriendEnd = false;

        initFriend(); // 设置好友
        sendMessage(); // 发送消息
        function sendMessage(){
          setTimeout(() => {
            for(let target of targetList){
              console.log('消息发送',target,morkMessages[stateTree[target]++],targetList,m_time);
            }
            clearFriend();
            m_time = m_min*1000 + parseInt((m_max - m_min) *　Math.random()*1000);
            if(initFriendEnd && !targetList.length){
                return;
            }
            sendMessage();
          },m_time);
        }
        function initFriend(){
          setTimeout(() => {
            targetList.push(morkTargets[friendIndex++]);
            console.log('设置发送好友',morkTargets[friendIndex-1],t_time);
            t_time = t_min*1000 + parseInt((t_max - t_min) *　Math.random()*1000);
            if(friendIndex >= morkTargetsLength){
                initFriendEnd = true;
                return;
            }
            initFriend();
          },t_time);
        }
        function clearFriend() {
          if(stateTree[targetList[0]] >= morkMessageLength){
            targetList.shift();
            clearFriend();
          }
        }
      }
      satrtSendMessage();   