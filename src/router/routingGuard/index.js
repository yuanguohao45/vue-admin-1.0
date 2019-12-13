import router from "@/router";

router.beforeEach((to, from, next) => {
  console.log(to);
  next();
});
