Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_POrder', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_M_Edit_POrder',
    id:'Stockin_M_Edit_POrder',
    controller: 'Stockin_M_Edit_POrderCotroller',
    viewModel: {
        type: 'Stockin_M_Edit_ViewModel'
    },
    viewConfig: {
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{porderStore}'
    },
    reference: 'Stockin_M_Edit_POrder',
    columns:[{
        text:'Mã lệnh',
        dataIndex:'ordercode',
        width: 90
    },{
        text:'Tên SP',
        dataIndex:'productcode',
        flex: 1
    },{
        text:'Ngày SX',
        xtype: 'datecolumn',
        format: 'd/m/Y',
        dataIndex:'orderdate',
        width: 120
    },{
        text:'Năm SX',
        dataIndex:'productionyear',
        width: 90
    },{
        text:'Mùa',
        dataIndex:'season',
        width: 90
    },{
        text:'SL',
        dataIndex:'totalorder',
        width: 60
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        border: true,
        style:"background-color : white;",
        items:[{
            xtype:'textfield',
            fieldLabel: 'Mã lệnh',
            margin: 5,
            itemId: 'ordercode'
        },{
            xtype:'button',
            itemId: 'btnTimKiem',
            tooltip: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            margin: 5
        }]
    },{
        dock: 'bottom',
        layout: 'hbox',
        items:[{
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Chọn',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
});

