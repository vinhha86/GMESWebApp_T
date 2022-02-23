Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist_Add_NoLabelPkl.Stockout_Pklist_Add_NoLabelPkl_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Pklist_Add_NoLabelPkl_Controller',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#Stockout_Pklist_Add_NoLabelPkl_View': {
            afterrender: 'onAfterrender',
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onSelect'
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel= this.getViewModel();
        var obj = viewModel.get('obj');

        if(obj.met == null || obj.met == ''){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Không được bỏ trống độ dài',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.down('#met').focus();
                    }
                }
            });
        }else
        if(isNaN(obj.met)){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Độ dài phải là số',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.down('#met').focus();
                    }
                }
            });
        }else
        if(obj.width_met == null || obj.width_met == ''){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Không được bỏ trống khổ',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.down('#khocm').focus();
                    }
                }
            });
        }else
        if(isNaN(obj.width_met)){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Khổ phải là số',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.down('#khocm').focus();
                    }
                }
            });
        }else
        {
            var skuid_link = viewModel.get('skuid_link');
            var stockout = viewModel.get('stockout');
            var stockoutDRec = viewModel.get('stockoutDRec');

            var stockoutid_link = stockout.id;
            var stockoutdid_link = stockoutDRec.get('id');

            var params = new Object();
            params.warehouse = obj;
            params.skuid_link = skuid_link;
            params.stockoutid_link = stockoutid_link;
            params.stockoutdid_link = stockoutdid_link;

            me.setLoading(true);
            GSmartApp.Ajax.postJitin('/api/v1/stockout_pklist/stockout_pklist_themMatTem',Ext.JSON.encode(params),
            function(success,response,options ) {
                var response = Ext.decode(response.responseText);
                me.setLoading(false);
                if(success){
                    if(response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Thêm thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        viewModel.set('obj', new Object());
                        m.fireEvent('themMatTem');
                    }else{
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }else{
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
        }
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel= this.getViewModel();

        var skuid_link = viewModel.get('skuid_link');
        var stockout = viewModel.get('stockout');
        var stockoutDRec = viewModel.get('stockoutDRec');

        // console.log(skuid_link);
        // console.log(stockout);
        // console.log(stockoutDRec);
    },
    
})