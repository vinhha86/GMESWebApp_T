Ext.define('GSmartApp.view.NCCprint.NCCprintViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.NCCprintViewController',
    init: function () {
        this.onloadPage();
        
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnThemMoi2': {
            click: 'onThemMoi2'
        },
        '#delete': {
            click: 'onXoa'
        },
        '#edit': {
            click: 'onCapNhat'
        },
        '#splbtn_Upload': {
            click: 'onUpload'
        },
        '#splbtn_Download': {
            click: 'onDownload_Template'
        },
        '#fileUpload': {
            change: 'onSelect'
        },
        // '#clsName': {
        //     dblclick: 'onChangeClsName'
        // }
        // '#lsintheuView': {
        //     activate: 'onActivate',
        // itemdblclick: 'onCapNhatdbl'
        // }
    },
    onActivate: function () {
        var me = this;
        if (me.isActivate) {
            this.onloadPage();
        }
        me.isActivate = true;
        // var viewmodel = this.getViewModel();
        // var store = viewmodel.getStore('PortStore');
        // store.loadStore();
    },

 
    // NEW Version
    CapNhat: function (params) {
        // console.log('CapNhat OK');
        var viewMain = Ext.getCmp('NCCprintView');
        console.log(params);
        let me = this.getView();
        GSmartApp.Ajax.post('/api/v1/orgmenu/createOrg', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let store = me.getViewModel().getStore('OrgStore');
                    let storeColor =me.getViewModel().getStore('ColorStore');
                    // if (params.data.id == 0 || params.data.id == null) {                        
                    //     me.down('#txtName').reset();
                    //     me.down('#txtCode').reset();
                    //     me.down('#txtCode').focus();
                    // }
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        store.GetOrgByTypeId(20);
                        store.sort('name', 'ASC');
                        storeColor.loadStore();
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                        });

                    }
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Lưu thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
     },

     onThemMoi2:function(m, record, item, index, e, eOpts){
        var m= this;
        var me = this.getView();
        console.log(record);
        var form = Ext.create('Ext.window.Window', {
            height: 500,
            closable: true,
            resizable: false,
            title: 'Thêm mới 2',
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 500,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'InTheuDetailWindowView',
                // IdProduct: me.IdProduct
            }]
            
        });
        form.show();
        form.down('#lsintheuWindow').getController().on('Add', function(){
            var viewmodel = m.getViewModel();
            var store = viewmodel.getStore('OrgStore');
          var storeColor = viewmodel.getStore('ColorStore');
        storeColor.loadStore();
        store.GetOrgByTypeId(20);
        store.sort('name', 'ASC');

            form.close();
        })
    },
  

    onRowClick:function(row, record, element, rowIndex, e, eOpts){
        console.log(record); 
        let viewModel = this.getViewModel();
        viewModel.set('currentRec',record.data);
        viewModel.set('oldName',record.data.name);
        viewModel.set('newName',record.data.name);
        viewModel.set('oldCode',record.data.code);
        viewModel.set('newCode',record.data.code);
        viewModel.set('oldCity',record.data.city);
        viewModel.set('newCity',record.data.city);
        viewModel.set('oldAddress',record.data.address);
        viewModel.set('newAddress',record.data.address);
        viewModel.set('oldCtperson',record.data.contactperson);
        viewModel.set('newCtperson',record.data.contactperson);
        viewModel.set('oldEmail',record.data.email);
        viewModel.set('newEmail',record.data.email);
        viewModel.set('oldPhone',record.data.phone);
        viewModel.set('newPhone',record.data.phone);
        viewModel.set('newColorIdlink',record.data.colorid_link);
        viewModel.set('oldColorIdlink',record.data.colorid_link);
    },
    
    onFocusLeaveClsName:function(textField, event, eOpts){
        console.log('Oke change');
       
        let me = this.getView();
        let viewModel = this.getViewModel();
        let data = new Object();
        data = viewModel.get('currentRec');
        // data.colorid_link = newColorIdlink;
        let params = new Object();
        params.data = data;

        me.setLoading("Đang lưu dữ liệu");
        this.CapNhat(params);
        console.log('Hoan thanh');
    },
  

    onEdit: function (editor, context, e) {
        var me = this;
        var params = new Object();

        params.data = context.record.data;
        console.log(context.record.data);

        //kiểm tra nếu dữ liệu khác lúc ban đầu thì thêm
        if (context.value != context.originalValue) {
            me.CapNhat(params);
        }
    },


    onDownload_Template: function () {
        var me = this;
        var params = new Object();
        GSmartApp.Ajax.post('/api/v1/report/download_temp_test', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    console.log(response);
                    if (response.respcode == 200) {
                        me.saveByteArray("Danhsach_Test.xlsx", response.data);
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
    onUpload: function () {
        var viewmodel = this.getViewModel();
        var me = this.getView();
        // var donvi = viewmodel.get('donvi.id');
            me.down('#fileUpload').fileInputEl.dom.click();
    },
    onSelect: function (m, value) {
        var grid = this.getView();
        var viewModel = this.getViewModel();

        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        // data.append('orgmanageid_link', viewmodel.get('donvi.id'));
        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/upload_personnel/test', data, 3 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
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
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                    //load lai ds
                    var store = viewModel.getStore('OrgStore');
                    store.GetOrgByTypeId(20);
                }
            })

    },  

//////////////////////////////////////////////////////
    onThemMoi: function (m, record) {
        var me = this.getView();
        var Id = 0;

        this.redirectTo("lsintheu/create");
    },
    onCapNhatdbl: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("lsintheu/" + id + "/edit");
        console.log("dbclk here");
    },
    onCapNhat: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("lsintheu/" + id + "/edit");
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('name');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa vendor "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Delete(id, rec);
                }
            }
        });
    },
    Delete: function (id, rec) {
        var me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        var params = new Object();
        params.id = id;
        console.log(params);

        GSmartApp.Ajax.post('/api/v1/orgmenu/deleteById', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Xóa thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });

                    var store = me.getStore();
                    store.remove(rec);
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xóa thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
     },
     onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('OrgStore');
        var storeColor = viewmodel.getStore('ColorStore');
        console.log(storeColor.data.map);
        storeColor.loadStore();
        store.GetOrgByTypeId(20);
        store.sort('name', 'ASC');
    },
    onNCCprintCodeFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('NCCprintCodeFilter'),
            filters = this.getView().store.getFilters();
            console.log(filters);

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onNCCprintNameFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('NCCprintNameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id: 'nameFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
            console.log(this.nameFilter);
        }
        else if (this.nameFilter) {
            console.log(this.nameFilter);
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    }
})