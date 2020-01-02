import { getCategory } from "@/api/news";
import { reactive } from "@vue/composition-api";

export function common() {
  // const category = reactive({
  //   item: []
  // });
  const getInfoCategory = (obj, catchFnc) => {
    getCategory({})
      .then(res => {
        if (res.resCode == 0) {
          obj.info = res.data.data;
          // category.item = res.data.data;
          return;
        }
        catchFnc && catchFnc(res.message);
      })
      .catch(err => {});
  };
  return {
    getInfoCategory
    // category
  };
}
