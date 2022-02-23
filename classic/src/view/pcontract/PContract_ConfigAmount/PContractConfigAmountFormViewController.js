Ext.define('GSmartApp.view.pcontract.PContractConfigAmountFormViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractConfigAmountFormViewController',
    init: function () {
        this.onLoad();
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onLoad: function(){
        let view = this.getView();
        let amount_from = this.lookupReference('amount_from');
        amount_from.setValue(view.amountFrom);
        let amount_to = this.lookupReference('amount_to');
        amount_to.setValue(view.amountFrom+1);
        // console.log(view.amountFrom);
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    Luu: function (amount_from, amount_to, amount_plus, type) {
        let me = this.getView();
        let params = new Object();
        let data = new Object();
        data.id = 0;
        data.amount_from = amount_from;
        data.amount_to = amount_to;
        data.amount_plus = amount_plus;
        data.type = type;

        params.data = data;
        params.msgtype = "CONFIG_AMOUNT_CREATE";
        params.message = "Tạo cấu hình số lượng";

        GSmartApp.Ajax.post('/api/v1/configamount/save', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        mainView = Ext.getCmp('PContractConfigAmountView');
                        mainView.getStore().load();
                        me.up('window').close();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onLuu: function () {
        let amount_from = this.lookupReference('amount_from').getValue();
        let amount_to = this.lookupReference('amount_to').getValue();
        let amount_plus = this.lookupReference('amount_plus').getValue();
        let type = this.lookupReference('type').getValue();

        if(amount_from > amount_to){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Lỗi: Số lượng từ lớn hơn số lượng đến",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
            let m = this;
            m.Luu(amount_from, amount_to, amount_plus, type);
        }
    }
})