Ext.define('GSmartApp.util.Common', {
    singleton: true,
    alternateClassName: [
        'common'
    ],
    Check_Object_Permission: function () {
        var data = GSmartApp.util.State.get('session');
        var list_function = data.list_function;

        for (var i = 0; i < list_function.length; i++) {
            var func = list_function[i];
            var a = '#' + func.function_id_item;
            var item = Ext.first(a);
            // var item = me.lookupReference(func.function_id_item);
            // if (a == '#PContract_PO_Main'){
            //     console.log(a);
            //     console.log(item);
            //     console.log(func.isreadonly);
            //     if(null!=item){
            //         item.setDisabled(func.isreadonly);
            //         item.setHidden(func.isreadonly);
            //     }
            //     console.log(item);
            // }
            if (null != item) {
                if (a == '#PContract_PO_Main') {
                    item.setDisabled(func.isreadonly);
                    if (func.isreadonly && !item.getHidden()) item.setHidden(true);
                } else {
                    item.setDisabled(func.isreadonly);
                    // if (item.itemId == "colSoLuongDon_ChiTietPO") {
                    //     console.log(func);
                    //     console.log(item);
                    // }
                    if (func.isreadonly && !item.getHidden()) {

                        item.setHidden(true);
                    }
                }
            }
        }
    },
    Check_Menu_Permission: function (me) {
        var data = GSmartApp.util.State.get('session');
        var list_function = data.list_function;

        for (var i = 0; i < list_function.length; i++) {
            var func = list_function[i];
            var item = me.queryById(func.function_id_item);

            if (item != null) {
                item.setDisabled(func.isreadonly);
            }
        }
    },
    Check_ActionColum_Permission: function (itemref) {
        var data = GSmartApp.util.State.get('session');
        var list_function = data.list_function;

        for (var i = 0; i < list_function.length; i++) {
            var func = list_function[i];
            if (func.function_id_item == itemref) {
                return func.isreadonly;
            }
        }
    },
    getFormatDate: function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        return day + "/" + month + "/" + year;
    }
})