
Ext.define("GSmartApp.override.ptype_number", {
    override:"Ext.form.field.VTypes",
    /**
     * Make additional processing available on the raw response.
     */
    dollar: function (val, field) {
        var amount = /[0-9.]/g;
        var format = function (value) {
            var samount = new String(value);
            if (samount.length > 3) {
                var n = samount.length % 3;
                var s = samount.substr(0, n);
                for (; n < samount.length; n += 3) {
                    if (s.length > 0) {
                        s += ',';
                    }
                    s += samount.substr(n, 3);
                }
                return s;
            }

 

            return samount;
        }
        //var bd = Ext.getCmp('fldAllocationAmount');
        var s = format((new String(val)).replace(/[^0-9]/g, ''));
        if (s != val) {
            field.setValue(s);
        }
        return amount.test(val);
    }
});