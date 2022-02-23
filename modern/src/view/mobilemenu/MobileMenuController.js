Ext.define('GSmartApp.view.mobilemenu.MobileMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MobileMenuController',
    init: function() {
        var viewModel = this.getViewModel();
        var MobileMenu = viewModel.getStore('MobileMenu');
        MobileMenu.getSorters().add('index');
        MobileMenu.loadStore();

    },
    control: {
        '#MobileMenuDataview': {
            // itemtap: 'onItemTap',
            select: 'onItemSelect',
        },
    },
    
    onItemTap: function( dataview, index, target, record, e, eOpts ) {
        // console.log(record);
        var viewId = record.get('id');
        if(viewId != null){
            this.redirectTo(viewId);
        }
    },
    onItemSelect: function(dataview, selected, eOpts){
        var viewId = selected.get('id');
        if(viewId != null){
            this.redirectTo(viewId);
        }
    } 
});
