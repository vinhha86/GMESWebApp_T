Ext.define('GSmartApp.view.porders.POrderList.SewingCost.PorderSewingCost_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PorderSewingCost_ViewController',
    init: function () {
        this.callParent(arguments);
        var viewModel = this.getViewModel();
        var PorderSewingCostStore = viewModel.get('PorderSewingCostStore');
        PorderSewingCostStore.setGroupField('porderbalance_name');
    },

    control: {
        '#btnThemCongDoan': {
            click: 'onThemMoi',
        },
        '#btnCopyCongDoan': {
            click: 'onCopyCongDoan',
        },
        '#btnPorderBalance': {
            click: 'onBtnPorderBalance'
        },
        '#btnDeletePorderSewingCost': {
            click: 'onbtnDeletePorderSewingCost'
        },
        '#btnDownloadTmpFile': {
            click: 'onbtnDownloadTmpFile'
        },
        '#btnUploadTmpFile': {
            click: 'onbtnUploadTmpFile'
        },
        '#fileUpload': {
            change: 'onSelectFileUpload'
        },
    },

    renderSum: function (value, summaryData, dataIndex) {
        return '<div style="font-weight: bold; color:darkred;"> Tổng: ' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    rendernumber: function (value, metaData, record, rowIdx, colIdx, stor) {
        return value == 0 ? "" : Ext.util.Format.number(value, '0,000.000');
    },
    rendernumberint: function (value, metaData, record, rowIdx, colIdx, stor) {
        return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
    },

    onCopyCongDoan: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var productid_link = viewModel.get('porder.productid_link');
        var porderid_link = viewModel.get('porder.id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn copy danh sách công đoạn chuẩn của sản phẩm (danh sách hiện tại sẽ bị xoá)?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.productid_link = productid_link;
                    params.porderid_link = porderid_link;

                    me.setLoading(true);

                    GSmartApp.Ajax.post('/api/v1/pordersewingcost/copy_productsewingcost_default', Ext.JSON.encode(params),
                        function (success, response, options) {
                            me.setLoading(false);
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    console.log('here');
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Copy thành công",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        },
                                    });
                                    console.log('here2');
                                    var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');
                                    PorderSewingCostStore.load();
                                }
                                else {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Copy thất bại",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        }
                                    });
                                }
                            }
                            else {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: "Copy thất bại",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng'
                                    }
                                });
                            }
                        })
                }else{
                    grid.setLoading(false);
                }
            }
        });
    },

    onXoa: function (grid, rowIndex, colIndex) {
        grid.setLoading('Đang xóa dữ liệu');
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('PorderSewingCostStore');

        var rec = grid.getStore().getAt(rowIndex);

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa công đoạn "' + rec.get('workingprocess_name') + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.id = rec.get('id');

                    GSmartApp.Ajax.post('/api/v1/pordersewingcost/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            grid.setLoading(false);
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Xóa thành công",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        },
                                        fn: function () {
                                            store.remove(rec);
                                        }
                                    });
                                }
                                else {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Xóa thất bại",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        }
                                    });
                                }
                            }
                            else {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: "Xóa thất bại",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng'
                                    }
                                });
                            }
                        })
                }else{
                    grid.setLoading(false);
                }
            }
        });
    },
    onbtnDeletePorderSewingCost: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');
        var selection = me.getSelectionModel().getSelection();
        // console.log(selection);
        if(selection.length == 0){
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn công đoạn",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
            return;
        }

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var idList = new Array();
                    for(var i = 0; i < selection.length; i++) {
                        idList.push(selection[i].get('id'));
                    }

                    me.setLoading(true);

                    var params = new Object();
                    params.idList = idList;

                    GSmartApp.Ajax.post('/api/v1/pordersewingcost/delete_multi', Ext.JSON.encode(params),
                        function (success, response, options) {
                            me.setLoading(false);
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Xóa thành công!",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        },
                                    });
                                    PorderSewingCostStore.load();
                                }
                                else {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Xóa thất bại!",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        }
                                    });
                                }
                            } else {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: "Xóa thất bại!",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng'
                                    }
                                });
                            }
                        })
                }
            }
        });
    },
    onEdit: function (editor, context, e) {
        var grid = this.getView();
        var me = this;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('PorderSewingCostStore');

        if (context.value == context.originalValue) {
            return;
        }

        grid.setLoading('Đang lưu dữ liệu');

        var params = new Object();
        params.data = context.record.data;

        GSmartApp.Ajax.post('/api/v1/pordersewingcost/update', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        store.commitChanges();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function () {
                                store.rejectChanges();
                            }
                        });
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Lưu thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        },
                        fn: function () {
                            store.rejectChanges();
                        }
                    });
                }
            })

    },
    onThemMoi: function () {
        var viewModel = this.getViewModel();
        var productid_link = viewModel.get('porder.productid_link');
        var porderid_link = viewModel.get('porder.id');
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Danh sách công đoạn',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 900,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'List_WorkingProcess_View',
                viewModel: {
                    data: {
                        sourceview: 'PorderSewingCost_View',
                        porderid_link: porderid_link,
                        working : {
                            productid_link: productid_link
                        }
                    }
                }
            }]
        });
        form.show();

        form.down('#List_WorkingProcess_View').on('CreateSewingCost', function (data) {
            var params = new Object();
            params.porderid_link = porderid_link;
            params.list_working = data;

            form.setLoading('Đang lưu dữ liệu');

            GSmartApp.Ajax.post('/api/v1/pordersewingcost/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    form.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: "Lưu thành công",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                },
                                fn: function () {
                                    form.close();
                                    var store = viewModel.getStore('PorderSewingCostStore');
                                    store.load();
                                }
                            });
                        }
                        else {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: "Lưu thất bại",
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
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                })
        })

        form.down('#List_WorkingProcess_View').getController().on('reloadStore', function () {
            var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');
            PorderSewingCostStore.load();
        })
    },
    onBtnPorderBalance: function(){
        var viewModel = this.getViewModel();
        var porderid_link = viewModel.get('IdPOrder');
        // console.log('porderid_link : ' + porderid_link);
        var form = Ext.create('Ext.window.Window', {
            height: '90%',
            width: '95%',
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Cân bằng lệnh',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'POrderBalance',
                viewModel: {
                    type: 'POrderBalanceViewModel',
                    data: {
                        porderid_link: porderid_link,
                    }
                }
            }],
            listeners: {
                destroy: {
                    fn: function(){ 
                        var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');
                        if(PorderSewingCostStore) PorderSewingCostStore.load();
                    }
                },
            }
        });
        form.show();
    },
    onbtnUploadTmpFile: function(){
        var viewModel = this.getViewModel();
        var m = this;
        var me = this.getView();
        me.down('#fileUpload').fileInputEl.dom.click();
    },
    onSelectFileUpload: function (filefield, value) {
        var grid = this.getView();
        var viewModel = this.getViewModel();
        var porderid_link = viewModel.get('IdPOrder');

        var data = new FormData();
        data.append('file', filefield.fileInputEl.dom.files[0]);
        data.append('porderid_link', porderid_link);
        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/pordersewingcost/upload_porders_sewingcost', data, 3 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                filefield.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Upload Thành Công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                        //load lai ds
                        var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');
                        PorderSewingCostStore.load();
                    }
                    else {
                        // console.log('fail 1');
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                }else{
                    // console.log('fail 2');
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Upload thất bại. Xin kiểm tra lại kết nối mạng',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
       
    },
    onbtnDownloadTmpFile: function(){
        var me = this;
        var params = new Object();
        GSmartApp.Ajax.post('/api/v1/pordersewingcost/download_temp_pordersewingcost', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_PorderSewingCost.xlsx", response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lấy thông tin thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    saveByteArray: function (reportName, byte) {
        var me = this;
        byte = this.base64ToArrayBuffer(byte);

        var blob = new Blob([byte], { type: "application/xlsx" });
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
});