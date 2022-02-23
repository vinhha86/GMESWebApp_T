Ext.define('GSmartApp.view.material.MaterialInfoView', {
    extend: 'Ext.form.Panel',
    xtype: 'MaterialInfoView',
    id: 'MaterialInfoView',
    controller: 'MaterialInfoViewController',
    layout:'hbox',
	bodyPadding: 5,
    border: false,
    IdProduct: 0,
    items:[{
        layout:'vbox',
        border: false,
        flex: 1,
        items:[
            {
                layout:'hbox',
                width: '100%',
                items:[{
                    xtype:'textfield',
                    margin: 2,
                    fieldLabel: "Mã nguyên liệu (<span style = 'color: red'>*</span>)",
                    bind:{
                        value : '{product.buyercode}'
                    },
                    tooltip:'Nhập mã nguyên liệu',
                    itemId:'code',
                    name:'code',
                    height: 32,
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    labelWidth: 125,
                    flex: 1,
                },{
                    xtype:'textfield',
                    margin: 2,
                    height: 32,
                    flex: 1,
                    tooltip:'Nhập tên nguyên liệu',
                    fieldLabel: "Tên nguyên liệu (<span style = 'color: red'>*</span>)",
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    bind:{
                        value : '{product.buyername}'
                    },
                    name:'name',
                    labelWidth: 125
                }]
            },
            {
                layout:'hbox',
                width: '100%',
                border: false,
                items:[
                    {
                        xtype:  'combo',
                        flex: 1,
                        margin: 2,
                        valueField: 'id',
                        displayField: 'name',
                        queryMode: 'local',
                        anyMatch: true,
                        fieldLabel: "Loại nguyên liệu (<span style = 'color: red'>*</span>)",
                        allowBlank: false,
                        labelWidth: 125,
                        blankText: 'Không được để trống',
                        bind:{
                            store: '{ProductTypeStore}',
                            value : '{product.producttypeid_link}',
                            readOnly: '{isReadonlyType}'
                        }
                    },                
                    {
                        xtype:  'combo',
                        flex: 1,
                        margin: 2,
                        valueField: 'id',
                        displayField: 'name',
                        queryMode: 'local',
                        anyMatch: true,
                        fieldLabel: "Đơn vị tính (<span style = 'color: red'>*</span>)",
                        allowBlank: false,
                        labelWidth: 125,
                        blankText: 'Không được để trống',
                        bind:{
                            store: '{UnitStore}',
                            value : '{product.unitid_link}'
                        }
                    }
                ]
            },
            {
                xtype:'textarea',
                margin: 1,
                minHeight: 30,
                width: '100%',
                tooltip:'Mô tả',
                fieldLabel: "Mô tả",
                bind:{
                    value : '{product.description}'
                },
                name:'info',
                anchor    : '99%',
                labelWidth: 125
            }
        ]
    },{
        xtype:'MaterialImageView',
        margin: 2
    }]
})