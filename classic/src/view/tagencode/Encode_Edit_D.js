Ext.define('GSmartApp.view.tagencode.Encode_Edit_D', {
    extend: 'Ext.grid.Panel',
    xtype: 'Encode_Edit_D',
    id: 'Encode_Edit_D',
    border: true,
    controller: 'Encode_Edit_D_Controller',
    columnLines: true,
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false
    },
    bind: '{warehouse_encode.warehouse_encode_epc}',
    // bind: {
    //     store: '{Encode_epc_Store}'
    // },
    columns: [
        { header: 'STT', xtype:'rownumberer', width: 50, align: 'center'},
        { header: 'Mã vạch', dataIndex: 'skucode', width: 150},
        { header: 'Mã chíp', dataIndex: 'epc', width: 250},
        { header: 'TID', dataIndex: 'tid', flex: 1, summaryType: 'count', summaryRenderer: 'renderSum'},
    ],
    title:'Danh sách chíp',
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                itemId: 'stockcode',
                xtype: 'combobox',
                fieldLabel: 'Đơn vị mã hóa',
                bind:{
                    store: '{OrgStore}',
                    // value: '{warehouse_encode.orgencodeid_link}',
                    readOnly: '{isApprove}'
                },
                queryMode: 'local',
				anyMatch: true,
                displayField: 'name',
                valueField: 'id',
                flex: 1,
                labelWidth: 100,
                margin: '5 5 0 5'
            },{
                xtype: 'textfield',
                reference:'txt_encodeamount',
                fieldLabel: 'SL chíp:',
                width: 190,
                labelWidth: 60,
                hideLabel: false,
                margin: '5 5 0 5',
                readOnly: true,
                bind:{
                    value: '{warehouse_encode.totalencode}'
                }
            }]
        }, {
            dock: 'top',
            xtype: 'toolbar',
            items: [          
                {
                    xtype: 'combo',
                    margin: '0 5 0 5',
                    reference:'txt_encodeuser',
                    fieldLabel: 'Người mã:',
                    flex: 1,
                    labelWidth: 100,
                    hideLabel: false,
                    readOnly: true,
                    valueField: 'id',
			        displayField: 'fullName',
                    bind:{
                        value: '{warehouse_encode.usercreateid_link}',
                        store: '{UserStore}'
                    }
                },
                {
                    xtype: 'datefield',
                    width: 190,
                    format: 'd/m/Y',
                    reference:'processingdate',
                    fieldLabel: 'Ngày mã:',
                    labelWidth: 60,
                    margin: '0 5 0 5',
                    value: new Date(),  // defaults to today
                    readOnly: true,
                    altFormats: "Y-m-d\\TH:i:s.uO",
                    bind:{
                        value: '{warehouse_encode.timecreate}'
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
                        value: '{warehouse_encode.deviceid_link}',
                        readOnly: '{isApprove}'
                    },
                    displayField: 'name',
                    valueField: 'id',
                    name: 'deviceid',
                    reference: 'device',
                    listeners: {
                        change: 'onDeviceChange'
                    }
                },
                {
                    margin: '0 5 5 0',
                    text: "Start",
                    iconCls: 'x-fa fa-play',
                    xtype: 'button',
                    handler: 'onStart',
                    bind: {
                        disabled: '{isStart}',
                        hidden: '{isApprove}',
                        userCls: '{clsbtnStart}'
                    },
                    width: 95
                },
                {
                    margin: '0 5 5 0',
                    text: "Stop",
                    iconCls: 'x-fa fa-stop',
                    xtype: 'button',
                    handler: 'onStop',
                    userCls: 'red-button',
                    width: 95,
                    bind: {
                        hidden: '{isApprove}'
                    }
                }
            ]
        }
    ]
});
