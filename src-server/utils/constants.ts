export const ACTIONS = [
  {
    name: 'select',
    commands: [
      'select',
      'open',
    ]
  },
  {
    name: 'navigate',
    commands: [
      'navigate',
      'take',
      'go',
      'cancel',
      'discard',
      'create note'
    ]
  },
]

export const TARGETS = {
  'navigate': [
    {
      name: 'back',
      commands: [
        'previous',
        'back',
        'cancel',
        'discard',
      ]
    },
    {
      name: 'forward',
      isFallback: true
    },
  ],
  'select': [
    {
      name: 'note',
      commands: [
        'note'
      ]
    },
    {
      name: 'contact',
      commands: [
        'client',
        'contact'
      ]
    },
  ]
}
