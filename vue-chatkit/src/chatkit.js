import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import moment from 'moment'
import store from './store/index'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10  // eslint-disable-line no-unused-vars

let currentUser = null
let activeRoom = null // eslint-disable-line no-unused-vars

async function connectUser(userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({ url: TOKEN_URL }),
    userId
  })
  currentUser = await chatManager.connect()
  return currentUser
}

function setMembers() {
  console.log(activeRoom, '==activeRoom==')
  const members = activeRoom.users.map(user => ({
    username: user.id,
    name: user.name,
    presence: user.presence.state
  }))
  console.log(members, '==members==')
  store.commit('setUsers', members)
}

async function subscribeToRoom(roomId) {
  store.commit('clearChatRoom')
  console.log(currentUser, '==currentUser==')
  activeRoom = await currentUser.subscribeToRoom({
    roomId,
    messageLimit: MESSAGE_LIMIT,
    // ChatKit服务将使用事件处理程序与客户端应用程序进行通信。
    // onMessage 接收消息
    // onPresenceChanged 用户登录或注销时收到事件
    // onUserStartedTyping 收到用户正在输入的事件
    // onUserStoppedTyping 收到用户停止输入的事件
    hooks: {
      onMessage: message => {
        store.commit('addMessage', {
          name: message.sender.name,
          username: message.sendId,
          text: message.text,
          date: moment(message.createdAt).format('h:mm:ss a D-MM-YYYY')
        })
      },
      onPresenceChanged: () => {
        setMembers()
      },
      onUserStartedTyping: user => {
        console.log(user,'==user==')
        store.commit('setUserTyping', user.id)
      },
      onUserStoppedTyping: () => {
        store.commit('setUserTyping', null)
      }
    }
  })
  setMembers()
  return activeRoom
}

export default { connectUser, subscribeToRoom }