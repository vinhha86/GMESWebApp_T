Ext.define('GSmartApp.view.sku.SkuSearchCriteriaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SkuSearchCriteriaController',
    init: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var KHStore = viewModel.getStore('OrgStore');

        if(viewModel.get('isSearchViewHidden')){
            me.getView().setHidden(true);
        }else if(viewModel.get('isAddNPL')){
            KHStore.loadStore(5, false);
            me.lookupReference('skusearch_cboPartner').setHidden(true);
            me.lookupReference('skusearch_cboProvider').setHidden(false);
        }else{
            KHStore.loadStore(12, false);
        }
        
    },
    control:{
        '#SkuSearchCriteria_Attr':{
            itemdblclick :'onitemdblclick'
        },
        '#btnThemMoi':{
            click: 'onThemMoiAtt'
        },
        '#btnXoa':{
            click: 'onXoa'
        }
    },    
    onCloseButton: function () {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onXoa: function(grid, row, col){
        var viewmodel = this.getViewModel();
        var me = this.getView();
        var rec = grid.getStore().getAt(row);
        var name = rec.get('attributeName');

        var id = rec.get('attributeid_link');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa thuộc tính ' + name + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa dữ liệu");
                    var params = new Object();
                    params.attributeid_link = id;
                    params.productid_link = me.IdProduct;

                    GSmartApp.Ajax.post('/api/v1/productattribute/deleteatt', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: 'Xóa thành công',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                                var store = me.getStore();
                                store.remove(rec);
                                var storeSKU = viewmodel.getStore('SKUStore');
                                storeSKU.load();
                            } else {
                                Ext.Msg.show({
                                    title: 'Xóa thất bại',
                                    msg: null,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                            me.setLoading(false);
                        })
                }
            }
        });
    },
    onAddValue: function(grid, row, col){
        var me = this;
        var record = grid.getStore().getAt(row);
        
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Thuộc tính : ' + record.data.name,
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'SkuSearchSelectAttributeValue',
                IdAttribute: record.data.id,
                AttrRecord: record
            }]
        });
        form.show();

        form.down('#SkuSearchSelectAttributeValue').on('SelectValue', function(ids, values){
            record.set('description',values);
            record.set('selectedids', ids);
            me.onSearchButton();
            form.close();
        })
    },
    onitemdblclick : function(m, record, item, index, e, eOpts){
        var me = this;
        
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Thuộc tính : ' + record.data.name,
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'SkuSearchSelectAttributeValue',
                IdAttribute: record.data.id,
                AttrRecord: record,
                viewModel: {
                    type: 'SkuSearchSelectAttributeValueModel',
                    data: {
                        IdAttribute: record.data.id,
                        AttrRecord: record
                    }
                },
            }]
        });
        form.show();

        form.down('#SkuSearchSelectAttributeValue').on('SelectValue', function(ids, values){
            record.set('description',values);
            record.set('selectedids', ids);
            me.onSearchButton();
            form.close();
        })
    },
    onThemMoiAtt: function(grid, row, col){
        var me = this.getView();
        
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Thêm mới thuộc tính ',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'ProductAddAttributeView',
                IdProduct: me.IdProduct
            }]
        });
        form.show();
    },
    onSearchButton: function(){
        var viewmodel = this.getViewModel();

        skusearch_ProductType = this.lookupReference('skusearch_ProductType');
        skusearch_code = this.lookupReference('skusearch_code');
        skusearch_partnercode = this.lookupReference('skusearch_partnercode');
        productid_link = viewmodel.get('productid_link');
        orgcustomerid_link = viewmodel.get('orgcustomerid_link');
        var SkuAtributesStore = this.getViewModel().getStore('SkuAtributesStore');
        var ProductStore = this.getViewModel().getStore('ProductStore');
        var SkuStore = this.getViewModel().getStore('SkuStore');
        ProductStore.removeAll();
        SkuStore.removeAll();

        var attributes =new Array();
        Ext.Array.each(SkuAtributesStore.data.items, function(rc) {
            if (rc.data.selectedids != '')
                attributes.push(rc.data);
        });
        ProductStore.loadFilter(
            skusearch_ProductType.getValue(),
            skusearch_code.getValue(),
            skusearch_partnercode.getValue(),
            attributes,
            productid_link,
            orgcustomerid_link
        )
   
    },
    onProductTypeItemSelected: function (sender, record) {
        // console.log(record.get('id'));
        var SkuAtributesStore = this.getViewModel().getStore('SkuAtributesStore');        
        if (record.get('id') > 0){
            SkuAtributesStore.loadDefaultAttr(record.get('id'));
        }
    },    
})