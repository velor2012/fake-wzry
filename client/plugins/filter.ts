import Vue from 'vue'
// 时间格式化
export function formatCategories(categories){
    return categories.map(category=>{
        return category.name
    })
    .join('/')
}

let filters = {
    formatCategories
}
  
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
  export default filters