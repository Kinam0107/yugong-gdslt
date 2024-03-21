import sidebar from '@/components/layout/SidebarLayout.vue'
import endbar from '@/components/layout/EndbarLayout.vue'
import developing from '@/components/layout/DevelopingLayout.vue'
import placeholder from '@/components/layout/PlaceholderLayout.vue'
import single from '@/components/layout/SingleProjectLayout.vue'

export default [
  {
    path: 'waterSupply',
    component: sidebar,
    meta: { title: '农村供水' },
    children: [
      {
        path: 'directory',
        component: placeholder,
        meta: { title: '基础名录管理', icon: 'basic' },
        children: [
          {
            path: 'built',
            component: placeholder,
            meta: { title: '已建工程名录' },
            children: [
              {
                path: 'waterworks',
                component: endbar,
                meta: { title: '供水工程', redirectIndex: 1, leaf: true },
                children: [
                  {
                    path: 'statistic',
                    component: developing,
                    meta: { title: '统计分析' }
                  },
                  {
                    path: 'baseInfo',
                    component: () => import('@/views/waterSupply/waterWorksBasicInformation/IndexView.vue'),
                    meta: { title: '基础信息维护' }
                  },
                  {
                    path: 'spatialData',
                    component: developing,
                    meta: { title: '空间数据上图管理' }
                  },
                  {
                    path: 'subsidiary',
                    component: developing,
                    meta: { title: '附属对象管理' }
                  },
                  {
                    path: 'changeReview',
                    component: developing,
                    meta: { title: '名录变更审核' }
                  }
                ]
              },
              {
                path: 'waterheads',
                component: endbar,
                meta: { title: '水源地', leaf: true },
                children: [
                  {
                    path: 'statistic',
                    component: developing,
                    meta: { title: '统计分析' }
                  },
                  {
                    path: 'baseInfo',
                    component: developing,
                    meta: { title: '基础信息维护' }
                  },
                  {
                    path: 'spatialData',
                    component: developing,
                    meta: { title: '空间数据上图管理' }
                  },
                  {
                    path: 'subsidiary',
                    component: developing,
                    meta: { title: '附属对象管理' }
                  },
                  {
                    path: 'changeReview',
                    component: developing,
                    meta: { title: '名录变更审核' }
                  }
                ]
              },
              {
                path: 'waterusers',
                component: endbar,
                meta: { title: '用水镇村', leaf: true },
                children: [
                  {
                    path: 'statistic',
                    component: developing,
                    meta: { title: '统计分析' }
                  },
                  {
                    path: 'baseInfo',
                    component: developing,
                    meta: { title: '基础信息维护' }
                  },
                  {
                    path: 'spatialData',
                    component: developing,
                    meta: { title: '空间数据上图管理' }
                  },
                  {
                    path: 'subsidiary',
                    component: developing,
                    meta: { title: '附属对象管理' }
                  },
                  {
                    path: 'changeReview',
                    component: developing,
                    meta: { title: '名录变更审核' }
                  }
                ]
              }
            ]
          },
          {
            path: 'overhaul',
            component: placeholder,
            meta: { title: '三同五化改造提升建议' },
            children: [
              {
                path: 'construction',
                component: endbar,
                meta: { title: '在建供水工程名录管理', leaf: true },
                children: [
                  {
                    path: 'baseInfo',
                    component: developing,
                    meta: { title: '在建供水工程基础信息' }
                  },
                  {
                    path: 'statistic',
                    component: developing,
                    meta: { title: '在建工程统计分析' }
                  }
                ]
              },
              {
                path: 'target',
                component: endbar,
                meta: { title: '三同五化任务指标进展', leaf: true },
                children: [
                  {
                    path: 'progression',
                    component: developing,
                    meta: { title: '任务指标进展' }
                  },
                  {
                    path: 'ranking',
                    component: developing,
                    meta: { title: '指标排名管理' }
                  },
                  {
                    path: 'regulation',
                    component: developing,
                    meta: { title: '指标规则配置' }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'operation',
        component: placeholder,
        meta: { title: '运行管理', icon: 'operation' },
        children: [
          {
            path: 'waterusers',
            component: placeholder,
            meta: { title: '用水户管理' },
            children: [
              {
                path: 'baseInfo',
                component: developing,
                meta: { title: '用水户基础信息管理' }
              },
              {
                path: 'waterQuantityFee',
                component: developing,
                meta: { title: '用水户水量水费管理' }
              },
              {
                path: 'benefitingSchools',
                component: developing,
                meta: { title: '受益农村学校信息管理' }
              },
              {
                path: 'yhyc',
                component: endbar,
                meta: { title: '一户一策管理', leaf: true },
                children: [
                  {
                    path: 'filesInfo',
                    component: developing,
                    meta: { title: '一户一档基础信息' }
                  },
                  {
                    path: 'doorResolve',
                    component: developing,
                    meta: { title: '一户一策到户解决措施' }
                  },
                  {
                    path: 'waterCard',
                    component: developing,
                    meta: { title: '一户一策集中供水卡管理' }
                  },
                  {
                    path: 'assistanceLedger',
                    component: developing,
                    meta: { title: '一户一策帮扶台账' }
                  }
                ]
              }
            ]
          },
          {
            path: 'workOrder',
            component: placeholder,
            meta: { title: '工单管理' },
            children: [
              {
                path: 'acceptance',
                component: developing,
                meta: { title: '工单受理信息' }
              },
              {
                path: 'classification',
                component: developing,
                meta: { title: '工单分类设置' }
              }
            ]
          },
          {
            path: 'inspection',
            component: placeholder,
            meta: { title: '巡检管理' },
            children: [
              {
                path: 'plan',
                component: developing,
                meta: { title: '巡检计划管理' }
              },
              {
                path: 'record',
                component: developing,
                meta: { title: '巡检数据管理' }
              },
              {
                path: 'statistic',
                component: developing,
                meta: { title: '巡检数据统计报告管理' }
              }
            ]
          },
          {
            path: 'detection',
            component: placeholder,
            meta: { title: '检测管理' },
            children: [
              {
                path: 'task',
                component: developing,
                meta: { title: '检测任务记录管理' }
              },
              {
                path: 'cycleTask',
                component: developing,
                meta: { title: '周期检测任务记录管理' }
              },
              {
                path: 'data',
                component: developing,
                meta: { title: '检测数据管理' }
              },
              {
                path: 'centerInfo',
                component: developing,
                meta: { title: '检测中心信息' }
              },
              {
                path: 'formDesign',
                component: developing,
                meta: { title: '检测表单设计' }
              },
              {
                path: 'statistic',
                component: developing,
                meta: { title: '检测数据统计' }
              }
            ]
          },
          {
            path: 'maintenance',
            component: placeholder,
            meta: { title: '维修管理' },
            children: [
              {
                path: 'workOrder',
                component: developing,
                meta: { title: '维修工单信息管理' }
              },
              {
                path: 'feedback',
                component: developing,
                meta: { title: '维修反馈信息管理' }
              }
            ]
          },
          {
            path: 'complaint',
            component: placeholder,
            meta: { title: '投诉管理' },
            children: [
              {
                path: 'statistic',
                component: developing,
                meta: { title: '投诉事件汇总' }
              },
              {
                path: 'event',
                component: developing,
                meta: { title: '投诉事件信息' }
              },
              {
                path: 'setup',
                component: developing,
                meta: { title: '分类分级设置' }
              },
              {
                path: 'response',
                component: developing,
                meta: { title: '投诉应答库' }
              }
            ]
          },
          {
            path: 'suggest',
            component: developing,
            meta: { title: '建议管理' }
          }
        ]
      },
      {
        path: 'security',
        component: developing,
        meta: { title: '安全管理', icon: 'security' }
      },
      {
        path: 'safeRun',
        component: placeholder,
        meta: { title: '安全运行', icon: 'safe-run' },
        children: [
          {
            path: 'waterVolume',
            component: developing,
            meta: { title: '水量监测' }
          },
          {
            path: 'waterQuality',
            component: developing,
            meta: { title: '水质监测' }
          },
          {
            path: 'waterLevel',
            component: developing,
            meta: { title: '水位监测' }
          },
          {
            path: 'monitor',
            component: endbar,
            meta: { title: '视频监控', leaf: true },
            children: [
              {
                path: 'video',
                component: developing,
                meta: { title: '视频监控' }
              },
              {
                path: 'history',
                component: developing,
                meta: { title: '历史图像' }
              }
            ]
          },
          {
            path: 'equipment',
            component: developing,
            meta: { title: '设备设施运行情况' }
          },
          {
            path: 'pumpStation',
            component: developing,
            meta: { title: '泵站运行情况' }
          },
          {
            path: 'warnRule',
            component: developing,
            meta: { title: '预警规则配置' }
          },
          {
            path: 'warnRecord',
            component: developing,
            meta: { title: '监测预警记录' }
          }
        ]
      },
      {
        path: 'monitoring',
        component: placeholder,
        meta: { title: '监督检查', icon: 'examine' },
        children: [
          {
            path: 'statistic',
            component: developing,
            meta: { title: '统计分析' }
          },
          {
            path: 'plan',
            component: developing,
            meta: { title: '计划管理' }
          },
          {
            path: 'task',
            component: developing,
            meta: { title: '任务管理' }
          },
          {
            path: 'report',
            component: developing,
            meta: { title: '报告管理' }
          },
          {
            path: 'feedback',
            component: developing,
            meta: { title: '反馈管理' }
          },
          {
            path: 'setup',
            component: developing,
            meta: { title: '事项配置' }
          }
        ]
      },
      {
        path: 'work',
        component: placeholder,
        meta: { title: '供水工作', icon: 'water-drop' },
        children: [
          {
            path: 'personResponsible',
            component: developing,
            meta: { title: '工作责任人' }
          },
          {
            path: 'dataBriefing',
            component: developing,
            meta: { title: '数据简报' }
          },
          {
            path: 'redAndBlackList',
            component: developing,
            meta: { title: '农村供水红黑榜' }
          },
          {
            path: 'importantNotice',
            component: developing,
            meta: { title: '要闻通知' }
          },
          {
            path: 'learningMaterials',
            component: developing,
            meta: { title: '学习资料' }
          }
        ]
      },
      {
        path: 'evaluationResult',
        component: developing,
        meta: { title: '评价成果', icon: 'paper' }
      },
      {
        path: 'evaluationProcess',
        component: developing,
        meta: { title: '评价过程', icon: 'note' }
      }
    ]
  },
  {
    path: 'pumpStation',
    component: sidebar,
    meta: { title: '泵站', redirectIndex: 1 },
    children: [
      {
        path: 'aMap',
        component: developing,
        meta: { title: '一张图', icon: 'locate' }
      },
      {
        path: 'directory',
        component: endbar,
        meta: { title: '基础名录管理', icon: 'basic', leaf: true },
        children: [
          {
            path: 'statistic',
            component: developing,
            meta: { title: '统计分析' }
          },
          {
            path: 'baseInfo',
            component: developing,
            meta: { title: '泵站名录' }
          },
          {
            path: 'changeReview',
            component: developing,
            meta: { title: '名录变更审核' }
          }
        ]
      },
      {
        path: 'standardization',
        component: developing,
        meta: { title: '标准化管理', icon: 'electricity' }
      },
      {
        path: 'knowledgeTraining',
        component: developing,
        meta: { title: '知识培训', icon: 'notebook' }
      },
      {
        path: 'importantNotice',
        component: developing,
        meta: { title: '要闻通知', icon: 'trumpet' }
      }
    ]
  },
  {
    path: 'hydropowerStation',
    component: sidebar,
    meta: { title: '水电站' },
    children: [
      {
        path: 'safeRun',
        component: placeholder,
        meta: { title: '安全运行', icon: 'safe-run' },
        children: [
          {
            path: 'gatage',
            component: developing,
            meta: { title: '闸门开度' }
          },
          {
            path: 'flow',
            component: developing,
            meta: { title: '过闸流量' }
          },
          {
            path: 'video',
            component: developing,
            meta: { title: '视频图像' }
          },
          {
            path: 'setup',
            component: developing,
            meta: { title: '测站配置管理' }
          }
        ]
      },
      {
        path: 'basic',
        component: placeholder,
        meta: { title: '基础信息管理', icon: 'basic' },
        children: [
          {
            path: 'directory',
            component: endbar,
            meta: { title: '电站基本信息', leaf: true },
            children: [
              {
                path: 'statistic',
                component: developing,
                meta: { title: '统计分析' }
              },
              {
                path: 'baseInfo',
                component: developing,
                meta: { title: '电站基本信息' }
              },
              {
                path: 'changeReview',
                component: developing,
                meta: { title: '名录变更审核' }
              }
            ]
          },
          {
            path: 'damSafety',
            component: developing,
            meta: { title: '大坝安全鉴定' }
          },
          {
            path: 'greenHydropower',
            component: developing,
            meta: { title: '绿色小水电评定' }
          },
          {
            path: 'management',
            component: developing,
            meta: { title: '管理机构及人员' }
          }
        ]
      },
      {
        path: 'security',
        component: placeholder,
        meta: { title: '安全管理', icon: 'security' },
        children: [
          {
            path: 'responsibility',
            component: endbar,
            meta: { title: '安全生产责任制', leaf: true },
            children: [
              {
                path: 'internal',
                component: developing,
                meta: { title: '内部安全生产责任' }
              },
              {
                path: 'workable',
                component: developing,
                meta: { title: '双主体责任落实' }
              }
            ]
          },
          {
            path: 'standardization',
            component: developing,
            meta: { title: '安全生产标准化' }
          },
          {
            path: 'floodPrevention',
            component: endbar,
            meta: { title: '防汛安全', leaf: true },
            children: [
              {
                path: 'personResponsible',
                component: developing,
                meta: { title: '责任人落实' }
              },
              {
                path: 'scenario',
                component: developing,
                meta: { title: '防汛预案' }
              },
              {
                path: 'resource',
                component: developing,
                meta: { title: '防汛队伍、物资、备用电源' }
              }
            ]
          },
          {
            path: 'emergency',
            component: endbar,
            meta: { title: '应急管理', leaf: true },
            children: [
              {
                path: 'scenario',
                component: developing,
                meta: { title: '应急预案' }
              },
              {
                path: 'knowledgeTraining',
                component: developing,
                meta: { title: '应急知识培训及演练情况' }
              },
              {
                path: 'resource',
                component: developing,
                meta: { title: '应急抢险队伍、物资' }
              }
            ]
          },
          {
            path: 'place',
            component: developing,
            meta: { title: '场所安全' }
          },
          {
            path: 'education',
            component: developing,
            meta: { title: '安全教育培训' }
          },
          {
            path: 'accident',
            component: endbar,
            meta: { title: '事故报告及处理', leaf: true },
            children: [
              {
                path: 'statement',
                component: developing,
                meta: { title: '事故报告及处理' }
              },
              {
                path: 'notReported',
                component: developing,
                meta: { title: '未上报事故' }
              }
            ]
          }
        ]
      },
      {
        path: 'operation',
        component: placeholder,
        meta: { title: '运行管理', icon: 'operation' },
        children: [
          {
            path: 'lpsz',
            component: developing,
            meta: { title: '两票三制' }
          },
          {
            path: 'examination',
            component: developing,
            meta: { title: '定期检验' }
          },
          {
            path: 'equipment',
            component: developing,
            meta: { title: '设备设施' }
          },
          {
            path: 'hiddenDanger',
            component: developing,
            meta: { title: '隐患排查治理' }
          },
          {
            path: 'estimate',
            component: developing,
            meta: { title: '综合评估' }
          }
        ]
      }
    ]
  },
  {
    path: 'irrigatedArea',
    component: sidebar,
    meta: { title: '灌区' },
    children: [
      {
        path: 'safeRun',
        component: placeholder,
        meta: { title: '安全运行', icon: 'safe-run' },
        children: [
          {
            path: 'water',
            component: developing,
            meta: { title: '灌区渠道水情' }
          },
          {
            path: 'flow',
            component: developing,
            meta: { title: '灌区渠道流量' }
          },
          {
            path: 'rainfall',
            component: developing,
            meta: { title: '灌区降水量' }
          },
          {
            path: 'monitor',
            component: endbar,
            meta: { title: '灌区图像', leaf: true },
            children: [
              {
                path: 'video',
                component: developing,
                meta: { title: '视频监控' }
              },
              {
                path: 'history',
                component: developing,
                meta: { title: '历史图像' }
              }
            ]
          },
          {
            path: 'stationInfo',
            component: developing,
            meta: { title: '灌区测站信息' }
          },
          {
            path: 'stationBind',
            component: developing,
            meta: { title: '灌区测站绑定' }
          }
        ]
      },
      {
        path: 'basic',
        component: placeholder,
        meta: { title: '基础管理', icon: 'basic' },
        children: [
          {
            path: 'directory',
            component: endbar,
            meta: { title: '灌区工程管理', leaf: true },
            children: [
              {
                path: 'statistic',
                component: developing,
                meta: { title: '统计分析' }
              },
              {
                path: 'baseInfo',
                component: developing,
                meta: { title: '灌区名录' }
              },
              {
                path: 'changeReview',
                component: developing,
                meta: { title: '名录变更审核' }
              }
            ]
          },
          {
            path: 'crossCounty',
            component: developing,
            meta: { title: '灌区跨县信息' }
          },
          {
            path: 'carryWater',
            component: developing,
            meta: { title: '提水灌区信息' }
          },
          {
            path: 'revamp',
            component: developing,
            meta: { title: '改造项目管理' }
          },
          {
            path: 'annual',
            component: placeholder,
            meta: { title: '年度基础信息' },
            children: [
              {
                path: 'baseInfo',
                component: developing,
                meta: { title: '灌区年度基础信息' }
              },
              {
                path: 'revamp',
                component: developing,
                meta: { title: '改造项目年度完成情况' }
              },
              {
                path: 'management',
                component: developing,
                meta: { title: '灌区管理单位年度信息' }
              },
              {
                path: 'pool',
                component: developing,
                meta: { title: '塘坝年度基础信息' }
              },
              {
                path: 'diversion',
                component: developing,
                meta: { title: '引水堰闸年度基础信息' }
              },
              {
                path: 'electricIrrigation',
                component: developing,
                meta: { title: '小电灌年度基础信息' }
              },
              {
                path: 'embankment',
                component: developing,
                meta: { title: '小堤围年度基础信息' }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'waterworks/:id',
    component: single,
    meta: { titile: '供水工程', nonMenu: true },
    children: [
      {
        path: 'status',
        component: placeholder,
        meta: { title: '工程状况', icon: 'basic' },
        children: [
          {
            path: 'baseInfo',
            component: placeholder,
            meta: { title: '基础信息' },
            children: [
              {
                path: 'index',
                component: developing,
                meta: { title: '基础信息' }
              },
              {
                path: 'keyPointImages',
                component: developing,
                meta: { title: '关键点图片' }
              },
              {
                path: 'electricityUsage',
                component: developing,
                meta: { title: '用电情况' }
              }
            ]
          },
          {
            path: 'engineeringCharacteristics',
            component: developing,
            meta: { title: '工程特性' }
          },
          {
            path: 'engineeringMilestones',
            component: developing,
            meta: { title: '工程大事记' }
          }
        ]
      },
      {
        path: 'operation',
        component: developing,
        meta: { title: '运行管护', icon: 'operation' }
      },
      {
        path: 'security',
        component: developing,
        meta: { title: '安全管理', icon: 'security' }
      },
      {
        path: 'guarantee',
        component: developing,
        meta: { title: '管理保障', icon: 'examine' }
      }
    ]
  }
]
