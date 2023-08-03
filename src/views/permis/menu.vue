<template>
  <ProTable
    rowKey="id"
    :columns="columns"
    :request="request"
    headerTitle="菜单列表"
    :pagination="false"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column?.key === 'tags'">
        <Tag v-if="record.type === '1'" color="#87d068">菜单</Tag>
        <Tag v-if="record.type === '2'" color="#108ee9">目录</Tag>
      </template>

      <template v-else-if="column?.key === 'action'">
        <Space>
          <Button type="primary" ghost size="small">编辑</Button>
          <Button type="primary" size="small">新增下级</Button>
          <Button type="primary" danger size="small">删除</Button>
        </Space>
      </template>
    </template>

    <template #toolBar>
      <Button type="primary" :icon="h(PlusOutlined)">新增</Button>
    </template>
  </ProTable>
</template>

<script setup>
import { h } from 'vue';
import { Tag, Space, Button } from 'ant-design-vue';
import axios from '@/utils/axios';
import ProTable from '@/components/ProTable/index.vue';
import { PlusOutlined } from '@ant-design/icons-vue';

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
    hideInSearch: true,
  },
  {
    title: '类型',
    key: 'type',
    type: 'select',
    options: [
      { label: '菜单', value: '1' },
      { label: '目录', value: '2' },
    ],
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    fixed: 'right',
    hideInSearch: true,
  },
];

const request = (params) =>
  axios.get('/api/get-menu-all', params).then((value) => {
    return {
      list: value.result || [],
    };
  });
</script>

<style scoped></style>
