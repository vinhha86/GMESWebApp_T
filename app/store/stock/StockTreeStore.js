Ext.define('GSmartApp.store.stock.StockTreeStore', {
	extend: 'Ext.data.TreeStore',
	alias: 'store.StockTreeStore',
	idProperty: 'idString',
	// parentIdProperty: 'parentIdString',
	fields: [
		'id',
		'idString',
		'name',
		{
            name    : 'name_sort', 
            convert : function (value, rec) {
				if(rec.get('type') == 3){
					if(!rec.get('khoangKhongXacDinh') == true){
						var name = rec.get('name').trim();
						if(name.length == 1){
							var subStr1 = name.substring(0, 1);
							if(!isNaN(subStr1)){
								name = '0' + name;
							}
						}else
						if(name.length >= 2){
							var subStr1 = name.substring(0, 1);
							var subStr2 = name.substring(1, 2);
							if(!isNaN(subStr1) && isNaN(subStr2)){
								name = '0' + name;
							}
						}
						return name;
					}
				}
				// if(rec.get('type') == 4){
				// 	return 'Tầng ' + rec.get('name');
				// }
				// if(rec.get('type') == 5){
				// 	return 'Khoang ' + rec.get('name');
				// }
            	return rec.get('name');;
            }
        },
		{
            name    : 'nameMobile', 
            convert : function (value, rec) {
				if(rec.get('type') == 3){
					if(rec.get('khoangKhongXacDinh') == true){
						return 'Khoang ' + rec.get('name');
					}else{
						return 'Dãy ' + rec.get('name');
					}
				}
				if(rec.get('type') == 4){
					return 'Tầng ' + rec.get('name');
				}
				if(rec.get('type') == 5){
					return 'Khoang ' + rec.get('name');
				}
            	return rec.get('name');;
            }
        },
		{
            name    : 'iconCls', 
            convert : function (value, rec) {
				if(rec.get('type') == 0)
                    return 'x-fa fa-building iconColor';
                if(rec.get('type') == 1)
					return 'x-fa fa-industry iconColor';
                if(rec.get('type') == 2)
					return 'x-fa fa-home iconColor';
                if(rec.get('type') == 3){
                    if(rec.get('khoangKhongXacDinh') == true){
                        return 'x-fa fa-minus-square-o iconColor';
                    }else{
                        return'x-fa fa-bars iconColor';
                    }
                }
                if(rec.get('type') == 4){
                    return 'x-fa fa-square-o iconColor';
                }
                if(rec.get('type') == 5){
                    return 'x-fa fa-minus-square-o iconColor';
                }
				return '';
            }
        }
	],
	expanded: true,
	loadStore: function (maHangId, donHang, maSP) {
		var me = this;
		var params = new Object();
		params.maHangId = maHangId;
		params.donHang = donHang;
		params.maSP = maSP;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/stock/stockmenu_tree',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'children'
			}
		});
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				this.fireEvent('loadStore_Done');
				if(!success) {
					this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_async: function (maHangId, donHang, maSP) {
		var me = this;
		var params = new Object();
		params.maHangId = maHangId;
		params.donHang = donHang;
		params.maSP = maSP;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/stock/stockmenu_tree',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'children'
			}
		});
	},
});
