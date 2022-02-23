/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('GSmartApp.Application', {
    extend: 'Ext.app.Application',

    name: 'GSmartApp',
    requires: [
        'GSmartApp.util.State',
        'GSmartApp.model.Session',
        'GSmartApp.view.*'
    ],
    //defaultToken : 'dashboard',

    //mainView: 'GSmartApp.view.main.Main',

    profiles: [
        'Phone',
        'Tablet'
    ],

    stores: [
        'NavigationTree'
    ],

    launch: function () {
        var me = this;
        console.log('.... launch modern app!');

        var mainview = me.getMainView();
        // Check if session exists
        var data = GSmartApp.util.State.get('session'),
            session = data ? GSmartApp.model.Session.loadData(data) : null;
        var storeMenu = Ext.getStore('NavigationTree');

        // If session valid --> Load main app
        if (session && session.isValid()) {
            //console.log('Session is valid --> Open main app', session);   
            config.setToken('Bearer ' + session.get('token'));
            config.setFname(session.get('fname'));
            Ext.Ajax.setDefaultHeaders({ authorization: config.getToken() });

            if (!config.getEnableSSO()) {
                storeMenu.loadMenu(function (success, records, operation) {
                    if (!success) {
                        if (operation.error == undefined) {
                            console.log(operation.error);
                            Ext.Msg.alert('Warning', 'Can load resource data, Please check your network connection!', function () {
                                window.location.reload();
                            });
                        } else {
                            if (403 == operation.error.status || 401 == operation.error.status) {
                                Ext.Msg.alert('Warning', 'User token expire, Please re-login to continue', function () {
                                    config.setToken(null);
                                    GSmartApp.util.State.set('session', null);
                                    Ext.create('GSmartApp.view.login.Login', { fullscreen: true });
                                    //window.location.reload();
                                });
                            }
                            else {
                                config.setToken(null);
                                GSmartApp.util.State.set('session', null);
                                Ext.create('GSmartApp.view.login.Login', { fullscreen: true });
                            }
                        }
                    } else {
                        Ext.create('GSmartApp.view.main.Main', { fullscreen: true });
                    }
                });
            } else {
                GSmartApp.model.Session.check()
                    .then(function () {
                        storeMenu.loadMenu(function (success, records, operation) {
                            Ext.create('GSmartApp.view.main.Main', { fullscreen: true });
                        });
                    })
                    .catch(function (errors) {
                        config.setToken(null);
                        GSmartApp.util.State.set('session', null);
                        Ext.create('GSmartApp.view.login.Login', { fullscreen: true });
                    });
            }
            // If session is not valid --> Go to login screen
        } else {
            console.log('Session is not valid --> Go login');
            config.setToken(null);
            Ext.Ajax.setDefaultHeaders({ authorization: '' });
            Ext.create('GSmartApp.view.login.Login', { fullscreen: true });
        }
    },
    // setMenu: function (mainview) {
    //     var store = Ext.getStore('NavigationTree');
    //     store.loadMenu();
    // },
    onAppUpdate: function () {
        window.location.reload();
    }
});
