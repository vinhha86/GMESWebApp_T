Ext.define('GSmartApp.view.invoice.InvoiceCreateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceCreateController',
	init: function() {
        this.callParent(arguments);
		//var productstore =  this.lookupReference('productcode').getStore();
		//productstore.load({
		//	 params: {
		//		type: 1
		//	}
	//	});
		Ext.getStore('ProviderStore').loadStore(5);
	    Ext.getStore('WareHouseStore').loadStore(3);
		//Ext.getStore('SkuStore').load({
		//	 params: {
		//		type: 1
		//	}
		//});
    },
	listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
				urlBack:'onUrlBack'
            }
        }
    },
	onLoadData:function(id,type){
		if(type.getId()=='lsinvoice'){
			console.log('lsinvoice onLoadData');
			var view =this.getView();
			var viewModel = view.getViewModel();
			viewModel.set('urlback',type);
			viewModel.set('isAddnew',false);
			this.onQrCode(id);
			this.getById(id);
			viewModel.set('invoice_id',id);
			
		}
	},
	onUrlBack:function(type){
		if(type.getId()=='lsinvoice'){
			console.log('lsinvoice onUrlBack');
			var view =this.getView();
			var invoicenumber = this.lookupReference('invoicenumber');
			var formInvoice = this.lookupReference('formInvoice').getForm();
			var gridInvoice = this.lookupReference('gridInvoice');
			var viewModel = view.getViewModel();
			viewModel.set('isAddnew',true);
			viewModel.set('invoice_id',null);
			formInvoice.reset(true);
			gridInvoice.getStore().removeAll();
		//	invoicenumber.setReadOnly(false);

		}
	},
	onHidden:function(){
		var view =this.getView();
		var viewModel = view.getViewModel();
		var formMaster = this.lookupReference('formMaster');
		var IsformMaster = formMaster.getHidden();
		viewModel.set('IsformMaster',!IsformMaster);
		
		formMaster.setHidden(!IsformMaster);
	},
	onBlack:function(){
		this.redirectTo('lsinvoice');
	},
	onSave:function(){
		//
		var me=this;
		var view =this.getView();
		var viewModel = view.getViewModel();
		var formInvoice = this.lookupReference('formInvoice').getForm();
		var gridInvoice = this.lookupReference('gridInvoice');
		var isAddnew = viewModel.get('isAddnew');
		var invoice = formInvoice.getValues();
		invoice.shipdatefrom =moment(invoice.shipdatefrom,'DD/MM/YYYY');
		invoice.shipdateto =  moment(invoice.shipdateto,'DD/MM/YYYY');
		invoice.invoicedate = moment(invoice.invoicedate,'DD/MM/YYYY');
		var invoiced =new Array();
		var items = gridInvoice.getStore().getData().items;
		//var invoice_id = viewModel.set('invoice_id',null);
		for(var i in items){
			var item = items[i].data;
			if(isNaN(item.id)){
				item.id = null;
			}
			//item.packinglist = new Array();
			invoiced.push(item);
		}
		invoice.invoiced=invoiced;
		var data =new Array();
		data.push(invoice);
		var params=new Object();
		params.msgtype ="INVOICE_CREATE";
		params.message = "Tạo hóa đơn";
		params.data = data;
		
		GSmartApp.Ajax.post('/api/v1/invoice/invoice_create',Ext.JSON.encode(params),
		function(success,response,options ) {
			if(success){
				var response = Ext.decode(response.responseText);
				if(isNaN(invoice.id) || invoice.id==null){
					formInvoice.reset(true);
					gridInvoice.getStore().removeAll();
				}
			}
			
		})
	},
	onDelete:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		var gridInvoice = this.lookupReference('gridInvoice');
		gridInvoice.getStore().remove(record);
		
		if(!isNaN(record.id)){
		  Ext.Msg.show({ 
		  title: GSmartApp.Locales.title_xoa[GSmartApp.Locales.currentLocale],
		  msg: null, 
		  buttons: [{ 
			itemId: 'ok',  
			text: GSmartApp.Locales.btn_co[GSmartApp.Locales.currentLocale],   
			ui: 'action' 
		  }, {
			itemId: 'cancel',   
			text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale], 
		  }], 
		  fn: function(text,btn) {
			  if('ok'==text){
				if(!isNaN(record.id)){
					
					GSmartApp.Ajax.post('/api/v1/invoice/invoiced_deletebyid','{"invoiceid": '+info.record.id+'}',
					function(success,response,options ) {
						
					})
				}  
			  }
		  }  
		});
		}
	},
	onPackinglist:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		var formInvoice = this.lookupReference('formInvoice').getForm();
		var form =Ext.create({
					xtype: 'window',
					title:'Thêm mới PackingList',
					width: 900,
					height: 550,
					margin:10,
					layout: 'fit',
					resizable: true,
					modal: true,
					items:[{
						master:formInvoice,
						master_record:record,
						master_store:grid.getStore(),
						xtype: 'packinglistcreate'
					}]
				}).show();
				var grid = form.down('grid');
				var store = grid.getStore();
				store.removeAll();
				if(record.packinglist!=null){
					store.setData(record.packinglist);
				}
	},
	onAddSku:function(){
		var me =this;
		var skucode = this.lookupReference('txtSkucode').getValue();
		var gridInvoice = this.lookupReference('gridInvoice');
		me.getView().setLoading(true);
		GSmartApp.Ajax.post('/api/v1/categoty/getSkuByCode','{"skucode": "'+skucode+'"}',
		function(success,response,options ) {
			if(success){
				var response = Ext.decode(response.responseText);
					var data = response.data;
					if(data.length>0){
						var date = new Date();
						var ticks = date.getTime();
						gridInvoice.getStore().insert(0,{
							'id':'TEMP'+ticks,
							'skucode':data[0].code,
							'skuname':data[0].name,
							'skuid_link':data[0].id,
							'colorcode':data[0].colorcode,
							'colorname':data[0].colorname,
							'colorid_link':data[0].colorid_link,
							'unitcode':data[0].unitcode,
							'unitid_link':data[0].unitid_link,
							'unitname':data[0].unitname
							});
						me.lookupReference('txtSkucode').setValue('');
					}
			}
			me.getView().setLoading(false);
		})
		
	},
	getById:function(id){
		var me =this;
		var invoicenumber = this.lookupReference('invoicenumber');
		var formInvoice = this.lookupReference('formInvoice').getForm();
		var gridInvoice = this.lookupReference('gridInvoice');
		me.getView().setLoading(true);
		GSmartApp.Ajax.post('/api/v1/invoice/getInvoiceByID','{"invoiceid": '+id+'}',
		function(success,response,options ) {
			if(success){
				var response = Ext.decode(response.responseText);
				var data = response.data;
				invoicenumber.setReadOnly(true);
				data.invoicedate =new Date(data.invoicedate);
				data.shipdatefrom = new Date(data.shipdatefrom);
				data.shipdateto = new Date(data.shipdateto);
				formInvoice.setValues(data);
				gridInvoice.getStore().removeAll();
				gridInvoice.getStore().setData(data.invoiced);
			}
			me.getView().setLoading(false);
		});
		
	},
	onQrCode:function(data){
		var view  = this.getView();
		var refs = this.getReferences();
		if(view.qrcode ==null){
			view.qrcode = new QRCode("invoiceQrcode", {
				text: data,
				width: 150,
				height: 150,
				colorDark : "#000000",
				colorLight : "#ffffff",
				correctLevel : QRCode.CorrectLevel.H
			})	
		}
		view.qrcode.clear(); // clear the code.
		view.qrcode.makeCode(data); // make another code.
	},
	onPackingListAdd:function(){
		var record = this.getView().master_record;
		var formPackinglist = this.lookupReference('packinglistcreate')
		if(!formPackinglist.validate()){
			return false;
		}
		var gridPackinglist = this.lookupReference('gridPackinglist');
		var recon = formPackinglist.getValues();
		var store = gridPackinglist.getStore().insert (0,recon);
		formPackinglist.reset(true);
	},
	onPackingListSave:function(){
		var master_record = this.getView().master_record;
		var master_store = this.getView().master_store;

	},
	onInvoicedetail_update:function(store){
		console.log(store);
	}
})