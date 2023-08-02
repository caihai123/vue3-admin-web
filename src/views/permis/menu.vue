<template>
  <Card style="margin-bottom: 16px" bodyStyle="padding-top: 0px;padding-bottom: 0">
    <DropdownFrom :model="formState" @finish="(values) => setParams(values)">
      <Form.Item label="名称" name="title">
        <Input v-model:value="formState.title" placeholder="请输入名称" />
      </Form.Item>
      <Form.Item label="路径" name="path">
        <Input v-model:value="formState.path" placeholder="请输入路径" />
      </Form.Item>
    </DropdownFrom>
  </Card>

  <Card>
    <Table
      rowKey="id"
      :dataSource="data"
      :columns="columns"
      :loading="loading"
      :pagination="false"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'tags'">
          <Tag v-if="record.type === '1'" color="#87d068">菜单</Tag>
          <Tag v-if="record.type === '2'" color="#108ee9">目录</Tag>
        </template>

        <template v-else-if="column.key === 'action'">
          <Space>
            <Button type="primary" ghost size="small">编辑</Button>
            <Button type="primary" size="small">新增下级</Button>
            <Button type="primary" danger size="small">删除</Button>
          </Space>
        </template>
      </template>
    </Table>
  </Card>
</template>

<script setup>
import { reactive } from 'vue';
import { Card, Table, Tag, Space, Button, Form, Input } from 'ant-design-vue';
import { useRequest, useState } from '@/hooks/index';
import axios from '@/utils/axios';
import DropdownFrom from '@/components/DropdownFrom.vue';

const columns = [
  {
    title: '名称',
    dataIndex: 'title',
  },
  {
    title: '路径',
    dataIndex: 'path',
  },
  {
    title: '图标',
    dataIndex: 'icon',
  },
  {
    title: '类型',
    key: 'type',
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    fixed: 'right',
  },
];

const formState = reactive({
  title: '',
  path: '',
});
const [params, setParams] = useState({});

const { data, loading } = useRequest(
  () => {
    // 正常情况会将params作为参数传递
    return axios.get('/api/get-menu-all').then((value) => {
      return value.result;
    });
  },
  {
    refreshDeps: [params],
  }
);
</script>

<style scoped></style>
