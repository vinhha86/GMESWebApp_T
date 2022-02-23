Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_M_Controller',
	init: function() {
        
	},
	control:{
        '#Stockin_M_Edit_M':{
            afterrender: 'onAfterrender'
		},
		'#loaitien':{
            select: 'onSelectCurency'
		},
		'#btnInvoice_Search':{
            click: 'onInvoice_Search'
        },
        '#btnAddNoiGiao':{
            click: 'onBtnAddNoiGiao'
        },
        '#UnitStoreCombo':{
            select: 'onUnitStoreComboSelect'
        },
    },
    onAfterrender: function(){
        var viewModel = this.getViewModel();
        var orgstore = viewModel.getStore('OrgStore');
        if (null!=orgstore) orgstore.loadStore(5);

		var userStore = viewModel.getStore('UserStore');
		userStore.loadStore();

		var stockintype = viewModel.getStore('StockinTypeStore');
		stockintype.loadStore(1, 10);

        var UnitStore = viewModel.getStore('UnitStore');
		UnitStore.loadStore();
        this.filterUnitStore();
        this.sortUnitStore();

        var UnitWidthStore = viewModel.getStore('UnitWidthStore');
		UnitWidthStore.loadStore();
        this.filterUnitWidthStore();
        this.sortUnitWidthStore();
    },
    onUnitStoreComboSelect: function(cbbox, record, eOpts){
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockin_d = viewModel.get('stockin.stockin_d');
        var unitid_link = record.get('id');

        if(stockin_d != null){
            for(var i = 0; i < stockin_d.length; i++){
                stockin_d[i].unitid_link = stockin.unitid_link;
            }
            var StockinD_Store = viewModel.getStore('StockinD_Store');
		    if (StockinD_Store) {
                StockinD_Store.removeAll();
                StockinD_Store.insert(0, stockin_d);
                StockinD_Store.commitChanges();
            }
        }
    },
    filterUnitStore: function(){
        var viewModel = this.getViewModel();
        var UnitStore = viewModel.getStore('UnitStore');
        UnitStore.clearFilter();
        UnitStore.filterBy(function(rec) {
            var isOk = false;
            if(
                rec.get('unittype') == 0 || rec.get('unittype') == 1
            ){
                isOk = true;
            }
            return isOk;
        });
    },
    sortUnitStore: function(){
        var viewModel = this.getViewModel();
        var UnitStore = viewModel.getStore('UnitStore');
        UnitStore.getSorters().removeAll();
        UnitStore.getSorters().add({
            property: 'unittype',
            direction: 'ASC'
        });
    },
    filterUnitWidthStore: function(){
        var viewModel = this.getViewModel();
        var UnitWidthStore = viewModel.getStore('UnitWidthStore');
        UnitWidthStore.clearFilter();
        UnitWidthStore.filterBy(function(rec) {
            var isOk = false;
            if(
                rec.get('unittype') == 0
            ){
                isOk = true;
            }
            return isOk;
        });
    },
    sortUnitWidthStore: function(){
        var viewModel = this.getViewModel();
        var UnitWidthStore = viewModel.getStore('UnitWidthStore');
        UnitWidthStore.getSorters().removeAll();
        UnitWidthStore.getSorters().add({
            property: 'unittype',
            direction: 'ASC'
        });
    },
    onBtnAddNoiGiao: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        orgid_from_link = stockin.orgid_from_link;
        var store = viewModel.getStore('OrgFromStore');
        var data = store.getData().items;

        var isExist = false;
        
        if(typeof orgid_from_link == 'string'){ // user type
            for(var i = 0; i < data.length; i++){
                var item = data[i];
                if(item.get('name').toLowerCase() == orgid_from_link.toLowerCase()){
                    isExist = true;
                    viewModel.set('stockin.orgid_from_link', item.get('id'));
                    break;
                }
            }
        }else{ // user select
            isExist = true;
        }

        if(!isExist){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn có chắc chắn thêm nhà cung cấp "' + orgid_from_link + '" ?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        m.themNoiGiao(orgid_from_link);
                    }
                }
            });
        }
    },
    themNoiGiao: function(orgid_from_link){
        var name = orgid_from_link;

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data.id = null;
        data.parentid_link=1;
        data.code = name;
        data.name = name;
        data.orgtypeid_link = 5;
        data.status = 1;

        params.data = data;

        GSmartApp.Ajax.post('/api/v1/orgmenu/createOrg', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        // console.log(response);
                        var orgfromstore = viewModel.getStore('OrgFromStore');
                        var org = response.org;
                        orgfromstore.insert(0,org);
                        viewModel.set('stockin.orgid_from_link', org.id);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onSelectCurency: function(combo, record, eOpts ){
       var viewModel = this.getViewModel();
	   viewModel.set('stockin.vat_exchangerate', record.data.exchangerate);
	   viewModel.set('curencycode',record.data.code);
	},
	onInvoice_Search:function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var invoice_number = viewModel.get('stockin.invoice_number');
		var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Chọn Invoice',
            closeAction: 'destroy',
			height: Ext.getBody().getViewSize().height * .95,
			width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'InvoicePickup_Main'
            }],
            viewModel: {
                data: {
                    invoice_number: invoice_number,
                }
            }
        });
        form.show();

        form.down('#InvoicePickup_Main').getController().on('Thoat', function () {
            form.close();
        });

        form.down('#InvoicePickup_Main').getController().on('InvoicePickupSelect', function (invoice, invoice_ds) {
            console.log(invoice);
            console.log(invoice_ds);

            viewModel.set('stockin.invoice_number', invoice.invoicenumber);
            viewModel.set('stockin.invoice_date', invoice.invoicedate);
            viewModel.set('stockin.material_invoiceid_link', invoice.id);
            viewModel.set('stockin.unitid_link', invoice.unitid_link);
            if(viewModel.get('stockin.stockin_d') == null){
                viewModel.set('stockin.stockin_d', new Array());
            }
            // viewModel.set('stockin.stockin_d', null);

            var stockin = viewModel.get('stockin');
            var stockin_d = viewModel.get('stockin.stockin_d');
            if(stockin_d == null){
                stockin_d = new Array();
            }

            for(var i = 0; i < invoice_ds.length; i++){
                var invoice_d = invoice_ds[i];
                var found = stockin_d.some(item => item.skuid_link === invoice_d.get('skuid_link'));
                console.log(found);
                // var found = false;
                if(!found){
                    var stockin_dObj = new Object();
                    stockin_dObj.skuid_link = invoice_d.get('skuid_link');
                    stockin_dObj.skucode = invoice_d.get('skucode');
                    stockin_dObj.skuCode = invoice_d.get('skucode');
                    stockin_dObj.skuname = invoice_d.get('skuname');
                    stockin_dObj.color_name = invoice_d.get('color_name');
                    stockin_dObj.colorid_link = invoice_d.get('colorid_link');
                    stockin_dObj.size_name = invoice_d.get('size_name');
                    stockin_dObj.totalpackage = invoice_d.get('totalpackage');
                    stockin_dObj.netweight = invoice_d.get('netweight');
                    stockin_dObj.grossweight = invoice_d.get('grossweight');
                    stockin_dObj.m3 = invoice_d.get('m3');
                    stockin_dObj.unitprice = invoice_d.get('unitprice');
                    stockin_dObj.totalamount = invoice_d.get('totalamount');
                    stockin_dObj.totalmet_origin = invoice_d.get('met');
                    stockin_dObj.totalmet_check = 0;
                    stockin_dObj.totalydsorigin = invoice_d.get('yds');
                    stockin_dObj.totalydscheck = 0;
                    stockin_dObj.unitid_link = invoice_d.get('unitid_link');
                    stockin_dObj.unit_name = invoice_d.get('unitname');

                    //
                    var packinglist = invoice_d.get('packinglist');
                    var stockin_packinglist = new Array();

                    for(var j = 0; j < packinglist.length; j++){
                        var pkl = packinglist[j]; 
                        // console.log(pkl);
                        var stockin_packinglistObj = new Object();
                        stockin_packinglistObj.grossweight = pkl.grossweight;
                        stockin_packinglistObj.netweight = pkl.netweight;
                        stockin_packinglistObj.width = pkl.width;
                        stockin_packinglistObj.width_check = 0;
                        stockin_packinglistObj.m3 = pkl.m3;
                        stockin_packinglistObj.sizenumber = pkl.sizenumber;
                        stockin_packinglistObj.skuid_link = pkl.skuid_link;
                        stockin_packinglistObj.skucode = pkl.skucode;
                        stockin_packinglistObj.skuCode = pkl.skucode;
                        stockin_packinglistObj.skuname = pkl.skuname;
                        stockin_packinglistObj.lotnumber = pkl.lotnumber;
                        stockin_packinglistObj.packageid = pkl.packageid;
                        stockin_packinglistObj.ydsorigin = pkl.ydsorigin;
                        stockin_packinglistObj.ydscheck = 0;
                        stockin_packinglistObj.met_origin = pkl.met_origin;
                        stockin_packinglistObj.met_check = 0;
                        stockin_packinglistObj.status = -1;
                        stockin_packinglistObj.checked = 0;
                        stockin_packinglistObj.unitid_link = stockin_dObj.unitid_link;
                        stockin_packinglistObj.colorid_link = stockin_dObj.colorid_link;

                        stockin_packinglist.push(stockin_packinglistObj);
                    }

                    stockin_dObj.stockin_packinglist = stockin_packinglist;

                    stockin_d.push(stockin_dObj);
                }
            }

            console.log(stockin_d);
            // viewModel.set('stockin.stockin_d', []);
            viewModel.set('stockin.stockin_d', stockin_d);

            var store = viewModel.getStore('StockinD_Store'); // StockinD_Store
            store.setData([]);
            store.insert(0, stockin_d);
            store.commitChanges();

            // console.log(invoice_ds);
            // console.log(stockin);

            form.close();
        });
	},

    onPressEnterBtnInvoice_Search: function(textfield, e, eOpts){
        var m = this;
        if(e.getKey() == e.ENTER) {
            // Ext.Msg.alert('Keys','You pressed the Enter key');
            m.onInvoice_Search();
        }
    },
})