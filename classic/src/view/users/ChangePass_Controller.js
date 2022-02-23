Ext.define('GSmartApp.view.users.ChangePass_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChangePass_Controller',
	init: function() {
		
    },
    control: {
        '#btnThoat' : {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onUpdate'
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onUpdate: function(){
        var grid = this.getView();
        var viewmodel = this.getViewModel();

        var params = new Object();
        params.new_pass = viewmodel.get('new_pass');
        params.old_pass = viewmodel.get('old_pass');

        GSmartApp.Ajax.post('/api/v1/users/updatepass', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Cập nhật thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function(){
                                grid.fireEvent('Success');
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