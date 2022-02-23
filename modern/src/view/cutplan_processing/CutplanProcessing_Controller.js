Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessing_Controller',
    init: function() {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#fromDate').setValue(new Date(priorDate));
        this.loadData();
    },
    control: {
        '#btnThem': {
            tap: 'onBtnThemTap'
        },
        '#btnBack': {
            tap: 'onBtnBackTap'
        }
    },
    loadData: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var fromDate = this.lookupReference('fromDate').getValue();
        var toDate = this.lookupReference('toDate').getValue();

        var CutplanProcessingStore = viewModel.getStore('CutplanProcessingStore');
        CutplanProcessingStore.loadStore(fromDate, toDate, 100, 1);
        console.log(CutplanProcessingStore);
        // CutplanProcessingStore.getSorters().add('stockindate');
    },
    onBtnThemTap: function ( btn, e, eOpts ){
        var viewModel = this.getViewModel();
        this.redirectTo('cutplan_processing/0/edit');
    },
    onBtnBackTap: function(){
        this.redirectTo("mobilemenu");
    },
});
