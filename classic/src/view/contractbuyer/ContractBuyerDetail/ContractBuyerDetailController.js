Ext.define('GSmartApp.view.contractbuyer.ContractBuyerDetail.ContractBuyerDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ContractBuyerDetailController',
    Id: 0,
    init: function () {
        var me = this.getView();
        var viewModel = me.getViewModel();
        // var EndBuyer = viewModel.getStore('EndBuyer');
        var Vendor = viewModel.getStore('Vendor');
        // EndBuyer.loadStore(12);
        // EndBuyer.sort('code','ASC');
        Vendor.loadStore(11);
        Vendor.sort('code', 'ASC');
        var contract_date = this.lookupReference('contract_date');
        contract_date.getPicker().monthYearFormat = 'm-Y';
        var contract_date_finish = this.lookupReference('contract_date_finish');
        contract_date_finish.getPicker().monthYearFormat = 'm-Y';

        common.Check_Object_Permission();
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData'
            }
        }
    },
    control: {
        '#btnQuayLai': {
            click: 'onQuayLai'
        },
        '#btnLuu': {
            click: 'Luu'
        },
        '#btnLuuVaTaoMoi': {
            click: 'Luu'
        },
        '#btnThemMoiBuyer': {
            click: 'ThemMoiBuyer'
        },
        '#btnUrl_Contract': {
            click: 'onForward'
        },
        '#btnUpload': {
            click: 'onUpload'
        },
        '#fileUpload_Contract': {
            change: 'onSelect'
        },
        '#btnDownload_Contract': {
            click: 'onDownload'
        }
    },
    onDownload: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.id = viewmodel.get('currentRec.id');
        GSmartApp.Ajax.post('/api/v1/contractbuyer/download_file', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray(viewmodel.get('currentRec.file_contract_name'), response.data);
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
    onSelect: function (m, value) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('id', viewmodel.get('currentRec.id'));

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/contractbuyer/upload_file', data, 3 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: "Thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function () {
                                viewmodel.set('currentRec.file_contract_name', response.filename);
                            }
                        });
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: "Thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                }
            })
    },
    onUpload: function () {
        var me = this.getView();
        me.down('#fileUpload').fileInputEl.dom.click();
    },
    onForward: function () {
        var viewmodel = this.getViewModel();
        console.log(viewmodel.get('currentRec.url'))
        var win = window.open(viewmodel.get('currentRec.url'));
        win.focus();
    },
    onLuu: function (thisBtn) {
        var viewMain = Ext.getCmp('ContractBuyer');
        var m = this;
        var me = this.getView();
        // me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        data.id = this.Id;

        var contractBuyerDs = data.contractBuyerDs;
        for (var i = 0; i < contractBuyerDs.length; i++) {
            contractBuyerDs[i].id = 0;
        }

        params.data = data;
        params.msgtype = "CONTRACTBUYER_CREATE";
        params.message = "Tạo contract buyer";

        GSmartApp.Ajax.post('/api/v1/contractbuyer/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        if (response.message == 'Lưu thành công') {
                            if (data.id == 0) {
                                if (viewMain)
                                    viewMain.getStore().load();
                            }
                            if (thisBtn.itemId == 'btnLuu')
                                me.Id = response.id;
                            if (thisBtn.itemId == 'btnLuuVaTaoMoi')
                                me.Id = 0;
                            m.redirectTo("lscontractbuyer/" + me.Id + "/edit");
                        } else {
                            // contract_code đã tồn tại
                            me.down('#contract_code').focus();
                        }
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
                        me.down('#code').focus();
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    Luu: function (thisBtn) {
        var m = this;
        var viewModel = this.getViewModel();
        var contract_year = viewModel.get('currentRec.contract_year');
        var contract_date = viewModel.get('currentRec.contract_date');
        var contract_date_finish = viewModel.get('currentRec.contract_date_finish');

        if (contract_year < 2000 || contract_year > 2100) {
            Ext.Msg.show({
                title: 'Lưu thất bại',
                msg: 'Năm hợp đồng không hợp lệ',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        if (contract_date == null) {
            contract_date = new Date(contract_year, 0, 1); // var d = new Date(2018, 11, 24);
            viewModel.set('currentRec.contract_date', contract_date);
        }
        if (contract_date_finish == null) {
            contract_date_finish = new Date(contract_year, 11, 31); // var d = new Date(2018, 11, 24);
            viewModel.set('currentRec.contract_date_finish', contract_date_finish);
        }

        m.onLuu(thisBtn);
    },
    onQuayLai: function () {
        this.redirectTo('lscontractbuyer');
    },
    onLoadData: function (id, type) {
        var me = this;
        var viewMain = Ext.getCmp('ContractBuyer');
        var viewModel = me.getViewModel();
        viewModel.set('id', id);
        if (id == 0) {
            viewModel.set('currentRec', new Object());
            viewModel.set('currentRec.contractBuyerDs', new Array());
            me.getView().getForm().reset();
        }
        else {
            if (viewMain) {
                var data = viewMain.getStore().getById(id).data;
                viewModel.set('currentRec', data);
                viewModel.set('contract_code', data.contract_code);
            }
            else {
                me.loadInfo(id, viewModel);
            }
        }

        me.Id = id;
    },
    loadInfo: function (id, viewModel) {
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/contractbuyer/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;
                    viewModel.set('currentRec', data);
                    viewModel.set('contract_code', data.contract_code);

                    var contract_date = viewModel.get('currentRec.contract_date');
                    var contract_date_finish = viewModel.get('currentRec.contract_date_finish');
                    var d = Ext.Date.parse(contract_date, 'c');
                    var d_finish = Ext.Date.parse(contract_date_finish, 'c');
                    if (null == d) d = new Date(contract_date);
                    if (null == d_finish) d_finish = new Date(contract_date_finish);
                    viewModel.set('currentRec.contract_date', d);
                    viewModel.set('currentRec.contract_date_finish', d_finish);
                }
            })
    },
    onContractYearFocusLeave: function (textfield, event, eOpts) {
        var me = this;
        var viewMain = Ext.getCmp('ContractBuyer');
        var viewModel = me.getViewModel();
        // console.log(textfield.getValue());
        var contract_year = textfield.getValue();
        var contract_date = viewModel.get('currentRec.contract_date');
        var contract_date_finish = viewModel.get('currentRec.contract_date_finish');
        if (contract_year < 2000 || contract_year > 2100) {
            textfield.setValue(new Date().getFullYear());
            contract_year = new Date().getFullYear();
        }
        if (contract_date == null) {
            contract_date = new Date(contract_year, 0, 1); // var d = new Date(2018, 11, 24);
            viewModel.set('currentRec.contract_date', contract_date);
        }
        if (contract_date_finish == null) {
            contract_date_finish = new Date(contract_year, 11, 31); // var d = new Date(2018, 11, 24);
            viewModel.set('currentRec.contract_date_finish', contract_date_finish);
        }
    },
    ThemMoiBuyer: function () {
        var viewModel = this.getViewModel();
        var me = this.getView();
        var m = this;

        var contractBuyerDs = viewModel.get('currentRec.contractBuyerDs');

        var form = Ext.create('Ext.window.Window', {
            height: 500,
            width: 400,
            closable: true,
            title: 'Danh sách Buyer',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'ContractBuyerDetail_BuyerList',
                viewModel: {
                    type: 'ContractBuyerDetail_BuyerListViewModel',
                    data: {
                        contractBuyerDs: contractBuyerDs
                    }
                }
            }]
        });
        form.show();

        form.down('#ContractBuyerDetail_BuyerList').getController().on('AddBuyer', function (select) {

            // console.log(contractBuyerDs);
            // console.log('---')
            // console.log(select);
            for (var i = 0; i < select.length; i++) {
                var newContractBuyerD = new Object({
                    id: null,
                    buyerCode: select[i].data.code,
                    buyerName: select[i].data.name,
                    buyerid_link: select[i].data.id,
                    contractbuyerid_link: null
                })
                contractBuyerDs.push(newContractBuyerD);
            }
            // console.log('---')
            // console.log(contractBuyerDs);

            var ContractBuyerListBuyerGrid = m.lookupReference('ContractBuyerListBuyerGrid');
            ContractBuyerListBuyerGrid.getStore().setData(contractBuyerDs);
        })
    },
    onXoaBuyer: function (grid, rowIndex, colIndex) {

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa Buyer ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {

                } else {
                    return;
                }
            }
        });

        var rec = grid.getStore().getAt(rowIndex);
        // console.log(rec);
        // grid.getStore().remove(rec);

        var viewModel = this.getViewModel();
        var contractBuyerDs = viewModel.get('currentRec.contractBuyerDs');
        // console.log(contractBuyerDs);
        for (var i = contractBuyerDs.length - 1; i >= 0; i--) {
            if (contractBuyerDs[i].buyerid_link == rec.data.buyerid_link) {
                contractBuyerDs.splice(i, 1);
                break;
            }
        }

        var ContractBuyerListBuyerGrid = this.lookupReference('ContractBuyerListBuyerGrid');
        ContractBuyerListBuyerGrid.getStore().setData(contractBuyerDs);
        // console.log(contractBuyerDs);
    }
})