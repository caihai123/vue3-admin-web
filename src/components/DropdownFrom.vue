<template>
  <Form
    ref="formRef"
    class="dropdown-form"
    layout="inline"
    :style="{ height: visible ? 'auto' : 48, paddingRight: visible ? 0 : 188 }"
  >
    <slot />
    <Form.Item class="actions">
      <Space>
        <Button type="primary" htmlType="submit" @click="submitForm"> 查询 </Button>
        <Button @click="reset">重置</Button>
        <Button v-if="visible" type="link" style="padding: 0" @click="setFalse">
          收起 <CaretUpOutlined style="margin-inline-start: 0" />
        </Button>
        <Button v-else type="link" style="padding: 0" @click="setTrue">
          展开 <CaretDownOutlined style="margin-inline-start: 0" />
        </Button>
      </Space>
    </Form.Item>
  </Form>
</template>

<script setup>
import { ref } from 'vue';
import { useBoolean } from '@/hooks/index';
import { Form, Space, Button } from 'ant-design-vue';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue';

const emit = defineEmits(['finish', 'finishFailed']);

const formRef = ref();

const [visible, { setTrue, setFalse }] = useBoolean(false);

const submitForm = function () {
  formRef.value
    .validate()
    .then((values) => {
      emit('finish', values);
    })
    .catch((error) => {
      emit('finishFailed', error);
    });
};

const reset = function () {
  formRef.value.resetFields();
  submitForm();
};
</script>

<style scoped>
.dropdown-form {
  width: 100%;
  position: relative;
  overflow-y: hidden;
  padding-top: 16px;
}
.dropdown-form::after {
  content: '';
  display: inline-block;
  width: 188px;
  height: 32px;
  vertical-align: top;
  margin-bottom: 16px;
}
.dropdown-form .ant-form-item {
  margin-bottom: 16px;
}

.actions {
  position: absolute;
  right: -16px;
  bottom: 0;
  z-index: 10;
}
</style>
