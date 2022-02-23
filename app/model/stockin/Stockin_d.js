Ext.define('GSmartApp.model.stockin.Stockin_d', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id'},
        {name: 'idx'},
        'orgrootid_link',
        'stockinid_link',
        'skucode',
        'skuname',
        'sku_product_code',
        'colorid_link',
        'sizeid_link',
        'color_name',
        'size_name',
        'unitid_link',
        'unit_name',
        {name: 'totalpackage_order', type: 'int'},
        {name: 'totalpackage', type: 'int'},
        {name: 'totalpackagecheck', type: 'int'},
        'totalydsorigin',
        'foc',
        'totalydscheck',
        'unitprice',
        'p_skuid_link',
        'usercreateid_link',
        'skutypeid_link',
        'usercreate_name',
        {name: 'timecreate', type: 'date', dateFormat: 'c'},
        'lastuserupdateid_link',
        {name: 'lasttimeupdate', type: 'date', dateFormat: 'c'},
        'porder_year',
        {
            name: 'package_o_check',
            calculate: function(data) {
                return (null==data.totalpackage?'0':data.totalpackage) + '/' +  (null==data.totalpackagecheck?'0':data.totalpackagecheck);
            }
        },
        {
            name: 'totalprice',
            calculate: function(data) {
                return (null == data.unitprice ?'0':data.totalpackage * data.unitprice);
            }
        },
        {
            name: 'skuCode_color',
            convert : function (value, rec) {
                var result = '';
                if(rec.get('skuCode') != null){
                    result += rec.get('skuCode');
                    if(rec.get('color_name') != null){
                        result += ' (' + rec.get('color_name') + ')';
                    }
                }
            	return result;
            }
        },
        'status',
        'totalmet_origin',
        'totalmet_check'
    ],
    hasMany : {model: 'Stockin_pklist', name: 'stockin_packinglist'}
});
