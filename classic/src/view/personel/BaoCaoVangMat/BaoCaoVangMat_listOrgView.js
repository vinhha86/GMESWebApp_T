Ext.define('GSmartApp.view.personel.BaoCaoVangMat_listOrgView', {
    extend: 'Ext.grid.Panel',
    xtype: 'BaoCaoVangMat_listOrgView',
    id: 'BaoCaoVangMat_listOrgView',
    controller: 'BaoCaoVangMat_listOrgViewController',
    bind: {
        store: '{OrgStore}'
    },
    columns: [{
        text: 'Đơn vị',
        dataIndex: 'name',
        flex: 1,
        renderer: function (value, metaData, record, rowIndex) {
            if (record.data.orgtypeid_link == 1)
                metaData.iconCls = 'x-fa fa-building'
            if (record.data.orgtypeid_link == 13) {
                metaData.iconCls = 'x-fa fa-industry'
                if (record.data.is_manufacturer == 1)
                    metaData.iconCls = 'x-fa fa-handshake'
                else
                    metaData.iconCls = 'x-fa fa-industry'
            }
            if (record.data.orgtypeid_link == 14)
                metaData.iconCls = 'x-fa fa-sliders'
            if (record.data.orgtypeid_link == 8)
                metaData.iconCls = 'x-fa fa-home'
            if (record.data.orgtypeid_link == 9)
                metaData.iconCls = 'x-fa fa-check-circle'
            if (record.data.orgtypeid_link == 21)
                metaData.iconCls = 'x-fa fa-bath'
            return value;
        }
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        layout: 'hbox',
        items: [{
            xtype: 'datefield',
            fieldLabel: "Ngày",
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelStyle: "font-weight: bold; font-size: 14px; color: black;",
            bind: {
                value: '{date}'
            },
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            itemId: 'date',
            margin: 2,
            editable: false,
            labelWidth: 40,
            width: '98%'
        }]
    }]
});

