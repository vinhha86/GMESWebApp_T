Ext.define('GSmartApp.model.warehouse.WarehouseModel', {
    extend: 'Ext.data.Model',
    idProperty: 'idx',
    fields: [
        'idx',
        'id',
        'epc',
        'encryptdatetime',
        'skucode',
        'unitid_link',
        'unit_name',
        'lotnumber',
        'packageid',
        'colorid_link',
        'color_name',
        'colorname',
        'yds',
        'width',
        'met',
        'material_product_code',
        'material_product_id_link',
        'material_skuid_link',
        'imgproduct',
        'stockName',
        { name: 'timecreate', type: 'date' , dateFormat: 'c'},
        {
            name: 'skuCode_color',
            convert : function (value, rec) {
                var result = '';
                if(rec.get('skuCode') != null){
                    result += rec.get('skuCode');
                    if(rec.get('colorname') != null){
                        result += ' - ' + rec.get('colorname');
                    }
                }
            	return result;
            }
        },
        {
            name: 'skuCode_color',
            convert : function (value, rec) {
                var result = '';
                if(rec.get('skuCode') != null){
                    result += rec.get('skuCode');
                    if(rec.get('colorname') != null){
                        result += ' - ' + rec.get('colorname');
                    }
                }
            	return result;
            }
        },
        'stockinProductString',
        {
            name: 'nhomCayVai',
            convert : function (value, rec) {
                var result = '';
                if(rec.get('stockinProductString') == ''){
                    return 'Cây vải lẻ không thuộc mã SP nào';
                }
            	return rec.get('stockinProductString');
            }
        },
    ]
});