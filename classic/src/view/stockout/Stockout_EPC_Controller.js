Ext.define('GSmartApp.view.stockout.Stockout_EPC_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_EPC_Controller',
    init: function() {
        // this.callParent(arguments);
    },
    control: {
		'#Stockout_EPC_Window': {
			afterrender: 'onAfterrender'
		},
        '#btnLuu': {
            click: 'onSave'
        }
    },
    onAfterrender: function(){
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var stockout_d = viewModel.get('stockout_d');
        var TPGroupStore = viewModel.getStore('TPGroupStore');

        var stockout_packinglist = stockout_d.get('stockout_packinglist');
        var loaiThanhPham1 = false;
        var loaiThanhPham2 = false;
        var loaiThanhPham3 = false;
        for(var i=0;i< stockout_packinglist.length;i++){
            var pklObj = stockout_packinglist[i];
            if(pklObj.status == 11){
                loaiThanhPham1 = true;
            }
            if(pklObj.status == 12){
                loaiThanhPham2 = true;
            }
            if(pklObj.status == 13){
                loaiThanhPham3 = true;
            }
        }
        if(loaiThanhPham3){
            viewModel.set('TPGroupStoreValue', 13);
        }else if(loaiThanhPham2){
            viewModel.set('TPGroupStoreValue', 12);
        }else if(loaiThanhPham1){
            viewModel.set('TPGroupStoreValue', 11);
        }
    },
    onSave: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var stockout_d = viewModel.get('stockout_d');

        console.log(stockout);
        console.log(stockout_d);
        //////
        var TPGroupStoreValue = viewModel.get('TPGroupStoreValue');
        if(TPGroupStoreValue == null || TPGroupStoreValue == ''){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn một loại thành phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        if(stockout.id == null || stockout.id == 0 || stockout_d.get('id') == null || isNaN(stockout_d.get('id'))){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần lưu phiếu xuất kho',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }

        //////
        me.setLoading(true);

        var params = new Object();
        params.stockoutdid_link = stockout_d.get('id');
        params.TPGroupStoreValue = TPGroupStoreValue;

        GSmartApp.Ajax.postJitin('/api/v1/stockout/save_loai_thanh_pham', Ext.JSON.encode(params),
        function (success, response, options) {
            me.setLoading(false);
            if (success) {
                var response = Ext.decode(response.responseText);
                // console.log(response);
                if (response.respcode == 200) {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thành công',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    m.fireEvent('LuuLoaiThanhPham_Done');
                }
                else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }

            } else {
                Ext.Msg.show({
                    title: 'Lưu thất bại',
                    msg: "Bạn hãy kiểm tra lại kết nối mạng",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            }
        })
    }
});    