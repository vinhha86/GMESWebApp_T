Ext.define('GSmartApp.store.MobileMenu', {
    extend: 'Ext.data.Store',
	alias: 'store.MobileMenu',
	storeId: 'MobileMenu',
	fields: [
        {name: 'id', type: 'string'},
		{name: 'text_vi', type: 'string'},
        {name: 'icon',  type: 'string',
            convert: function (value) {
                switch(value){
                    case 'daisize':
                    case 'chinhanh':
                    case 'chimay':
                    case 'cangport':
                    case 'banthanhpham':
                    case 'endbuyer':
                    case 'loaihinhdonhang':
                    case 'ngaynghile':
                    case 'ngoaite':
                    case 'nguyenlieu':
                    case 'phulieu-hoantien':
                    case 'phulieumay':
                    case 'pricefob':
                    case 'sanpham':
                    case 'vendor':
                    case 'thuoctinh':
                    case 'trusochinh':
                    case 'unit':
                    case 'provider':
                    case 'bactho':
                    case 'thietbi':
                    case 'donvitinh':
                    case 'soluong':
                    case 'khsanxuat':
                        return 'icon-'+value;
                }
                return 'x-fa fa-'+value;
            }
		}
	],
	loadStore:function(){
		var me=this;
		var params = new Object();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/menu/menu_mobile',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					//  this.fireEvent('logout');
				}
			}
		});
	},
	loadStoreAsync:function(){
		var me=this;
		var params = new Object();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/menu/menu_mobile',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
	}
});
