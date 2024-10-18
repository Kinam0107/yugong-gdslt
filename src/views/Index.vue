<template>
  <div class="main--wrapper">
    <div class="main--inner" ref="mainInnerRef">
      <div class="mian_title" ref="mainTitleRef">
        <img src="@/assets/images/sysIcon.png" alt="" />
        <h1>天津重点防洪工程数字孪生智能助手</h1>
      </div>
      <div class="tip" ref="tipRef">您好，我是天津市水科院训练的智能助手，目前主要任务是提供关于天津北三河系的具体隐患、抢险技术措施及工程特征等信息。</div>
      <div class="prompt--wrapper">
        <div class="prompt--inner" :class="{ is_dialogue: chatId }" ref="promptInnerRef">
          <template v-if="chatId">
            <div class="chat_item" v-for="item in chatList" :key="item.content_id" :class="{ user: !item.content_type }">
              <div class="robot dialogue" v-if="item.content_type">
                <img src="@/assets/images/robot.png" alt="" />
                <div class="dialogue_item">
                  <div class="role">水利智能机器人</div>
                  <div class="content" :class="{ loading: item.loading }" v-html="marked(item.content)"></div>
                  <div class="other">
                    <span class="time">{{ item.content_time }}</span>
                    <span class="zan_btn" @click="zan(item.content_id)">
                      <SvgIcon icon="zan" :size="12" :color="props.isScreen ? '#ffffff' : '#758198'" />
                      赞
                    </span>
                    <span class="cai_btn" @click="cai(item.content_id)">
                      <SvgIcon icon="cai" :size="12" :color="props.isScreen ? '#ffffff' : '#758198'" />
                      踩
                    </span>
                    <span class="download_btn" @click="download(item.content_id)">
                      <SvgIcon icon="download" :size="14" :color="props.isScreen ? '#ffffff' : '#758198'" />
                      下载
                    </span>
                  </div>
                </div>
              </div>
              <div class="self dialogue" v-else>
                <img v-if="props.isScreen" src="@/assets/images/personBorder.png" alt="" />
                <img v-else src="@/assets/images/person.png" alt="" />
                <div class="dialogue_item">
                  <div class="role">管理员</div>
                  <div class="content">{{ item.content }}</div>
                  <div class="other">
                    <span class="time">{{ item.content_time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="hint">您可以问我这些内容：</div>
            <div class="prompt_item--wrapper">
              <div class="prompt_item" v-for="item in contentOptions" :key="item.label">
                <img :src="item.icon" alt="" />
                <div class="content">
                  <div class="label">{{ item.label }}</div>
                  <div class="desc" :title="item.desc">{{ item.desc }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="input--wrapper" ref="inputWrapperRef">
        <input type="file" ref="inputFile" style="display: none" @change="handleFiles" />
        <div class="toolbar specific" v-if="['语音', '常用', '历史'].includes(toolbarActive)">
          <div class="toolbar_item">
            <SvgIcon :icon="toolbarOptions.find((e) => e.label === toolbarActive).icon" :size="18" :color="props.isScreen ? '#ffffff' : '#758198'" />
            <span>{{ toolbarOptions.find((e) => e.label === toolbarActive).label }}</span>
          </div>
          <div class="retract" @click="changeToolbarActive()">
            <span>收起</span>
            <SvgIcon icon="retract" :size="20" :color="props.isScreen ? '#ffffff' : '#758198'" />
          </div>
          <template v-if="toolbarActive === '语音'">
            <div class="recording_strip"></div>
          </template>
          <template v-else-if="toolbarActive === '常用'">
            <div class="common_use">
              <ul class="common_use_tab">
                <li v-for="item in commonUseOptions" :key="item.key" :class="{ active: item.key === commonUseActive }" @click="changeCommonUseActive(item.key)">{{ item.label }}</li>
              </ul>
              <ul class="commoon_use_list">
                <li v-for="(item, index) in commonUseList" :key="index" @click="selectCommonUseItem(item)">{{ item.title }}</li>
              </ul>
            </div>
          </template>
          <template v-else-if="toolbarActive === '历史'">
            <div class="history_filter">
              <el-input v-model="historyKeyword" style="width: 240px" placeholder="搜索历史记录" @change="getHistoryList">
                <template #suffix>
                  <el-icon class="el-input__icon" color="#C8CCDE" @click="getHistoryList"><Search /></el-icon>
                </template>
              </el-input>
            </div>
            <ul class="history_list">
              <li v-for="item in historyList" :key="item.his_id" @click="getHistoryInfo(item.his_id)">
                <span class="name">{{ item.his_title }}</span>
                <span class="time">{{ item.his_time }}</span>
              </li>
            </ul>
          </template>
        </div>
        <ul class="toolbar" v-else>
          <li class="toolbar_item" v-for="item in toolbarOptions" :key="item.label" @click="changeToolbarActive(item.label)">
            <SvgIcon :icon="item.icon" :size="18" :color="props.isScreen ? '#ffffff' : '#758198'" />
            <span>{{ item.label }}</span>
          </li>
        </ul>
        <div class="input--inner">
          <el-input ref="inputRef" v-model="inputContent" type="textarea" :placeholder="inputPlaceholder || '请输入您的问题，按Ctrl+Enter 换行'" resize="none" @keydown="handleKeyCode" />
          <div class="send_btn" :disabled="sendBtnDisabled" v-loading="sending" @click="send"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, onBeforeMount } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/foundation.css'
const render = new marked.Renderer()
marked.setOptions({
  renderer: render, // 这是必填项
  gfm: true, // 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
  sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
  highlight: (code, lang) => hljs.highlight(code, { language: lang }).value // 高亮的语法规范
})
const appId = 'd9aef813-b08b-448a-8879-8f27992d60f1'

const props = defineProps({
  isScreen: {
    type: Boolean,
    default: false
  }
})

import YHSB from '@/assets/images/typeIcon_yh.png'
import QXJSCS from '@/assets/images/typeIcon_qx.png'
import AQJD from '@/assets/images/typeIcon_jd.png'
import GCSYTZS from '@/assets/images/typeIcon_tp.png'
import SvgIcon from '@/components/SvgIcon.vue'
const contentOptions = ref([
  {
    icon: YHSB,
    label: '隐患识别',
    desc: '了解天津北三河系可能存在的险情，您可以让我识别或判断具体的隐患、隐患的抢护原则及抢护方法等内容。'
  },
  {
    icon: QXJSCS,
    label: '抢险技术措施',
    desc: '问我工程的现状描述、易发险情、防抢技术措施、抢险物资等信息，我会列出天津北三河系具体工程的易发险情及防汛抢险的常用技术措施，并能够根据隐患情况提出适当的抢险方案，包括抢险物资、机具和数量。'
  },
  {
    icon: AQJD,
    label: '安全鉴定',
    desc: '了解天津北三河系的工程特征及安全鉴定信息，包括河道特性、堤防状况、历史水情、工程位置分布图等，并能够准确地向用户描述这些信息。'
  },
  {
    icon: GCSYTZS,
    label: '工程示意图展示',
    desc: '可以咨询具体工程的抢险断面示意图、抢险路线图，我会查询险工险段抢险路线图等信息。'
  }
])

const mainInnerRef = ref()
const mainTitleRef = ref()
const tipRef = ref()
const inputWrapperRef = ref()
const promptInnerMaxHeight = ref(0)
const getPromptInnerMaxHeight = () => {
  if (props.isScreen) {
    promptInnerMaxHeight.value = mainInnerRef.value.clientHeight - 22 - inputWrapperRef.value.offsetHeight + 'px'
  } else {
    promptInnerMaxHeight.value =
      mainInnerRef.value.clientHeight - (77 + 24) - (mainTitleRef.value.offsetHeight + 24) - (tipRef.value.offsetHeight + 16) - 24 - inputWrapperRef.value.offsetHeight + 'px'
  }
}
onMounted(() => {
  getPromptInnerMaxHeight()
  window.addEventListener('resize', getPromptInnerMaxHeight)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', getPromptInnerMaxHeight)
})

const inputFile = ref()
const handleFiles = (event) => {
  const files = event.target.files
  console.log('todo 文件上传', files)
}

const recognition = ref()
onBeforeMount(() => {
  recognition.value = new window.webkitSpeechRecognition()
  recognition.value.lang = 'zh-CN'
  recognition.value.continuous = true
  recognition.value.interimResults = true
  recognition.value.onresult = (event) => {
    console.log('todo 语音识别', event)
    inputContent.value = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join('')
  }
  recognition.value.onstart = () => {
    sendBtnDisabled.value = true
    inputPlaceholder.value = '正在语音识别...'
  }
  recognition.value.onend = () => {
    sendBtnDisabled.value = false
    inputPlaceholder.value = ''
    toolbarActive.value = undefined
    nextTick(() => getPromptInnerMaxHeight())
  }
})

const commonUseActive = ref('1')
const commonUseOptions = ref([
  { key: '1', label: '巡检专用' },
  { key: '2', label: '热门工具' }
])
const changeCommonUseActive = (val) => {
  commonUseActive.value = val
  nextTick(() => getPromptInnerMaxHeight())
}
const commonUseList = computed(() => {
  return commonUseActive.value === '1'
    ? [
        {
          title: '记录二道闸试运行过程中的项目、运行结果和问题说明等信息，通过问题说明调取知识库、数据库的相关问题。',
          content:
            '#角色设定\n作为一个二道闸水闸试运行记录智能体，你的任务是调用【二道闸水闸试运行记录】组件，获取二道闸水闸试运行清单【qingdan】，按组件清单询问用户，等待用户回答后询问下一项，最终记录二道闸水闸试运行的项目、客户回答及问题说明。\n\n# 角色能力\n1.用户输入你好，默认调用【二道闸水闸试运行记录】组件，\n2.按清单【qingdan】顺序进行询问，每项均等待用户回答【正常】或者【存在问题，具体为】后，根据询问记录询问清单的下一项，直到问完项目清单。\n\n#输出\n等待用户回答以后，最终输出所有轮次的试运行项目和用户回答。\n\n#清单\n二道闸水闸试运行项目清单\n\n# 工具能力\n1. 记录试运行项目、用户回答\n记录本轮的试运行项目，用户的回答\n\n2.记录已询问的试运行项目及用户回答\n根据{{jilu}}，比对试运行项目清单，记录已询问的试运行项目\n\n3.提出问题\n严格按照二道闸水闸试运行项目清单的顺序进行询问，一项一项询问，每项均等待用户回答【正常】或者【存在问题，具体为】后，继续向用户提出试运行项目清单中的下一个试运行项目，直到问完清单最后一项后停止。\n\n#限制\n1.每次提问只询问一个试运行项目，随后等待用户回答\n2.不输出和试运行项目无关的其他内容'
        },
        {
          title: '依据巡检项目清单，逐条询问用户巡检项目清单中的巡检项情况，记录并生成总结报告',
          content:
            '#\n角色任务\n作为工程巡检助手，你的主要任务是依据巡检项目清单，逐一询问用户关于巡检项的情况，并准确记录其回答。在问完所有巡检项目后，你需要生成一份包含所有问题及用户回答的总结报告。\n\n#\n巡检流程\n\n1.\n初始化：若用户没有明确的诉求，只是简单问候，则默认开始按照巡检项目清单询问。\n2.\n逐项询问：按照巡检项目清单的顺序，逐一询问用户关于巡检项的情况。\n3.\n记录回答：对于用户的每一个回答，并准确记录。\n4.\n询问下一个项目：参考上一轮问过的问题{{ques}}，对照巡检项目清单，询问清单中的下一个项目，不要对单个问题进行拆解。\n5.询问结束，当上一轮问过的问题{{ques}}与巡检项目清单中的最后一个问题一致，停止询问，生成总结。\n5.\n生成总结：整理并输出所有问题及用户的回答，按照问题+回答记录的形成总结报告，格式化输出。\n\n#\n巡检项目清单\n1.\n检查配电柜、控制柜、闸前控制箱等电器设备工作是否正常？\n2.\n确认是否已完成对发电机电瓶进行充电，为水箱注水，为发电机邮箱加足够的柴油，并进行空载试运行检查是否正常？\n3.\n巡视液压输油管路有无锈蚀、渗漏现象，检查阀组、电机工作是否正常？\n4.\n测试双电源切换供电功能，确认变压器供电是否正常？\n5.\n评估电动葫芦运行是否平稳？\n\n#\n角色能力\n\n1.\n准确记录每个巡检项目的用户反馈。\n2.\n每次只询问一个巡检项目，以确保记录的准确性。\n3.\n在完成所有巡检项目后，整合信息并生成总结报告。\n\n#\n要求与限制\n\n1.\n准确记录：确保每个巡检项目的用户回答都被准确记录。\n2.\n顺序性：按照清单的顺序逐一询问和记录。不询问清单以外的问题，当你已经询问并记录巡检项目清单的最后一个问题后，生成所有项目清单问题的总结报告。\n3.\n清晰报告：生成的总结报告需要清晰明了，包含所有问题及用户的回答，格式化输出'
        },
        {
          title: '针对天津北三河系，提供隐患信息、抢险技术措施及工程特征等智能查询与指导。',
          content:
            '#\n角色任务\n作为工程巡检助手，你的主要任务是依据巡检项目清单，逐一询问用户关于巡检项的情况，并准确记录其回答。在问完所有巡检项目后，你需要生成一份包含所有问题及用户回答的总结报告。\n\n#\n巡检流程\n\n1.\n初始化：若用户没有明确的诉求，只是简单问候，则默认开始按照巡检项目清单询问。\n2.\n逐项询问：按照巡检项目清单的顺序，逐一询问用户关于巡检项的情况。\n3.\n记录回答：对于用户的每一个回答，并准确记录。\n4.\n询问下一个项目：参考上一轮问过的问题{{ques}}，对照巡检项目清单，询问清单中的下一个项目，不要对单个问题进行拆解。\n5.询问结束，当上一轮问过的问题{{ques}}与巡检项目清单中的最后一个问题一致，停止询问，生成总结。\n5.\n生成总结：整理并输出所有问题及用户的回答，按照问题+回答记录的形成总结报告，格式化输出。\n\n#\n巡检项目清单\n1.\n检查配电柜、控制柜、闸前控制箱等电器设备工作是否正常？\n2.\n确认是否已完成对发电机电瓶进行充电，为水箱注水，为发电机邮箱加足够的柴油，并进行空载试运行检查是否正常？\n3.\n巡视液压输油管路有无锈蚀、渗漏现象，检查阀组、电机工作是否正常？\n4.\n测试双电源切换供电功能，确认变压器供电是否正常？\n5.\n评估电动葫芦运行是否平稳？\n\n#\n角色能力\n\n1.\n准确记录每个巡检项目的用户反馈。\n2.\n每次只询问一个巡检项目，以确保记录的准确性。\n3.\n在完成所有巡检项目后，整合信息并生成总结报告。\n\n#\n要求与限制\n\n1.\n准确记录：确保每个巡检项目的用户回答都被准确记录。\n2.\n顺序性：按照清单的顺序逐一询问和记录。不询问清单以外的问题，当你已经询问并记录巡检项目清单的最后一个问题后，生成所有项目清单问题的总结报告。\n3.\n清晰报告：生成的总结报告需要清晰明了，包含所有问题及用户的回答，格式化输出'
        }
      ]
    : [
        {
          title: '根据会议资料和用户要求，自动生成会议纪要',
          content:
            '# 角色任务\n作为会议纪要生成应用，你的任务是根据提供的会议资料和既定格式，生成对应的会议纪要。你需要处理的资料包括会议记录和参会人员名单。你应确保生成的会议纪要包含会议目的、主要讲话内容、结论和展望，并且按照指定的格式进行组织。\n\n# 角色能力\n1. 会议资料收集\n用户输入参会人员名单{{meeting_people}}后，请询问用户会议记录是否可以提供，用户继续输入会议记录{{meeting_record}，根据用户输入的参会人员名单及会议记录按指定大纲生成会议纪要。\n2. 文本生成\n根据收集的会议资料和既定的格式要求，你需要生成会议纪要文本。\n3. 格式要求遵循\n你必须遵循指定的大纲，包括会议纪要标题【关于会议主题的会议纪要】、参会人员【仅需提供姓名及职位，不用提供工作内容】、正文、落款【包括时间及部门公章】，无需其他内容。正文总体分为3段，正文第1段应描述会议目的，正文第2段总结主要领导讲话（尤其最大领导），正文最后一段为结论和展望。\n\n# 要求与限制\n1. 信息准确性\n确保生成的会议纪要中的信息准确无误，包括会议目的、主要讲话内容、结论和展望等，但正文中不体现这几个字。\n2. 格式遵循\n严格按照指定的格式生成会议纪要，不得擅自更改格式要求。\n3. 段落格式要求\n遵循既定的段落格式，包括标题、参会人员、正文、落款等，确保会议纪要的结构清晰、逻辑连贯。\n4. 输出格式限制\n以作文形式输出的会议纪要，正文内容不用包含【1.会议目的，2.主要领导讲话，3.结论和展望等字】，以便于阅读和编辑。\n5. 处理速度和效率\n你需要能够快速处理会议资料并生成相应的会议纪要，以满足用户的即时需求。'
        },
        {
          title: '一站式工程助手，提供知识问答、监测数据、应急预案生成和监控画面识别等功能。',
          content:
            '# 角色任务\n今年是2024年，作为二道闸水闸工程运行管理智能助手，二道闸所在地点为天津市津南区，你的主要任务是提供与工程运行管理相关的知识问答、监测数据问答，并具备应急预案生成、监控画面识别等功能。你需要协助工程管理人员高效地完成日常工作，解决运行过程中的问题，确保工程的安全和稳定运行。\n\n# 工具能力\n\n1. 知识问答\n你需要具备丰富的工程运行管理相关知识，根据二道闸知识库中的背景知识，能够准确回答用户关于工程运行管理方面的各种问题，包括水闸操作、工程管理流程、相关法规标准等。\n\n2. 监测数据问答\n你需要与工程监测数据系统进行连接，能够实时提供监测数据，并对数据进行解析和解读，需要在结果提供的时候，将返回的日期转换为【YYYY-MM-DD hh:mm】格式，回答用户关于数据的问题，协助用户分析工程运行状态。\n如果没有描述年份，默认为2024年。\n\n3. 应急预案生成\n根据工程实际情况和历史数据，你需要具备生成应急预案的功能，协助用户快速应对突发事件和紧急情况，确保工程的安全。\n\n4. 监控画面识别\n你需要具备监控画面识别功能，能够识别和分析监控画面中的信息，发现异常情况并提醒用户，协助用户实时掌握工程运行状态。\n \n5.隐患问题识别\n如果问到有关工程安全事件、隐患事件、历史案例的问题，去知识库中《根据关于上报《2023年海河二道闸防汛应急预案》的报告》中查询相关信息，并给出答案。\n\n# 要求与限制\n\n1. 实时性\n对于监测数据和监控画面的获取、解读和识别，需要保证实时性，确保用户能够及时获取最新信息。\n\n2. 准确性\n在回答用户问题、解析监测数据和识别监控画面时，需要保证信息的准确性，避免误导用户或造成错误决策。\n\n3. 安全性\n在处理和存储工程数据时，需要保证数据的安全性，避免数据泄露或损坏。\n\n4. 交互性\n需要具备良好的交互性，与用户进行流畅的自然语言交互，提供清晰简洁的回答和指示。\n\n5. 输出格式限制\n输出内容应以文字、图表、图像等形式呈现，具体格式可根据用户需求进行定制。'
        }
      ]
})
const selectCommonUseItem = (val) => {
  inputContent.value = val.content
  toolbarActive.value = undefined
  nextTick(() => getPromptInnerMaxHeight())
}

const historyKeyword = ref('')
const historyList = ref([])
const getHistoryList = () => {
  axios
    .get('http://8.130.37.42:5000/testModule/getChatInfo')
    .then((res) => {
      historyList.value = res.data.result || []
    })
    .catch(() => {
      historyList.value = []
    })
    .finally(() => {
      nextTick(() => getPromptInnerMaxHeight())
    })
}
const getHistoryInfo = (id) => {
  chatId.value = id
  axios
    .get('http://8.130.37.42:5000/testModule/getChatContent', {
      params: {
        conversation_id: id
      }
    })
    .then((res) => {
      chatList.value = res.data.result || []
    })
    .catch(() => {
      chatList.value = []
    })
    .finally(() => {
      toolbarActive.value = undefined
      nextTick(() => {
        getPromptInnerMaxHeight()
        setTimeout(() => {
          promptInnerRef.value.scrollTop = promptInnerRef.value.scrollHeight
        })
      })
    })
}

const toolbarActive = ref()
const toolbarOptions = ref([
  { icon: 'word', label: '文件' },
  { icon: 'microphone', label: '语音' },
  { icon: 'list', label: '常用' },
  { icon: 'time', label: '历史' }
])
const changeToolbarActive = (val) => {
  toolbarActive.value = val
  if (val === '文件') {
    inputFile.value.click()
  } else if (val === '语音') {
    recognition.value.start()
  } else if (val === '历史') {
    getHistoryList()
  }
  nextTick(() => getPromptInnerMaxHeight())
}
watch(
  () => toolbarActive.value,
  (_, oldVal) => {
    if (oldVal === '语音') {
      recognition.value.stop()
    }
  }
)

const inputRef = ref()
const inputContent = ref('')
const inputPlaceholder = ref('')
const handleKeyCode = (event) => {
  if (event.keyCode != 13) return
  if (!event.ctrlKey) {
    event.preventDefault()
    send()
  } else {
    const start = inputRef.value.textarea.selectionStart
    const end = inputRef.value.textarea.selectionEnd
    inputContent.value = inputContent.value.substring(0, start) + '\n' + inputContent.value.substring(end)
    inputRef.value.textarea.blur()
    nextTick(() => {
      inputRef.value.textarea.selectionStart = start + 1
      inputRef.value.textarea.selectionEnd = start + 1
      inputRef.value.textarea.focus()
    })
  }
}

const promptInnerRef = ref()
const chatId = ref()
const chatList = ref([])
const sendBtnDisabled = ref(false)
const sending = ref(false)
const send = async () => {
  if (sendBtnDisabled.value || sending.value) {
    return
  }
  if (!inputContent.value) {
    ElMessage.warning('请输入您的问题！')
    return
  }
  if (!chatId.value) {
    const response = await axios.post(
      '/api/v2/app/conversation',
      {
        app_id: appId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Appbuilder-Authorization': 'Bearer bce-v3/ALTAK-Gkl60D5qgTkh8SuDIAL16/efc151cea77e19dd8e1deca3ac701e2f7d8516b2'
        }
      }
    )
    chatId.value = response.data.conversation_id
    if (!chatId.value) {
      ElMessage.warning('创建对话失败！')
      return
    }
    axios.get('http://8.130.37.42:5000/testModule/creatChatInfo', {
      params: {
        conversation_id: chatId.value
      }
    })
  }
  chatList.value.push({
    content: inputContent.value,
    content_id: new Date().getTime(),
    content_time: new Date().format('yyyy-MM-dd HH:ss:mm'),
    content_type: 0,
    his_id: chatId.value
  })
  if (chatList.value.length === 1) {
    await axios.get('http://8.130.37.42:5000/testModule/updateChatInfo', {
      params: {
        conversation_id: chatId.value,
        conversation_title: inputContent.value
      }
    })
  }
  await axios.get('http://8.130.37.42:5000/testModule/addHisContent', {
    params: {
      conversation_id: chatId.value,
      chat_content: inputContent.value,
      chat_type: 0
    }
  })
  nextTick(() => {
    promptInnerRef.value.scrollTop = promptInnerRef.value.scrollHeight
  })
  getReply()
  inputContent.value = ''
}
let controller
const getReply = async () => {
  sending.value = true
  chatList.value.push({
    content: '智能检索中',
    content_id: new Date().getTime(),
    content_time: new Date().format('yyyy-MM-dd HH:ss:mm'),
    content_type: 1,
    his_id: chatId.value,
    loading: true
  })
  controller = new AbortController()
  const resp = await fetch('/api/v2/app/conversation/runs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appbuilder-Authorization': 'Bearer bce-v3/ALTAK-Gkl60D5qgTkh8SuDIAL16/efc151cea77e19dd8e1deca3ac701e2f7d8516b2'
      //"Accept":"text/event-stream"
    },
    body: JSON.stringify({
      stream: true,
      app_id: appId,
      query: inputContent.value,
      conversation_id: chatId.value
    }),
    signal: controller.signal //与其相关联的signal属性
  })
  if (resp.ok) {
    const lastIndex = chatList.value.length - 1
    chatList.value[lastIndex].content_time = new Date().format('yyyy-MM-dd HH:ss:mm')
    chatList.value[lastIndex].content = ''
    const reader = resp.body.getReader() // 读取返回结果的流数据方法，内置 .read()方法
    const decoder = new TextDecoder('utf-8') // 解码器
    let partialData = ''
    let reflist = []
    // 循环拿到所有数据 done读取完毕
    let flag = true
    while (flag) {
      // 解构读取返回数据，在流式接口中，done 为请求结束，value 是未解码前的二进制数据
      const { done, value } = await reader.read()
      if (done) {
        flag = false
        await axios.get('http://8.130.37.42:5000/testModule/addHisContent', {
          params: {
            conversation_id: chatId.value,
            chat_content: chatList.value[lastIndex].content,
            chat_type: 1
          }
        })
        sending.value = false
        chatList.value[lastIndex].loading = false
        controller.abort() // 保险起见执行一下中断接收
        // 这里执行你 数据响应完全的逻辑
        break
      }
      partialData += decoder.decode(value, { stream: true }) // 二进制解码
      const lines = partialData.split('\n')
      partialData = !partialData.endsWith('\n') ? lines.pop() : ''
      for (const line of lines) {
        const data = line.trim().replace(/^data: /, '') // 去掉data:
        if (data !== '') {
          try {
            const jsonData = JSON.parse(data)
            const content = jsonData.content
            if (content && content.length) {
              for (let i = 0; i < content.length; i++) {
                const outputs = content[i].outputs
                if (outputs && outputs.references && outputs.references.length) {
                  for (let j = 0; j < outputs.references.length; j++) {
                    reflist.push(outputs.references[j])
                  }
                }
              }
            }
            if (jsonData.answer !== '') {
              const answers = jsonData.answer
              chatList.value[lastIndex].content += answers
              nextTick(() => {
                promptInnerRef.value.scrollTop = promptInnerRef.value.scrollHeight
              })
            }
          } catch (error) {
            console.error('Error parsing JSON:', error)
          }
        }
      }
    }
    chatList.value[lastIndex].refs = reflist
    console.log(chatList.value[lastIndex])
  }
}
const zan = (id) => {
  console.log('todo 赞', id)
}
const cai = (id) => {
  console.log('todo 踩', id)
}
const download = (id) => {
  console.log('todo 下载', id)
}
</script>

