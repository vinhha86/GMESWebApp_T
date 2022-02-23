Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit.CutplanProcessing_Edit', {
    extend: 'Ext.container.Container',
    xtype: 'cutplan_processing_edit',
    id: 'cutplan_processing_edit',
    controller: 'CutplanProcessing_Edit_Controller',
    viewModel: 'CutplanProcessing_Edit_ViewModel',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'CutplanProcessing_Edit_M',
            margin: '2',
            // height: 140
        },
        {
            xtype: 'CutplanProcessing_Edit_D',
            margin: '2',
            flex: 1
        },
        {
            xtype: 'container',
            height: 35,
            layout:'hbox',
            items:[
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  "Quay lại",
                iconCls: 'x-fa fa-backward',
                itemId: 'btnBack',
            },
            {
                flex:1
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  'Lưu',
                iconCls: 'x-fa fa-floppy-o',
                itemId: 'btnLuu',
            }
        ]
        }        
    ] 
});
