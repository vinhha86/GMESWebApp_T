Ext.define('GSmartApp.view.pcontract.PContract_PO.Export_Quotation.SelectPO_Quotation_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SelectPO_Quotation_Controller',
    control: {
        '#btnThoat' :{
            click: 'onThoat'
        },
        '#btnChon' : {
            click: 'onChon'
        }
    },
    init: function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PO_Quotation_Store');
        var pcontractid_link = viewmodel.get('pcontractid_link');
        store.loadStoreByContract(pcontractid_link);
    },
    onThoat: function() {
        this.getView().up('window').close();
    },
    onChon: function() {
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        
        var select = grid.getSelectionModel().getSelection();

        if(select.length == 0) {
            Ext.MessageBox.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn PO để xuất báo giá',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            var params = new Object();
            params.listidpo = [];
            for(var i=0; i< select.length; i++){
                params.listidpo.push(select[i].data.id);
            }

            GSmartApp.Ajax.post('/api/v1/report/quatation', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray(viewmodel.get("name_quotation")+".xlsx", response.data);
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
        }
    },
    saveByteArray: function (reportName, byte) {
        var me = this;
        byte = this.base64ToArrayBuffer(byte);
        
        var blob = new Blob([byte], {type: "application/xlsx"});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    },
    base64ToArrayBuffer: function (base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
           var ascii = binaryString.charCodeAt(i);
           bytes[i] = ascii;
        }
        return bytes;
     }
})