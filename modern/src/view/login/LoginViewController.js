Ext.define('GSmartApp.view.login.LoginViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.loginViewCtrl',

	requires: [
		'GSmartApp.view.main.Main',
		'GSmartApp.util.State',
		'GSmartApp.model.Session'
	],

	initKeyMappings: function () {
		this.getView().unmask();
		// Init key mappings
		var usernameFieldKeyMapp = new Ext.util.KeyNav({
			target: Ext.getCmp('auth-login').down('formpanel').getFields('username').el,
			enter: function (e) {
				this.getView().down('formpanel').getFields('password').focus();
			},
			scope: this
		});
		var passwordFieldKeyMapp = new Ext.util.KeyNav({
			target: Ext.getCmp('auth-login').down('formpanel').getFields('password').el,
			enter: function (e) { this.onLoginClick(); },
			scope: this
		});
	},

	onLoginClick: function () {
		
		var self = this,
			form = Ext.getCmp('auth-login').down('formpanel'),
			values = form.getValues();

		if (form.validate() === true) {
			try {
				Ext.getCmp('login-form-error-label').setHidden(true);

				Ext.getCmp('auth-login').mask();

				GSmartApp.model.Session.login(values.username, values.password)
					.then(function (session) {
						config.setToken('Bearer ' + session.get('token'));
						config.setFname(session.get('fname'));
						GSmartApp.util.State.set('session', session && session.getData(true));

						Ext.Ajax.setDefaultHeaders({ authorization: config.getToken() });
						self.getView().destroy();
						//console.log('create view port');
						// Add the main view to the viewport
						var store = Ext.getStore('NavigationTree');
                        store.loadMenu(function(success,records, operation){
                        	//console.log('isSuccess Menu Load:' + success);
                        	if(!success){

                        	} else {
								var mainView = Ext.getCmp('GSmartApp-view-main');
								if(mainView) mainView.destroy();
                        		Ext.create('GSmartApp.view.main.Main',{fullscreen: true});
                        	}
                        });
						
						/*Ext.create({
                            xtype: 'app-main',
                            routeId: 'hash',
                            hideMode: 'offsets'
                        });*/
					})
					.catch(function (errors) {
						console.log('Error on login', errors);
						try {
							if (Ext.decode(errors.responseText).description || errors.description) {
								var message = errors.description ? errors.description : Ext.decode(errors.responseText).description;
								Ext.getCmp('login-form-error-label').setHtml(message);
							} else {
								Ext.getCmp('login-form-error-label').setHtml('Unauthorized');
							}
							Ext.getCmp('login-form-error-label').setHidden(false);
						} catch (error) {
							console.log('Error catch on login', error);
							if (Ext.getCmp('auth-login')) Ext.getCmp('auth-login').unmask();
						}
					})
					.then(function (session) {
						if (Ext.getCmp('auth-login')) Ext.getCmp('auth-login').unmask();
					});
			} catch (error) {
				console.log('Error onLoginClick', error);
				if (Ext.getCmp('auth-login')) Ext.getCmp('auth-login').unmask()
			}
		}
	}
});