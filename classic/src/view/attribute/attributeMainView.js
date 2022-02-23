Ext.define('GSmartApp.view.attribute.attributeMainView', {
    extend: 'Ext.form.Panel',
    xtype: 'attributeMainView',
    id: 'attributeMainView',
    controller : 'attributeMainViewController',
    layout: 'border',
    height: 500,
    items: [{
        region: 'east',
        width: '50%',
        collapsible: true,
        title: 'Giá trị thuộc tính',
        split: true,
        xtype:'attributeValueView'
    }, {
        region: 'center',
        title:'Thuộc tính sản phẩm',
        width: '50%',
        xtype:'AttributeView'
    }]
})