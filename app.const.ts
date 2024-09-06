export const workflowData = {
  msg: 'Fetched single workflow data',
  singleWorkflow: {
    _id: '66b072510b6d4fab5175f3c5',
    name: 'test-clone1',
    status: 'published',
    createdBy: '66950f1c5f9ba795ab1e7434',
    projectId: '669510765f9ba795ab1e7662',
    workflowData: [
      {
        nodes: [
          {
            width: 200,
            height: 104,
            id: 'whatsapp',
            type: 'customNode',
            position: {
              x: -350.41272672260345,
              y: 6.006993928338062,
            },
            data: {
              label: 'Whatsapp',
              headerBgColor: '#15945F',
              id: 'whatsapp',
              type: 'source',
            },
            mainData: {
              requirement: {
                name: '',
              },
              budget: {
                minimum: '',
                maximum: '',
              },
              form: {
                name: '',
                id: '',
              },
            },
            actionData: {
              customNode: {
                name: '',
              },
              leadAssignee: {
                name: [],
              },
              teamMember: {
                name: '',
                id: '',
              },
              sendTemplate: {
                name: '',
                id: '',
              },
              followUp: {
                min: '',
                scheduleTime: '',
              },
              notify: {
                name: '',
                id: '',
              },
            },
            positionAbsolute: {
              x: -350.41272672260345,
              y: 6.006993928338062,
            },
            selected: false,
            dragging: false,
          },
          {
            width: 200,
            height: 111,
            id: 'sendTemplate',
            type: 'customNode',
            position: {
              x: 206.3035447789303,
              y: 89.29504463907382,
            },
            data: {
              label: 'Send Template',
              headerBgColor: '#1F7043',
              id: 'sendTemplate',
              type: 'both',
              title: 'Select template',
              updateLead: false,
            },
            mainData: {
              requirement: {
                name: '',
              },
              budget: {
                minimum: '',
                maximum: '',
              },
              form: {
                name: '',
                id: '',
              },
            },
            actionData: {
              customNode: {
                name: '',
              },
              leadAssignee: {
                name: [],
              },
              teamMember: {
                id: '6638a9a0-ff0d-406f-9c20-29bfce28e771',
                name: 'Thank you for your interest in Mellow CRM. Our team will contact you shortly.',
              },
              sendTemplate: {
                id: 'a9afefea-423a-437c-9d4b-30b64c0def7f',
                name: 'HELLO\nHello Userr\nThank you for sign up',
              },
              followUp: {
                min: '',
                scheduleTime: '',
              },
              notify: {
                name: '',
                id: '',
              },
            },
            positionAbsolute: {
              x: 206.3035447789303,
              y: 89.29504463907382,
            },
            selected: false,
            dragging: false,
          },
          {
            width: 200,
            height: 135,
            id: 'notify',
            type: 'customNode',
            position: {
              x: -209.14060384216737,
              y: 222.54564414799154,
            },
            data: {
              label: 'Notify team member on Whatsapp',
              headerBgColor: '#15945F',
              id: 'notify',
              type: 'both',
              title: 'Select template',
              updateLead: false,
            },
            mainData: {
              requirement: {
                name: '',
              },
              budget: {
                minimum: '',
                maximum: '',
              },
              form: {
                name: '',
                id: '',
              },
            },
            actionData: {
              customNode: {
                name: '',
              },
              leadAssignee: {
                name: [],
              },
              teamMember: {
                name: '',
                id: '',
              },
              sendTemplate: {
                name: '',
                id: '',
              },
              followUp: {
                min: '',
                scheduleTime: '',
              },
              notify: {
                name: '',
                id: '',
              },
            },
            positionAbsolute: {
              x: -209.14060384216737,
              y: 222.54564414799154,
            },
            selected: true,
            dragging: false,
          },
        ],
        edges: [
          {
            animated: true,
            style: {
              stroke: '#343434',
            },
            id: 'whatsapp-notify',
            source: 'whatsapp',
            target: 'notify',
          },
          {
            animated: true,
            style: {
              stroke: '#343434',
            },
            id: 'notify-sendTemplate',
            source: 'notify',
            target: 'sendTemplate',
          },
        ],
        viewport: {
          x: 433,
          y: 14.5,
          zoom: 1,
        },
      },
    ],
    clonedFrom: '66aa1add0b6d4fab51759016',
    createdAt: '2024-07-31T11:07:09.518Z',
    updatedAt: '2024-08-05T06:34:58.260Z',
    __v: 0,
    actionData: {
      customNode: {
        name: '',
      },
      leadAssignee: {
        name: [],
      },
      teamMember: {
        id: '6638a9a0-ff0d-406f-9c20-29bfce28e771',
        name: 'Thank you for your interest in Mellow CRM. Our team will contact you shortly.',
      },
      sendTemplate: {
        id: 'a9afefea-423a-437c-9d4b-30b64c0def7f',
        name: 'HELLO\nHello Userr\nThank you for sign up',
      },
      followUp: {
        min: '',
        scheduleTime: '',
      },
      notify: {
        name: '',
        id: '',
      },
    },
    mainData: {
      requirement: {
        name: '',
      },
      budget: {
        minimum: '',
        maximum: '',
      },
      form: {
        name: '',
        id: '',
      },
    },
    source: 'Whatsapp',
  },
};
