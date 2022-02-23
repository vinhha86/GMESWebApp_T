Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_MainController',
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
        },
        '#btnTest': {
            tap: 'onbtnTestTap'
        }
    },
    onbtnTestTap: function(){
        var dialog = Ext.create({
            xtype: 'dialog',
            // id: 'StockMenuWindow_Main_dialog',
            itemId: 'testtest',
            title: 'Thêm mới cây vải',
            width: '90%',
            // height: '60%',
            zIndex: 1,
            // maxWidth: 300,
            // maxHeight: 600,
            header: true,
            closable: true,
            closeAction: 'destroy',
            maximizable: false,
            // centered: true,
            top: 10,
            left: '5%',
            right: '5%',
            maskTapHandler: function(){
                if(dialog){
                    dialog.close();
                    // me.setMasked(false);
                }
            },
            bodyPadding: '1',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'textfield',
                flex: 1,
                inputType: 'number'
            },{
                border: false,
                xtype: 'button',
                flex: 1,
                text: 'btn',
                listeners: {
                    tap: function(){
                        var msgWindow = Ext.Msg.show({
                            title: 'Thông báo',
                            message: 'Bạn có chắc chắn xoá?',
                            width: 300,
                            closable: false,
                            zIndex: 2,
                            modal: false,
                            // masked: true,
                            // maskTapHandler: function(){
                            //     if(Ext.Msg){
                            //         Ext.Msg.hide();
                            //         me.setMasked(false);
                            //     }
                            // },
                            buttons: [{
                                text: 'Thoát',
                                itemId: 'no'
                            }, {
                                text: 'Xoá',
                                itemId: 'yes'
                            }],
                            fn: function (buttonValue, inputText, showConfig) {
                                if(buttonValue == 'no'){
                                    if(Ext.Msg){
                                        Ext.Msg.hide();
                                    }
                                }
                                if(buttonValue == 'yes'){
                                    if(Ext.Msg){
                                        Ext.Msg.hide();
                                    }
                                }
                            },
                            icon: Ext.Msg.QUESTION,
                            listeners: {
                                beforeshow: {
                                    fn: function(){ 
                                        console.log('click el');
                                        if(msgWindow){
                                            msgWindow.setY(10);
                                        }
                                    }
                                },
                            }
                        });
                    }
                }
            }],
        });
        dialog.show();
    },
    loadData: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var fromDate = this.lookupReference('fromDate').getValue();
        var toDate = this.lookupReference('toDate').getValue();
        var stockintypeid_link_from = 1;
        var stockintypeid_link_to = 10;
        var status = [];
        status[0]=-1;
        status[1]=0;
        var StockinStore = viewModel.getStore('StockinStore');
        // StockinStore.loadStore(null, fromDate, toDate, null, -1, 100, 1);
        StockinStore.loadStore_Material(null, fromDate, toDate, 
            null, stockintypeid_link_from, stockintypeid_link_to,
            status, null, 100, 1, null, null, null);
        StockinStore.getSorters().add({
            property: 'stockindate',
            direction: 'DESC'
        });
    },
    onBtnThemTap: function ( btn, e, eOpts ){
        var viewModel = this.getViewModel();
        this.redirectTo('stockin_m_main/create');
    },
    onBtnBackTap: function(){
        this.redirectTo("mobilemenu");
    },
    onNhapMuaMoi: function(){
        this.redirectTo('stockin_m_main/1/create');
    },
    oninvoiceFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_List'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#invoiceFilter'),
            store = grid.store,
            filters = grid.store.getFilters();
        
        var value = filterField.getValue() == null ? '' : filterField.getValue().toLowerCase();
        store.clearFilter();
        store.filterBy(function(rec) { //toLowerCase() // includes()
            if(
                rec.get('stockincode').toLowerCase().includes(value) ||
                rec.get('invoice_number').toLowerCase().includes(value) ||
                rec.get('orgfrom_name').toLowerCase().includes(value) ||
                rec.get('stockintype_name').toLowerCase().includes(value) ||
                rec.get('stockinProductString').toLowerCase().includes(value) || 
                rec.get('reason').toLowerCase().includes(value) || 
                rec.get('totalpackage').toString().includes(value) || 
                Ext.Date.format(rec.get('invoice_date'),'d/m/y').toLowerCase().includes(value)
                
            ){
                return true;
            }
            return false;
        });

        // if (filterField.getValue()) {
        //     this.invoiceFilter = filters.add({
        //         id: 'invoiceFilter',
        //         property: 'invoice_number',
        //         value: filterField.getValue(),
        //         anyMatch: true,
        //         caseSensitive: false
        //     });
        // }
        // else if (this.invoiceFilter) {
        //     filters.remove(this.invoiceFilter);
        //     this.invoiceFilter = null;
        // }
    },
});
