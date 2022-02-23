Ext.define('GSmartApp.model.stockout.Stockout_Order', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id'},
        {name: 'idx', type: 'int'},
        'orgrootid_link',
        'ordercode',
        {name: 'orderdate', type: 'date', dateFormat: 'c'},
        {name: 'stockoutdate', type: 'date', dateFormat: 'c'},
        'stockouttypeid_link',
        'orgid_from_link',
        'orgid_to_link',
        'orderperson',
        'totalpackage',
        'totalm3',
        'totalnetweight',
        'totalgrossweight',
        'p_skuid_link',
        'extrainfo',
        'status',
        'usercreateid_link',
        {name: 'timecreate', type: 'date', dateFormat: 'c'},
        'lastuserupdateid_link',
        {name: 'lasttimeupdate', type: 'date', dateFormat: 'c'},
        'porderid_link',
        'pcontractid_link',
        'stockout_order_code',
        {
            name: 'statusName',
            calculate: function(data){
                if(data.status == 0) return "Đang yêu cầu";
                return "Hoàn thành";
            }
        },
        {
            name: 'typename',
            calculate: function(data){
                if(data.stockouttypeid_link == 1)
                    return "YCX Nguyên liệu";
                return "YCX Phụ liệu";
            }
        },
        'buyername',
        'vendorname',
        'po_code',
        'productbuyercode',
        'po_quantity',
        'totalpair',
        'po_quantity_sp',
        'org_from_name',
        'org_to_name'
    ],
    hasMany : {model: 'Stockout_order_d', name: 'stockout_order_d'}
});
