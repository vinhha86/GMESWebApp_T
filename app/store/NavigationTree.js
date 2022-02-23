Ext.define('GSmartApp.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',
    storeId: 'NavigationTree',

    fields: [
        { name: 'id', type: 'string' },
        { name: 'text', type: 'string' },
        { name: 'rowCls', type: 'string' },
        {
            name: 'iconCls', type: 'string',
            convert: function (value) {
                switch (value) {
                    case 'daisize':
                    case 'chinhanh':
                    case 'chimay':
                    case 'cangport':
                    case 'banthanhpham':
                    case 'endbuyer':
                    case 'loaihinhdonhang':
                    case 'ngaynghile':
                    case 'ngoaite':
                    case 'nguyenlieu':
                    case 'phulieu-hoantien':
                    case 'phulieumay':
                    case 'pricefob':
                    case 'sanpham':
                    case 'vendor':
                    case 'thuoctinh':
                    case 'trusochinh':
                    case 'unit':
                    case 'provider':
                    case 'bactho':
                    case 'thietbi':
                    case 'donvitinh':
                    case 'soluong':
                    case 'khsanxuat':
                        return 'myIcon icon-' + value;
                }
                return 'x-fa fa-' + value;
            }
        },
        { name: 'routeId', type: 'string' },
        { name: 'viewType', type: 'string' },
        { name: 'leaf' },
        { name: 'action', type: 'string' },
        { name: 'type', type: 'number' },
        { name: 'index', type: 'number' }
    ],
    sorters: [{
        property: 'index',
        direction: 'DESC'
    }],
    loadMenu: function (callback) {
        this.setProxy({
            type: 'ajax',
            //url: config.getBack() + 'menuperm',
            url: config.getAppBaseUrl() + '/api/v1/menu/menu_tree',
            actionMethods: {
                read: 'POST'
            },
            paramsAsJson: true,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'authorization': config.getToken()
            },
            timeout: 60000,
            reader: {
                type: 'json',
                rootProperty: 'children',
                processRawResponse: function (response) {
                    var session = GSmartApp.util.State.get('session');
                    var _token = session.token;
                    var _expires = session.expires;
                    if (response.responseJson != null) {
                        response.responseJson.data.token = _token;
                        response.responseJson.data.expires = _expires;
                        response.responseJson.data.avatar = session.avatar;

                        GSmartApp.util.State.set('session', response.responseJson.data);
                        config.setFname(response.responseJson.data.fullName);
                    }
                }
            }
        });
        this.load();

        this.on({
            load: function (tree, records, successful, operation, node, eOpts) {
                //console.log(records);
                if (callback != null) {
                    //console.log(records);
                    if (records != null) {
                        if (records.length == 0) {
                            successful = false;
                        }
                    }
                    else {
                        successful = false;
                    }


                    callback.call(this, successful, records, operation);
                }
            }
        });
    }
    /*root: {
        expanded: true,
        children: [
            {
                text: 'Dashboard',
                iconCls: 'x-fa fa-desktop',
                rowCls: 'nav-tree-badge nav-tree-badge-new',
                viewType: 'admindashboard',
                routeId: 'dashboard', // routeId defaults to viewType
                leaf: true
            },
            {
                text: 'Email',
                iconCls: 'x-fa fa-send',
                rowCls: 'nav-tree-badge nav-tree-badge-hot',
                viewType: 'email',
                leaf: true
            },
            {
                text: 'News',
                iconCls: 'x-fa fa-question',
                viewType: 'news',
                leaf: true
            },
            {
                text: 'Profile',
                iconCls: 'x-fa fa-user',
                viewType: 'profile',
                leaf: true
            },
            {
                text: 'Search results',
                iconCls: 'x-fa fa-search',
                viewType: 'searchresults',
                leaf: true
            },
            {
                text: 'FAQ',
                iconCls: 'x-fa fa-question',
                viewType: 'faq',
                leaf: true
            },
            {
                text: 'Pages',
                iconCls: 'x-fa fa-leanpub',
                expanded: false,
                selectable: false,
                //routeId: 'pages-parent',
                //id: 'pages-parent',

                children: [
                    {
                        text: 'Blank Page',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },

                    {
                        text: '404 Error',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: '500 Error',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    },
                    {
                        text: 'Lock Screen',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'lockscreen',
                        leaf: true
                    },

                    {
                        text: 'Login',
                        iconCls: 'x-fa fa-check',
                        viewType: 'login',
                        leaf: true
                    },
                    {
                        text: 'Register',
                        iconCls: 'x-fa fa-pencil-square-o',
                        viewType: 'register',
                        leaf: true
                    },
                    {
                        text: 'Password Reset',
                        iconCls: 'x-fa fa-lightbulb-o',
                        viewType: 'passwordreset',
                        leaf: true
                    }
                ]
            },
            {
                text: 'Widgets',
                iconCls: 'x-fa fa-flask',
                viewType: 'widgets',
                leaf: true
            },
            {
                text: 'Forms',
                iconCls: 'x-fa fa-edit',
                viewType: 'forms',
                leaf: true
            },
            {
                text: 'Report',
                iconCls: 'x-fa fa-leanpub',
                expanded: false,
                selectable: false,

                children: [
                    {
                        text: 'Charts',
                        iconCls: 'x-fa fa-pie-chart',
                        viewType: 'charts',
                        leaf: true
                    },
                    {
                        text: 'KPI',
                        iconCls: 'x-fa fa-pie-chart',
                        viewType: 'kpi',
                        leaf: true
                    },
                    {
                        text: 'Quarterly Rp',
                        iconCls: 'x-fa fa-microchip',
                        viewType: 'quarterly',
                        leaf: true
                    }
                ]
            }
        ]
    }*/
});