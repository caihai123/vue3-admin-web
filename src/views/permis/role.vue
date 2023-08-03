<template>
  <Card style="margin-bottom: 16px" bodyStyle="padding-top: 0px;padding-bottom: 0">
    <DropdownFrom :model="formState" @finish="(values) => setParams(values)">
      <Form.Item label="角色名称" name="roleName">
        <Input v-model:value="formState.roleName" placeholder="请输入角色名称" />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Input v-model:value="formState.status" placeholder="请选择状态" />
      </Form.Item>
    </DropdownFrom>
  </Card>

  <Card bodyStyle="padding-top: 16px; padding-bottom: 0px">
    <div class="tools-bar">
      <div class="header-title">角色列表</div>
      <div class="tool-right">
        <Space>
          <Button type="primary" :icon="h(PlusOutlined)">新增</Button>
        </Space>
      </div>
    </div>
    <Table
      rowKey="id"
      :dataSource="data?.list"
      :columns="columns"
      :loading="loading"
      :pagination="{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `第 ${range.join('-')} 条/共 ${total} 条`,
        onChange: pagination.onChange,
      }"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <Switch :checked="record.status === 1" />
        </template>
        <template v-else-if="column.key === 'action'">
          <Space>
            <Button type="primary" ghost size="small">编辑</Button>
            <Button type="primary" size="small">授权</Button>
            <Button type="primary" danger size="small">删除</Button>
          </Space>
        </template>
      </template>
    </Table>
  </Card>
</template>

<script setup>
import { reactive, h } from 'vue';
import { Card, Table, Space, Button, Form, Input, Switch } from 'ant-design-vue';
import DropdownFrom from '@/components/DropdownFrom.vue';
import { usePagination, useState } from '@/hooks/index';
import axios from '@/utils/axios';
import { PlusOutlined } from '@ant-design/icons-vue';

const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
  },
  {
    title: '备注',
    dataIndex: 'description',
  },
  {
    title: '状态',
    key: 'status',
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

const { data, pagination, loading } = usePagination(
  ({ current, pageSize }) => {
    return axios
      .post('/api/role/page', { params: params.value, pageIndex: current, pageSize })
      .then((value) => {
        const { result: data } = value;
        return {
          list: data.records || [],
          total: data.total,
        };
      });
  },
  {
    refreshDeps: [params],
  }
);
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
