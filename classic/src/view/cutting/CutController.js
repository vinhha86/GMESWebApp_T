Ext.define('GSmartApp.view.stockout.CutController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cut',
    init: function() {
        this.callParent(arguments);

        this.onOrderWaitingRefreshTap();
   
        var store_processing = Ext.data.StoreManager.lookup('store_processing'); 
        if (store_processing) {
            store_processing.loadCutting(new Date());
        }          
    },
    onRefreshTap: function(){
        var store_processing = Ext.data.StoreManager.lookup('store_processing'); 
        if (store_processing) {
            var processingdate = this.lookupReference('processingdate');
            store_processing.loadCutting(processingdate.getValue());
        }          
    },     
    onActivate: function(e, eOpts){
        var store_userfunctions = Ext.data.StoreManager.lookup('store_userfunctions');
        if (null != store_userfunctions){
            var me = this;
            form = me.getView();
            store_userfunctions.loadFunctions(form,App.Ajax.access_token(),function(records, operation, success){
                store_userfunctions.each(function(record) {
                    var iObject = me.lookupReference(record.get('refid_item'));
                    if (null != iObject){
                        if (Ext.isDefined(iObject.hidden)){
                            if (record.get('ishidden')){
                                iObject.setHidden(true);
                            }
                        }
                        if (Ext.isDefined(iObject.disabled)){
                            if (record.get('isreadonly')){
                                iObject.setDisabled(true);
                            }
                        }
                    }
                });                
            });
        }
    },
    onOrderWaitingRefreshTap: function(){
        var store_waiting = Ext.data.StoreManager.lookup('store_waiting'); 
        if (store_waiting) {
            store_waiting.loadFilter(
                null,//ordercode
                '2',//orderstatus
                null,//granttoorgid_link
                null,//collection
                null,//season
                null,//salaryyear
                null,//salarymonth
                null,//processingdate_from
                null//processingdate_to
                );
        }   
    },

    onPOrderFilterKeyup: function() {
        var panel_stockoutlist = this.getView().items.get('panel_stockoutlist');
        filterField = this.lookupReference('porderFilterField');
        filters = panel_stockoutlist.store.getFilters();

        if (filterField.value) {
            this.porderFilter = filters.add({
                id: 'porderFilter',
                property: 'pordercode',
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
    onMaterialFilterKeyup: function() {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('materialFilterField'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.materialFilter = filters.add({
                id: 'materialFilter',
                property: 'skucode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.materialFilter) {
            filters.remove(this.materialFilter);
            this.materialFilter = null;
        }
    },    

    //When pressing get latest data
    onSearchTap: function(){
        var stockoutdate_from = this.lookupReference('stockoutdate_from');
        var stockoutdate_to = this.lookupReference('stockoutdate_to');
        var store_stockout = Ext.data.StoreManager.lookup('store_stockout'); 
        if (store_stockout) {
            store_stockout.loadByDate(2, stockoutdate_from.getValue(),stockoutdate_to.getValue());
            //console.log(store_waiting);
        }  

        // var store_stockout_d_tocut = Ext.data.StoreManager.lookup('store_stockout_d_tocut'); 
        // if (store_stockout_d_tocut) {
        //     store_stockout_d_tocut.loadByDate(2, stockoutdate_from.getValue(),stockoutdate_to.getValue(),'');
        //     //console.log(store_waiting);
        // }  
    }, 
    
    onOrderListTap: function(){
        //var panel_orderwaiting = this.getView().up().items.get('panel_orderwaiting');
        var panel_cutwaiting = this.getView().items.get('panel_cutwaiting');
        if (null != panel_cutwaiting){
            if (panel_cutwaiting.getHidden())
            panel_cutwaiting.setHidden(false);
            else
            panel_cutwaiting.setHidden(true);
        }
    },

    onCheckDetail: function(grid, rowIndex, colIndex){
        var record = grid.store.getAt(rowIndex);
        var form =Ext.create({
            xtype: 'stockouttocutdwindow',
            reference:'stockouttocutdwindow'
        });
        var viewModel = form.getViewModel();
        viewModel.set('stockout_d',record);
        var store_stockout_pklist_available = Ext.data.StoreManager.lookup('store_stockout_pklist_available');
        if (store_stockout_pklist_available){
            store_stockout_pklist_available.loadAvailable(record.get('skuid_link'),record.get('skucode'),record.get('skutypeid_link'));
        }
        var store_stockout_pklist_tocut = Ext.data.StoreManager.lookup('store_stockout_pklist_tocut');
        if (store_stockout_pklist_tocut){
            store_stockout_pklist_tocut.loadByStockoutDId(record.get('id'));
        }
        form.show();
     },
    renderCell: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';    
    },
    onDrop: function(node, data, dropRec, dropPosition){
        console.log(dropPosition);
        var parmdata =new Array();
        var order=new Object();
        order.porderid_link = data.records[0].get('id');
        order.ordercode = data.records[0].get('ordercode');
        order.productiondate = new Date();
        parmdata.push(order);

        var params=new Object();
        params.granttoorgid_link = data.records[0].get('granttoorgid_link');
        params.data = parmdata;

        GSmartApp.Ajax.post('/api/v1/cutting/startcutting', Ext.JSON.encode(params),
        function (success, response, options) {
            var response = Ext.decode(response.responseText);
            if (success) {
                var store_processing = Ext.data.StoreManager.lookup('store_processing'); 
                if (store_processing) {
                    store_processing.loadCutting(new Date());
                }     
            } else {
                Ext.MessageBox.show({
                    title: "Cắt vải",
                    msg: response.message,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            }
        });
           
    },
    onSearchOrderTap: function(){
        var ordercode = this.lookupReference('txtorderwaiting_ordercode').getValue();
        //Tim kiem theo ordercode
        var store_waiting = Ext.data.StoreManager.lookup('store_waiting'); 
        if (store_waiting) {
            store_waiting.loadFilter(ordercode,'2',-1,'','','','','','');
        }
    },
    onProcessingItemEdit: function(editor, e){
        var cbProcessingDate = this.lookupReference('processingdate');
                    
        var params=new Object();
        params.msgtype = 'lenhsx_postslbydate';
        params.message = '';
        params.token = '';
        params.processingdate = cbProcessingDate.getValue();
        params.data = e.record.data;
        GSmartApp.Ajax.post('/api/v1/cutting/update', Ext.JSON.encode(params),
        function (success, response, options) {
            var response = Ext.decode(response.responseText);
            if (success) {
                e.record.beginedit;
                e.record.set('amountcuttingsum',response.amountcuttingsum);
                e.record.set('amountnumberingsum',response.amountnumberingsum);
                e.record.set('amountmexsum',response.amountmexsum);
                e.record.set('amounttolinesum',response.amounttolinesum);
                e.record.set('status',response.status);

                //Nếu update thành công cập nhật lại số old theo số vừa sửa
                e.record.set('amountcuttingold', e.record.get('amountcutting'));
                e.record.set('amountnumberingold', e.record.get('amountnumbering'));
                e.record.set('amountmexold', e.record.get('amountmex'));
                e.record.set('amounttolineold', e.record.get('amounttoline'));
                e.record.endedit;
            } else {
                Ext.MessageBox.show({
                    title: "Cắt vải",
                    msg: response.message,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            }
        });
    },   
});
