import { Badge, Blocks, Info } from '@/types/data'

export const baseBlocks: Blocks = {
  avatar: '/favicon.ico',
  first_name: 'First Name ',
  last_name: 'Last Name',
  pronouns: 'Pronouns',
  location: 'Location',
  badges: ['Entrepreneur'],
  about_me: '',
  contact_me: '',

  socials: [
    {
      id: "1",
      name: "Facebook",
      icon: "a-62",
      link: "https://facebook.com",
    },
  ]
}

export const infoData: Info =  {
  layout: '',
  color: '',
  type: '',
  blocks: baseBlocks
}

export const LAYOUT_KEY = 'layout'
export const COLOR_KEY = 'color'
export const TYPE_KEY = 'type'
export const BLOCKS_KEY = 'blocks'

export const SECTION_KEY = {
  P_INFO: 'personal_info',
  BADGES: 'badges',
  SOCIAL: 'social',
  ABOUT_ME: 'about_me',
  CONTACT_ME: 'contact_me',
  BODY: 'body',
  LIBRARY: 'library',
}

export const SECTION_TITLE = {
  [SECTION_KEY.P_INFO]: 'Personal Info',
  [SECTION_KEY.BADGES]: 'Badges',
  [SECTION_KEY.SOCIAL]: 'Social',
  [SECTION_KEY.ABOUT_ME]: 'About Me',
  [SECTION_KEY.CONTACT_ME]: 'Contact Me',
  [SECTION_KEY.BODY]: 'body',
  [SECTION_KEY.LIBRARY]: 'library',
}

export const BADGES: Badge[] = [
  {
    name: 'Entrepreneur',
    color: '#F0E68C',
    icon: 'a-1',
  },
  {
    name: 'Software Engineering',
    color: '#FF7474',
    icon: 'a-2',
  },
  {
    name: 'Life Long Learner',
    color: '#F5DEB3',
    icon: 'a-3',
  },
  {
    name: 'Professional',
    color: '#90EE90',
    icon: 'a-4',
  },
  {
    name: 'Web Design',
    color: '#FFF0F5',
    icon: 'a-5',
  }
]
