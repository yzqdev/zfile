<template>
  <el-form :inline="true" class="zfile-header" size="small">
    <el-form-item>
      <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' + driveId + '/' }">
          {{
            this.$store.state.common.config.siteName
                ? this.$store.state.common.config.siteName
                : "首页"
          }}
        </el-breadcrumb-item>
        <el-breadcrumb-item
            v-for="item in breadcrumbData"
            class="hidden-xs-only"
            :to="{ path: '/home' + driveId + '/' + item.fullPath }"
            :key="item.path"
        >{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-form-item>
    <div class="zfile-header-drive box animate__animated animate__fadeIn">
      <el-form-item
          v-show="$store.getters.debugMode"
          label="已开启 DEBUG 模式，使用完请及时关闭"
          class="zfile-debug-tips"
          size="small"
      >
        <el-button @click="resetAdminPwd" size="small" type="danger"
        >重置密码
        </el-button
        >
      </el-form-item>

      <el-form-item label="图片模式" size="small">
        <el-switch v-model="imgModel"></el-switch>
      </el-form-item>

      <el-select
          size="small"
          v-model="currentDriveId"
          placeholder="请选择驱动器"
      >
        <el-option
            v-for="item in driveList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import path from "path";
import {onBeforeMount, onMounted, reactive, toRefs, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import axios from "../utils/http";
import {ElMessage, ElMessageBox} from "element-plus";

let props = defineProps({
  // driveId: String,
});
let state = reactive({
  imgModel: false,
  driveList: [],
  currentDriveId: "",
  search: "",
  breadcrumbData: [],
  searching: false,
  timer: null,
});
let router = useRouter();
let route = useRoute();
let store = useStore();
let {
  imgModel,
  driveList,
  currentDriveId,
  search,
  breadcrumbData,
  searching,
  timer,
} = toRefs(state);

function resetAdminPwd() {
  ElMessageBox.confirm(
      "是否确认重置后台管理员密码？重置后用户名/密码将强制修改为 admin 123456",
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: (action) => {
          if (action === "confirm") {
            axios.get("/debug/resetPwd").then((response) => {
              if (response.data.code === 0) {
                ElMessage({
                  type: "success",
                  message: "重置成功，请及时关闭 debug 功能，防止出现安全问题！",
                });
              } else {
                ElMessage({
                  type: "error",
                  message: response.data.msg,
                });
              }
            });
          }
        },
      }
  );
}

function buildBreadcrumbData() {
  state.breadcrumbData = [];
  let fullPath: string = route.params.pathMatch;
  fullPath = fullPath ? fullPath : "/";

  while (fullPath !== "/") {
    let name = path.basename(fullPath);
    state.breadcrumbData.unshift({name, fullPath});
    fullPath = path.resolve(fullPath, "../");
  }
}

function refreshCurrentStorageStrategy() {
  state.driveList.some((item) => {
    if (item.id === state.currentDriveId) {
      store.commit("common/updateCurrentStorageStrategy", item);
    }
  });
}

onBeforeMount(() => {
  buildBreadcrumbData();
});
onMounted(async () => {
  await axios.get("/api/drive/list").then((response) => {
    if (!response.data.data.isInstall) {
      router.push("/install");
      return;
    }

    state.driveList = response.data.data.driveList;
    // 如果当前 URL 参数中有驱动器 ID, 则直接用当前的.
    if (route.params.driveId) {

      state.currentDriveId =   route.params.driveId ;
    } else if (state.driveList.length > 0) {
      // 否则读取驱动器列表中的第一个, 并跳转到响应的 URL 中.
      state.currentDriveId = state.driveList[0].id;
      router.push({
        name: 'home',
        params: {
          driveId: state.driveList[0].id
        }
      })
    } else if (state.driveList.length === 0) {
      ElMessageBox.confirm(
          "当前无可用驱动器，是否跳转至管理员页面添加驱动器？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
            callback: (action) => {
              if (action === "confirm") {
                router.push("/login");
              }
            },
          }
      );
    }

    refreshCurrentStorageStrategy();
  });
});

watch(currentDriveId, (newVal, oldVal) => {
  store.commit("common/updateOldDriveId", oldVal);
  refreshCurrentStorageStrategy();
  if (oldVal !== "") {
    router.push({
      name: 'home',
      params: {driveId: newVal}
    });
  }
});
watch(
    store.state.common,
    (newVal) => {
      state.imgModel = newVal.imgMode;
    },
    {deep: true}
);
watch(imgModel, () => {
  store.commit("common/switchImgMode", state.imgModel);
});
watch(route, () => {
  buildBreadcrumbData();
});
watch(search, (newVal) => {
  clearTimeout(state.timer);
  state.timer = setTimeout(() => {
    store.commit("updateSearchParam", newVal);
  }, 150);
});
</script>

<style scoped>
.zfile-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 48px;
  line-height: 48px !important;
  background: #fafafa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-left: 30px;
}

.zfile-header .el-breadcrumb {
  line-height: 48px;
  font-size: 13px;
}

.zfile-header .el-input {
  line-height: 48px;
}

@media only screen and (max-width: 767px) {
  .zfile-header >>> .el-breadcrumb__separator {
    display: none !important;
  }

  .zfile-header >>> .el-form-item__label {
    display: none !important;
  }

  .zfile-header >>> .el-select {
    width: 120px;
  }
}

.zfile-header-drive {
  margin-right: 20px;
}

.zfile-header-drive >>> .el-form-item__content {
  vertical-align: unset;
}

.zfile-debug-tips >>> .el-form-item__label {
  font-weight: bold;
  color: red !important;
}
</style>
