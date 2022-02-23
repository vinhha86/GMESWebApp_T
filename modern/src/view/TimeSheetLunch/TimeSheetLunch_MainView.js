Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_MainView', {
    extend: 'Ext.Container',
    xtype: 'TimeSheetLunch_MainView',
    id: 'TimeSheetLunch_MainView',
    cls: 'TimeSheetLunch_MainView',
    reference: 'TimeSheetLunch_MainView',
    viewModel: {
        type: 'TimeSheetLunch_MainViewModel'
    },
    controller: 'TimeSheetLunch_MainViewController',
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
                    xtype: 'TimeSheetLunch_Info',
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
