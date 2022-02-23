Ext.define('GSmartApp.view.documentguide.Document_Cotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Document_Cotroller',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('DocumentGuideStore');
        store.loadByType(0);
    },
    control: {
        '#btnAddGuide' : {
            click: 'onThemMoi'
        },
        '#btnAdd_Tech' : {
            click: 'onThemMoi'
        },
        '#btnFile': {
            change: 'onUpload'
        },
        '#Document_Main': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) { console.log(newCard);
        var viewmodel = this.getViewModel();
        var fromStore = viewmodel.getStore('DocumentGuideStore');
        if (newCard.xtype == "DocumentGuideView") {
            viewmodel.set('doctype', 0);
            fromStore.loadByType(0);
        }
        if (newCard.xtype == "DocumentTechView") {
            viewmodel.set('doctype', 1);
            fromStore.loadByType(1);
        }
    },
    onThemMoi: function () {
        var me = this.getView();
        me.down('#btnFile').fileInputEl.dom.click();
    },
    onUpload: function (m, newFileName, oldFileName) {
        var me = this.getView();
        var th = this;

        var viewmodel = this.getViewModel();
        var params = new Object();
		var doctype = viewmodel.get('doctype');
        if (doctype == 0){
            for(var i=0; i<m.fileInputEl.dom.files.length;i++){
                var data = new FormData();
                data.append('file', m.fileInputEl.dom.files[i]);;
        
                GSmartApp.Ajax.postUpload('/api/v1/documentguide/create', data, 
                    function (success, response, options) {
                        m.reset();
                        if (success) {
                            // var response = Ext.decode(response.responseText);
                            viewmodel.getStore('DocumentGuideStore').load();
                        }
                    })
            }
        } else if (doctype == 1){
            for(var i=0; i<m.fileInputEl.dom.files.length;i++){
                var data = new FormData();
                data.append('file', m.fileInputEl.dom.files[i]);;
        
                GSmartApp.Ajax.postUpload('/api/v1/documentguide/create_tech', data, 
                    function (success, response, options) {
                        m.reset();
                        if (success) {
                            // var response = Ext.decode(response.responseText);
                            viewmodel.getStore('DocumentGuideStore').load();
                        }
                    })
            }
        }
        
    },
    onDownload: function (grid, rowIndex, colIndex) {
        var me = this;
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);

        var params = new Object();
        params.id = rec.data.id;

        GSmartApp.Ajax.post('/api/v1/documentguide/download', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray(rec.get('filename'), response.data);
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
    },
    saveByteArray: function (reportName, byte) {
        var me = this;
        byte = me.base64ToArrayBuffer(byte);
        
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
                    params.filename = filename;
                    params.id = data.get('id');

                    GSmartApp.Ajax.post('/api/v1/documentguide/delete', Ext.JSON.encode(params),
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
        console.log(data);
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/documentguide/update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('DocumentGuideStore');
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