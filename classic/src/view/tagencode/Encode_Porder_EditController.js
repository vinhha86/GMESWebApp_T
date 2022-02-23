Ext.define('GSmartApp.view.tagencode.Encode_Porder_EditController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.Encode_Porder_EditController',
	init: function(){
		var viewModel = this.getViewModel();
		
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                newdata: 'onNewData'
            }
        }
	},
    control:{
        '#btnQuayLai':{
            click: 'onQuayLai'
        }
    },
    onQuayLai: function(){
        this.redirectTo('porder_encode');
    },
    onNewData:function(type){
        var viewModel = this.getViewModel();
        var session = GSmartApp.util.State.get('session');

        viewModel.set('encode.encode_date',new Date());
        viewModel.set('encode.usercreateid_link', session.id);
        viewModel.set('encode.orgencodeid_link', session.orgid_link);

        var store_epc = viewModel.getStore('Encode_epc_Store');
        store_epc.removeAll();
    },
    onLoadData:function(id){
         this.getInfo(id);
    },
    getInfo: function(id){
        var viewModel = this.getViewModel();
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/encodeporder/encode_porder_getinfo', Ext.JSON.encode(params),
			function (success, response, options) {
				if (success) {
                    var storeepc = viewModel.getStore('Encode_epc_Store');
                    var storesku = viewModel.getStore('Porder_SKU_Store');
					
					var response = Ext.decode(response.responseText);
					if (response.respcode == 200) {
                        storeepc.setData(response.data.listepc);
                        storesku.insert(0, response.skuencode);
                        viewModel.set('encode',response.data);
                        viewModel.set('isEdit', true);

                        viewModel.set('skucode', response.skuencode.skucode);
                        viewModel.set('color_name', response.skuencode.color_name);
                        viewModel.set('size_name', response.skuencode.size_name);
                        viewModel.set('encode.encode_amount', response.skuencode.pquantity_remain < 0 ? 0 : response.skuencode.pquantity_remain);
                        viewModel.set('porderyear', response.skuencode.porderyear);
                        viewModel.set('encode.porderid_link', response.skuencode.porderid_link);
                        viewModel.set('encode.skucode', response.skuencode.skucode);
                        viewModel.set('encode.skuid_link', response.skuencode.skuid_link);
					}
				}
			})
    }
});
