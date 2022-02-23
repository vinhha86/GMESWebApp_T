Ext.define('GSmartApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'
            }
        },
        store: {
            '*': {
                'logout': 'onLogout'
            }
        }
    },
    routes: {
        ':node': 'onRouteChange',
        ':node/:id(/:args)?': 'onRouteDataChange'
    },
    control: {
        '#navigationTreeList': {
            selectionchange: 'onNavigationTreeSelectionChange'
        }
    },
    lastView: null,
    init: function (view) {
        var viewmodel = this.getViewModel();
        var data = GSmartApp.util.State.get('session');
        var session = data ? GSmartApp.model.Session.loadData(data) : null;
        viewmodel.set('avatar', session.get('avatar'));

        var tbname = this.lookup('tbname');
        // var tbavatar = this.lookup('tbavatar');
        tbname.text = config.getFname();
        // tbavatar.src = config.getAvatar();
        if ('' == window.location.hash) {
            this.redirectTo('dashboard');
        } else {
            var hash = window.location.hash.substring(1);
            console.log(' hash view: ', hash);
            var listhast = hash.split('/');
            if (listhast.length > 1)
                this.onRouteDataChange(listhast[0], listhast[1], listhast[2]);
            else
                this.onRouteChange(hash);
        }

    },
    beforeRender: function () {
        // var tbname = this.lookup('tbname');
        // tbname.text = config.getFname();
        // console.log('beforeRender - location hash: ', window.location.hash);
        // var hash = window.location.hash.substring(1);
        // console.log(' hash view: ', hash);
        // this.setCurrentView(hash);
    },
    setCurrentView: function (hashTag) {
        if (null != GSmartApp.Utils.porderTaskRunner) {
            GSmartApp.Utils.porderTaskRunner.destroy();
        }
        hashTag = (hashTag || '').toLowerCase();
        var session = GSmartApp.util.State.get('session');
        /* if(!session){
             this.redirectTo("login");
        } */
        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            store = navigationList.getStore();

        var node = store.findNode('routeId', hashTag) || store.findNode('viewType', hashTag);
        var view = (node && node.get('viewType')) || 'page404';

        //Hien thong tin menu dc chon
        if (node) {
            var viewmodel = this.getViewModel();
            if (null != node.data.parent_name)
                viewmodel.set('selected_menu', node.data.parent_name + ' -> ' + node.data.text);
            else
                viewmodel.set('selected_menu', node.data.text);
        }

        if (mainLayout.getActiveItem()) {
            mainLayout.getActiveItem().destroy();
        }

        newView = Ext.create({
            xtype: view,
            routeId: hashTag,  // for existingItem search later
            hideMode: 'offsets'
        });

        //console.log(newView);
        mainLayout.setActiveItem(mainCard.add(newView));

        me.fireEvent('urlBack', node);
        navigationList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));
        var hash = window.location.hash.substring(1);
        if (to.substring(2) == hash.split('/')[0]) {
            this.redirectTo(hash);
        }
        else
            this.redirectTo(to);
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            west = refs.westContainer,
            center = refs.mainCardPanel,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            treelist.setWidth(new_width);
            treelist.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            // wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            // wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            navigationList.setMicro(collapsing);

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({ dynamic: true, to: { width: new_width } });

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            west.setWidth(new_width);
            center.setWidth(center.width + 250 - new_width);
            west.updateLayout();
            center.updateLayout();
            // navigationList.el.addCls('nav-tree-animating');



            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            // if (collapsing) {
            //     navigationList.on({
            //         afterlayoutanimation: function () {
            //             navigationList.el.removeCls('nav-tree-animating');
            //         },
            //         single: true
            //     });
            // }
        }
    },

    onMainViewRender: function () {
        if (!window.location.hash) {
            this.redirectTo("dashboard");
        }
    },

    onRouteChange: function (id) {
        console.log('onRouteChange:' + id);
        var window = Ext.WindowManager.getActive();
        if (window) {
            window.close();
        }
        if (id != 'lspcontract') {
            GSmartApp.util.State.set('po', null);
        }
        if (id != 'lsproduct') {
            GSmartApp.util.State.set('product', null);
        }
        this.setCurrentView(id);
    },
    onRouteDataChange(hashTag, id, args) {
        args = Ext.Array.clean((args || '').split('/'));
        hashTag = (hashTag || '').toLowerCase();
        var session = GSmartApp.util.State.get('session');
        if (!session) {
            this.redirectTo("login");
        }

        if (hashTag != 'lspcontract') {
            GSmartApp.util.State.set('po', null);
        }

        if (hashTag != 'lsproduct') {
            GSmartApp.util.State.set('product', null);
        }

        var window = Ext.WindowManager.getActive();
        if (window) {
            window.close();
        }

        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            store = navigationList.getStore(),
            node = store.findNode('routeId', hashTag) || store.findNode('viewType', hashTag);

        var xtype_edit = (node && node.get('xtype_edit')) || 'page404';

        // if (mainLayout.getActiveItem() && mainLayout.getActiveItem().xtype == xtype_edit){
        //     mainLayout.getActiveItem().destroy();
        // }
        if (mainLayout.getActiveItem()) {
            mainLayout.getActiveItem().destroy();
        }
        if (args.toString().includes('edit')) {
            item = mainCard.add({
                xtype: xtype_edit,
                routeId: xtype_edit
            });
            mainLayout.setActiveItem(item);
            me.fireEvent('loaddata', id, hashTag);
        } else {
            item = mainCard.add({
                xtype: xtype_edit,
                routeId: xtype_edit
            });
            mainLayout.setActiveItem(item);
            me.fireEvent('newdata', node, id);
        }
    },
    onSearchRouteChange: function () {
        this.setCurrentView('searchresults');
    },

    onSwitchToModern: function () {
        Ext.Msg.confirm('Switch to Modern', 'Are you sure you want to switch toolkits?',
            this.onSwitchToModernConfirmed, this);
    },

    onSwitchToModernConfirmed: function (choice) {
        if (choice === 'yes') {
            var s = window.location.search;

            // Strip "?classic" or "&classic" with optionally more "&foo" tokens
            // following and ensure we don't start with "?".
            s = s.replace(/(^\?|&)classic($|&)/, '').replace(/^\?/, '');

            // Add "?modern&" before the remaining tokens and strip & if there are
            // none.
            window.location.search = ('?modern&' + s).replace(/&$/, '');
        }
    },

    onEmailRouteChange: function () {
        this.setCurrentView('email');
    },
    closeSession: function () {
        config.setToken(null);
        GSmartApp.util.State.set('session', null);

        if (Ext.os.deviceType === 'Phone' || Ext.os.deviceType === 'Tablet') {
            this.getView().destroy();
            Ext.create('GSmartApp.view.login.Login', { fullscreen: true });
        } else {
            // window.location.reload();
            //var appMain = Ext.getCmp('app-main');//this.getComponent('app-main');
            //var view = this.getView();
            //console.log(appMain);

            //Ext.Msg.alert('Warning', 'Network is slow ..');
            //this.getView().destroy();
            //Ext.Msg.alert('Warning', 'Network is slow ..');
            this.getView().destroy();
            Ext.create({
                xtype: 'xlogin'
            });
        }
    },
    onInfo: function (e) {
        var menu_grid = new Ext.menu.Menu({
            items: [{
                text: 'Thay đổi mật khẩu',
                iconCls: 'x-fa fa-key',
                handler: 'onChangePass'
            }
            ]
        })
        e.stopEvent();
        menu_grid.showAt(e.getXY());
    },
    onChangePass: function () {
        var me = this;
        var data = GSmartApp.util.State.get('session');
        var session = data ? GSmartApp.model.Session.loadData(data) : null;

        var form = Ext.create('Ext.window.Window', {
            height: 200,
            closable: true,
            title: 'Thay đổi mật khẩu',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 300,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'ChangePass',
                viewModel: {
                    data: {
                        userid: session.get('id'),
                        username: session.get('username')
                    }
                }
            }]
        });
        form.show();

        form.down('#ChangePass').on('Success', function () {
            form.close();
            me.onClickLogout();
        })
    },
    onClickLogout: function () {
        var self = this;
        GSmartApp.model.Session.logout()
            .then(function (session) {
                self.closeSession();
            })
            .catch(function (errors) {
                //console.log('Error on user logout', errors);
                console.log('Error on user logout');
                self.closeSession();
            });
    },
    onLogout: function () {
        // config.setToken(null);
        // GSmartApp.util.State.set('session', null);
        // Ext.Ajax.setDefaultHeaders({ authorization: '' });
        // this.getView().destroy();
        // Ext.create('GSmartApp.view.login.Login', { fullscreen: true });
        // console.log('onLogout:');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: "Phiên đăng nhập đã hết hạn! Bạn đăng nhập lại để tiếp tục",
            buttons: Ext.MessageBox.YES,
            buttonText: {
                yes: 'Đóng'
            }
        });

        var self = this;
        GSmartApp.model.Session.logout()
            .then(function (session) {
                self.closeSession();
            })
            .catch(function (errors) {
                //console.log('Error on user logout', errors);
                console.log('Error on user logout');
                self.closeSession();
            });
        /*Ext.Ajax.request({
            url :  'http://localhost:8990/gsmartcore/api/v1/menu/menu_data',
            //url: 'http://localhost:8080/users/me',
            method:'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    //'authorization': config.getToken()
            },
            callback: function() {
                console.log('Test finished');
            }
        });*/
    },
    onTest: function () {
        Ext.Ajax.request({
            url: 'http://localhost:8990/gsmartcore/api/v1/test/user',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': config.getToken()
            },
            callback: function () {
                console.log('Test finished');
            }
        });
    },
    onFullScreen: function () {
        document.body[this.getFullscreenFn()](Element.ALLOW_KEYBOARD_INPUT);
    },
    getFullscreenFn: function () {
        var docElm = document.documentElement,
            fn;

        if (docElm.requestFullscreen) {
            fn = "requestFullscreen";
        }
        else if (docElm.mozRequestFullScreen) {
            fn = "mozRequestFullScreen";
        }
        else if (docElm.webkitRequestFullScreen) {
            fn = "webkitRequestFullScreen";
        }
        else if (docElm.msRequestFullscreen) {
            fn = "msRequestFullscreen";
        }

        return fn;
    },
});