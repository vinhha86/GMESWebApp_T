Ext.define('GSmartApp.view.systemmenu.SystemMenuViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SystemMenuViewController',
    init: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('MenuStore');
        store.loadStore_byrole(0);
    },
    control: {
        "#onThemMoi":{
            click: 'ThemMoi'
        },
    },
    ThemMoi:function(){
        var select = this.getView().getSelectionModel().getSelection();
        var id ;
        if(select.length == 0){
         id =null;
         text_vi=null;
        }else{
            id=select[0].data.id;
            text_vi=select[0].data.text_vi;
        }
        console.log(id);
        console.log(text_vi);
        var form = Ext.create('Ext.window.Window',{
            height:300,
            width:300,
            closable:true,
            resizable:false,
            modal: true,
            border: false,
            title:'Thêm mới chức năng',
            closeAction:'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items:[
                {
                    xtype:'SystemMenuAddView',
                    viewModel: {
                        data:{
                            Menu:{
                                parent_id:id,
                                text:text_vi
                                }
                        }
                    }
                }
            ]
        });
        form.show();
    }
})