Ext.define('GSmartApp.model.encode.warehouse_encode_model', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id'},
        {name: 'idx'},
        'orgrootid_link',
        'orgencodeid_link',
        'orgencode_name',
        'deviceid_link',
        'device_name',
        'device_name',
        'usercreateid_link',
        'usercreate_name',
        {name: 'timecreate', type: 'date', dateFormat: 'c'},
        'userapproveid_link',
        'userapprove_name',
        'timeapprove',
        'status',
        {name: 'status_name', calculate: function(data){
            return data.status == 0 ? "Đang lập" : "Đã duyệt"
        }}
    ],
    hasMany : {model: 'warehouse_encode_d_model', name: 'warehouse_encode_d'},
    hasMany : {model: 'warehouse_encode_epc_model', name: 'warehouse_encode_epc'}
});
