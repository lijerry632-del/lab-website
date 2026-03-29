export default defineNuxtPlugin(() => {
  return {
    provide: {
      githubConfig: {
        user: "你的GitHub用户名",
        repo: "你的仓库名"
      }
    }
  }
})