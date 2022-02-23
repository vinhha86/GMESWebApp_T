Ext.define('GSmartApp.view.attribute.attributeMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.attributeMainViewController',
    oldValue: '', // Lưu giá trị cũ trước khi sửa . Nếu giá trị mới không validate thì trả về giá trị cũ
    init: function () {
        var me = this.getView();
        var viewmodel = me.down('#AttributeView').getViewModel();
        var store = viewmodel.getStore('AttributeStore');
        store.loadStore();
    },
    control: {
        '#attributeMainView': {
            activate: 'onActivate'
        }
    },
    onActivate: function(){
        var me = this.getView();
        
        var viewmodel = me.down('#AttributeView').getViewModel();
        var store = viewmodel.getStore('AttributeStore');
        store.loadStore();
    }
})