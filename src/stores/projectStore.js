import { defineStore } from 'pinia'
import axios from '@/api/axios'

export const useProjectStore = defineStore('project', {
  state: () => ({
    prcd: null,
    detail: null
  }),
  actions: {
    resetAll() {
      this.$reset()
    },
    async getDetail(prcd) {
      this.prcd = prcd
      const res = await axios.rscp({
        url: '/mgt/ml/waterdirectory/formInfo',
        method: 'post',
        data: {
          type: '水库',
          prcd: prcd
        }
      })
      this.detail = res.vo
    }
  },
  persist: {
    enabled: true,
    storage: localStorage
  }
})
