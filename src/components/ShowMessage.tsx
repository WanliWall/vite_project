import { defineComponent, ref, PropType } from "vue"
const props = {
  msg: {
    type: String as PropType<string>,
    required: true
  }
}

export default defineComponent({
  name: 'ShowMesaage',
  props: props,

  setup(props, ctx) {
    // 单值使用泛型方法ref<T>()定义
    // const items = ref<Todo[]>([])
    console.log(props)

    return () => (
      <div>
        { props.msg}
      </div>
    )
  }
})
