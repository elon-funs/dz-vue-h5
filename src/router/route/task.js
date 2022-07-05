export default [
    // 任务大厅
    {
        path: '/missionhall',
        name: 'Missionhall',
        component: () => import('@/views/missionhall'),
        meta: {
            noHeader: true
        }
    },
    // 线路选择
    {
        path: '/lineselect',
        name: 'Lineselect',
        component: () => import('@/views/lineselect'),
        meta: {
            title: 'app.line_select',
            requireAuth: true,
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/taskList',
        name: 'TaskList',
        component: () => import('@/views/taskList'),
        meta: {
            title: 'app.tasklist_l',
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/taskDetail',
        name: 'TaskDetail',
        component: () => import('@/views/taskDetail'),
        meta: {
            title: 'app.taskdetail',
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/examinetask',
        name: 'Examinetask',
        component: () => import('@/views/examinetask'),
        meta: {
            title: 'app.examineTask',
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/releasetask',
        name: 'Releasetask',
        component: () => import('@/views/releasetask'),
        meta: {
            title: 'app.releasemanagement',
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/posttask',
        name: 'Posttask',
        component: () => import('@/views/posttask'),
        meta: {
            title: 'app.fabu_task',
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/taskClaimDetails',
        name: 'TaskClaimDetails',
        component: () => import('@/views/taskClaimDetails'),
        meta: {
            title: 'app.taskdetail',
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/shdetail',
        name: 'Shdetail',
        component: () => import('@/views/shdetail'),
        meta: {
            title: 'app.shdetail',
            showBack: true,
            nonavBar: true
        }
    }
]
