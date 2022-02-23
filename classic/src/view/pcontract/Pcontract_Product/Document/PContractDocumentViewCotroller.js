Ext.define('GSmartApp.view.pcontract.PContractDocumentViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractDocumentViewCotroller',
    init: function () {
        common.Check_Object_Permission();
    },
    control: {
        '#btnDoc_PContractDocumentView': {
            click: 'onThemMoi'
        },
        '#btnFile': {
            change: 'onUpload'
        }
    },
    onThemMoi: function () {
        var me = this.getView();
        var IdProduct = this.getViewModel().get('IdProduct');
        if (IdProduct == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn phải chọn sản phẩm trước khi upload tài liệu',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        me.down('#btnFile').fileInputEl.dom.click();
    },
    onUpload: function (m, newFileName, oldFileName) {
        var me = this.getView();
        var th = this;

        // var displayFileNames = me.up('form').getForm().findField('fileNames'),
        // fileList = m.getFileList(),
        // fileNames = Ext.Array.pluck(fileList, 'name');

        // displayFileNames.setValue(fileNames.join(','));

        var viewmodel = this.getViewModel();
        var IdProduct = viewmodel.get('IdProduct');
        var IdPcontract = viewmodel.get('PContract').id;

        for(var i=0; i<m.fileInputEl.dom.files.length;i++){
            var data = new FormData();
            data.append('file', m.fileInputEl.dom.files[i]);
            data.append('pcontractid_link', IdPcontract);
            data.append('productid_link', IdProduct);
    
            GSmartApp.Ajax.postUpload('/api/v1/pcontractdocument/uploadfile', data,
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        viewmodel.getStore('PContractDocumentStore').load();
                    }
                })
        }

        
    },
    onDownload: function (grid, rowIndex, colIndex) {
        var me = this;
        var viewmodel = this.getViewModel();
        var IdProduct = viewmodel.get('IdProduct');
        var IdPcontract = viewmodel.get('PContract').id;

        var params = new Object();
        params.pcontractid_link = IdPcontract;
        params.productid_link = IdProduct;
        params.filename = grid.getStore().getAt(rowIndex).get('filename');

        GSmartApp.Ajax.post('/api/v1/pcontractdocument/download', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray(params.filename, response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Có lỗi trong quá trình tải tài liệu',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: 'Có lỗi trong quá trình tải tài liệu',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
        // var form = document.createElement('form');
        // form.action = GSmartApp.Utils.url + '/api/v1/pcontractdocument/download';
        // form.method = 'POST';
        // //khai bao bien DonViID
        // var pcontractid_link = document.createElement('input');
        // pcontractid_link.name = 'pcontractid_link';
        // pcontractid_link.value = IdPcontract;
        // form.appendChild(pcontractid_link);

        // var productid_link = document.createElement('input');
        // productid_link.name = 'productid_link';
        // productid_link.value = IdProduct;
        // form.appendChild(productid_link);

        // var filename = document.createElement('input');
        // filename.name = 'filename';
        // filename.value = grid.getStore().getAt(rowIndex).get('filename');
        // form.appendChild(filename);

        // document.body.appendChild(form);
        // form.submit();
    },
    saveByteArray: function (reportName, byte) {
        var me = this;
        byte = this.base64ToArrayBuffer(byte);
        
        var blob = new Blob([byte], {type: "application/zip"});
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
     },
    onXoa: function (grid, rowIndex, colIndex) {
        var params = new Object();
        var viewmodel = this.getViewModel();
        var productid_link = viewmodel.get('IdProduct');
        var pcontractid_link = viewmodel.get('PContract').id;
        var data = grid.getStore().getAt(rowIndex);
        var filename = data.get('filename');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có muốn xóa tài liệu ' + filename + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    params.pcontractid_link = pcontractid_link;
                    params.productid_link = productid_link;
                    params.filename = filename;
                    params.id = data.get('id');

                    GSmartApp.Ajax.post('/api/v1/pcontractdocument/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    grid.getStore().remove(data);
                                }
                                else {
                                    Ext.Msg.show({
                                        title: 'Thông báo',
                                        msg: 'Có lỗi trong quá trình xóa tài liệu',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                }
                            }
                            else {
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: 'Có lỗi trong quá trình xóa tài liệu',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        })
                }
            }
        });
    },
    onEdit: function (editor, context, e) {
        var viewmodel = this.getViewModel();
        var data = context.record.data;
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/pcontractdocument/update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('PContractDocumentStore');
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        store.rejectChanges();
                    }
                    else {
                        store.commitChanges();
                    }
                }
            })
    }
})