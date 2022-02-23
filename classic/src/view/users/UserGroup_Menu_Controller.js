Ext.define('GSmartApp.view.users.UserGroup_Menu_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.UserGroup_Menu_Controller',
	init: function() {
       
    },
    control: {
        '#UserGroup_Menu': {
            itemclick: 'onloadFunction'
        }
    },
    onloadFunction: function( grid, record, item, index, e, eOpts){
        this.getViewModel().set('menuid_link', record.data.id);
        var funcStore = this.getViewModel().getStore('FunctionStore');
        funcStore.loadStore_inrole(this.getViewModel().get('roleid_link'), record.data.id);
    }
})