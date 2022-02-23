/**
 * @class Ext.ux.grid.Printer
 * @author Ed Spencer (edward@domine.co.uk)
 * Helper class to easily print the contents of a grid. Will open a new window with a table where the first row
 * contains the headings from your column model, and with a row for each item in your grid's store. When formatted
 * with appropriate CSS it should look very similar to a default grid. If renderers are specified in your column
 * model, they will be used in creating the table. Override headerTpl and bodyTpl to change how the markup is generated
 * 
 * Usage:
 * 
 * 1 - Add Ext.Require Before the Grid code
 * Ext.require([
 *   'Ext.ux.grid.GridPrinter',
 * ]);
 * 
 * 2 - Declare the Grid 
 * var grid = Ext.create('Ext.grid.Panel', {
 *   columns: //some column model,
 *   store   : //some store
 * });
 * 
 * 3 - Print!
 * Ext.ux.grid.Printer.mainTitle = 'Your Title here'; //optional
 * Ext.ux.grid.Printer.print(grid);
 * 
 * Original url: http://edspencer.net/2009/07/printing-grids-with-ext-js.html
 * 
 * Modified by Loiane Groner (me@loiane.com) - September 2011 - Ported to Ext JS 4
 * http://loianegroner.com (English)
 * http://loiane.com (Portuguese)
 * 
 * Modified by Bruno Sales - August 2012
 * 
 * Modified by Paulo Goncalves - March 2012
 * 
 * Modified by Beto Lima - March 2012
 * 
 * Modified by Beto Lima - April 2012
 *
 * Modified by Paulo Goncalves - May 2012
 * 
 * Modified by Nielsen Teixeira - 2012-05-02
 *
 * Modified by Joshua Bradley - 2012-06-01
 * 
 * Modified by Loiane Groner - 2012-09-08
    * 
 * Modified by Loiane Groner - 2012-09-24
 *
 */
