Ext.define('GSmartApp.view.tagencode.Encode_POrder_EPC', {
    extend: 'Ext.grid.Panel',
    xtype: 'Encode_POrder_EPC',
    id: 'Encode_POrder_EPC',
    border: true,
    controller: 'Encode_POrder_EPC_Controller',
    columnLines: true,
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    bind: {
        store: '{Encode_epc_Store}',
        title: '{title}',
    },
    columns: [
        { header: 'STT', xtype: 'rownumberer', width: 50, align: 'center' },
        { header: 'Mã vạch', dataIndex: 'skucode', width: 150 },
        { header: 'Mã chíp', dataIndex: 'epc', width: 220, summaryType: 'count', summaryRenderer: 'renderSum' },
        { header: 'TID', dataIndex: 'tid', flex: 1 },
    ],
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                itemId: 'stockcode',
                xtype: 'combobox',
                fieldLabel: 'Đơn vị mã hóa',
                bind: {
                    store: '{OrgStore}',
                    value: '{encode.orgencodeid_link}',
                    readOnly: '{isEdit}'
                },
                queryMode: 'local',
				anyMatch: true,
                displayField: 'name',
                valueField: 'id',
                flex: 1,
                labelWidth: 100,
                margin: '5 5 0 5'
            }, {
                xtype: 'textfield',
                reference: 'txt_encodeamount',
                fieldLabel: 'SL chíp:',
                width: 190,
                labelWidth: 60,
                hideLabel: false,
                margin: '5 5 0 5',
                bind: {
                    value: '{encode.encode_amount}'
                }
            }]
        }, {
            dock: 'top',
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'combo',
                    margin: '0 5 0 5',
                    reference: 'txt_encodeuser',
                    fieldLabel: 'Người mã:',
                    flex: 1,
                    labelWidth: 100,
                    hideLabel: false,
                    readOnly: true,
                    valueField: 'id',
                    displayField: 'fullName',
                    bind: {
                        value: '{encode.usercreateid_link}',
                        store: '{UserStore}'
                    }
                },
                {
                    xtype: 'datefield',
                    width: 190,
                    format: 'd/m/Y',
                    reference: 'processingdate',
                    fieldLabel: 'Ngày mã:',
                    labelWidth: 60,
                    margin: '0 5 0 5',
                    value: new Date(),  // defaults to today
                    readOnly: true,
                    altFormats: "Y-m-d\\TH:i:s.uO",
                    bind: {
                        value: '{encode.encode_date}'
                    }
                }
            ]
        },
        {
            dock: 'top',
            xtype: 'toolbar',
            items: [
                {
                    labelWidth: 100,
                    flex: 1,
                    margin: '0 5 5 5',
                    xtype: 'combobox',
                    fieldLabel: 'Thiết bị RFID:',
                    bind: {
                        store: '{DeviceEncodeStore}',
                        value: '{encode.deviceid_link}',
                        readOnly: '{isEdit}'
                    },
                    displayField: 'name',
                    valueField: 'id',
                    name: 'deviceid',
                    itemId: 'device'
                },
                {
                    margin: '0 5 5 0',
                    text: "Start",
                    iconCls: 'x-fa fa-play',
                    xtype: 'button',
                    itemId: 'btnStart',
                    bind: {
                        disabled: '{isStart}',
                        hidden: '{isApprove}',
                        userCls: '{clsbtnStart}'
                    }
                },
                {
                    margin: '0 5 5 0',
                    text: "Stop",
                    iconCls: 'x-fa fa-stop',
                    xtype: 'button',
                    handler: 'onStop',
                    userCls: 'red-button',
                    bind: {
                        disabled: '{!isStart}',
                        hidden: '{isApprove}'
                    }
                },
                {
                    margin: '0 5 5 0',
                    width: 43,
                    tooltip: 'Làm mới dữ liệu',
                    iconCls: 'x-fa fa-refresh',
                    xtype: 'button',
                    bind: {
                        disabled: '{isEdit}'
                    }
                }
            ]
        }
    ]
});
