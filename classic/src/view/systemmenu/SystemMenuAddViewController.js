Ext.define('GSmartApp.view.systemmenu.SystemMenuAddViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SystemMenuAddViewController',
    init: function () {
    },
   control: {
       '#exit':{
           click:'onExit'
       },
        "#onThemMoi":{
            click: 'ThemMoi'
        }
    },
    onExit: function () {
        this.getView().up('window').close();
    },
    ThemMoi:function(){
        var viewmodel = this.getViewModel();
        var Menu = new Object();
        var params = new Object();
        Menu.text_vi = viewmodel.get('Menu.text_vi');
        Menu.id = viewmodel.get('Menu.id');
        Menu.xtype = viewmodel.get('Menu.xtype');
        Menu.icon = viewmodel.get('Menu.icon');
        Menu.parent_id=viewmodel.get('Menu.parent_id') ;

        params.data = Menu;
        console.log(Menu);
        GSmartApp.Ajax.post('/api/v1/menu/add', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response=Ext.decode(response.responseText);
                    if (response.respcode == 200){
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Thêm thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                        });
                   
                        //load 
                        var store = viewmodel.getStore('MenuStore');
                        store.loadStore_byrole(0);
                    }else{
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
        
    }
})