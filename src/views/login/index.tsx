import { defineComponent, reactive, ref, } from "vue"
import type { ElForm } from 'element-plus'
import type { Todo } from '../../types'

import ShowMessage from '../../components/ShowMessage'


export default defineComponent({
  name: 'Login',

  setup(props, ctx) {
    // 单值使用泛型方法ref<T>()定义
    const items = ref<Todo[]>([])  

    const loginFormRef = ref<InstanceType<typeof ElForm>>()
    const loginForm = reactive({
      username: '',
      password: ''
    })

    return () => (
      <div>
        <ShowMessage msg="123" />
        <el-form
          ref={loginFormRef}
          model={loginForm}
          labelWidth="120px"
          className="demo-ruleForm"
          size="formSize"
        >
          <el-form-item lable="用户名">
            <el-input vModel={loginForm.username} />
          </el-form-item>
          <el-form-item lable="密码">
            <el-input vModel={loginForm.password} />
          </el-form-item>
        </el-form>
      </div>
    )
  }
})
