Ext.define('GSmartApp.view.devices.ThietBiChiTietView', {
    extend: 'Ext.form.Panel',
    xtype: 'ThietBiChiTietView',

    controller: 'ThietBiChiTietViewController',
    items: [{
        html: '<hr>'
    },
    {
        width: 500,
        xtype: 'combobox',
        bind: {
            store: '{loai_thietbi_store}',
            value: '{thongtin_chitiet.type}'
        },
        queryMode:'local',
        anyMatch: true,
        fieldLabel: 'Loại thiết bị',
        displayField: 'name',
        valueField: 'id',
        allowBlank: false,
    }, {
        width: 500,
        xtype: 'textfield',
        name: 'code',
        allowBlank: false,
        required: true,
        fieldLabel: 'Mã thiết bị',
        bind: '{thongtin_chitiet.code}',
    }, {
        width: 500,
        xtype: 'textfield',
        name: 'name',
        allowBlank: false,
        required: true,
        fieldLabel: 'Tên thiết bị',
        bind: '{thongtin_chitiet.name}'
    },  {
        width: 500,
        xtype: 'combobox',
        fieldLabel: 'Cửa hàng/Kho',
        bind: {
            store: '{ds_cuahang_kho_store}',
            value: '{thongtin_chitiet.org_governid_link}'
        },
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        anyMatch: true,
        allowBlank: false,
    }
    ],
    dockedItems: [
        {
            dock: 'top',
            layout: 'hbox',
            flex: 1,
            height:38,
            //  border:'0 0 1 0',
            items: [
               {
                   width:3
               },
                {
                    width: 120,
                    xtype: 'button',
                    text: 'Thêm mới',
                    iconCls: 'x-fa fa-plus',
                    itemId: 'ThemMoi'
                }, {
                    flex:1
                },
                 {
                    width: 100,
                    xtype: 'button',
                    text: 'Lưu',
                    iconCls: 'x-fa fa-save',
                    itemId: 'Luu',
                    formBind:true
                },
            ]
        }
    ]
})