Ext.define("GSmartApp.ux.grid.print_test", {

    requires: ['Ext.XTemplate'],

    statics: {
        /**
         * Prints the passed grid. Reflects on the grid's column model to build a table, and fills it using the store
         * @param {Ext.grid.Panel} grid The grid to print
         */
        print: function (data) {
            //We generate an XTemplate here by using 2 intermediary XTemplates - one to create the header,
            //the other to create the body (see the escaped {} below)
            //get so phieu

            function DanhSach(value) {
                var VLhtml = '';
                for (var i = 0; i < value.length; i++) {
                    var val = value[i].data;
                    var bike_number = val.bike_number == null ? "" : val.bike_number;
                    VLhtml += [
                        `<tr height=20 style='height:15.0pt'>
                        <td height=20 class=xl1520217 width=53 style='height:15.0pt;width:40pt'></td>
                        <td class=xl1520217 width=137 style='width:103pt'></td>
                        <td class=xl7020217 width=64 style='width:48pt'></td>
                        <td class=xl1520217 width=46 style='width:35pt'></td>
                        <td class=xl1520217 width=48 style='width:36pt'></td>
                        <td class=xl1520217 width=52 style='width:39pt'></td>
                        <td class=xl1520217 width=75 style='width:56pt'></td>
                        <td class=xl1520217 width=32 style='width:24pt'></td>
                        <td class=xl1520217 width=29 style='width:22pt'></td>
                        <td class=xl1520217 width=64 style='width:48pt'></td>
                        <td class=xl1520217 width=64 style='width:48pt'></td>
                        <td class=xl1520217 width=40 style='width:30pt'></td>
                        <td class=xl1520217 width=64 style='width:48pt'></td>
                        <td class=xl1520217 width=64 style='width:48pt'></td>
                        <td class=xl1520217 width=38 style='width:29pt'></td>
                       </tr>
                       <tr height=20 style='height:15.0pt'>
                        <td height=20 class=xl1520217 style='height:15.0pt'></td>
                        <td class=xl1520217></td>
                        <td class=xl7020217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                       </tr>
                       <tr height=20 style='height:15.0pt'>
                        <td height=20 class=xl1520217 style='height:15.0pt'></td>
                        <td class=xl1520217></td>
                        <td class=xl7020217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                       </tr>
                       <tr height=27 style='mso-height-source:userset;height:20.25pt'>
                        <td height=27 class=xl1520217 style='height:20.25pt'></td>
                        <td align=left valign=top>
                        </v:shape><![endif]--><![if !vml]><span style='mso-ignore:vglayout;
                        position:absolute;z-index:1;margin-left:45px;margin-top:7px;width:66px;
                        height:58px'><img width=66 height=58
                        src="`+ config.getLogo() + `" v:shapes="Picture_x0020_14"></span><![endif]><span
                        style='mso-ignore:vglayout2'>
                        <table cellpadding=0 cellspacing=0>
                         <tr>
                          <td height=27 class=xl6320217 width=137 style='height:20.25pt;width:103pt'>&nbsp;</td>
                         </tr>
                        </table>
                        </span></td>
                        <td colspan=6 class=xl7320217>DHA - BAC NINH CO.,LTD</td>
                        <td class=xl6420217>&nbsp;</td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                       </tr>
                       <tr height=20 style='height:15.0pt'>
                        <td height=20 class=xl1520217 style='height:15.0pt'></td>
                        <td class=xl6520217>&nbsp;</td>
                        <td colspan=6 class=xl7420217>CÔNG TY TNHH MTV DHA B&#7854;C NINH</td>
                        <td class=xl6620217>&nbsp;</td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl6320217>&nbsp;</td>
                        <td colspan=2 class=xl7320217>`+ bike_number + `</td>
                        <td class=xl6420217>&nbsp;</td>
                       </tr>
                       <tr height=26 style='mso-height-source:userset;height:19.5pt'>
                        <td height=26 class=xl1520217 style='height:19.5pt'></td>
                        <td class=xl6520217>&nbsp;</td>
                        <td class=xl7020217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl6620217>&nbsp;</td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl6520217>&nbsp;</td>
                        <td align=left valign=top>
                        </v:shape><![endif]--><![if !vml]><span style='mso-ignore:vglayout;
                        position:absolute;z-index:4;margin-left:5px;margin-top:4px;width:118px;
                        height:118px'><img width=118 height=118
                        src="`+ config.getQrcode_bike_number_url() + bike_number + `" v:shapes="Picture_x0020_19"></span><![endif]><span
                        style='mso-ignore:vglayout2'>
                        <table cellpadding=0 cellspacing=0>
                         <tr>
                          <td height=26 class=xl1520217 width=64 style='height:19.5pt;width:48pt'></td>
                         </tr>
                        </table>
                        </span></td>
                        <td class=xl1520217></td>
                        <td class=xl6620217>&nbsp;</td>
                       </tr>
                       <tr height=36 style='mso-height-source:userset;height:27.0pt'>
                        <td height=36 class=xl1520217 style='height:27.0pt'></td>
                        <td rowspan=4 height=144 width=137 style='height:108.0pt;width:103pt'
                        align=left valign=top>
                        </v:shape><![endif]--><![if !vml]><span style='mso-ignore:vglayout;
                        position:absolute;z-index:3;margin-left:28px;margin-top:6px;width:99px;
                        height:132px'><img width=99 height=132
                        src="`+ config.getImage_person() + val.id + `" v:shapes="Picture_x0020_18"></span><![endif]><span
                        style='mso-ignore:vglayout2'>
                        <table cellpadding=0 cellspacing=0>
                         <tr>
                          <td rowspan=4 height=144 class=xl7520217 width=137 style='height:108.0pt;
                          width:103pt'>&nbsp;</td>
                         </tr>
                        </table>
                        </span></td>
                        <td class=xl7720217>T&#7893;</td>
                        <td colspan=3 class=xl7620217>1T08</td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl6620217>&nbsp;</td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl6520217>&nbsp;</td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl6620217>&nbsp;</td>
                       </tr>
                       <tr height=36 style='mso-height-source:userset;height:27.0pt'>
                        <td height=36 class=xl1520217 style='height:27.0pt'></td>
                        <td class=xl7720217>Họ tên</td>
                        <td colspan=3 class=xl7620217>`+ val.fullname + `</td>
                        <td colspan=2 rowspan=3 height=108 class=xl1520217 width=107
                        style='mso-ignore:colspan-rowspan;height:81.0pt;width:80pt'><![if !vml]><span style='mso-ignore:vglayout'>
                        <table cellpadding=0 cellspacing=0>
                         <tr>
                          <td width=5 height=3></td>
                         </tr>
                         <tr>
                          <td></td>
                          <td><img width=101 height=101
                          src="`+ config.getQrcode_personel_url() + val.code + `" v:shapes="Picture_x0020_16"></td>
                          <td width=1></td>
                         </tr>
                         <tr>
                          <td height=4></td>
                         </tr>
                        </table>
                        </span><![endif]><!--[if !mso & vml]><span style='width:80.25pt;height:81.0pt'></span><![endif]--></td>
                        <td class=xl6620217>&nbsp;</td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl6520217>&nbsp;</td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl6620217>&nbsp;</td>
                       </tr>
                       <tr height=36 style='mso-height-source:userset;height:27.0pt'>
                        <td height=36 class=xl1520217 style='height:27.0pt'></td>
                        <td class=xl7720217>Ch&#7913;c v&#7909;</td>
                        <td colspan=3 class=xl7620217>Công nhân may</td>
                        <td class=xl6620217>&nbsp;</td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl6720217>&nbsp;</td>
                        <td class=xl6820217>&nbsp;</td>
                        <td colspan=2 class=xl7120217 style='border-right:.5pt solid black'>&nbsp;</td>
                       </tr>
                       <tr height=36 style='mso-height-source:userset;height:27.0pt'>
                        <td height=36 class=xl1520217 style='height:27.0pt'></td>
                        <td class=xl7720217>Mã số</td>
                        <td colspan=3 class=xl7620217>`+ val.code + `</td>
                        <td class=xl6620217>&nbsp;</td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                        <td class=xl1520217></td>
                       </tr>`
                        + `
                       <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl1520217 style='height:15.0pt'></td>
  <td class=xl6720217>&nbsp;</td>
  <td class=xl7820217>&nbsp;</td>
  <td class=xl6820217>&nbsp;</td>
  <td class=xl6820217>&nbsp;</td>
  <td class=xl6820217>&nbsp;</td>
  <td class=xl6820217>&nbsp;</td>
  <td class=xl6820217>&nbsp;</td>
  <td class=xl6920217>&nbsp;</td>
  <td class=xl1520217></td>
  <td class=xl1520217></td>
  <td class=xl1520217></td>
  <td class=xl1520217></td>
  <td class=xl1520217></td>
  <td class=xl1520217></td>
 </tr>`
                    ]
                }

                return VLhtml;
            }

            //get Styles file relative location, if not supplied
            if (this.stylesheetPath === null) {
                var scriptPath = Ext.Loader.getPath('GSmartApp.ux.plugin.grid');
                console.log(scriptPath);
                this.stylesheetPath = scriptPath.substring(0, scriptPath.indexOf('grid.js')) + 'grid_printer_css/test.css';
            }

            //Here because inline styles using CSS, the browser did not show the correct formatting of the data the first time that loaded
            var htmlMarkup = [
                '<html class="' + Ext.baseCSSPrefix + 'ux-grid-printer">',
                '<head>',
                '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />',
                '<link href="' + this.stylesheetPath + '" rel="stylesheet" type="text/css" />',
                '<title>' + 'Danh sách nhân viên' + '</title>',
                '</head>',
                '<body class="' + Ext.baseCSSPrefix + 'ux-grid-printer-body">',
                '<div class="' + Ext.baseCSSPrefix + 'ux-grid-printer-noprint ' + Ext.baseCSSPrefix + 'ux-grid-printer-links">',
                '<a class="' + Ext.baseCSSPrefix + 'ux-grid-printer-linkprint" href="javascript:void(0);" onclick="window.print();">' + this.printLinkText + '</a>',
                '<a class="' + Ext.baseCSSPrefix + 'ux-grid-printer-linkclose" href="javascript:void(0);" onclick="window.close();">' + this.closeLinkText + '</a>',
                '</div>',
                `<style>
                v\:* {behavior:url(#default#VML);}
                o\:* {behavior:url(#default#VML);}
                x\:* {behavior:url(#default#VML);}
                .shape {behavior:url(#default#VML);}
                </style>`+
                `<table border=0 cellpadding=0 cellspacing=0 width=870 style='border-collapse:
                collapse;table-layout:fixed;width:654pt'>`
                + `<col width=53 style='mso-width-source:userset;mso-width-alt:1938;width:40pt'>
                <col width=137 style='mso-width-source:userset;mso-width-alt:5010;width:103pt'>
                <col class=xl7020217 width=64 style='width:48pt'>
                <col width=46 style='mso-width-source:userset;mso-width-alt:1682;width:35pt'>
                <col width=48 style='mso-width-source:userset;mso-width-alt:1755;width:36pt'>
                <col width=52 style='mso-width-source:userset;mso-width-alt:1901;width:39pt'>
                <col width=75 style='mso-width-source:userset;mso-width-alt:2742;width:56pt'>
                <col width=32 style='mso-width-source:userset;mso-width-alt:1170;width:24pt'>
                <col width=29 style='mso-width-source:userset;mso-width-alt:1060;width:22pt'>
                <col width=64 span=2 style='width:48pt'>
                <col width=40 style='mso-width-source:userset;mso-width-alt:1462;width:30pt'>
                <col width=64 span=2 style='width:48pt'>
                <col width=38 style='mso-width-source:userset;mso-width-alt:1389;width:29pt'>`
                + DanhSach(data)
                + `</table>`,
                '</body>',
                '</html>'
            ];
            var html = Ext.create('Ext.XTemplate', htmlMarkup).apply(data);

            //open up a new printing window, write to it, print it and close
            var win = window.open('', 'printgrid');

            //document must be open and closed
            win.document.open();
            win.document.write(html);
            win.document.close();

            if (this.printAutomatically) {
                win.print();
            }

            //Another way to set the closing of the main
            if (this.closeAutomaticallyAfterPrint) {
                if (Ext.isIE) {
                    window.close();
                } else {
                    win.close();
                }
            }
        },

        /**
         * @property stylesheetPath
         * @type String
         * The path at which the print stylesheet can be found (defaults to 'ux/grid/gridPrinterCss/print.css')
         */
        stylesheetPath: null,

        /**
         * @property printAutomatically
         * @type Boolean
         * True to open the print dialog automatically and close the window after printing. False to simply open the print version
         * of the grid (defaults to false)
         */
        printAutomatically: false,

        /**
         * @property closeAutomaticallyAfterPrint
         * @type Boolean
         * True to close the window automatically after printing.
         * (defaults to false)
         */
        closeAutomaticallyAfterPrint: false,

        /**
         * @property mainTitle
         * @type String
         * Title to be used on top of the table
         * (defaults to empty)
         */
        mainTitle: '',

        /**
         * Text show on print link
         * @type String
         */
        printLinkText: 'In',

        /**
         * Text show on close link
         * @type String
         */
        closeLinkText: 'Đóng',

        /**
         * @property headerTpl
         * @type {Object/Array} values
         * The markup used to create the headings row. By default this just uses <th> elements, override to provide your own
         */
        headerTpl: [
            '<tpl for=".">',
            '<th>{text}</th>',
            '</tpl>'
        ],

        /**
         * @property bodyTpl
         * @type {Object/Array} values
         * The XTemplate used to create each row. This is used inside the 'print' function to build another XTemplate, to which the data
         * are then applied (see the escaped dataIndex attribute here - this ends up as "{dataIndex}")
         */
        bodyTpl: [
            '<tpl for=".">',
            '<td>{[Ext.String.createVarName(values.text)]}</td>',
            '</tpl>'
        ]
    }
});
