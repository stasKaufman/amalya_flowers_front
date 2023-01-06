<template>
    <div id="login-box" v-loading="loading">
      <el-card class="box-card">
          <el-form ref="loginFormRef" :rules="rules" :model="loginDetails">
              <el-form-item label="Name" prop="name">
                  <el-input v-model="loginDetails.name" />
              </el-form-item>
              <el-form-item label="Password" prop="password">
                  <el-input type="password" show-password v-model="loginDetails.password" />
              </el-form-item>
              <el-button type="primary" @click="onSubmit">Login</el-button>
          </el-form>
      </el-card>
    </div>
</template>
<script>
export default {
  name: 'LogIn',
  data () {
    return {
      loading: false,
      loginDetails: {
        name: '',
        password: null
      },
      rules: {
        name: [
          { required: true, message: 'Please input a user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input a password', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      this.$refs.loginFormRef.validate(async (isValid) => {
        if (!isValid) {
          console.log('params not valid.')
        }
        await this.$store.dispatch('login', this.loginDetails)
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>

#login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.box-card {
  max-width: 480px;
  height: 175px;
}

</style>
