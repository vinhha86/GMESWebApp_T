Ext.define('GSmartApp.view.TaskBoard.AddTask_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AddTask_ViewController',
    control: {
        '#btnThoat' : {
            click: 'onThoat'
        },
        '#btnLuu' : {
            click: 'onLuu'
        }
    },
    init: function(){
        
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onLuu: function(){
        var form = this.getView();
        var viewmodel = this.getViewModel();

        var params = new Object();
            params.text = viewmodel.get('text');

            GSmartApp.Ajax.post('/api/v1/task/add_othertask', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function(){
                                
                                form.fireEvent('Addtask', response.data);
                            }
                        });
                    }
                    else{
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                }
            })
    }
})