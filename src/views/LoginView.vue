<!-- 用户登录页面 -->
<template>
  <div class="login-view">
    <img class="login-bg-img" src="@/assets/images/login/background.png" />
    <div class="login-panel">
      <div class="title wrapper">
        <div class="icon">
          <img src="@/assets/images/login/system-icon.png" />
        </div>
        <div class="inner">
          <span>广东省智慧水利</span>
          <span>综合门户平台</span>
        </div>
      </div>
      <img class="picture" src="@/assets/images/login/panel-bg.png" />
      <div class="login-box">
        <div class="subtitle">账号登录</div>
        <el-form>
          <el-input v-model="username" size="large" placeholder="请输入用户账号" clearable :prefix-icon="User" />
          <el-input v-model="password" type="password" size="large" placeholder="请输入密码" clearable show-password :prefix-icon="Lock" />
          <el-button type="primary" size="large" style="width: 100%" @click="login">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { login as loginApi, getUserInfo as getUserInfoApi, getPubKey as getPubKeyApi } from '@/api/authCenterApi'
import { getToken, setToken, clearToken } from '@/utils/userToken'
import { localData } from '@/utils/storage'
import { JSEncrypt } from 'jsencrypt'
import globalConfig from '@/config'
import { useEventListener } from '@/composables/event'

const router = useRouter()
const username = ref('')
const password = ref('')

onBeforeMount(() => {
  // 访问登录页面时清空token和用户信息
  clearToken()
  localData.remove('userInfo')
  // 获取加密公钥
  if (globalConfig.loginEncryption) getPubKey()
})

useEventListener(window, 'keypress', (event) => {
  if (event.key === 'Enter') login()
})

// 加密公钥
let publicKey
const getPubKey = () => {
  getPubKeyApi().then((res) => {
    publicKey = res.data
  })
}

// 用户登录
function login() {
  if (!username.value && !password.value) {
    ElMessage.error('请输入账号和密码！')
  } else if (!username.value) {
    ElMessage.error('请输入账号！')
  } else if (!password.value) {
    ElMessage.error('请输入密码！')
  } else {
    let _username = username.value
    let _password = password.value
    if (globalConfig.loginEncryption) {
      const encrypt = new JSEncrypt()
      if (publicKey) {
        _username = btoa(encodeURI(username.value))
        encrypt.setPublicKey(publicKey)
        _password = encrypt.encrypt(password.value)
        if (_password.length < 20) {
          ElMessage.error('登陆失败！')
          return
        }
      } else {
        getPubKey()
        return
      }
    }
    loginApi(_username, _password)
      .then((res) => {
        if (res.data) {
          setToken(res.data)
        } else {
          ElMessage.error('未获取到用户凭证！')
        }
      })
      .catch(() => {
        ElMessage.error('登录失败！')
      })
      .finally(() => {
        if (getToken()) {
          getUserInfo()
        }
      })
  }
}

// 获取用户信息
function getUserInfo() {
  getUserInfoApi()
    .then((res) => {
      localData.set('userInfo', res?.data || {})
    })
    .catch(() => {
      ElMessage.error('获取用户信息失败！')
    })
    .finally(() => {
      router.push({ name: 'root' })
    })
}
</script>

<style scoped lang="scss">
$loginBoxWidth: 450px;
$loginBoxHeight: 640px;
.login-view {
  position: relative;
  min-width: $loginBoxWidth;
  height: 100%;
  min-height: $loginBoxHeight;
  background-image: linear-gradient(90deg, #83b36b 0%, #3d9ccc 100%);
}
.login-bg-img {
  position: absolute;
  width: 1098px;
  height: 599px;
  right: 0;
  bottom: 0;
}
.title.wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2 * $baseDistance;
  width: 100%;
  bottom: 100%;
  transform: translateY(-30%);
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: none;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: #fff;
    > img {
      width: 60px;
    }
  }
  .inner {
    display: flex;
    flex-wrap: wrap;
    > span {
      font-family: 'YouSheBiaoTiHei-2';
      font-size: 48px;
      color: #ffffff;
    }
  }
}
.login-panel {
  position: absolute;
  display: flex;
  width: 1200px;
  height: $loginBoxHeight;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  .picture {
    height: 100%;
  }
  .login-box {
    flex: 1;
    height: 100%;
    background-color: rgba(228, 255, 251, 0.4);
    border-radius: 0 16px 16px 0;
    backdrop-filter: blur(8px);
    padding: 10 * $baseDistance 8 * $baseDistance 0;
    .subtitle {
      font-family: 'YouSheBiaoTiHei-2';
      font-size: 32px;
      color: #ffffff;
      line-height: 40px;
      margin-bottom: 8 * $baseDistance;
    }
    .el-input {
      margin-bottom: 3 * $baseDistance;
    }
  }
}
@media screen and (max-width: 1200px) {
  .login-panel {
    position: absolute;
    display: flex;
    width: 450px;
    height: $loginBoxHeight;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    .picture {
      display: none;
    }
    .login-box {
      flex: 1;
      height: 100%;
      background-color: rgba(228, 255, 251, 0.4);
      border-radius: 16px;
      backdrop-filter: blur(8px);
      padding: 10 * $baseDistance 8 * $baseDistance 0;
    }
  }
}
</style>
