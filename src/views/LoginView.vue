<!-- 用户登录页面 -->
<template>
  <div class="login-view" v-loading="loading" element-loading-text="正在登录，请稍后..."></div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login as loginApi, loginRscp as loginRscpApi, getPubKey as getPubKeyApi } from '@/api/authCenterApi'
import { getToken, setToken } from '@/utils/userToken'
import Cookies from 'js-cookie'
import { JSEncrypt } from 'jsencrypt'
import globalConfig from '@/config'

const router = useRouter()
const loading = ref(true)
const username = ref('liuchen')
const password = ref('ygkj0818')
const TokenKey = 'Authorization'

onBeforeMount(() => {
  Cookies.remove(TokenKey)
  if (globalConfig.loginEncryption) {
    getPubKey()
  } else {
    login()
  }
})

let publicKey
const getPubKey = () => {
  getPubKeyApi().then((res) => {
    publicKey = res.data
    login()
  })
}

function login() {
  let _username = username.value
  let _password = password.value
  if (globalConfig.loginEncryption) {
    const encrypt = new JSEncrypt()
    if (publicKey) {
      _username = btoa(encodeURI(username.value))
      encrypt.setPublicKey(publicKey)
      _password = encrypt.encrypt(password.value)
    } else {
      // getPubKey()
      return
    }
  }
  loginApi(_username, _password)
    .then((res) => {
      res.data ? Cookies.set(TokenKey, res.data) : ElMessage.error('未获取到用户凭证！')
    })
    .catch(() => {
      ElMessage.error('登录失败！')
    })
    .finally(() => {
      if (Cookies.get(TokenKey)) {
        getRscpToken()
      }
    })
}

function getRscpToken() {
  loginRscpApi()
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
        router.push({ name: 'root' })
      }
    })
}
</script>

<style scoped lang="scss">
.login-view {
  position: relative;
  height: 100%;
}
</style>
