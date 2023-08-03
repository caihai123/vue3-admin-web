<template>
  <ProTable row-key="id" :columns="columns" :request="request" headerTitle="角色列表">
    <template #bodyCell="{ column, record }">
      <template v-if="column?.key === 'status'">
        <Switch :checked="record.status === 1" />
      </template>
      <template v-else-if="column?.key === 'action'">
        <Space>
          <Button type="primary" ghost size="small">编辑</Button>
          <Button type="primary" size="small">授权</Button>
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
import axios from '@/utils/axios';
import { h } from 'vue';
import ProTable from '@/components/ProTable/index.vue';
import { Switch, Space, Button } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';

const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
  },
  {
    title: '备注',
    dataIndex: 'description',
    hideInSearch: true,
  },
  {
    title: '状态',
    key: 'status',
    type: 'select',
    options: [
      { label: '启用', value: '1' },
      { label: '禁用', value: '0' },
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

const request = (params, { current, pageSize }) =>
  axios.post('/api/role/page', { params, pageIndex: current, pageSize }).then((value) => {
    const { result: data } = value;
    return {
      list: data.records,
      total: data.total,
    };
  });
</script>

<style scoped>
.tools-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
}

.tools-bar .header-title {
  font-size: 16px;
}

.tools-bar .tool-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}
</style>
