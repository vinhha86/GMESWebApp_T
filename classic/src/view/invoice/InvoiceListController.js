Ext.define('GSmartApp.view.invoice.InvoiceListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceListController',
	init: function() {
		var me = this.getView();
		var viewmodel = this.getViewModel();
		var OrgProviderStore = viewmodel.getStore('OrgProviderStore');
		OrgProviderStore.loadStore(5, true);
		
		var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#invoicedate_from').setValue(new Date(priorDate));

		var Invoice_Store = viewmodel.getStore('Invoice_Store');
		Invoice_Store.getSorters().add('invoicenumber');

		this.onloadPage();
		
	},
	control: {
		'#InvoiceList': {
			itemdblclick: 'onItemdblclick'
		},
		'#btnThemMoi': {
			click: 'onAddnew'
		},
		'#limitpage': {
            specialkey: 'onSpecialkey'
        },
        '#btnTimKiem': {
            click: 'onloadPage'
        }
	},
	onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('ProductStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onloadPage();
        }
    },
	onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Invoice_Store');

        var limit = me.down('#limitpage').getValue();
        var invoicenumber = me.down('#invoicenumber').getValue();
		var custom_declaration = me.down('#custom_declaration').getValue();
		var invoicedate_from = me.down('#invoicedate_from').getValue();
		var invoicedate_to = me.down('#invoicedate_to').getValue();
		var org_prodviderid_link = me.down('#org_prodviderid_link').getValue();
		var status = me.down('#status').getValue();

        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }

        if (invoicenumber == null) {
            invoicenumber = "";
        }

        if (custom_declaration == null) {
            custom_declaration = "";
		}
		
		if (org_prodviderid_link == null) {
            org_prodviderid_link = 0;
		}
		
		if (status == null) {
            status = 0;
        }

        store.loadStore_byPage(invoicenumber, custom_declaration, invoicedate_from, invoicedate_to, org_prodviderid_link, status, page, limit);
    },
	onAddnew:function(){
		// this.redirectTo("lsinvoice/create");
		this.redirectTo("lsinvoice/"+"0"+"/edit");
	},
	onSearch:function(){
		var params = new Object();
		var view = this.getView();
		var formInvoice = this.lookupReference('formInvoice');
		var gridInvoice = this.lookupReference('gridInvoice');
		var store = gridInvoice.getStore();
		var values = formInvoice.getValues();
		values.shipdateto_from =  new Date(values.shipdateto_from);
		values.shipdateto_to =  new Date(values.shipdateto_to);
		values.msgtype ="INVOICE_LIST_COMMING";
		view.setLoading(true);
		GSmartApp.Ajax.setProxy(store,'/api/v1/invoice/invoice_list_comming',values,function(records, operation, success) {view.setLoading(false);});
	},
	onEdit:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		var id = record.get('id');
		var view =this.getView();
		var viewModel = view.getViewModel();
		var entry= viewModel.get('urlback');
		
		this.redirectTo("lsinvoice/"+id+"/edit");
	},
	onItemdblclick:function(grid, record, item, index, e, eOpts ){
		var id = record.get('id');
		var view =this.getView();
		var viewModel = view.getViewModel();
		var entry= viewModel.get('urlback');
		this.redirectTo("lsinvoice/"+id+"/edit");
	},
	onDelete:function(grid, rowIndex, colIndex){
		// var gridInvoice = this.lookupReference('gridInvoice');
		var viewModel = this.getViewModel();
		var Invoice_Store = viewModel.getStore('Invoice_Store');
		Ext.Msg.show({
			title:GSmartApp.Locales.title_thongbao[GSmartApp.Locales.currentLocale],
			message:GSmartApp.Locales.title_xoa[GSmartApp.Locales.currentLocale],
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'yes') {
					// var record = grid.getStore().getAt(rowIndex);
					var record = Invoice_Store.getAt(rowIndex);
					var id = record.get('id');  
					if(!isNaN(id)){
					//	Ext.Viewport.setMasked({ xtype: 'loadmask' });
						GSmartApp.Ajax.postJitin('/api/v1/invoice/invoice_deletebyid','{"invoiceid": '+id+'}',
						function(success,response,options ) {
						//	Ext.Viewport.setMasked(false);
						})
					}
					// gridInvoice.getStore().remove(record);
					Invoice_Store.remove(record);
				}
			}
		});
	}
})