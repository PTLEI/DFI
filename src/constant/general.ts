import { Badge, Blocks, Info } from '@/types/data'

export const FONTS = [
  { name: "Default Font", value: "Arial" },
  { name: "Serif Font", value: "Georgia" },
  { name: "Monospace Font", value: "Courier New" },
  { name: "Cursive Font", value: "Brush Script MT" },
  { name: "Fantasy Font", value: "Papyrus" },
];

export const COLORS = [
  { name: "Default Color", value: ["#FFFFFF", "var(--foreground)"] },
  { name: "Red Color", value: ["#FFF1F1", "#FF7474"] },
  { name: "Green Color", value: ["#E5F8EF", "#00B85C"] },
  { name: "Blue Color", value: ["#EBF3FF", "#328AFF", ] },
]

// 现行 方案一，使用 className/style 实现 -> 因为貌似tailwind 做了tree shaking 所以动态的 className有点问题 最后用了style
// Todo 方案二，使用类似 AST 的结构，结合React.createElement 实现
export const LAYOUTS = [
  {
    id: 'default',
    name: 'Default',
    layout: {}
  },
  {
    id: 'layout_1',
    name: 'Layout 1',
    layout: {
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      avatar: {
        flex: 'none',
      },
      last_name: {
        flex: '1',
        alignSelf: 'center',
        marginLeft: '2rem',
        fontSize: '4xl',
      },
      name: {
        width: '100%',
        justifyContent: 'center',
      },
      // container: 'flex flex-wrap',
      // avatar: 'flex-none',
      // last_name: 'flex-1 self-center mb-4 ml-8 text-4xl',
      // name: 'justify-center',
    }
  },
  {
    id: 'layout_2',
    name: 'Layout 2',
    layout: {
      container: {
        backgroundImage: 'linear-gradient(45deg, #98FB98 0%, #90EE90 25%, #7CFC00 50%, #00FA9A 75%, #00FF7F 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px',
        padding: '16px',
        margin: '-16px',
      }
    }
  }
]

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
  color: COLORS[0].name,
  type: FONTS[0].name,
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
