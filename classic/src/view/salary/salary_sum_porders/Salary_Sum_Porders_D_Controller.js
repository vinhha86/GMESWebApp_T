Ext.define('GSmartApp.view.salary.Salary_Sum_Porders_D_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Salary_Sum_Porders_D_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
        viewmodel.set('year',Ext.Date.format(new Date(), 'Y'));
    },
    control: {
        '#tabmain': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {

    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    } ,
    onAdd_Porder: function(){
        var me = this;
        var viewmodel = this.getViewModel();
        // console.log(viewmodel.get('month') + "/" + viewmodel.get('year'));
        // console.log(viewmodel.get('selected_orgid'));
        if (null == viewmodel.get('month')){
            Ext.MessageBox.show({
                title: "Bảng lương",
                msg: 'Tháng tính lương không được để trắng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        if (null == viewmodel.get('year')){
            Ext.MessageBox.show({
                title: "Bảng lương",
                msg: 'Năm tính lương không được để trắng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        if (null == viewmodel.get('selected_orgid')){
            Ext.MessageBox.show({
                title: "Bảng lương",
                msg: 'Phải chọn đơn vị trước khi tính lương',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        //Pop-up danh sach lenh da duoc phan cho don vi chuyen
        var viewmodel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            height: 500,
            closable: true,
            title: 'Thêm lệnh sản xuất',
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
                xtype: 'Salary_Sum_Porder_Add',
                viewModel: {
                    data: {
                        orgid_link: viewmodel.get('selected_orgid'),
                        year: viewmodel.get('year'),
                        month: viewmodel.get('month')
                    }
                }
            }]
        });
        form.show();

        form.down('#Salary_Sum_Porder_Add').getController().on('AcceptSuccess', function () {
            me.onReload_Porder();
            form.close();
        })
    },
    onReload_Porder: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        if (null == viewmodel.get('month')){
            Ext.MessageBox.show({
                title: "Bảng lương",
                msg: 'Tháng tính lương không được để trắng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        if (null == viewmodel.get('year')){
            Ext.MessageBox.show({
                title: "Bảng lương",
                msg: 'Năm tính lương không được để trắng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        if (null == viewmodel.get('selected_orgid')){
            Ext.MessageBox.show({
                title: "Bảng lương",
                msg: 'Phải chọn đơn vị trước khi tính lương',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }        
        var SalarySumPOrdersStore = viewmodel.get('SalarySumPOrdersStore');
        SalarySumPOrdersStore.removeAll();
        me.setLoading("Đang tải dữ liệu...");
        SalarySumPOrdersStore.loadStore(viewmodel.get('selected_orgid'),viewmodel.get('year'),viewmodel.get('month'),me);     
    },
    onDelete_Porder: function(grid, rowIndex, colIndex){
        var me = this.getView();
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa lệnh sản xuất?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa dữ liệu");
                    var params = new Object();
                    params.id = id;

                    GSmartApp.Ajax.post('/api/v1/salarysum_porders/delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        me.setLoading(false);
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            grid.getStore().reload();
                        } else {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: response.message,
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
    onConfirm_POrderList:function(){
        
    }
})