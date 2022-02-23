Ext.define('GSmartApp.view.invoice.InvoiceEdit_D_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceEdit_D_Controller',
	init: function() {
        var me = this.getView();
        var store = me.getStore();
        store.getSorters().add('skuname');
        store.getSorters().add('skucode');
    },
    control: {
		'#btnThuGon': {
			click: 'onhiddenMaster'
		},
		'#btnMoRong': {
			click: 'onhiddenMaster'
		},
        '#btnThemNPL': {
            click: 'onBtnThemNPL'
        },
        '#btnTimNPL': {
            click: 'onBtnTimNPL'
        },
        '#skucode': {
            // specialkey: 'onSpecialkey'
        },
		'#InvoiceEdit_D': {
			itemclick: 'onItemClick'
		},      
    },
    onItemClick:function(){
        // console.log('click here');
    },
    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderSumInteger: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onBtnThemNPL: function(){
        // console.log('onBtnThemNPL');
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var invoice = viewModel.get('invoice');
        var skucode = viewModel.get('skucode');

        // console.log(invoice);
        if(invoice != null){
            if(invoice.pcontractcode != null && invoice.pcontractid_link != null){
                me.setLoading(true);
                var SKUBalanceStore = viewModel.getStore('SKUBalanceStore');
                var BalanceProductStore = viewModel.getStore('BalanceProductStore');
                // console.log(SKUBalanceStore);
                // console.log(BalanceProductStore);

                var params = new Object();
                params.pcontractid_link = invoice.pcontractid_link;

                GSmartApp.Ajax.post('/api/v1/balance/get_material_bypcontract', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            // console.log(response);
                            if (response.respcode == 200) {
                                SKUBalanceStore.setData(response.data);
                                BalanceProductStore.setData(response.product_data);

                                m.createWindowNpl(SKUBalanceStore, skucode);
                            }
                            me.setLoading(false);
                        }else{
                            me.setLoading(false);
                        }
                    })

                
            }
        }
    },
    createWindowNpl: function(SKUBalanceStore, skucode){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            width: 800,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            // title: 'Danh sách lệnh',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'invoice_nplsearch',
                viewModel: {
                    type: 'invoice_nplsearch_ViewModel',
                    data: {
                        SKUBalanceStore: SKUBalanceStore,
                        skucode: skucode
                    }
                }
            }]
        });
        form.show();

        form.down('#invoice_nplsearch').getController().on('invoice_nplsearchThoat', function () {
            form.close();
        });

        form.down('#invoice_nplsearch').getController().on('invoice_nplsearchLuu', function (records) {
            // console.log(records);
            var invoice = viewModel.get('invoice');
            var invoiced = viewModel.get('invoice.invoice_d');
            if(invoiced == null){
                invoiced = new Array();
            }

            // console.log(records);

            for(var i = 0; i < records.length; i++){
                var npl = records[i];
                var found = invoiced.some(item => item.skuid_link === npl.get('mat_skuid_link'));
                // skucode, skuname, color_name, size_name
                // code, name, tenMauNPL, coKho
                if(!found){
                    var invoicedObj = new Object();
                    invoicedObj.skuid_link = npl.get('mat_skuid_link');
                    invoicedObj.skucode = npl.get('mat_sku_code');
                    invoicedObj.skuname = npl.get('mat_sku_name');
                    invoicedObj.color_name = npl.get('mat_sku_color_name');
                    invoicedObj.size_name = npl.get('mat_sku_size_name');
                    invoicedObj.totalpackage = 0;
                    invoicedObj.netweight = 0;
                    invoicedObj.grossweight = 0;
                    invoicedObj.m3 = 0;
                    invoicedObj.unitprice = 0;
                    invoicedObj.totalamount = 0;
                    invoicedObj.yds = 0;
                    invoicedObj.met = 0;
                    invoicedObj.unitid_link = invoice.unitid_link;

                    invoiced.push(invoicedObj);
                }
            }
            me.getStore().loadData(invoiced);
            me.getStore().commitChanges();

            form.close();
        });

    },
    onBtnTimNPL: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var skucode = viewModel.get('skucode');
        // console.log(pcontractSearch);

        // if(skucode == null || skucode.length == 0){
        //     Ext.Msg.show({
        //         title: 'Thông báo',
        //         msg: 'Mã NPL không được bỏ trống',
        //         buttons: Ext.MessageBox.YES,
        //         buttonText: {
        //             yes: 'Đóng',
        //         }
        //     });
        //     return;
        // }

        var form = Ext.create({
            xtype: 'skusearchwindow',
            width: 1200,
            height: 500,       
            reference: 'skusearchwindow',
            closeAction: 'destroy',
            viewModel: {
                data: {
                    sourceview: 'InvoiceEdit_D',
                    searchtype: 5,
                    // pcontractid_link: viewModel.get('PContract.id'),
                    // productid_link_notsearch: productid_link,
                    isAddNPL: true,
                    isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
                    isHiddenSkuSearchCriteria_Attr_btnThemMoi: true,
                    SKUCode: skucode
                }
            }
        });
        form.show();

        form.getController().on('InsertToInvoiceEdit_D', function (records) {
            // console.log(records);
            var invoice = viewModel.get('invoice');
            var invoiced = viewModel.get('invoice.invoice_d');
            if(invoiced == null){
                invoiced = new Array();
            }

            for(var i = 0; i < records.length; i++){
                var npl = records[i];
                var found = invoiced.some(item => item.skuid_link === npl.get('id'));
                // skucode, skuname, color_name, size_name
                // code, name, tenMauNPL, coKho
                if(!found){

                    var invoicedObj = new Object();
                    invoicedObj.skuid_link = npl.get('id');
                    invoicedObj.skucode = npl.get('code');
                    invoicedObj.skuname = npl.get('name');
                    invoicedObj.color_name = npl.get('mauSanPham');
                    invoicedObj.size_name = npl.get('coSanPham');
                    invoicedObj.totalpackage = 0;
                    invoicedObj.netweight = 0;
                    invoicedObj.grossweight = 0;
                    invoicedObj.m3 = 0;
                    invoicedObj.unitprice = 0;
                    invoicedObj.totalamount = 0;
                    invoicedObj.yds = 0;
                    invoicedObj.met = 0;
                    invoicedObj.unitid_link = invoice.unitid_link;

                    invoiced.push(invoicedObj);
                }
            }
            me.getStore().loadData(invoiced);
            me.getStore().commitChanges();
            form.close();
        })
    },
    onViewPackingList: function(grid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        var invoice = viewmodel.get('invoice');
        var data = grid.getStore().getAt(rowIndex);
        var invoicedid_link = data.get('id');

        // console.log(invoice);
        // console.log(data);

        // if(isNaN(invoicedid_link)){
        if(false){
            // not existed in db
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Cần lưu invoice trước khi thêm packing list cho ' + data.get('skucode'),
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
            var form = Ext.create('Ext.window.Window', {
                height: '90%',
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Chi tiết Packing List - SKU : ' + data.get('skucode'),
                closeAction: 'destroy',
                width: 1200,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Invoice_packinglist'
                }],
                viewModel: {
                    type: 'Invoice_packinglist_ViewModel',
                    data: {
                        packinglist: {
                            invoicedid_link: invoicedid_link,
                            invoiceid_link: viewmodel.get('invoice.id'),
                            skuid_link: data.get('skuid_link')
                        },
                        invoice: invoice,
                        invoiceDRec: data
                    }
                }
            });
            form.show();
        }
    },
    onXoa: function(grid, rowIndex, colIndex){
        var me = this;
        var viewmodel = this.getViewModel();
        var invoice = viewmodel.get('invoice');
        var store = grid.getStore();
        var data = store.getAt(rowIndex);
        var invoicedid_link = data.get('id');

        // console.log(data);

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(invoice, store, data, invoicedid_link);
                }
            }
        });
    },
    Xoa: function (invoice, store, data, invoicedid_link){
        var viewmodel = this.getViewModel();
        var invoice = viewmodel.get('invoice');
        var invoice_d = viewmodel.get('invoice.invoice_d');
        var invoiced = store.getById(invoicedid_link);

        if(isNaN(invoicedid_link)){
            store.remove(invoiced);
            for(var i = 0;i < invoice_d.length; i ++){
                if(invoice_d[i].id == invoicedid_link){
                    invoice_d.splice(i, 1);
                    i--;
                }
            }
            viewmodel.set('invoice.invoice_d', invoice_d);
        }else{
            
            var params = new Object();
            params.invoicedid_link = invoicedid_link;

            GSmartApp.Ajax.postJitin('/api/v1/invoice/deleteInvoiceDById',Ext.JSON.encode(params),
                function(success,response,options ) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            if (response.respcode == 200) {
                                store.remove(invoiced);
                                for(var i = 0;i < invoice_d.length; i ++){
                                    if(invoice_d[i].id == invoicedid_link){
                                        invoice_d.splice(i, 1);
                                        i--;
                                    }
                                }
                                viewmodel.set('invoice.invoice_d', invoice_d);
                            }
                        } else {
                            var response = Ext.decode(response.responseText);
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: 'Có lỗi trong quá trình xoá dữ liệu',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                })
        }
    },

    onSpecialkey: function (field, e) {
        var me = this.getView();
    
        if (e.getKey() == e.ENTER) {
          if (field.itemId == "packageid") {
            me.down('#netweight').focus();
          }
        }
    },
    onhiddenMaster: function () {
		var viewModel = this.getViewModel();
		var formMaster = Ext.getCmp('InvoiceEdit_M');
		var isHidden = formMaster.getHeight() > 0 ? false : true;
		viewModel.set('IsformMaster', !isHidden);

		formMaster.setHidden(!isHidden);
    },

    onInvoiceDItemEdit: function (editor, context, eOpts){
        // console.log('onInvoiceDItemEdit');
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var invoice = viewModel.get('invoice');
        var store = me.getStore();
        var invoiceD_data = context.record.data;

        if(context.value == "" || context.value == context.originalValue || isNaN(context.value)){
            store.rejectChanges();
            return;
        }

        if(context.field == 'totalpackage'){
            invoiceD_data.totalpackage = parseFloat(invoiceD_data.totalpackage);
        }
        if(context.field == 'netweight'){
            invoiceD_data.netweight = parseFloat(invoiceD_data.netweight);
        }
        if(context.field == 'grossweight'){
            invoiceD_data.grossweight = parseFloat(invoiceD_data.grossweight);
        }
        if(context.field == 'm3'){
            invoiceD_data.m3 = parseFloat(invoiceD_data.m3);
        }
        if(context.field == 'met'){
            invoiceD_data.met = parseFloat(invoiceD_data.met);
        }
        if(context.field == 'yds'){
            invoiceD_data.yds = parseFloat(invoiceD_data.yds);
        }

        if(invoice.unitid_link == 1){
            if(context.field == 'met' && (invoiceD_data.unitprice != null || invoiceD_data.unitprice != "")){
                // console.log('yds');
                invoiceD_data.yds = Ext.Number.roundToPrecision(invoiceD_data.met / 0.9144,2);
                invoiceD_data.totalamount = Ext.Number.roundToPrecision(invoiceD_data.met*invoiceD_data.unitprice,2);
            }
            if(context.field == 'unitprice' && (invoiceD_data.met != null || invoiceD_data.met != "")){
                // console.log('unitprice');
                invoiceD_data.totalamount = Ext.Number.roundToPrecision(invoiceD_data.met*invoiceD_data.unitprice,2);
            }
        }else if(invoice.unitid_link == 3){
            if(context.field == 'yds' && (invoiceD_data.unitprice != null || invoiceD_data.unitprice != "")){
                // console.log('yds');
                invoiceD_data.met = Ext.Number.roundToPrecision(invoiceD_data.yds * 0.9144,2);
                invoiceD_data.totalamount = Ext.Number.roundToPrecision(invoiceD_data.yds*invoiceD_data.unitprice,2);
            }
            if(context.field == 'unitprice' && (invoiceD_data.yds != null || invoiceD_data.yds != "")){
                // console.log('unitprice');
                invoiceD_data.totalamount = Ext.Number.roundToPrecision(invoiceD_data.yds*invoiceD_data.unitprice,2);
            }
        }

        store.commitChanges();
    },
    renderUnit: function(val, meta, record, rindex, cindex, store) {
        if (null != val){
            var viewModel = this.getViewModel();
            var UnitStore = viewModel.getStore('UnitStore');
            if (null!=UnitStore){
                var objUnit = UnitStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.code;
            }
        }
    },
    onPressEnterBtnThemNPL: function(textfield, e, eOpts){
        var m = this;
        if(e.getKey() == e.ENTER) {
            // Ext.Msg.alert('Keys','You pressed the Enter key');
            m.onBtnThemNPL();
        }
    },
})