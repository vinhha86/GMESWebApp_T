Ext.define('GSmartApp.view.TongHopBaoAn.TongHopBaoAnView', {
    extend: 'Ext.Container',
    xtype: 'TongHopBaoAnView',
    id: 'tonghop_baoan',
    cls: 'TongHopBaoAnView',
    reference: 'TongHopBaoAnView',
    viewModel: {
        type: 'TongHopBaoAnViewModel'
    },
    controller: 'TongHopBaoAnViewController',
    height: '100%',
    layout: 'fit',
    width: '100%',
    items:[
        {
            xtype: 'panel',
            height: '100%',
            layout: 'vbox',
            items: [
                {
                    layout: 'hbox',
                    defaults: {
                        margin: 5
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cbbox_org',
                            // reference: 'cbbox_org',
                            forceSelection: true,
                            editable: false,
                            readOnly: true,
                            // cls: 'notEditable',
                            bind:{
                                store:'{ListOrgStore}',
                                value:'{orgId}'
                            },
                            displayField: 'name',
                            valueField: 'id',
                            label: 'Đơn vị:',
                            // disabled: true,
                            labelWidth: 100,
                            flex: 1,
                            // padding: 2,
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        margin: 5
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            reference: 'date',
                            itemId: 'date',
                            label: 'Ngày:',
                            // labelWidth: 'auto',
                            labelWidth: 100,
                            flex: 1,
                            value: new Date(),
                            dateFormat : 'd/m/y',
                            enableKeyEvents: true,
                            // bind:{
                            //     value:'{date}'
                            // },
                        },
                    ]
                },
                {
                    margin: 1,
                    flex: 1,
                    xtype: 'TongHopBaoAnView_Info',
                },
            ],
            tbar: [
                {
                    xtype:'button',
                    iconCls: 'x-fa fa-arrow-left',
                    itemId:'btnBack',
                    ui: 'action',
                },
                '->'
                ,
                // {
                //     xtype:'button',
                //     iconCls: 'x-fa fa-refresh',
                //     itemId:'btnTest',
                //     ui: 'action',
                // },
            ]
        }
    ]
});
