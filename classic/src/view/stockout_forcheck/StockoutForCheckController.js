Ext.define('GSmartApp.view.stockout.StockoutForCheckController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stockoutforcheck',
    init: function(){
        // var store_stockout_d_forcheck = Ext.data.StoreManager.lookup('store_stockout_d_forcheck');
        // store_stockout_d_forcheck.loadByDate(1, new Date(), new Date(), '');
        this.onProcessedRadioSelect();
    },
    onActivate: function(){
        // var store_stockout_d_forcheck = Ext.data.StoreManager.lookup('store_stockout_d_forcheck');
        // store_stockout_d_forcheck.reload();
        var store_stockout_d_forcheck = Ext.data.StoreManager.lookup('store_stockout_d_forcheck');
        if (store_stockout_d_forcheck){
            store_stockout_d_forcheck.loadByDate(1, new Date(), new Date(), ''); 
        }
        var store_stockout_pklist_forcheck = Ext.data.StoreManager.lookup('store_stockout_pklist_forcheck');
        if (store_stockout_pklist_forcheck){
            store_stockout_pklist_forcheck.reload();
        }  
                           
    },
    onSearchTap: function(){
        var stockoutdate_from = this.lookupReference('stockoutdate_from');
        // var stockoutdate_to = this.lookupReference('stockoutdate_from');
        //var txtskucodeforsearch = this.lookupReference('txtskucodeforsearch');
        pklistcheck_rdoCheckType = this.lookupReference('pklistcheck_rdoCheckType');
   

        var store_stockout_d_forcheck = Ext.data.StoreManager.lookup('store_stockout_d_forcheck'); 
        if (store_stockout_d_forcheck) {
            if (pklistcheck_rdoCheckType.lastValue == 1){
                store_stockout_d_forcheck.loadByDate(1, stockoutdate_from.getValue(),stockoutdate_from.getValue(),'');
            } else {
                store_stockout_d_forcheck.loadByDate(0, stockoutdate_from.getValue(),stockoutdate_from.getValue(),'');
            }   
        }  

        var store_stockout_pklist_forcheck = Ext.data.StoreManager.lookup('store_stockout_pklist_forcheck');
        if (store_stockout_pklist_forcheck) store_stockout_pklist_forcheck.removeAll();
    }, 
    onStockoutDItemSelected: function(e, record, index, eOpts ){
        this.getViewModel().set('stockout_d', record);
        var store_stockout_pklist_forcheck = Ext.data.StoreManager.lookup('store_stockout_pklist_forcheck');
        if (store_stockout_pklist_forcheck){
            store_stockout_pklist_forcheck.loadByStockoutDId(record.get('id'));

            if (pklistcheck_rdoCheckType.lastValue == 1){
                txtydscheck = this.lookupReference('txtydscheck');
                txtydscheck.focus();
            } else {
                txtydsorigin = this.lookupReference('txtydsorigin');
                txtydsorigin.focus();
            }  
        }
    },
    onAddItemTap: function(){
        var txtskucode = this.lookupReference('txtskucode');
        var stockout_d = this.getViewModel().get('stockout_d');
        var stockoutdate_from = this.lookupReference('stockoutdate_from');
        pklistcheck_rdoCheckType = this.lookupReference('pklistcheck_rdoCheckType');
        var StockoutType = 0;
        if (pklistcheck_rdoCheckType.lastValue == 1){
            StockoutType = 1;
        } else {
            StockoutType = 0;
        }  
         
        if (txtskucode){
            var params =new App.model.Stockout({
                id: null, 
                orgrootid_link: null,
                stockoutorderid_link: null,
                stockoutcode: null,
                stockoutdate: stockoutdate_from.getValue(),
                stockouttypeid_link: StockoutType,
                orgid_from_link: null,
                orgid_to_link: null,
                porderid_link: null,
                pordercode: null,
                shipperson: null,
                totalpackage: null,
                totalyds: null,
                totalpackagecheck: null,
                totalydscheck: null,
                totalpackageprocessed: null,
                totalydsprocessed: null,
                totalm3: null,
                totalnetweight: null,
                totalgrossweight: null,
                p_skuid_link: null,
                p_skucode: txtskucode.getValue(),
                extrainfo: null,
                status: null,
                usercreateid_link: null,
                timecreate: null,
                lastuserupdateid_link: null,
                lasttimeupdate: null            
            });
            console.log(Ext.JSON.encode(params));

            var access_token = App.Ajax.access_token();
            Ext.Ajax.request({
                url: App.Utils.url+'/ivyadmin/api/v1/stockout/createstockoutforcheck',
                method:'POST',
                cors: true,
                headers :{
                   'Accept': "application/json", 
                   'Content-Type':"application/json",
                   'authorization': 'Bearer ' + access_token
                },
                useDefaultXhrHeader: false,
                params: Ext.JSON.encode(params),
                success : function(response,options ) {
                    if (response.status == 200) {
                        var obj  = Ext.decode(response.responseText);
                        //console.log(response);
        
                        if(obj!=null && obj!=''){
                            if (obj.respcode == 200){
                                var store_stockout_d_forcheck = Ext.data.StoreManager.lookup('store_stockout_d_forcheck');
                                store_stockout_d_forcheck.reload();
                            }
                            else {
                                if (obj.respcode == 905)
                                    Ext.Msg.alert("Kiểm đo/Khử co", "Thẻ vải đã được đưa vào danh sách kiểm trong ngày");
                                else
                                    Ext.Msg.alert("Kiểm đo/Khử co", "Lỗi xuất kiểm đo/khử co");
                            }
                        }
                    } else if (response.status == 207) {
                        var form =Ext.create({
                            xtype: 'skusearchwindow',
                            reference:'stockoutcheck_skusearchwindow'
                        });
                        var viewModel = form.getViewModel();
                        viewModel.set('skucode',txtskucode.getValue());
                        viewModel.set('stockouttypeid_link',StockoutType);
                        viewModel.set('stockoutdate',stockoutdate_from.getValue());
                        form.show();
                    }
                },
                failure :function(response,options){
                    Ext.Msg.alert("Kiểm đo/Khử co", "Thẻ vải không đúng");
                }
            });                   
        }
    },
    onAddPklistButton: function(){
        pklistcheck_rdoCheckType = this.lookupReference('pklistcheck_rdoCheckType');
        if (pklistcheck_rdoCheckType.lastValue == 1){
            this.onAddPklistProcessValue();
        }
        else {
            this.onAddPklistOriginValue();
        }
    },

    //Fire when user enter Origin and Check value
    onAddPklistOriginValue: function(){

        var txtwidthorigin = this.lookupReference('txtwidthorigin');
        var txtydsorigin = this.lookupReference('txtydsorigin');
        var txtwidthcheck = this.lookupReference('txtwidthcheck');
        var txtydscheck = this.lookupReference('txtydscheck');
        var txttotalerror = this.lookupReference('txttotalerror');
        var txtwidthprocessed = this.lookupReference('txtwidthprocessed');
        var txtydsprocessed = this.lookupReference('txtydsprocessed');        

        this.AddPklistItem();

        txtwidthorigin.setValue(null);
        txtydsorigin.setValue(null);
        txtwidthcheck.setValue(null);
        txtydscheck.setValue(null);
        txttotalerror.setValue(null);
        txtwidthprocessed.setValue(null);
        txtydsprocessed.setValue(null);
        txtydsorigin.focus();
    },
       
    //Fire when user enter Process value
    onAddPklistProcessValue: function(){
        var txtwidthorigin = this.lookupReference('txtwidthorigin');
        var txtydsorigin = this.lookupReference('txtydsorigin');
        var txtwidthcheck = this.lookupReference('txtwidthcheck');
        var txtydscheck = this.lookupReference('txtydscheck');
        var txttotalerror = this.lookupReference('txttotalerror');
        var txtwidthprocessed = this.lookupReference('txtwidthprocessed');
        var txtydsprocessed = this.lookupReference('txtydsprocessed');        

        this.AddPklistItem();

        txtwidthorigin.setValue(null);
        txtydsorigin.setValue(null);
        txtwidthcheck.setValue(null);
        txtydscheck.setValue(null);
        txttotalerror.setValue(null);
        txtwidthprocessed.setValue(null);
        txtydsprocessed.setValue(null);
        txtydscheck.focus();
    
    },
    AddPklistItem: function(){
        var txtwidthorigin = this.lookupReference('txtwidthorigin');
        var txtydsorigin = this.lookupReference('txtydsorigin');
        var txtwidthcheck = this.lookupReference('txtwidthcheck');
        var txtydscheck = this.lookupReference('txtydscheck');
        var txttotalerror = this.lookupReference('txttotalerror');
        var txtwidthprocessed = this.lookupReference('txtwidthprocessed');
        var txtydsprocessed = this.lookupReference('txtydsprocessed');
        var stockout_d = this.getViewModel().get('stockout_d');
        if (null != stockout_d) {
            if (null == txtwidthorigin.getValue() && null == txtydsorigin.getValue() && null == txtwidthcheck.getValue() && null == txtydscheck.getValue() && null == txttotalerror.getValue() && null == txtwidthprocessed.getValue() && null == txtydsprocessed.getValue()){
                Ext.Msg.alert("Kiểm đo/Khử co", "Cần phải có thông tin kiểm vải");
            }
            else
            // if (txtwidthprocessed.getValue() && txtydsprocessed.getValue()){
                var store_stockout_pklist_forcheck = Ext.data.StoreManager.lookup('store_stockout_pklist_forcheck');
                var params =new App.model.Stockout_pklist({
                    id: null, 
                    orgrootid_link: null,
                    stockoutid_link: stockout_d.get('stockoutid_link'),
                    stockoutdid_link: stockout_d.get('id'),
                    skuid_link: null,
                    skucode: stockout_d.get('skucode'),
                    skutypeid_link: stockout_d.get('skutypeid_link'),
                    colorid_link: stockout_d.get('colorid_link'),
                    color_name: stockout_d.get('color_name'),
                    unitid_link: stockout_d.get('unitid_link'),
                    lotnumber: null,
                    packageid: null,
                    ydsorigin: txtydsorigin.getValue(),
                    ydscheck: txtydscheck.getValue(),
                    ydsprocessed: txtydsprocessed.getValue(),
                    widthorigin: txtwidthorigin.getValue(),
                    widthcheck: txtwidthcheck.getValue(),
                    widthprocessed: txtwidthprocessed.getValue(),
                    totalerror: txttotalerror.getValue(),
                    netweight: null,
                    grossweight: null,
                    epc: null,
                    rssi: null,
                    encryptdatetime: null,
                    usercheckid_link: null,
                    timecheck: null,
                    userprocessedkid_link: null,
                    timeprocessed: null,
                    usercreateid_link: null,
                    timecreate: null,                           
                    lastuserupdateid_link: null,
                    lasttimeupdate: null            
                });
                // store_stockout_pklist_forcheck.insert(0, newItem);
                var access_token = App.Ajax.access_token();
                Ext.Ajax.request({
                    url: App.Utils.url+'/ivyadmin/api/v1/stockoutpklist/create',
                    method:'POST',
                    cors: true,
                    headers :{
                    'Accept': "application/json", 
                    'Content-Type':"application/json",
                    'authorization': 'Bearer ' + access_token
                    },
                    useDefaultXhrHeader: false,
                    params: Ext.JSON.encode(params),
                    success : function(response,options ) {
                        var store_stockout_pklist_forcheck = Ext.data.StoreManager.lookup('store_stockout_pklist_forcheck');
                        if (store_stockout_pklist_forcheck) store_stockout_pklist_forcheck.reload();

                    },
                    failure :function(response,options){
                    console.log(response.responseText);
                    console.log(response);
                    }
                });                   
            // }
        } else {
            Ext.Msg.alert("Kiểm đo/Khử co", "Cần phải chọn Thẻ vải trong Danh sách vải kiểm");
        }
    },

    updatePklistItem: function(record){
        var access_token = App.Ajax.access_token();
                  
        var params=new Object();
        params.msgtype = 'stockout_updatepklist';
        params.message = '';
        params.token = '';
        params.data = record.data;
        //console.log(Ext.JSON.encode(params));

        Ext.Ajax.request({
             url: App.Utils.url+'/ivyadmin/api/v1/stockoutpklist/update',
             method:'POST',
             cors: true,
             headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json",
				'authorization': 'Bearer ' + access_token
			 },
             useDefaultXhrHeader: false,
             params: Ext.JSON.encode(params),
             success : function(response,options ) {
                var response = Ext.decode(response.responseText);
                //console.log(response);

                if(response!=null && response!=''){
                    if (response.respcode == 200){
                        record.beginedit;
                        //Nếu update thành công cập nhật lại số old theo số vừa sửa
                        record.set('ydsoriginold', record.get('ydsorigin'));
                        record.set('ydscheckold', record.get('ydscheck'));
                        record.set('ydsprocessedold', record.get('ydsprocessed'));
                        record.set('widthoriginold', record.get('widthorigin'));
                        record.set('widthcheckold', record.get('widthcheck'));
                        record.set('widthprocessedold', record.get('widthprocessed'));
                        record.set('totalerrorold', record.get('totalerror'));
                        record.endedit;
                    }
                    else {
                        //console.log('update fail');
                        Ext.Msg.alert("Kiểm vải", response.message);
                    }

                }
             },
             failure :function(response,options){
                console.log(response.responseText);
                console.log(response);
             }
         });
    },

    onPklistItemEdit: function(editor, e){
        this.updatePklistItem(e.record);
    },
    onPklistItemDelete: function(rid, rowIndex, colIndex){
        Ext.Msg.confirm('Kiểm vải', 'Bạn có thực sự muốn xóa cuộn vải? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var store_stockout_pklist_forcheck = Ext.data.StoreManager.lookup('store_stockout_pklist_forcheck');
                    var record = store_stockout_pklist_forcheck.getAt(rowIndex);
                    if (record.get('status') == 0){
                        var access_token = App.Ajax.access_token();
                                
                        var params=new Object();
                        params.stockoutpklistid = record.get('id');
            
                        Ext.Ajax.request({
                            url: App.Utils.url+'/ivyadmin/api/v1/stockoutpklist/delete',
                            method:'POST',
                            cors: true,
                            headers :{
                                'Accept': "application/json", 
                                'Content-Type':"application/json",
                                'authorization': 'Bearer ' + access_token
                            },
                            useDefaultXhrHeader: false,
                            params: Ext.JSON.encode(params),
                            success : function(response,options ) {
                                var store_stockout_pklist_forcheck = Ext.data.StoreManager.lookup('store_stockout_pklist_forcheck');
                                store_stockout_pklist_forcheck.reload();
                            },
                            failure :function(response,options){
                                console.log(response.responseText);
                                console.log(response);
                            }
                        });
                    }                      
                }
            }
        );
    },
    onStockoutItemDelete: function(rid, rowIndex, colIndex){
        Ext.Msg.confirm('Kiểm vải', 'Bạn có thực sự muốn xóa thẻ vải? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var store_stockout_d_forcheck = Ext.data.StoreManager.lookup('store_stockout_d_forcheck');
                    var record = store_stockout_d_forcheck.getAt(rowIndex);
                    if (record.get('status') == 0){
                        var access_token = App.Ajax.access_token();
                                
                        var params=new Object();
                        params.stockoutid = record.get('stockoutid_link');
            
                        Ext.Ajax.request({
                            url: App.Utils.url+'/ivyadmin/api/v1/stockout/delete',
                            method:'POST',
                            cors: true,
                            headers :{
                                'Accept': "application/json", 
                                'Content-Type':"application/json",
                                'authorization': 'Bearer ' + access_token
                            },
                            useDefaultXhrHeader: false,
                            params: Ext.JSON.encode(params),
                            success : function(response,options ) {
                                var store_stockout_d_forcheck = Ext.data.StoreManager.lookup('store_stockout_d_forcheck');
                                if (store_stockout_d_forcheck) store_stockout_d_forcheck.reload();
                                var store_stockout_pklist_forcheck = Ext.data.StoreManager.lookup('store_stockout_pklist_forcheck');
                                if (store_stockout_pklist_forcheck) store_stockout_pklist_forcheck.removeAll();

                            },
                            failure :function(response,options){
                                console.log(response.responseText);
                                console.log(response);
                            }
                        });
                    }  
                }
            }
        );        

    },      
    onAddNewRow: function(){
        var store_stockout_pklist_forcheck = Ext.data.StoreManager.lookup('store_stockout_pklist_forcheck'); 
        // empty record grd_pklist
        var rec = new App.model.Stockout_pklist(),
            rowEditing = this.lookupReference('grd_pklist').findPlugin('rowediting');

            store_stockout_pklist_forcheck.insert(0, rec);
        rowEditing.startEdit(rec, 0);        
    },
    onCancelEdit: function(rowEditing, context){
        var store_stockout_pklist_forcheck = Ext.data.StoreManager.lookup('store_stockout_pklist_forcheck');
        if (context.record.phantom) {
            store_stockout_pklist_forcheck.remove(context.record);
        } 
    },
    onBeforeEdit: function(editor, context){
        var form   = editor.getEditor().form;
        var field_widthcheck  = form.findField('widthcheck');
        //Neu la Addnew disable some field
        if (context.record.data.timecreate){
            field_widthcheck.enable();
        } else {
            field_widthcheck.disable();
        }
    },

    renderSummary: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderCell: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    onMaterialFilterKeyup: function() {
        var store_stockout_d_forcheck = Ext.data.StoreManager.lookup('store_stockout_d_forcheck');
        filterField = this.lookupReference('materialFilterField');
        filters = store_stockout_d_forcheck.getFilters();

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
    onSkuCodeKeyup: function(my, e) {
        if (e.getKey() == 13){
            this.onAddItemTap();
        }
    },      
    onTotalErrorKeyup: function(my, e) {
        if (e.getKey() == 13){
            this.onAddPklistProcessValue();
        }
    },   
    onYdsOriginKeyup: function(my, e) {
        if (e.getKey() == 13){
            txtwidthorigin = this.lookupReference('txtwidthorigin');
            txtwidthorigin.focus();
        }
    }, 
    onWidthOriginKeyup: function(my, e) {
        if (e.getKey() == 13){
            txtydscheck = this.lookupReference('txtydscheck');
            txtydscheck.focus();
        }
    },          
    onYdsCheckKeyup: function(my, e) {
        if (e.getKey() == 13){
            txtwidthcheck = this.lookupReference('txtwidthcheck');
            txtwidthcheck.focus();
        }
    },   
    onWidthCheckKeyup: function(my, e) {
        if (e.getKey() == 13){
            txtydsprocessed = this.lookupReference('txtydsprocessed');
            txtydsprocessed.focus();

            //Neu la nhap Kiem do --> Update gia tri trong Store
            pklistcheck_rdoCheckType = this.lookupReference('pklistcheck_rdoCheckType');
            if (pklistcheck_rdoCheckType.lastValue == 2){
                this.onAddPklistOriginValue();
            }
        }
    }, 
    onYdsProcessedKeyup: function(my, e) {
        if (e.getKey() == 13){
            txtwidthprocessed = this.lookupReference('txtwidthprocessed');
            txtwidthprocessed.focus();
        }
    },
    onWidthProcessedKeyup: function(my, e) {
        if (e.getKey() == 13){
            txttotalerror = this.lookupReference('txttotalerror');
            txttotalerror.focus();
        }
    },                   
    onSkuSearchTap: function(){
        var form =Ext.create({
            xtype: 'skusearchwindow',
            reference:'stockoutcheck_skusearchwindow'
        });
        // var viewModel = form.getViewModel();
        // viewModel.set('skucode',txtskucode.getValue());

        form.show();
    },
    onProcessedRadioSelect: function(){
        txtydsorigin = this.lookupReference('txtydsorigin');
        txtwidthorigin = this.lookupReference('txtwidthorigin');
        txtydscheck = this.lookupReference('txtydscheck');
        txtwidthcheck = this.lookupReference('txtwidthcheck');
        txtydsprocessed = this.lookupReference('txtydsprocessed');
        txtwidthprocessed = this.lookupReference('txtwidthprocessed');
        txttotalerror = this.lookupReference('txttotalerror');

        col_invoice = this.lookupReference('col_invoice');
        col_processed = this.lookupReference('col_processed');
        col_totalerror = this.lookupReference('col_totalerror');
        

        txtydsorigin.setValue(null);
        txtwidthorigin.setValue(null);
        txtydscheck.setValue(null);
        txtwidthcheck.setValue(null);
        txtydsprocessed.setValue(null);
        txtwidthprocessed.setValue(null);
        txttotalerror.setValue(null);

        col_invoice.setHidden(true);
        col_processed.setHidden(false);
        col_totalerror.setHidden(false);

        txtydsorigin.setHidden(true);
        txtwidthorigin.setHidden(true);
        txtydscheck.setHidden(false);
        txtwidthcheck.setHidden(false);
        txtydsprocessed.setHidden(false);
        txtwidthprocessed.setHidden(false);
        txttotalerror.setHidden(false);
        txtydscheck.focus();
    },

    onCheckRadioSelect: function(){
        txtydsorigin = this.lookupReference('txtydsorigin');
        txtwidthorigin = this.lookupReference('txtwidthorigin');
        txtydscheck = this.lookupReference('txtydscheck');
        txtwidthcheck = this.lookupReference('txtwidthcheck');
        txtydsprocessed = this.lookupReference('txtydsprocessed');
        txtwidthprocessed = this.lookupReference('txtwidthprocessed');
        txttotalerror = this.lookupReference('txttotalerror');

        col_invoice = this.lookupReference('col_invoice');
        col_processed = this.lookupReference('col_processed');
        col_totalerror = this.lookupReference('col_totalerror');
        

        txtydsorigin.setValue(null);
        txtwidthorigin.setValue(null);
        txtydscheck.setValue(null);
        txtwidthcheck.setValue(null);
        txtydsprocessed.setValue(null);
        txtwidthprocessed.setValue(null);
        txttotalerror.setValue(null);

        col_invoice.setHidden(false);
        col_processed.setHidden(true);
        col_totalerror.setHidden(true);

        txtydsorigin.setHidden(false);
        txtwidthorigin.setHidden(false);
        txtydscheck.setHidden(false);
        txtwidthcheck.setHidden(false);
        txtydsprocessed.setHidden(true);
        txtwidthprocessed.setHidden(true);
        txttotalerror.setHidden(true);
        txtydsorigin.focus();
    },

    onCheckTypeChange: function(e, newValue, oldValue){
        if (1 == newValue){
            this.onProcessedRadioSelect();
        } else {
            this.onCheckRadioSelect();
        }
        this.onSearchTap();
    }
});
