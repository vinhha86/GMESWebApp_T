Ext.define('GSmartApp.view.personel.Personnel_ListView_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_ListView_Controller',
    init: function (view) {
        var viewmodel = this.getViewModel();
        var storeLoaiNV = viewmodel.getStore('PersonnelTypeStore');
        storeLoaiNV.loadStore();
        viewmodel.set('personnel.status',0);
    },
    control: {
        '#btnThemMoi_Personnel': {
            click: 'onThemMoi'
        },
        '#Personnel_ListView': {
            itemdblclick: 'onitemdblclick'
        },
        '#btnPrint_Personnel': {
            click: 'onPrint'
        },
        '#fileUpload': {
            change: 'onSelect'
        },
        '#splbtn_Upload': {
            click: 'onUpload'
        },
        '#splbtn_ThemCa': {
            click: 'onThemCaLamViec'
        },
        '#splbtn_Download': {
            click: 'onDownload_Template'
        },
        '#cmbLoaiNV': {
            select: 'onSelectLoaiNV'
        },
        '#cmbTinhTrang':{
            select:'onSelectTangThai'
        }
    },
    onSelectTangThai:function(){
        var viewmodel = this.getViewModel();
        var personel_typeid_link = viewmodel.get('personnel.personnel_typeid_link');
        var orgid_link = viewmodel.get('donvi.id');
        var status= viewmodel.get('personnel.status');
        var StorePersonel = viewmodel.getStore('Personnel_Store');
        console.log(status);
        StorePersonel.loadStore_byOrg(orgid_link, personel_typeid_link,status);
    },
    onTrangThaiTriggerClick:function(){
        var viewmodel = this.getViewModel();
        viewmodel.set('personnel.status', null);
        var orgid_link = viewmodel.get('donvi.id');
        var personel_typeid_link = viewmodel.get('personnel.personnel_typeid_link');
        var StorePersonel = viewmodel.getStore('Personnel_Store');
        StorePersonel.loadStore_byOrg(orgid_link, personel_typeid_link,3);
    },
    onLoaiNVTriggerClick: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('personnel.personnel_typeid_link', 0);
        var orgid_link = viewmodel.get('donvi.id');
        var status= viewmodel.get('personnel.status');
        var StorePersonel = viewmodel.getStore('Personnel_Store');
        StorePersonel.loadStore_byOrg(orgid_link, 0,status);
    },
    onSelectLoaiNV: function (cmb, rec, e) {
        var viewmodel = this.getViewModel();
        var personel_typeid_link = viewmodel.get('personnel.personnel_typeid_link');
        var orgid_link = viewmodel.get('donvi.id');
        var status= viewmodel.get('personnel.status');
        var StorePersonel = viewmodel.getStore('Personnel_Store');
        StorePersonel.loadStore_byOrg(orgid_link, personel_typeid_link,status);
    },
    onDownload_Template: function () {
        var me = this;
        var params = new Object();
        GSmartApp.Ajax.post('/api/v1/report/download_temp_personnel', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_DSNhanVien.xlsx", response.data);
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
    onPositionFilter: function (cmb, rec, e) {
        var viewModel = this.getViewModel();
        var filterValue = rec.get('id');
        console.log(filterValue);
        var store = viewModel.getStore('Personnel_Store');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.orgPosition = filters.add({
                id: 'orgPosition',
                property: 'positionid_link',
                value: filterValue,
                exactMatch: true,
            });
        }
        else if (this.orgPosition) {
            filters.remove(this.orgPosition);
            this.orgPosition = null;
        }
    },
    onPositionTriggerClick: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('Personnel_Store');
        var filters = store.getFilters();
        if (this.orgPosition != null)
            filters.remove(this.orgPosition);
        this.orgPosition = null;
        viewModel.set('positionid_link', 0);
    },
    onFilterOrgnameFilter: function () {
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('orgnameComboValue');
        console.log(filterValue);
        var store = viewModel.getStore('Personnel_Store');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.orgFilter = filters.add({
                id: 'orgFilter',
                property: 'orgid_link',
                value: filterValue,
                exactMatch: true,
            });
        }
        else if (this.orgFilter) {
            filters.remove(this.orgFilter);
            this.orgFilter = null;
        }
    },
    onOrgNameComboValueTriggerClick: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('orgnameComboValue', null);
        this.onFilterOrgnameFilter();
    },
    onThemCaLamViec: function () {
        var viewModel = this.getViewModel();
        var orgid_link = viewModel.get('donvi.id');
        console.log(orgid_link);
        var me = this;
        var select = this.getView().getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: "Bạn chưa chọn nhân viên!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
            return;
        }
        var form = Ext.create('Ext.window.Window', {
            hieght: 250,
            width: 300,
            closable: true,
            resizeable: false,
            modal: true,
            border: false,
            title: 'Chọn ca làm việc mặc định',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit',
                padding: 5
            },
            items: [
                {
                    xtype: 'ShiftAddView',
                    viewModel: {

                        data: {
                            select: select,
                            orgid_link: orgid_link
                        }
                    }
                }
            ]
        })
        form.show();
        form.down('#ShiftAddView').on('Thanhcong', function () {
            form.close();
            //load lai trang
            me.onload();
        })
    },

    onload: function () {
        var viewmodel = this.getViewModel();
        var personel_typeid_link = viewmodel.get('personnel.personnel_typeid_link');
        var orgid_link = viewmodel.get('donvi.id');
        var status= viewmodel.get('personnel.status');
        var StorePersonel = viewmodel.getStore('Personnel_Store');
        StorePersonel.loadStore_byOrg(orgid_link, personel_typeid_link,status);
    },
    onUpload: function () {
        var viewmodel = this.getViewModel();
        var me = this.getView();
        var donvi = viewmodel.get('donvi.id');
        if (!donvi) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: "Bạn chưa chọn đơn vị!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
            return;
        } else {
            me.down('#fileUpload').fileInputEl.dom.click();
        }
    },
    onSelect: function (m, value) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();

        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('orgmanageid_link', viewmodel.get('donvi.id'));
        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/upload_personnel/personnel', data, 3 * 60 * 1000,
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
                    var store = viewmodel.getStore('Personnel_Store');
                    store.load();
                }
            })

    },

    onPrint: function () {
        var grid = this.getView();
        var viewmodel = this.getViewModel();

        var select = grid.getSelectionModel().getSelection();
        if (select.length > 0)
            GSmartApp.ux.grid.print_test.print(select);
    },
    onThemMoi: function () {
        var viewModel = this.getViewModel();
        var data = new Object();
        data.id = null;

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm mới nhân viên',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .85,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Personnel_info_main',
                viewModel: {
                    data: {
                        personnel: data
                    }
                }
            }]
        });
        form.show();
        form.down('#code').focus();

        form.down('Personnel_info_main').getController().on('Thoat', function () {
            var store = viewModel.getStore('Personnel_Store');
            store.load();
            form.close();
        });
    },
    onEdit: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.showEditForm(rec);
    },
    onitemdblclick: function (m, record, item, index, e, eOpts) {
        console.log(record);
        this.showEditForm(record);
    },
    showEditForm: function (rec) {
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Cập nhật nhân viên',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .85,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Personnel_info_main',
                viewModel: {
                    data: {
                        personnel: rec.data
                    }
                }
            }]
        });
        form.show();
        form.down('#code').focus();

        form.down('Personnel_info_main').getController().on('Thoat', function () {
            var store = viewModel.getStore('Personnel_Store');
            store.load();
            form.close();
        });
    },

    onpersonnel_name: function () {
        var filterField = this.lookupReference('personnel_name');
        filters = this.getView().store.getFilters();
        if (filterField.value) {
            this.nameFilter = filters.add({
                id: 'nameFilter',
                property: 'fullname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        } else {
            if (this.nameFilter) {
                filters.remove(this.nameFilter);
                this.nameFilter = null;
            }
        }
    },

    onpersonnel_code: function () {
        var filterField = this.lookupReference('personnel_code');
        filters = this.getView().store.getFilters();
        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        } else {
            if (this.codeFilter) {
                filters.remove(this.codeFilter);
                this.codeFilter = null;
            }
        }
    },
    onpersonnel_cmt: function () {
        var filterField = this.lookupReference('personnel_cmt');
        filters = this.getView().store.getFilters();
        if (filterField.value) {
            this.idnumber = filters.add({
                id: 'idnumber',
                property: 'idnumber',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        } else {
            if (this.idnumber) {
                filters.remove(this.idnumber);
                this.idnumber = null;
            }
        }
    },
    onpersonnel_shiftName: function () {
        var filterField = this.lookupReference('personnel_shiftName');
        filters = this.getView().store.getFilters();
        if (filterField.value) {
            this.shiftName = filters.add({
                id: 'shiftName',
                property: 'shiftName',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        } else {
            if (this.shiftName) {
                filters.remove(this.shiftName);
                this.shiftName = null;
            }
        }
    }

})