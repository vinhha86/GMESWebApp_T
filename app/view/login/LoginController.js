Ext.define('GSmartApp.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    requires: [
        'GSmartApp.util.State',
        'GSmartApp.model.Session'
    ],
    init: function (view) {

        //var view = Ext.getCmp('app-main');
        //var appMain = Ext.getComponent('app-main');
        console.log('controller.login init');
        //console.log(appMain);
    },
    initKeyMappings: function () {
        // Init key mappings
        var usernameFieldKeyMapp = new Ext.util.KeyNav({
            target: Ext.getCmp('auth-login').down('form').getForm().findField('username').el,
            enter: function (e) { this.onLoginClick(); },
            scope: this
        });
        var passwordFieldKeyMapp = new Ext.util.KeyNav({
            target: Ext.getCmp('auth-login').down('form').getForm().findField('password').el,
            enter: function (e) { this.onLoginClick(); },
            scope: this
        });
    },
    onLoginClick: function () {

        var self = this,
            form = self.lookup('form'),
            values = form.getValues();

        if (form.isValid() === true) {
            try {
                Ext.getCmp('login-form-error-label').setHidden(true);

                Ext.getCmp('auth-login').setLoading(true);

                GSmartApp.model.Session.login(values.username, values.password)
                    .then(function (session) {
                        console.log(session);
                        config.setToken('Bearer ' + session.get('token'));
                        // config.setFname(session.get('fname'));
                        config.setAvatar(session.get('avatar'));

                        GSmartApp.util.State.set('session', session && session.getData(true));

                        console.log(GSmartApp.util.State.get('session'));

                        var _token = session.get('token');
                        // var playload = JSON.parse(atob(_token.split('.')[1]));
                        Ext.Ajax.setDefaultHeaders({ authorization: config.getToken() });
                        //console.log(playload);
                        self.getView().destroy();
                        //console.log('create viewport in app');
                        // Add the main view to the viewport
                        var store = Ext.getStore('NavigationTree');
                        store.loadMenu(function (success, records, operation) {
                            //    console.log('isSuccess Menu Load:' + success);
                            if (!success) {
                                //Ext.Msg.alert('Warning', 'Network is slow ..');
                            } else {
                                var main = Ext.getCmp('app-main');
                                //check nếu f5 lại trang thì viewport đã tồn tại main rồi k create nữa
                                if (main == null) {
                                    Ext.create({
                                        xtype: 'app-main'
                                    });
                                    config.setFname(session.get('fullName'));
                                }
                                else {
                                    // var data = GSmartApp.util.State.get('session');
                                    // var session = data ? GSmartApp.model.Session.loadData(data) : null;
                                    // console.log(session);
                                    var viewmodel = main.getViewModel();
                                    viewmodel.set('avatar', session.get('avatar'));
                                    config.setFname(session.get('fullName'));
                                }
                                //Ext.getCmp('id_avatar').setSrc(session.get('avatar'));
                            }

                        });

                    })
                    .catch(function (errors) {
                        console.log('Error on login', errors);
                        try {
                            if (Ext.decode(errors.responseText).description || errors.description) {
                                // var message = errors.description ? errors.description : Ext.decode(errors.responseText).description;
                                var message = "Sai tên hoặc mật khẩu đăng nhập";
                                Ext.getCmp('login-form-error-label').setHtml(message);
                            } else {
                                Ext.getCmp('login-form-error-label').setHtml('Unauthorized');
                            }
                            Ext.getCmp('login-form-error-label').setHidden(false);
                        } catch (error) {
                            console.log('Error catch on login', error);
                            if (Ext.getCmp('auth-login')) Ext.getCmp('auth-login').setLoading(false);
                        }
                    })
                    .then(function (session) {
                        if (Ext.getCmp('auth-login')) Ext.getCmp('auth-login').setLoading(false);
                    });
            } catch (error) {
                console.log('Error onLoginClick', error);
                if (Ext.getCmp('auth-login')) Ext.getCmp('auth-login').setLoading(false);
            }
        }
    },
    sleep: function (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    },
    onRegisterDemoClick: function () {
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Đăng ký nhận demo',
            closeAction: 'destroy',
            height: 350,
            width: 500,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'RegisterDemo',
            }]
        });
        form.show();

        // form.down('#Form_SelectOrg_PorderReq').getController().on('Chon', function(){
        //     var storePO = viewmodel.getStore('porderReqStore');
        //     storePO.load();
        //     var PContractProductPOStore = viewmodel.getStore('PContractProductPOStore');
        //     PContractProductPOStore.load();
        //     form.close();
        // })
    }
});