Ext.define('GSmartApp.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin : function() {
        this.redirectTo('dashboard', true);
    },

    onLoginButton: function() {
        var me = this,
        form = me.getView(),
        values = form.getValues();

        var _tok = '123456669999';
        config.setToken('Bearer ' + _tok);
        GSmartApp.util.State.set('session', _tok);
        
        // console.log(me.getView());
        me.getView().destroy();
		GSmartApp.util.State.set('dataFormatList','vi-VN');
		GSmartApp.util.State.set('dataFormat','d/m/Y');
		GSmartApp.util.State.set('dataFormatS','DD/MM/YYYY');
        // Add the main view to the viewport
        //Ext.create({
        //    xtype: 'app-main'
        //});
        Ext.create('GSmartApp.view.main.Main', { fullscreen: true });
        /*GSmartApp.model.Session.login(values.username, values.password)
            .then(function (session) {
                config.setToken('Bearer ' + session.get('token'));
                GSmartApp.util.State.set('session', session && session.getData(true));

            })
            .catch(function (errors) {
                console.log('Error on login', errors);

            })
            .then(function (session) {
                //if (Ext.getCmp('auth-login')) Ext.getCmp('auth-login').setLoading(false);
            });
        */
        //this.redirectTo('dashboard', true);
    },

    onLoginAsButton: function() {
        this.redirectTo('login', true);
    },

    onNewAccount:  function() {
        this.redirectTo('register', true);
    },

    onSignupClick:  function() {
        this.redirectTo('dashboard', true);
    },

    onResetClick:  function() {
        this.redirectTo('dashboard', true);
    }
});