Ext.define('GSmartApp.view.product.ProductInfoView', {
    extend: 'Ext.form.Panel',
    xtype: 'ProductInfoView',
    id: 'ProductInfoView',
    controller: 'ProductInfoViewCotroller',
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
            border:false,
            items:[{
                xtype:'textfield',
                margin: 1,
                fieldLabel: "Mã SP (Buyer) (<span style = 'color: red'>*</span>)",
                bind:{
                    value : '{product.buyercode}'
                },
                tooltip:'Nhập mã Buyer',
                itemId:'buyercode',
                name:'buyercode',
                height: 32,
                allowBlank: false,
                blankText: 'Không được để trống',
                labelWidth: 110
            },{
                xtype:'textfield',
                margin: 1,
                height: 32,
                width: 400,
                tooltip:'Nhập tên Buyer',
                fieldLabel: "Tên SP (Buyer)",
                bind:{
                    value : '{product.buyername}'
                },
                name:'buyername',
                labelWidth: 110
            }]
        },
        {
            layout: 'hbox',
            items: [{
                layout:'vbox',
                border:false,
                items:[{
                    xtype:'textfield',
                    margin: 1,
                    fieldLabel: "Mã Vendor",
                    bind:{
                        value : '{product.vendorcode}'
                    },
                    tooltip:'Nhập mã Vendor',
                    itemId:'vendorcode',
                    name:'vendorcode',
                    height: 32,
                    labelWidth: 110
                },{
                    xtype:'textfield',
                    margin: 1,
                    fieldLabel: "Mã nội bộ",
                    bind:{
                        value : '{product.code}'
                    },
                    tooltip:'Nhập mã sản phẩm',
                    itemId:'code',
                    name:'code',
                    height: 32,
                    labelWidth: 110
                }]
            },
            {
                xtype:'textarea',
                margin: 1,
                minHeight: 30,
                width: 400,
                tooltip:'Mô tả',
                fieldLabel: "Mô tả",
                bind:{
                    value : '{product.description}'
                },
                name:'info',
                anchor    : '99%',
                labelWidth: 110
            }]
        }
        ]
    },{
        xtype:'ProductImageView',
        margin: 3
    }]
})