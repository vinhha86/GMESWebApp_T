Ext.define('GSmartApp.view.porders.POrderFilterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.porderfilter',
    init: function() {
        this.callParent(arguments);

        cbOrg = this.lookupReference('cboOrg');
        cbOrg.store.loadConfig();
        cbOrg.store.load();
        cbOrg.setValue(-1);

        // cbosalarymonth = this.lookupReference('cbosalarymonth');
        // cbosalarymonth.setValue(-1);       
        var OrgStore = this.getViewModel().getStore('OrgStore');  
        OrgStore.loadStore(14, false);

        cboOrderDate = this.lookupReference('cboOrderDate');
        cboOrderDate.setValue(3);   
        
        cboStatus = this.lookupReference('cboStatus');
        cboStatus.setValue(-1);   
          
    },
    onActivate: function(e, eOpts){
        // var store_userfunctions = Ext.data.StoreManager.lookup('store_userfunctions');
        // if (null != store_userfunctions){
        //     var me = this;
        //     form = me.getView();
        //     store_userfunctions.loadFunctions(form,App.Ajax.access_token(),function(records, operation, success){
        //         store_userfunctions.each(function(record) {
        //             var iObject = me.lookupReference(record.get('refid_item'));
        //             if (null != iObject){
        //                 if (Ext.isDefined(iObject.hidden)){
        //                     if (record.get('ishidden')){
        //                         iObject.setHidden(true);
        //                     }
        //                 }
        //                 if (Ext.isDefined(iObject.disabled)){
        //                     if (record.get('isreadonly')){
        //                         iObject.setDisabled(true);
        //                     }
        //                 }
        //             }
        //         });                
        //     });
        // }
       
    },
    onPOrderFilterKeyup: function() {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('porderFilterField'),
            filters = this.getView().store.getFilters();

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
    onMonthItemSelected: function(sender, record){
        //Tu dong chon nam hien tai
        var salaryyear = this.lookupReference('txtsalaryyear');
        if (record.get('id') > 0){
            salaryyear.setValue(Ext.Date.format(new Date(), 'Y'));
        } else {
            salaryyear.setValue('');
        }
    },
    onStatusItemSelected: function(sender, records){
        isAll = false;
        Ext.each(records, function (rec) {
            if (rec.data.id < 0) isAll = true;
        });
        if (isAll) {
            sender.clearValue();
            sender.setValue(-1);
        }
    },
    
    onSearchTap: function(){
        var processingdate_from = '';
        cboOrderDate = this.lookupReference('cboOrderDate');
        if (cboOrderDate.getValue() > 0) {
            var orderdate = new Date();
            orderdate.setMonth(orderdate.getMonth() - cboOrderDate.getValue())
            console.log(orderdate);
            processingdate_from = orderdate;
        }
        
        var ordercode = this.lookupReference('txtordercode').getValue();
        var orderstatus = '';
        var records = this.lookupReference('cboStatus').getValue();
        i=0;
        Ext.Array.each(records, function(rc) {
            i++;
            if (i<records.length){
                orderstatus += rc + ',';
            } else {
                orderstatus += rc;
            }
        });
        var granttoorgid_link = this.lookupReference('cboOrg').getValue();
        var collection = '';
        var season = '';
        // var salaryyear = this.lookupReference('txtsalaryyear').getValue();
        // if (null == salaryyear) salaryyear = '';

        // var salarymonth = this.lookupReference('cbosalarymonth').getValue();
        var salaryyear = '';
        var salarymonth = -1;
        var processingdate_to = '';       
        isOK = true;
        // if (null == salaryyear || salaryyear == ''){
        //     isOK = false;
        //     Ext.Msg.alert('Lệnh SX','Điều kiện Năm tính lương là bắt buộc');
        // }
        // else {
        //     if (salarymonth == '-1'){
        //         isOK = false;
        //         Ext.Msg.alert('Lệnh SX','Điều kiện Tháng tính lương là bắt buộc');
        //     }
        // }
        if (isOK){
            //Clear thong tin loc Ma SX trc khi thuc hienj tim kiem
            filterField = this.lookupReference('porderFilterField');
            if (null != filterField) filterField.setValue('');

            var filterstore = this.getViewModel().getStore('POrderFilterStore');            
            filterstore.getFilters().clear();

            //Tim kiem theo dieu kien
            filterstore.loadFilter(ordercode,orderstatus,granttoorgid_link,collection,season,salaryyear,salarymonth,processingdate_from,processingdate_to);
        }
    },
    onDrop: function(node, data, dropRec, dropPosition){
        console.log(dropRec);
        // var access_token = App.Ajax.access_token();

        // cbosalarymonth_Salary = this.lookupReference('cbosalarymonth_Salary');
        // txtsalaryyear_Salary = this.lookupReference('txtsalaryyear_Salary');

        // var params=new Object();
        // var paramdata =new Array();
        // Ext.Array.each(data.records, function(rc) {
        //     rc.set('id',Ext.Number.randomInt(0,1000000));
        //     rc.set('salaryyear',null);
        //     rc.set('salarymonth',null);
        //     paramdata.push(rc.data);
        // });
        // params.data = paramdata;
        // console.log(Ext.JSON.encode(params));
        
        // Ext.Ajax.request({
        //     url: config.getAppBaseUrl()+'/api/v1/porders/setsalarymonth_erp',
        //     method:'POST',
        //     cors: true,
        //     headers :{
        //        'Accept': "application/json", 
        //        'Content-Type':"application/json",
        //        'authorization': 'Bearer ' + access_token
        //     },
        //     useDefaultXhrHeader: false,
        //     params: Ext.JSON.encode(params),
        //     success : function(response,options ) {
        //        var response = Ext.decode(response.responseText);
        //        console.log(response);

        //     //    if(response!=null && response!=''){
        //     //        if (response.respcode != 200){
        //     //             Ext.Msg.alert("Lệnh tính lương", response.message);
        //     //        }
        //     //    }
        //     },
        //     failure :function(response,options){
        //        console.log(response.responseText);
        //        console.log(response);
        //     }
        // });          
    },
    onImageViewClick: function(grid, rowIndex, colIndex){
        var record = this.getView().store.getAt(rowIndex);
        var form =Ext.create({
            xtype: 'porderimage',
            reference:'porderimage'
        });
        var viewModel = form.getViewModel();
        viewModel.set('ordercode',record.get('ordercode'));
   
        form.show();
    },    
    renderSum: function(value, summaryData, dataIndex) {
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    } ,
    onCelldblclick: function(a, td, cellIndex, record, tr, rowIndex, e, eOpts){
        var pcontractid_link = record.get('pcontractid_link');
        var viewModel = this.getViewModel();
        if (cellIndex == 1){
          
            var form = Ext.create('Ext.window.Window', {
                height: 600,
                width: 1000,
                closable: true,
                title: 'Đơn hàng',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',

                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'PContractView',
                    IdPContract: pcontractid_link
                }]
            });
            form.show();
        } else {
            if (cellIndex == 0){
                var porderid_link = record.get('porderid_link');
                var form = Ext.create('Ext.window.Window', {
                    height: 550,
                    width: 900,
                    closable: true,
                    title: 'Tiến độ',
                    resizable: false,
                    modal: true,
                    border: false,
                    closeAction: 'destroy',

                    bodyStyle: 'background-color: transparent',
                    layout: {
                        type: 'fit', // fit screen for window
                        padding: 5
                    },
                    items: [{
                        border: false,
                        xtype: 'POrderProcessingLineChart',
                        POrderId: porderid_link
                    }]
                });
                form.show();   
  
            } else {
                var form = Ext.create('Ext.window.Window', {
                    height: 400,
                    width: 700,
                    closable: true,
                    title: 'Kế hoạch',
                    resizable: false,
                    modal: true,
                    border: false,
                    closeAction: 'destroy',

                    bodyStyle: 'background-color: transparent',
                    layout: {
                        type: 'fit', // fit screen for window
                        padding: 5
                    },
                    items: [{
                        border: false,
                        xtype: 'POrder_Plan_Material',
                        IdPContract: pcontractid_link
                    }]
                });
                form.show();                 
            }  
        }
    } ,
    onGrantToOrgTap: function(){
        //var panel_orderwaiting = this.getView().up().items.get('panel_orderwaiting');
        var panel_tosx = this.getView().items.get('panel_tosx');
        if (null != panel_tosx){
            if (panel_tosx.getHidden())
                panel_tosx.setHidden(false);
            else
                panel_tosx.setHidden(true);
        }
    },     

});