<style lang="scss" scoped>
.main--wrapper {
  position: relative;
  overflow: auto;
  min-width: 750px;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/bgImg.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.main--inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 1200px;
  padding: 77px 0 24px 0;
}
.mian_title {
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin-bottom: 24px;
  > img {
    width: 38px;
    height: 40px;
    margin-right: 15.5px;
  }
  > h1 {
    margin: 0;
    font-size: 40px;
    font-weight: 500;
    line-height: 24px;
    color: #3d3d3d;
  }
}
.tip {
  font-size: 18px;
  line-height: 36px;
  text-align: center;
  color: #758198;
  margin-bottom: 16px;
}
.prompt--wrapper {
  width: 100%;
  flex: 1;
  margin-bottom: 24px;
}
.prompt--inner {
  overflow: auto;
  width: 100%;
  max-height: v-bind(promptInnerMaxHeight);
  padding: 24px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.01);
  border: 2px solid #ffffff;
  backdrop-filter: blur(51px);
  .hint {
    font-size: 16px;
    line-height: 24px;
    color: #758198;
    margin-bottom: 20px;
  }
  &.is_dialogue {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: v-bind(promptInnerMaxHeight);
  }
}
.prompt_item--wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 24px;
}
.prompt_item {
  display: flex;
  width: 564px;
  height: 104px;
  border-radius: 8px;
  background: linear-gradient(281deg, rgba(255, 255, 255, 0.68) 1%, rgba(255, 255, 255, 0.48) 100%);
  border: 2px solid #ffffff;
  backdrop-filter: blur(10px);
  box-shadow: 0px 4px 16px 0px rgba(222, 233, 254, 0.4);
  padding: 16px;
  cursor: pointer;
  > img {
    width: 32px;
    height: 32px;
    margin-right: 16px;
  }
  .content {
    flex: 1;
    height: 100%;
    .label {
      font-size: 20px;
      font-weight: 500;
      line-height: 20px;
      color: #495b7c;
      margin-bottom: 8px;
    }
    .desc {
      font-size: 14px;
      line-height: 22px;
      color: #495b7c;
      @include ellipsis(2);
    }
  }
  &:hover {
    border-color: #0066ff;
  }
}
.chat_item {
  width: 65%;
  &.user {
    align-self: flex-end;
  }
  .dialogue {
    display: flex;
    gap: 16px;
    > img {
      width: 40px;
      height: 40px;
    }
    .dialogue_item {
      display: flex;
      flex-direction: column;
      width: calc(100% - 56px);
      .role {
        font-size: 14px;
        line-height: 16px;
        color: #495770;
      }
      .content {
        overflow-wrap: break-word;
        white-space: pre-wrap;
        border-radius: 8px;
        background: linear-gradient(277deg, rgba(255, 255, 255, 0.68) 1%, rgba(255, 255, 255, 0.48) 100%);
        border: 2px solid #ffffff;
        backdrop-filter: blur(10px);
        box-shadow: 0px 4px 16px 0px rgba(222, 233, 254, 0.4);
        padding: 12px 16px;
        margin: 8px 0 6px 0;
        font-size: 14px;
        font-weight: 500;
        line-height: 16px;
        color: #333333;
        :deep(img) {
          max-width: 100%;
        }
        @keyframes ellipsis {
          to {
            width: 20px;
          }
        }

        @-webkit-keyframes ellipsis {
          to {
            width: 20px;
          }
        }
        &.loading::after {
          overflow: hidden;
          display: inline-block;
          vertical-align: bottom;
          -webkit-animation: ellipsis steps(4, end) 900ms infinite;
          animation: ellipsis steps(4, end) 900ms infinite;
          content: '\2026'; /* ascii code for the ellipsis character */
          width: 0px;
        }
      }
      .other {
        font-size: 14px;
        line-height: 16px;
        color: #98a3b7;
        .zan_btn,
        .cai_btn,
        .download_btn {
          margin-left: 16px;
          cursor: not-allowed;
        }
        .zan_btn,
        .cai_btn {
          .svg-icon {
            margin-right: 4px;
          }
        }
        .download_btn {
          .svg-icon {
            margin-right: 8px;
          }
        }
      }
    }
  }
  .self.dialogue {
    flex-direction: row-reverse;
    justify-content: flex-start;
    .dialogue_item {
      align-items: flex-end;
      .content {
        background: linear-gradient(274deg, rgba(255, 255, 255, 0.68) 1%, rgba(224, 238, 252, 0.48) 100%);
      }
    }
  }
}
.input--wrapper {
  width: 100%;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.6);
  border: 2px solid #0066ff;
  backdrop-filter: blur(51px);
}
.toolbar {
  display: flex;
  gap: 10px 24px;
  padding: 16px 24px 8px;
  &.specific {
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .toolbar_item {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    > span {
      font-size: 14px;
      color: #758198;
    }
  }
  .retract {
    display: flex;
    gap: 8px;
    cursor: pointer;
    > span {
      font-size: 18px;
      line-height: 24px;
      color: #758198;
    }
  }
  .recording_strip {
    width: 100%;
    height: 32px;
    background-image: url('@/assets/images/soundRecording.png');
  }
  .common_use {
    width: 100%;
  }
  .history_filter {
    width: 100%;
    .el-input__icon {
      cursor: pointer;
    }
    :deep(.el-input__wrapper) {
      box-shadow: 0 0 0 1px #cad2dd inset;
    }
    :deep(.el-input__inner) {
      height: 34px;
      &::placeholder {
        font-size: 14px;
        color: #758198;
      }
    }
  }
}
ul.common_use_tab {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  > li {
    width: 112px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #dee8f6;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    color: #495b7c;
    cursor: pointer;
    &.active {
      background: #0058ff;
      border: 1px solid #dee8f6;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
ul.commoon_use_list,
ul.history_list {
  overflow: auto;
  width: 100%;
  max-height: 120px;
  > li {
    @include ellipsis();
    position: relative;
    width: 100%;
    height: 32px;
    border-radius: 4px;
    background: #f4f7f8;
    font-size: 14px;
    line-height: 32px;
    color: #758198;
    padding: 0 8px 0 32px;
    cursor: pointer;
    + li {
      margin-top: 12px;
    }
    &::before {
      content: '';
      position: absolute;
      top: 12px;
      left: 16px;
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #0058ff;
    }
  }
}
ul.history_list > li {
  display: flex;
  .name {
    @include ellipsis();
    font-size: 14px;
    line-height: 32px;
    color: #758198;
    margin-right: 32px;
  }
  .time {
    flex: 1;
    font-size: 14px;
    line-height: 32px;
    color: #758198;
  }
}
.input--inner {
  position: relative;
  height: 138px;
  border-top: 1px solid #dcedf5;
  padding: 11px 26px;
  .el-textarea {
    height: 100%;
    :deep(.el-textarea__inner) {
      width: 100%;
      height: 100%;
      background-color: transparent;
      padding: 0;
      box-shadow: none;
      color: #ffffff;
      &::placeholder {
        font-size: 14px;
        color: #758198;
      }
    }
  }
  .send_btn {
    overflow: hidden;
    position: absolute;
    right: 16px;
    bottom: 16px;
    width: 72px;
    height: 40px;
    border-radius: 20px;
    background-image: url('@/assets/images/sendBtn.png');
    background-size: 100% 100%;
    cursor: pointer;
    &[disabled='true'] {
      filter: grayscale(100%);
      cursor: not-allowed;
    }
  }
}
@media screen and (max-width: 1200px) {
  .main--inner {
    width: 612px;
  }
  .chat_item {
    width: calc(100% - 56px);
  }
}
</style>
