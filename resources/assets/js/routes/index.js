import Home from '../components/index'
import Test from '../components/test'

const routes = [
    {
        path: '/' ,
        component: Home,
        name : 'home',
        meta : {
            title : '首页',
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/info/:id' ,
        component: Test,
        name : 'info',
        meta : {
            title : '测试',
            keepAlive: false // 需要被缓存
        }
    },

];

export default routes