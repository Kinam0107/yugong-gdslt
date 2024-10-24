<!-- 顶部导航栏 -->
<template>
  <div class="top_nav" :class="props.bgType">
    <div class="system_name">
      <slot name="systemIcon"></slot>
      <span>{{ props.systemName }}</span>
    </div>
    <div class="menu">
      <slot></slot>
    </div>
    <div v-if="props.showDatetime" class="time">{{ time }}</div>
    <el-icon v-if="props.showConfig" class="config" :size="20" color="#fff" @click="config">
      <Setting />
    </el-icon>
    <el-icon v-if="props.showNotice" class="notice" :size="20" color="#fff" @click="notice">
      <el-badge is-dot style="transform: translateY(2px)">
        <Bell />
      </el-badge>
    </el-icon>
    <el-popover placement="bottom" :width="320" trigger="click" @show="showMore = true" @hide="showMore = false">
      <template #reference>
        <div class="user">
          <el-avatar :src="userInfo.avatarPath || ''" :size="36">
            <img src="@/assets/images/empty/avatar-icon.png" />
          </el-avatar>
          <span class="name">{{ userInfo.nickName || userInfo.username || '-' }}</span>
          <el-icon class="arrow" :size="20" color="#fff">
            <ArrowUp v-if="showMore" />
            <ArrowDown v-else />
          </el-icon>
        </div>
      </template>
      <div id="userPanel">
        <div class="top">
          <el-avatar :src="userInfo.avatarPath || ''" :size="48">
            <img src="@/assets/images/empty/avatar-icon.png" />
          </el-avatar>
          <div class="user_info">
            <div class="name">{{ userInfo.username || userInfo.nickName || '-' }}</div>
            <div class="position">{{ userInfo.roleName || '-' }}</div>
          </div>
          <el-button link @click="changeCipher" disabled>修改密码</el-button>
        </div>
        <ul class="middle">
          <li>
            <span>部门</span>
            <span>{{ userInfo.deptName || '-' }}</span>
          </li>
          <li>
            <span>邮箱</span>
            <span>{{ userInfo?.email || userInfo?.user?.email || '-' }}</span>
          </li>
          <li>
            <span>电话</span>
            <span>{{ userInfo?.phoneNumber || userInfo?.user?.phone || '-' }}</span>
          </li>
        </ul>
        <div class="bottom" v-if="!props.showQuit">
          <el-button plain style="width: 100%" @click="quit">退出</el-button>
        </div>
      </div>
    </el-popover>
    <el-button v-if="props.showQuit" class="ghost_button" type="primary" size="small" @click="quit">退出</el-button>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Setting, Bell, ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { getUserInfo } from '@/utils/userInfo'
import { logout } from '@/api/authCenterApi'

const props = defineProps({
  // 系统名称
  systemName: {
    type: String,
    default: '义乌市水库运行管理矩阵'
  },
  // 背景色
  bgType: {
    type: String,
    default: ''
  },
  // 是否展示日期时间
  showDatetime: {
    type: Boolean,
    default: false
  },
  // 是否显示设置按钮
  showConfig: {
    type: Boolean,
    default: false
  },
  // 是否显示通知按钮
  showNotice: {
    type: Boolean,
    default: false
  },
  // 是否显示退出按钮
  showQuit: {
    type: Boolean,
    default: false
  }
})

// 时间显示相关
const time = ref(new Date().format('MM月dd日 EE HH:mm:ss'))
let intervalId
onMounted(() => {
  intervalId = setInterval(() => {
    time.value = new Date().format('MM月dd日 EE HH:mm:ss')
  }, 1000)
})
onUnmounted(() => clearInterval(intervalId))

// todo 设置
function config() {
  console.log('config')
}

// todo 通知
function notice() {
  console.log('notice')
}

// 用户信息相关
const userInfo = reactive(getUserInfo() || {})
const showMore = ref(false)

// todo 修改密码
function changeCipher() {
  console.log('changeCipher')
}

// 退出
const router = useRouter()
function quit() {
  logout().then(() => {
    router.push('/login')
  })
}
</script>

<style scoped lang="scss">
.top_nav {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 3 * $baseDistance;
  background-image: url('@/assets/images/headBg.png');
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: 30 * $baseDistance;
    position: absolute;
    right: 0;
    background-image: url('@/assets/images/headBgImg.png');
    z-index: 0;
  }
  &.gradient {
    background-image: $color-gradient;
  }
  &.primary {
    background-color: $color-primary;
  }
  &.white {
    background-color: #ffffff;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
    .system_name > span {
      color: $color-primary;
    }
    .config,
    .notice,
    .user .name,
    .user .arrow {
      color: $color-titletext;
    }
    .ghost_button {
      border-color: $color-border !important;
      color: $color-titletext;
    }
  }
}
.system_name {
  display: flex;
  align-items: center;
  gap: $baseDistance;
  flex: none;
  height: 100%;
  margin-right: 3 * $baseDistance;
  z-index: 1;
  > span {
    font-family: Lantinghei SC;
    font-size: 26px;
    color: #ffffff;
  }
}
.menu {
  flex-grow: 1;
  flex-shrink: 0;
  height: 100%;
  z-index: 1;
}
.time {
  font-size: 14px;
  color: #ffffff;
  padding: 0 3 * $baseDistance;
  z-index: 1;
}
.config,
.notice {
  width: 4 * $baseDistance;
  height: 100%;
  cursor: pointer;
  z-index: 1;
  &:hover {
    background-color: rgba(246, 246, 246, 0.25);
  }
}
.user {
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
  z-index: 1;
  .el-avatar {
    background-color: transparent;
  }
  .name {
    margin: 0 8px;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1.5px;
    color: $color-whitebg;
  }
}
#userPanel {
  padding: 12px;
  .top {
    display: flex;
    .user_info {
      flex: 1;
      margin-left: 16px;
      .name {
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
        color: $color-titletext;
      }
      .position {
        font-size: 12px;
        line-height: 20px;
        color: $color-titletext;
      }
    }
  }
  .middle {
    margin-top: 16px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 38px;
      + li {
        border-top: 1px solid $color-separator;
      }
      span {
        font-size: 14px;
        color: $color-titletext;
        &:first-child {
          color: $color-explaintext;
        }
      }
    }
  }
  .bottom {
    margin-top: 16px;
  }
}
.ghost_button {
  margin-left: 2 * $baseDistance;
}
</style>
