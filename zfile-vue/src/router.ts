import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";


const Install = () => import( './views/Install.vue');
const Main = () => import( './views/Main.vue');

const Admin = () => import( './views/admin/Index.vue');
const Login = () => import( './views/Login.vue');
const SiteSetting = () => import( './views/admin/SiteSetting.vue');
const ViewSetting = () => import( './views/admin/ViewSetting.vue');
const UpdatePassword = () => import( './views/admin/UpdatePassword.vue');
const API = () => import( './views/admin/API.vue');
const DriveList = () => import( './views/admin/DriveList.vue');
const ShortLink = () => import( './views/admin/ShortLink.vue');
const SharePointSiteId = () => import( './views/SharePointSiteId.vue');
const TestPage = () => import('./views/TestPage.vue')
export default createRouter({
    history: createWebHistory(),
    // base: '/', // 基路径:默认值为'/'.如果整个单页应用在/app/下,base 就应该设为'/app/'.一般可以写成__dirname,在 webpack 中配置.
    routes: [
        {
            path: '/',
            redirect: 'main',
        },

        {
            path: '/test',
            name: 'test'
            , component: TestPage
        },
        {
            path: '/install',
            component: Install
        },
        {
            path: "/:driveId?/:folder+",
            component: Main,
            name:'main',
            props: true
        },

        {
            path: '/login',
            component: Login
        },
        {
            path: '/sharepoint-util',
            component: SharePointSiteId
        },
        {
            path: '/admin',
            component: Admin,
            children: [
                {
                    path: '/',
                    name: '主页',
                    component: SiteSetting
                },
                {
                    path: 'site',
                    name: '基本设置',
                    component: SiteSetting
                },
                {
                    path: 'view',
                    name: '显示设置',
                    component: ViewSetting
                },
                {
                    path: 'password',
                    name: '密码设置',
                    component: UpdatePassword
                },
                {
                    path: 'api',
                    name: 'API',
                    component: API
                },
                {
                    path: 'drive-list',
                    name: 'DriveList',
                    component: DriveList
                },
                {
                    path: 'short-link',
                    name: 'ShortLink',
                    component: ShortLink
                }
            ]
        }
    ]
})
