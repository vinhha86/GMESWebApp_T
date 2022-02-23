Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Schedule_plan_Main_Controller',
    init: function(){
       
       
    },
    onZoomIn : function () {
        var panel_plan = this.getView().items.get('panel_plan');
        panel_plan.zoomIn();
    },

    onZoomOut: function () {
        var panel_plan = this.getView().items.get('panel_plan');
        panel_plan.zoomOut();
    },   
    //nut tim kiem lenh chua phan chuyen
    onSearchTap: function() {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        var golive_from = viewmodel.get('schedule.startDate');
        var golive_to = viewmodel.get('schedule.endDate');
        store.loadFree_bygolivedate(golive_from,golive_to);
    },
    onPOrderFilterKeyup: function(){
        var grid = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('porderFilterField'),
        filters = store.getFilters();

        if (filterField.value) {
            this.porderFilter = filters.add({
                id: 'porderFilter',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.porderFilter) {
            filters.remove(this.porderFilter);
            this.porderFilter = null;
        }
    },
    onGuessView: function(){
        //var panel_orderwaiting = this.getView().up().items.get('panel_orderwaiting');
        var panel_guessview = this.getView().items.get('panel_guessview');
        if (null != panel_guessview){
            if (panel_guessview.getHidden())
                panel_guessview.setHidden(false);
            else
                panel_guessview.setHidden(true);
        }
    },   
    onExport: function(){
        var me = this.getView().down('#panel_plan');
        me.getPlugin('export').setFileFormat('pdf');
        me.showExportDialog();
    }    
})