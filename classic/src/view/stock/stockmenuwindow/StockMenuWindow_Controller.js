Ext.define('GSmartApp.view.stock.stockmenuwindow.StockMenuWindow_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockMenuWindow_Controller',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnChon': {
            click: 'onBtnChon'
        }
    },
    listen: {
        store: {
            'StockTreeStore': {
                'loadStore_Done': 'onloadStore_Done'
            }
        }
    },
    onloadStore_Done: function () {
        this.getView().setLoading(false);
    },
    onloadPage: function() {
        var viewModel = this.getViewModel();
        var StockTreeStore = viewModel.getStore('StockTreeStore');

        StockTreeStore.loadStore(null, null);
        StockTreeStore.getSorters().add({
            property: 'khoangKhongXacDinh',
            direction: 'ASC'
        },{
            property: 'name',
            direction: 'ASC'
        });
    },
    onBtnChon: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var selection = me.getSelection();
        // console.log(selection);

        if(selection.length == 0){ 
            // console.log('length 0');
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn khoang trong danh sách',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
            var selectedStock = selection[0];
            // console.log(selectedStock);
            if(selectedStock.get('type') != 5 && selectedStock.get('khoangKhongXacDinh') != true){ 
                // console.log('type false');
                // console.log(selectedStock.type);
                // console.log(selectedStock.khoangKhongXacDinh);

                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Bạn cần chọn khoang trong danh sách',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                return;
            }
            selectedStock.set('id', null);
            this.fireEvent('SelectStock', selectedStock.data);
        }

        // console.log(selection);
        // this.fireEvent('SelectStock');
    }
})