import Home from '../components/index'
import Test from '../components/test'

const routes = [
    {
        path: '/' ,
        component: Home,
        name : 'home',
        meta : {
            title : '首页'
        }
    },
    {
        path: '/info/:id' ,
        component: Test,
        name : 'info',
        meta : {
            title : '测试'
        }
    },

];

export default routes