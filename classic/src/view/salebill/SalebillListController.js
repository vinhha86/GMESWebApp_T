Ext.define('GSmartApp.view.salebill.SalebillListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salebilllist',
	init: function() {
        this.callParent(arguments);
		
    },
	listen: {
        controller: {
            '*': {
				urlBack:'onUrlBack',
            }
        }
    },
	onUrlBack:function(type){
		if("lssalebill"==type.getId()){
			//Ext.getStore('OrgStore').loadStore(4);
			Ext.getStore('OrgStore').GetOrgDest('lssalebill');
			var view =this.getView();
			var viewModel = view.getViewModel();
			viewModel.set('urlback',type);
			var formSalebill = this.lookupReference('formSalebill');
			var gridSalebill = this.lookupReference('gridSalebill');
			var store = gridSalebill.getStore();
			var values = formSalebill.getValues();
			values.msgtype ="INVOICE_LIST_COMMING";
			values.salebilldate_from = new Date();
			values.salebilldate_to = new Date();
			GSmartApp.Ajax.setProxy(store,'/api/v1/salebill/salebill_list',values,function(records, operation, success) {});
		}
	},
	onAddnew:function(){
		this.redirectTo("shop/0/edit");
	},
	onSearch:function(){
		var params = new Object();
		var view = this.getView();
		var formSalebill = this.lookupReference('formSalebill');
		var gridSalebill = this.lookupReference('gridSalebill');
		var store = gridSalebill.getStore();
		var values = formSalebill.getValues();
		values.salebilldate_from =  new Date(values.salebilldate_from);
		values.salebilldate_to =  new Date(values.salebilldate_to);
		values.msgtype ="INVOICE_LIST_COMMING";
		view.setLoading(true);
		GSmartApp.Ajax.setProxy(store,'/api/v1/salebill/salebill_list',values,function(records, operation, success) {view.setLoading(false);});		
	},
	onEdit:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		var id = record.get('id');
		var view =this.getView();
		var viewModel = view.getViewModel();
		var entry= viewModel.get('urlback');
		
		this.redirectTo("salebill/"+id+"/edit");
	},
	onItemdblclick:function(grid, record, item, index, e, eOpts ){
		var id = record.get('id');
		var view =this.getView();
		var viewModel = view.getViewModel();
		var entry= viewModel.get('urlback');
		
		this.redirectTo("salebill/"+id+"/edit");
	},
	onDelete:function(grid, rowIndex, colIndex){
		var gridSalebill = this.lookupReference('gridSalebill');
		Ext.Msg.show({
			title:GSmartApp.Locales.title_thongbao[GSmartApp.Locales.currentLocale],
			message:GSmartApp.Locales.title_xoa[GSmartApp.Locales.currentLocale],
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'yes') {
					var record = grid.getStore().getAt(rowIndex);
					var id = record.get('id');  
					if(!isNaN(id)){
						GSmartApp.Ajax.post('/api/v1/invoice/invoice_deletebyid','{"invoiceid": '+id+'}',
						function(success,response,options ) {})
					}
					gridSalebill.getStore().remove(record);	
				}
			}
		});
	}
})