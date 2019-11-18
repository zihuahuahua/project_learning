import chatkit from '../chatkit'

function handleError(commit, error) {
  const message = error.message || error.info.error_description
  commit('setError', message)
}

export default {
  async login({ commit, state }, userId) {
    try {
      commit('setError', '')
      commit('setLoading', true)
      // user
      const currentUser = await chatkit.connectUser(userId)
      console.log(currentUser, 'currentUser==action')
      commit('setUser', {
        username: currentUser.id,
        name: currentUser.name
      })
      commit('setReconnect', false)
      console.log(state.user)

      // room
      const rooms = currentUser.rooms.map(room => ({
        id: room.id,
        name: room.name
      }))
      console.log(rooms, '==rooms==')
      commit('setRooms', rooms)
      // 给用户分配房间
      const activeRoom = state.activeRoom || rooms[0]
      commit('setActiveRoom', {
        id: activeRoom.id,
        name: activeRoom.name
      })
      await chatkit.subscribeToRoom(activeRoom.id)

      // 流程完成后 返回true
      return true
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setLoading', false)
    }
  },
  async changeRoom({ commit }, roomId) {
    try {
      const { id, name } = await chatkit.subscribeToRoom(roomId)
      commit('setActiveRoom', { id, name })
    } catch (error) {
      handleError(commit, error)
    }
  }
}