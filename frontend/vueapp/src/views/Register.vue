<template>
  <div id="register-login">
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>注册 Trello</h1>
        <form id="login-form" method="POST" @submit.prevent="registerSubmit">
          <div>
            <label>
              <input
                v-model="user.name"
                class="form-field"
                autofocus="autofocus"
                placeholder="输入用户名"
              />
            </label>
          </div>
          <div>
            <label>
              <input
              v-model="user.password"
                type="password"
                class="form-field"
                placeholder="输入密码"
              />
            </label>
          </div>
          <div>
            <label>
              <input
              v-model="user.rePassword"
                type="password"
                class="form-field"
                placeholder="再次确认密码"
              />
            </label>
          </div>
          <div>
            <input type="submit" class="btn btn-success" value="注册" />
            <span class="signin-signup-separator">或者</span>
            <!-- <input type="button" class="btn" value="登录" /> -->
            <router-link :to="{name:'Login'}" tag="button" class="btn">登录</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'Register',
  // components: {
  //   TMessage,
  // },
  data() {
    return {
      user: {
        name:'123',
        password:'123456',
        rePassword:'123456',
      }
    }
  },
  methods: {
    async registerSubmit() {
      // 必要的验证
      if(this.user.name.trim() === '' || this.user.password.trim() === ''){
        // return alert('用户和密码不能为空');
        // return TMessage('用户和密码不能为空');
        return this.$message.error('用户和密码不能为空');
      }
      if(this.user.password !== this.user.rePassword){
        // return alert('两次密码不一致');
        return this.$message.error('两次密码不一致');
      }
      // console.log(this.user);
      try {
        await this.$store.dispatch('user/register',{...this.user});
        this.$router.push({name:'Login'});
      } catch (error) {
        
      }
      
    }
  },
}
</script>