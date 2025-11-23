import { Server } from 'socket.io'

let io = null

export const socket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  })

  return io
}

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io has not been initialized')
  }
  return io
}
