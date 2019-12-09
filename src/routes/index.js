var masterRoutes = require("./master");
var nmasterRoutes = require("./nmaster");
var tokoRoutes = require("./toko");
var gudangPusatRoutes = require("./gudang-pusat");
var inventoryRoutes = require("./inventory");
var laporanRoutes = require("./laporan");
var publicRoutes = require("./public");
var reportRoutes = require("./report");
var authRoutes = require("./auth");
var merchandiserRoutes = require("./merchandiser");
var finishingRoutes = require("./finishing");
var generalInventoryRoutes = require("./general-inventory");
var designerRoutes = require("./designer");
var purchaseRoutes = require("./purchasing");
//var masterplan = require("./masterplan");
var nmasterplan = require("./nmasterplan");
export default [].concat(masterRoutes, nmasterRoutes, publicRoutes, tokoRoutes, gudangPusatRoutes, inventoryRoutes, laporanRoutes, reportRoutes, designerRoutes, merchandiserRoutes, finishingRoutes, generalInventoryRoutes, authRoutes, purchaseRoutes, nmasterplan);