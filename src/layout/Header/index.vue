<template>
  <Header class="lay-header" :style="{ background: token.colorBgContainer }">
    <div>
      <div class="trigger" @click="$emit('setCollapsed', !collapsed)">
        <MenuUnfoldOutlined v-if="props.collapsed" />
        <MenuFoldOutlined v-else />
      </div>
    </div>
    <div style="display: flex; padding-right: 16px">
      <div class="header-actions-item">
        <LockOutlined />
      </div>

      <div class="header-actions-item">
        <FullscreenOutlined />
      </div>

      <div class="header-actions-item">
        <Switch
          :checked="!systemStore.isLight"
          @click="systemStore.toggleTheme()"
          checkedChildren="🌜"
          unCheckedChildren="🌞"
        />
      </div>

      <Dropdown>
        <div class="header-actions-item">
          <Avatar
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
            size="small"
          />
          <span style="margin-left: 8px; font-size: 14px">Cai Hai</span>
        </div>
        <template #overlay>
          <Menu>
            <Menu.Item>
              <template #icon>
                <UserOutlined />
              </template>
              个人中心
            </Menu.Item>
            <Menu.Item>
              <template #icon>
                <SettingOutlined />
              </template>
              个人设置
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <template #icon>
                <LoginOutlined />
              </template>
              退出登录
            </Menu.Item>
          </Menu>
        </template>
      </Dropdown>
    </div>
  </Header>
</template>

<script setup>
import { Layout, theme, Switch, Dropdown, Avatar, Menu } from 'ant-design-vue';
import {
  LockOutlined,
  FullscreenOutlined,
  UserOutlined,
  SettingOutlined,
  LoginOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import useSystemStore from '@/stores/system';

const { Header } = Layout;
const { token } = theme.useToken();

const systemStore = useSystemStore();

// trigger 按钮相关
const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.lay-header {
  height: 48px;
  display: flex;
  justify-content: space-between;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 9;
}

.trigger {
  height: 100%;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  font-size: 18px;
  transition: color 0.3s;
  cursor: pointer;
}
.trigger:hover {
  color: #1677ff;
}

.header-actions-item {
  display: flex;
  align-items: center;
  height: 48px;
  font-size: 18px;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;
}
.header-actions-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
