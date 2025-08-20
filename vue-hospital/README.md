## 尚医通预约挂号平台

基于 Vue 3 + TypeScript + Vite + Element Plus 的实战项目，用于模拟在线医院查询与预约挂号的完整业务流程。项目采用模块化目录与工程化配置，内置登录鉴权、全局路由守卫、接口代理与常用 UI 组件封装，适合学习与二次开发。

> 声明：本项目仅用于学习与技术交流，接口指向公开演示服务，非官方商用系统。

### 技术栈

- Vue 3（`<script setup>` 组合式 API）
- TypeScript
- Vite 7（开发/构建/本地预览）
- Vue Router 4（前端路由）
- Pinia 3（状态管理）
- Element Plus（UI 组件库）
- Axios（HTTP 请求）
- NProgress（路由加载进度条）
- Sass、unplugin-auto-import、unplugin-vue-components（按需自动引入）

### 功能概览

- 首页：轮播、医院等级/地区筛选、医院卡片、快捷入口
- 医院模块：
  - 预约挂号：选择日期/号源、医生班次（上午/下午）、确认挂号
  - 医院详情、预约通知、停诊信息、搜索
- 挂号流程：
  - Step1 选择日期与号源 → Step2 选择就诊人并确认信息 → 提交订单
- 用户中心：实名认证、就诊人管理、挂号订单、账号信息、意见反馈
- 登录方式：短信验证码登录、微信扫码登录（跳转至 `wxlogin`）
- 体验细节：
  - 顶部/底部/登录/就诊人等全局组件
  - 路由进度条与动态标题

### 本地运行与构建

环境要求：建议 Node.js ≥ 18

```bash
# 安装依赖
npm install

# 本地开发（自动打开浏览器）
npm run dev

# 生产构建
npm run build

# 本地预览构建产物
npm run preview
```

开发服务器默认通过 Vite 代理将以 `/api` 开头的请求转发至演示后端：

- 代理：`/api` → `http://syt.atguigu.cn`
- Axios 基础路径：`/api`

### 目录结构（节选）

```text
src/
  api/                 # 业务接口封装（医院、用户等）
  assets/              # 静态资源
  components/
    hospital_top/      # 顶部全局组件
    hospital_bottom/   # 底部全局组件
    login/             # 登录对话框（短信/微信）
    countdown/         # 短信验证码倒计时
    visitor/           # 就诊人卡片
  page/
    home/              # 首页模块
    hospital/          # 医院模块（预约、详情、通知、停诊、搜索等）
      register/        # 挂号 Step1/Step2
    user/              # 用户中心（实名认证、订单、就诊人、资料、反馈）
    wxlogin/           # 微信登录回调页
  router/              # 路由配置
  store/               # Pinia 状态（用户、医院等）
  utils/               # 请求封装、token 工具
  style/               # 全局样式与重置
  permisstion.ts       # 路由前后置守卫（鉴权、标题、进度条）
```

### 架构与关键实现

- 路由与导航守卫（`src/permisstion.ts`）
  - 进入路由前：启动 NProgress、设置网页标题（`尚医通-${to.meta.title}`）
  - 白名单路径：`/home`、`/hospital/register`、`/hospital/detail`、`/hospital/notice`、`/hospital/close`、`/hospital/search`
  - 非白名单且未登录：弹出登录对话框并重定向回来源路径
- 状态管理（`Pinia`）
  - `src/store/user.ts`：短信验证码、登录、登出、轮询查询扫码登录状态等
  - 用户信息 token 使用 `localStorage`（`USERINFO`）进行持久化
- 请求与拦截器（`src/utils/request.ts`）
  - `baseURL: '/api'`，超时 5s
  - 请求拦截：若存在用户 token，则自动附加至 `headers.token`
  - 响应拦截：统一返回 `response.data`，异常场景弹出消息提示
- 全局组件与国际化
  - 在 `src/main.ts` 中注册 `HospitalTop`、`HospitalBottom`、`Login`、`Visitor`
  - `Element Plus` 默认启用中文包 `zh-cn`

### 业务流程示例：预约挂号

1. 在医院详情或科室页面进入预约：选择日期与班次（Step1）
2. 选择医生 → 进入确认页（Step2），从就诊人列表中选择或新增
3. 确认挂号信息与费用 → 提交订单 → 跳转订单详情

### 配置说明

- 别名：`@` 映射到 `src/`
- 代理：`vite.config.ts` 中配置 `/api` 转发到 `http://syt.atguigu.cn`
- 脚本：
  - `dev`：本地开发
  - `build`：类型检查 + 生产构建
  - `preview`：本地静态服务预览

### 常见问题

- 短信验证码/微信扫码登录依赖演示后端服务，若网络或地区限制导致异常，可切换网络或稍后再试。
- 若需对接自有后端，请将 `vite.config.ts` 的代理目标与 `src/utils/request.ts` 的 `baseURL` 调整为你的网关地址。

### 许可与声明

- 仅供学习与交流，禁止用于商业用途。
- 如需转载或引用，请注明出处与项目链接。

### 页面路由清单

- /home
- /hospital/register
- /hospital/detail
- /hospital/notice
- /hospital/close
- /hospital/search
- /hospital/register_step1
- /hospital/register_step2
- /user/certification
- /user/order
- /user/patient
- /user/profile
- /user/feedback
- /wxlogin

