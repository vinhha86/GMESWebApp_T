Ext.define('GSmartApp.Application', {
    extend: 'Ext.app.Application',

    name: 'GSmartApp',
    requires: [
        'GSmartApp.util.State',
        'GSmartApp.model.Session',
        'GSmartApp.view.*',
        'Ext.grid.*',
        'Ext.grid.plugin.Exporter'
    ],
    stores: [
        'DeviceTypeStore',
        'NavigationTree',
        'ProviderStore',
        'OrgStore',
        'PortStore',
        'BossStore',
        'DeviceStore',
        'DeviceInvStore',
        'DevicePayStore',
        'DeviceTreeStore',
        'DeviceGroupStore',
        'SkuStore',
        'PackinglistStore',

        'GSmartApp.store.invcheck.InvCheckStatusStore',
        'GSmartApp.store.invcheck.InvCheckListStore',
        'GSmartApp.store.invcheck.InvCheckDetailStore',

        'DeviceEncodeStore',
        'TagEncodeListStore',

        'GSmartApp.store.salebill.SalebillListStore',
        'GSmartApp.store.salebill.SalebillDetailStore',
        'GSmartApp.store.salebill.SalebillDetailEpcStore',

        'GSmartApp.store.stockin.StockinStore',
        'GSmartApp.store.stockin.StockinDetailEpcStore',
        'GSmartApp.store.stockin.StockinDetailStore',
        'GSmartApp.store.stockin.StockinSkuStore',
        'GSmartApp.store.stockin.StockinStatusStore',
        'GSmartApp.store.stockin.StockinListStore',


        'TagReadsStore',

        'UserListStore',
        'UserStatusStore',
        'UserTreeStore'
    ],

    //defaultToken : 'dashboard',

    // The name of the initial view to create. This class will gain a "viewport" plugin
    // if it does not extend Ext.Viewport.
    //
    //mainView: 'GSmartApp.view.main.Main',

    launch: function () {
        var me = this;
        console.log('.... launch classic app!');

        // Start task runner to sync up data with server
        /*var syncUp = function() {
            Ext.Ajax.request({
                url :  config.getBack() + 'warm',
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                callback: function() {
                   console.log('Sync up finished');
                }
            });
        }

        var runner = new Ext.util.TaskRunner();
        var task = runner.start({
            run: syncUp,
            interval: config.getWarmUpTime()
        });*/

        var mainview = me.getMainView();
        // Check if session exists
        var data = GSmartApp.util.State.get('session'),
            session = data ? GSmartApp.model.Session.loadData(data) : null;

        var storeMenu = Ext.getStore('NavigationTree');
        // If session valid --> Load main app
        if (session && session.isValid()) {
            GSmartApp.util.State.set('dataFormatList', 'vi-VN');
            GSmartApp.util.State.set('dataFormat', 'd/m/Y');
            GSmartApp.util.State.set('dataFormatS', 'DD/MM/YYYY');
            //console.log('Session is valid --> Open main app', session);   
            config.setToken('Bearer ' + session.get('token'));
            config.setAvatar(session.get('avatar'));

            config.setClientid('webterm#' + Math.floor(Math.random() * 1000));
            config.setTermid(session.get('user') + Math.floor(Math.random() * 10000));

            Ext.Ajax.setDefaultHeaders({ authorization: config.getToken() });
            //console.log(config.getEnableSSO());
            if (!config.getEnableSSO()) {
                storeMenu.loadMenu(function (success, records, operation) {
                    //console.log(success,records, operation);                
                    if (!success) {
                        //console.log(operation.error);
                        if (operation.error == undefined) {
                            console.log(operation.error);
                            Ext.Msg.alert('Thông báo', 'Không thể truy cập vào phần mềm. Bạn hãy kiểm tra kết nối mạng!', function () {
                                window.location.reload();
                            });
                        } else {
                            if (403 == operation.error.status || 401 == operation.error.status) {
                                Ext.Msg.alert('Thông báo', 'Phiên đăng nhập đã hết hạn. Bạn hãy đăng nhập lại!', function () {
                                    config.setToken(null);
                                    GSmartApp.util.State.set('session', null);
                                    Ext.Ajax.setDefaultHeaders({ authorization: '' });
                                    var main = Ext.getCmp('app-main');
                                    if (main) {
                                        main.destroy();
                                    }
                                    Ext.create('GSmartApp.view.login.Login', { fullscreen: true });
                                });
                            }
                        }
                    } else {
                        Ext.create('GSmartApp.view.main.Main', { fullscreen: true });
                    }
                    //Ext.create('GSmartApp.view.main.Main', { fullscreen: true });
                });
            } else {
                //console.log('Check sso online');
                // checking token to server, expire ? or remove ?
                GSmartApp.model.Session.check()
                    .then(function () {
                        //me.setMenu();
                        storeMenu.loadMenu(function (records, operation, success) {
                            if (!success) {
                                //me.fireEvent('login',App.util.State.get('session'));
                                //Ext.Msg.alert('Warning', 'User expire, Please re-login to continue');
                                //config.setToken(null);
                                //GSmartApp.util.State.set('session', null);
                                //Ext.create('GSmartApp.view.login.Login', { fullscreen: true });
                            } else {
                                Ext.create('GSmartApp.view.main.Main', { fullscreen: true });
                            }
                        });

                    })
                    .catch(function (errors) {
                        config.setToken(null);
                        GSmartApp.util.State.set('session', null);
                        Ext.getCmp('app-main').destroy();
                        Ext.create('GSmartApp.view.login.Login', { fullscreen: true });
                    });
            }


            // If session is not valid --> Go to login screen
        } else {
            console.log('Session is not valid --> Go login');
            config.setToken(null);
            Ext.Ajax.setDefaultHeaders({ authorization: '' });
            var main = Ext.getCmp('app-main');
            if (main) {
                main.destroy();
            }
            Ext.create('GSmartApp.view.login.Login', { fullscreen: true });
        }

        Ext.EventManager.onWindowResize(function () {
            var main = Ext.getCmp('app-main');
            if (main) {
                var refs = main.getReferences()
                refs.mainContainerWrap.height = Ext.Element.getViewportHeight() - 64;
            }

        });
    },

    setMenu: function (mainview) {
        var storeMenu = Ext.getStore('NavigationTree');
        storeMenu.loadMenu(function (success, records, operation) {
            console.log('isSuccess Menu Load:' + success);
            if (!success) {
                Ext.Msg.alert('Warning', 'Network is slow ..');
            }
        });
    },
    sleep: function (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    },
    onAppUpdate: function () {
        window.location.reload();
    }
});