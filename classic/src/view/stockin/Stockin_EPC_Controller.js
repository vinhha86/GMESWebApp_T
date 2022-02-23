Ext.define('GSmartApp.view.stockin.Stockin_EPC_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_EPC_Controller',
    init: function() {
        // this.callParent(arguments);
    },

    control: {
		'#Stockin_EPC_Window': {
			afterrender: 'onAfterrender'
		},
        '#btnLuu': {
            click: 'onSave'
        }
    },
    onAfterrender: function(){
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockin_d = viewModel.get('stockin_d');
        var TPGroupStore = viewModel.getStore('TPGroupStore');

        var stockin_packinglist = stockin_d.get('stockin_packinglist');
        if(stockin_packinglist == null){
            stockin_d.set('stockin_packinglist', []);
            stockin_packinglist = stockin_d.get('stockin_packinglist');
        }
        var loaiThanhPham1 = false;
        var loaiThanhPham2 = false;
        var loaiThanhPham3 = false;
        for(var i=0;i< stockin_packinglist.length;i++){
            var pklObj = stockin_packinglist[i];
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
        var stockin = viewModel.get('stockin');
        var stockin_d = viewModel.get('stockin_d');

        console.log(stockin);
        console.log(stockin_d);
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
        if(stockin.id == null || stockin.id == 0 || stockin_d.get('id') == null || isNaN(stockin_d.get('id'))){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần lưu phiếu nhập kho',
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
        params.stockindid_link = stockin_d.get('id');
        params.TPGroupStoreValue = TPGroupStoreValue;

        GSmartApp.Ajax.postJitin('/api/v1/stockin/save_loai_thanh_pham', Ext.JSON.encode(params),
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