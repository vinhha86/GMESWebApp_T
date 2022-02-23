Ext.define('GSmartApp.view.product.ProductBOMFilter', {
    extend: 'Ext.form.Panel',
    xtype: 'ProductBOMFilter',
    id: 'ProductBOMFilter',
    controller: 'ProductBOMFilterViewController',
    layout:'hbox',
	bodyPadding: 1,
    border: false,
    IdProduct: 0,
    items:[{
        layout:'hbox',
        border: false,
        items:[{
            xtype:'combo',
            bind:{
                store : '{ProductTypeStore}'
            },
            valueField:'id',
            displayField:'name',
            queryMode:'local',
            margin: 1,
            emptyText:'Nguyên phụ liệu',
            editable: false,
            value: 0,
            itemId:'product_type',
            width: 135
        },{
            xtype:'textfield',
            emptyText:'Tên NPL',
            itemId: 'name',
            margin: 1
        },{
            xtype:'textfield',
            emptyText:'IDCode',
            itemId: 'code',
            margin: 1
        },{
            xtype:'textfield',
            emptyText:'Màu NPL',
            itemId: 'tenmaunpl',
            margin: 1
        },{
            xtype: 'button',
            margin: 1,
            text: 'Tìm kiếm',
            iconCls: 'x-fa fa-filter',
            itemId: 'btnTimKiem'
        }]
    }]
})