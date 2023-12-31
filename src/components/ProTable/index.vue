<template>
  <DropdownFrom :model="formState" @finish="(values) => setParams(values)">
    <FormItem
      v-for="item in columns.filter((item) => item.hideInSearch !== true)"
      :key="getRowkey(item)"
      :item="item"
      :formState="formState"
    />
  </DropdownFrom>

  <div style="margin-top: 16px">
    <Card :bodyStyle="{ paddingTop: 16, paddingBottom: props.pagination ? 0 : 24 }">
      <div
        class="tools-bar"
        :style="{ display: selectedRowKeys.length > 0 ? 'none' : '', color: token.colorText }"
      >
        <div class="header-title">
          <slot name="headerTitle">{{ headerTitle }}</slot>
        </div>
        <div class="tool-right">
          <slot name="toolBar"></slot>

          <div class="toolbar-setting">
            <div class="toolbar-setting-item" @click="() => refresh()">
              <Tooltip title="刷新">
                <ReloadOutlined />
              </Tooltip>
            </div>
            <Dropdown :overlayStyle="{ width: 80 }" :trigger="['click']">
              <div class="toolbar-setting-item">
                <Tooltip title="密度">
                  <ColumnHeightOutlined />
                </Tooltip>
              </div>
              <template #overlay>
                <Menu
                  selectable
                  :selectedKeys="[tableSize]"
                  @click="({ key }) => setTableSize(key)"
                >
                  <Menu.Item key="large">默认</Menu.Item>
                  <Menu.Item key="middle">中等</Menu.Item>
                  <Menu.Item key="small">紧凑</Menu.Item>
                </Menu>
              </template>
            </Dropdown>

            <ColumnSetting
              :value="configkeys"
              :options="
                tableColumns.map((item) => ({
                  label: item.title,
                  value: getRowkey(item),
                }))
              "
              @change="(keys) => setConfigkeys(keys)"
            >
              <div class="toolbar-setting-item">
                <Tooltip title="列设置">
                  <SettingOutlined />
                </Tooltip>
              </div>
            </ColumnSetting>
          </div>
        </div>
      </div>

      <div
        v-if="props.showBatchBar"
        class="batch-bar"
        :style="{
          display: selectedRowKeys.length > 0 ? '' : 'none',
          color: token.colorText,
          backgroundColor: token.controlItemBgActive,
          borderRadius: token.borderRadius,
        }"
      >
        <div>
          <span>已选 {{ selectedRowKeys.length }} 项</span>
          <Button type="link" @click="() => setSelectedRowKeys([])"> 取消选择 </Button>
        </div>
        <Space>
          <slot name="batchBar" :selectedRowKeys="selectedRowKeys"></slot>
        </Space>
      </div>

      <Table
        :rowKey="props.rowKey"
        :dataSource="data?.list"
        :columns="
          tableColumns.filter((item) => {
            const key = getRowkey(item);
            return configkeys.includes(key);
          })
        "
        :loading="loading"
        :pagination="
          props.pagination
            ? {
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range.join('-')} 条/共 ${total} 条`,
                onChange: pagination.onChange,
                ...props.pagination,
              }
            : false
        "
        bordered
        :size="tableSize"
        :rowSelection="rowSelection"
      >
        <template #bodyCell="{ column, record }">
          <slot name="bodyCell" :column="column" :record="record"></slot>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { Card, Table, Dropdown, Tooltip, Menu, theme, Button, Space } from 'ant-design-vue';
import { usePagination, useState } from '@/hooks/index';
import DropdownFrom from '@/components/DropdownFrom.vue';
import { ReloadOutlined, ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons-vue';
import ColumnSetting from './SettingOutlined.vue';
import FormItem from './FormItem/index.vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  request: {
    type: Function,
    required: true,
  },
  rowKey: {
    type: String,
    required: true,
  },
  headerTitle: {
    type: String,
    required: true,
  },
  pagination: {
    type: [Boolean, Object],
    default: true,
  },
  // 是否显示批量操作栏
  showBatchBar: {
    type: [Boolean],
    default: false,
  },
  tableRowSelection: {
    type: Object,
    default: () => null,
  },
});

const getRowkey = function (row) {
  return row.key || row.dataIndex;
};

const { token } = theme.useToken();

const formState = reactive(
  Object.fromEntries(
    props.columns
      .filter((item) => typeof item.initialValue !== 'undefined')
      .map(({ dataIndex, initialValue }) => [dataIndex, initialValue])
  )
);
const [params, setParams] = useState({});

// 表格上使用的columns
const tableColumns = computed(() => props.columns.filter((item) => item.hideInTable !== true));
const { data, pagination, loading, refresh } = usePagination(
  ({ current, pageSize }) => props.request(params, { current, pageSize }),
  {
    refreshDeps: [params],
    defaultCurrent: props.pagination?.current || 1,
    defaultPageSize: props.pagination?.pageSize || 10,
  }
);

// 当前选中的keys
const [selectedRowKeys, setSelectedRowKeys] = useState([]);
const rowSelection = computed(() => {
  return props.showBatchBar
    ? {
        type: 'checkbox',
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
        preserveSelectedRowKeys: true,
        ...props.tableRowSelection,
      }
    : undefined;
});

const [tableSize, setTableSize] = useState('large');
// 表格设置栏
const [configkeys, setConfigkeys] = useState(tableColumns.value.map((item) => getRowkey(item)));
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

.tools-bar .toolbar-setting {
  display: flex;
  gap: 8px;
  line-height: 32px;
  align-items: center;
}
.tools-bar .toolbar-setting .toolbar-setting-item {
  margin-block: 0;
  margin-inline: 4px;
  font-size: 16px;
  cursor: pointer;
}
.tools-bar .toolbar-setting .toolbar-setting-item:hover {
  color: #1677ff;
}

.batch-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
}
</style>
