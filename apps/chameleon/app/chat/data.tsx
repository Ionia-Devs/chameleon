export const userData = [
  {
    id: 1,
    avatar: '/amanda-toast.jpg',
    messages: [
      {
        id: 1,
        avatar: '/amanda-toast.jpg',
        name: 'Amanda Toast',
        message: 'Hey, Jakob',
      },
      {
        id: 2,
        avatar: '/sugar_vail.jpg',
        name: 'Jakob Hoeg',
        message: 'Hey!',
      },
      {
        id: 3,
        avatar: '/amanda-toast.jpg',
        name: 'Amanda Toast',
        message: 'How are you?',
      },
      {
        id: 4,
        avatar: '/sugar_vail.jpg',
        name: 'Jakob Hoeg',
        message: 'I am good, you?',
      },
      {
        id: 5,
        avatar: '/amanda-toast.jpg',
        name: 'Amanda Toast',
        message: 'I am good too!',
      },
      {
        id: 6,
        avatar: '/sugar_vail.jpg',
        name: 'Jakob Hoeg',
        message: 'That is good to hear!',
      },
      {
        id: 7,
        avatar: '/amanda-toast.jpg',
        name: 'Amanda Toast',
        message: 'How has your day been so far?',
      },
      {
        id: 8,
        avatar: '/sugar_vail.jpg',
        name: 'Jakob Hoeg',
        message:
          'It has been good. I went for a run this morning and then had a nice breakfast. How about you?',
      },
      {
        id: 9,
        avatar: '/amanda-toast.jpg',
        name: 'Amanda Toast',
        message: 'I had a relaxing day. Just catching up on some reading.',
      },
    ],
    name: 'Amanda Toast',
  },
  {
    id: 2,
    avatar: '/micheal-slocum.jpg',
    name: 'Micheal Slocum',
  },
  {
    id: 3,
    avatar: '/hans-hermawan.jpg',
    name: 'Hans Hermawan',
  },
  {
    id: 4,
    avatar: '/ben.jpg',
    name: 'Ben (Pippibingus Brownwater)',
  },
]

export type UserData = (typeof userData)[number]

export const sugar_vailData = {
  id: 5,
  avatar: '/sugar_vail.jpg',
  name: 'Jakob Hoeg',
}

export type sugar_vailData = typeof sugar_vailData

export interface Message {
  id: number
  avatar: string
  name: string
  message: string
}

export interface User {
  id: number
  avatar: string
  messages: Message[]
  name: string
}
