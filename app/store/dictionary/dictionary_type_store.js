Ext.define('GSmartApp.store.dictionary.dictionary_type_store',{
    extend:'Ext.data.Store',
    alias:'store.dictionary_type_store',
    model:'GSmartApp.model.dictionary_type.dictionary_type_model',

    loadStore: function(){
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/dictionary_type/load_dictionary_type',
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
			}
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				// callback.call(records, operation, success);
				if(!success){
					// this.fireEvent('logout');
			   }
			}
		});
	}
})