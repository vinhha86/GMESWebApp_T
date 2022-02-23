Ext.define('GSmartApp.view.salary.Salary_Sum_Porder_Add_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Salary_Sum_Porder_Add_Controller',
    init:function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrder_Grant');
        store.loadProcessingByOrgId(viewmodel.get('orgid_link'));
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnXacNhan' : {
            click: 'onAccept'
        },
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onAccept: function(grid, rowIndex, colIndex) {
        var viewmodel = this.getViewModel();
        var myview = this.getView();
        var me = this;

        var params = new Object();
        params.orgid_link = viewmodel.get('orgid_link');
        params.year = viewmodel.get('year');
        params.month = viewmodel.get('month');

        var obj = [];
        var select = myview.getSelectionModel().getSelection();
        for (var i = 0; i < select.length; i++) {
            var data = select[i].data;
            obj.push(data.id);
        }

        params.listId = obj;

        GSmartApp.Ajax.post('/api/v1/salarysum_porders/create', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    me.fireEvent('AcceptSuccess');
                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})