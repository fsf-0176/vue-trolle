<template>
  <div id="register-login">
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>登录到 Trello</h1>
        <form id="register-form" method="POST" @submit.prevent="loginSubmit">
          <div>
            <label>
              <input
                class="form-field"
                v-model="user.name"
                autofocus="autofocus"
                placeholder="输入用户名"
              />
            </label>
          </div>
          <div>
            <label>
              <input type="password" v-model="user.password" class="form-field" placeholder="输入密码" />
            </label>
          </div>
          <div>
            <input type="submit" class="btn btn-success" value="登录" />
            <span class="signin-signup-separator">或者</span>
            <input type="button" class="btn" value="注册" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    async loginSubmit() {

      if (false) {
        return this.$message.error({ message: "用户名和密码不能为空" });
      }

      try {
        await this.$store.dispatch("user/login", { ...this.user });
        this.$router.push({path:'/'});
      } catch (error) {
        console.log(error);
      }

    },
  },
};
</script>