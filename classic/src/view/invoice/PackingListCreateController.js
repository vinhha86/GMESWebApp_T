Ext.define('GSmartApp.view.invoice.PackingListCreateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.packinglistcreate',
	init: function() {
        this.callParent(arguments);
    },
	onPackingListAdd:function(){
		var record = this.getView().master_record;
		var formPackinglist = this.lookupReference('packinglistcreate').getForm();
		if(!formPackinglist.isValid()){
			return false;
		}
		var gridPackinglist = this.lookupReference('gridPackinglist');
		var recon = formPackinglist.getValues();
		if(!isNaN(recon.packageid)){
			for (i = 1; i <= recon.packageid; i++) { 
				var store = gridPackinglist.getStore().add ({lotnumber:recon.lotnumber,packageid:i});
				formPackinglist.reset(true);
			}
		}
	},
	onDelete:function(grid, info){
		var gridPackinglist = this.lookupReference('gridPackinglist');
		gridPackinglist.getStore().remove(info.record);
	},
	onPackingListSave:function(){
		var gridPackinglist = this.lookupReference('gridPackinglist');
		var formInvoice = this.getView().master;
		var master_record = this.getView().master_record;
		var master_store = this.getView().master_store;
		var packinglist = new Array();
		var list = gridPackinglist.getStore().getData().items;
		var netweight = gridPackinglist.getStore().sum('netweight');
		var grossweight = gridPackinglist.getStore().sum('grossweight');
		var ydsorigin = gridPackinglist.getStore().sum('ydsorigin');
		var packagea = gridPackinglist.getStore().count();
		for( x in list){
			var item =list[x].data;
			if(isNaN(item.id)){
				item.id = null;
			}
			packinglist.push(item);
		}
		master_store.beginUpdate();
		master_store.each(function(record){
			if(master_record.id==record.id){
				record.set('packinglist',packinglist);
				record.set('netweight',netweight);
				record.set('grossweight',grossweight);
				record.set('yds',ydsorigin);
				record.set('totalpackage',packagea);
				
			}
			
		});
		master_store.endUpdate();
		var total_netweight = master_store.sum('netweight');
		var total_grossweight = master_store.sum('grossweight');
		var total_ydsorigin = master_store.sum('yds');
		var totalpackage = master_store.sum('totalpackage');
		var view = this.getView().up('window');
		var values = formInvoice.getValues();
		values.totalgrossweight =total_grossweight;
		values.totalnetweight =total_netweight;
		values.totalpackage =totalpackage;
		formInvoice.setValues(values);
		view.close();
	
	},
	onPackingListClose:function(){
		var view = this.getView().up('window');
		view.close();
	}
})