### 鉴权与会话

- 登录弹窗：通过全局组件 `components/login/index.vue` 控制，`Pinia` 中的 `userStore.visiable` 为开关。
- Token 存储：登录成功后将 `userInfo` 字符串化存入 `localStorage` 的 `USERINFO`（见 `src/utils/user.ts`）。
- 请求携带：在 `src/utils/request.ts` 的请求拦截器中，若存在 `userInfo.token`，则自动设置到 `headers.token`。
- 路由白名单与重定向：未登录访问非白名单页面时，弹出登录并重定向回原页面（见 `src/permisstion.ts`）。
- 进度与标题：`NProgress` 展示路由切换进度，标题动态为 `尚医通-${to.meta.title}`。

### 数据接口概览（按模块）

以下路径均以 Vite 代理前缀 `/api` 开头（即最终请求为 `/api/...`）。仅列出核心接口，更多详见 `src/api/*`。

- 首页（`src/api/home/index.ts`）
  - GET `/hosp/hospital/{page}/{limit}?hostype=&districtCode=`：分页医院列表
  - GET `/cmn/dict/findByDictCode/{dictCode}`：数据字典（医院等级/地区）
  - GET `/hosp/hospital/findByHosname/{hosname}`：按名称搜索医院

- 医院与挂号（`src/api/hospital/index.ts`）
  - GET `/hosp/hospital/{hoscode}`：医院详情
  - GET `/hosp/hospital/department/{hoscode}`：科室树
  - GET `/sms/send/{phone}`：获取短信验证码
  - POST `/user/login`：用户登录（短信验证码）
  - GET `/user/weixin/getLoginParam/?wxRedirectUri=`：微信登录参数
  - GET `/hosp/hospital/auth/getBookingScheduleRule/{page}/{limit}/{hoscode}/{depcode}`：可预约日期规则（鉴权）
  - GET `/hosp/hospital/auth/findScheduleList/{hoscode}/{depcode}/{workDate}`：日期对应号源（鉴权）
  - GET `/user/patient/auth/findAll`：就诊人列表（鉴权）
  - GET `/hosp/hospital/getSchedule/{scheduleId}`：医生/排班详情

- 用户与订单（`src/api/user/index.ts`）
  - POST `/order/orderInfo/auth/submitOrder/{hoscode}/{scheduleId}/{patientId}`：提交挂号订单（鉴权）
  - GET `/order/orderInfo/auth/getOrderInfo/{id}`：订单详情（鉴权）
  - GET `/order/orderInfo/auth/cancelOrder/{id}`：取消订单（鉴权）
  - GET `/order/weixin/createNative/{orderId}`：生成支付二维码（鉴权）
  - GET `/order/weixin/queryPayStatus/{orderId}`：查询支付状态（鉴权）
  - GET `/user/auth/getUserInfo`：当前用户信息（鉴权）
  - GET `/cmn/dict/findByDictCode/{CertificatesType}`：证件类型字典
  - POST `/user/auth/userAuah`：实名认证（鉴权）
  - GET `/order/orderInfo/auth/{page}/{limit}?patientId=&orderStatus=`：用户订单分页（鉴权）
  - GET `/user/patient/auth/findAll`：全部就诊人（鉴权）
  - GET `/order/orderInfo/auth/getStatusList`：订单状态字典
  - GET `/cmn/dict/findByParentId/{parentId}`：行政区划级联
  - POST `/user/patient/auth/save`：新增就诊人（鉴权）
  - PUT `/user/patient/auth/update`：更新就诊人（鉴权）
  - DELETE `/user/patient/auth/remove/{id}`：删除就诊人（鉴权）

### 部署与发布

- 生产构建：`npm run build`，产物位于 `dist/`。
- 静态托管：使用任意静态服务器（Nginx、Netlify、Vercel、静态 OSS 等）。
- 历史路由回退：确保服务端对前端路由做 fallback 到 `index.html`。
- 反向代理：若保留演示后端，可在 Nginx 配置 `/api` 代理；若对接自有后端，替换为你的网关地址。

```nginx
server {
  listen 80;
  server_name your.domain.com;
  root   /var/www/vue-hospital/dist;
  index  index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://syt.atguigu.cn/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

### 开发小贴士

- 组件自动引入：已启用 `unplugin-auto-import` 与 `unplugin-vue-components`，Element Plus 会自动按需导入。
- 别名：使用 `@` 指向 `src/`，便于绝对路径导入（见 `vite.config.ts`）。
- 样式：全局重置位于 `src/style/reset.scss`；组件内推荐 `lang="scss"` 的 `scoped` 样式。
- 新增页面：在 `src/router/index.ts` 中配置路由与 `meta.title`，标题会自动生效。
- 错误提示：接口错误状态会由 Axios 响应拦截器通过 `ElMessage` 统一提示。

### 项目亮点

- 真实业务流程演示：涵盖从医院筛选到下单支付的端到端流程。
- 工程化与可维护性：清晰的 API 分层、类型定义与状态管理，便于扩展与二次开发。
- 体验细节完善：路由进度条、动态标题、统一登录弹窗与倒计时控件。
