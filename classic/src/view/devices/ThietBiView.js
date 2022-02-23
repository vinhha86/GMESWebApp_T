Ext.define('GSmartApp.view.devices.ThietBiView', {
    extend: 'Ext.grid.Panel',
    xtype: 'ThietBiView',
    id: 'ThietBiView',

    controller: 'ThietBiViewController',
    bind: {
        store: '{ds_thietbi_store}'
    },
    title: 'Thông tin thiết bị',
    width: 400,
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}',
    }],
    columns: [
        {
            text: 'STT',
            width: 50,
            xtype: 'rownumberer',
            align: 'center'
        }, {
            text: 'Mã thiết bị',
            flex: 1,
            align: 'center',
            dataIndex: 'code'
        }, {
            text: 'Tên thiết bị',
            flex: 1,
            align: 'center',
            dataIndex: 'name'
        }, {
            width: 40,
            xtype: 'templatecolumn',
            dataIndex: 'status',
            tpl: '<tpl if="status == 1"><i class="fa fa-circle" style="color: blue;"></i><tpl elseif ="status == 0"><i class="fa fa-circle" style="color: red;"></i><tpl else><i class="fa fa-lock"></i></tpl>'
        }, {
            xtype: 'actioncolumn',
            width: 40,
            items: [{
                iconCls: 'x-fa fa fa-bars',
                handler: 'onMenu'
            }]
        }
    ],
    dockedItems: [{
        dock: 'top',
        border: true,
        layout: {
            type: 'vbox',
        },
        items: [
            {
                height: 2
            },
            {
                width: 385,
                xtype: 'combobox',
                fieldLabel: 'Cửa hàng/kho',
                bind: {
                    store: '{ds_cuahang_kho_store}',
                    value: '{timkiem.org_governid_link}'
                },
                valueField: 'id',
                queryMode:'local',
                anyMatch: true,
                displayField: 'name',
                valueField: 'id'
            }, {
                fieldLabel: 'Loại thiết bị',
                xtype: 'combobox',
                bind: {
                    store: '{loai_thietbi_store}',
                    value: '{timkiem.type}'
                },
                displayField: 'name',
                valueField: 'id',
                width: 385,
                queryMode:'local',
                anyMatch: true,
            },
            {
                layout: 'hbox',
                items: [
                    {
                        width: 350,
                        xtype: 'textfield',
                        fieldLabel: 'Tên,mã thiết bị',
                        bind: '{timkiem.name_code}',
                        marrgin: 5,
                    },
                    {
                        flex: 1
                    },
                    {
                        marrgin: 5,
                        width: 35,
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        handler: 'search'
                    }
                ]
            }, {
                height: 10
            }
        ]
    }]

})