var JsDBSource = {
    loadData: function(n) {
        console.log(n);
        var a = $.Deferred();
        return $.ajax({
            type: "GET",
            url: "assets/data/jsgrid.json",
            data: n,
            success: function(e) {
                var t = $.grep(e, function(e) { return !(n.Name && !(-1 < e.Name.indexOf(n.Name)) || n.Age && e.Age !== n.Age || n.Address && !(-1 < e.Address.indexOf(n.Address)) || n.Country && e.Country !== n.Country) });
                a.resolve(t)
            }
        }), a.promise()
    },
    insertItem: function(e) { return $.ajax({ type: "POST", url: "assets/data/jsgrid.json", data: e }) },
    updateItem: function(e) { return $.ajax({ type: "PUT", url: "assets/data/jsgrid.json", data: e }) },
    deleteItem: function(e) { return $.ajax({ type: "DELETE", url: "assets/data/jsgrid.json", data: e }) },
    countries: [{ Name: "", Id: 0 }, { Name: "United States", Id: 1 }, { Name: "Canada", Id: 2 }, { Name: "United Kingdom", Id: 3 }, { Name: "France", Id: 4 }, { Name: "Brazil", Id: 5 }, { Name: "China", Id: 6 }, { Name: "Russia", Id: 7 }]
};
! function(n) {
    "use strict";

    function e() { this.$body = n("body") }
    e.prototype.createGrid = function(e, t) { e.jsGrid(n.extend({ height: "550", width: "100%", filtering: !0, editing: 0, inserting: 0, sorting: !0, paging: !0, autoload: !0, pageSize: 10, pageButtonCount: 5, deleteConfirm: "Do you really want to delete the entry?" }, t)) }, e.prototype.init = function() {
        var e = {
            fields: [
                { name: "No", type: "number", width: 50 },
                { name: "Mata Kuliah", type: "text", width: 150 },
                { name: "Alur", type: "number", width: 50 },
                { name: "RPS", type: "number", width: 50 },
                { name: "Proyek", type: "number", width: 50 },
                { name: "Tugas", type: "number", width: 50 },
                { name: "Kasus", type: "number", width: 50 },
                { name: "Doc", type: "number", width: 50 },
                { name: "Survey", type: "number", width: 50 },
                { name: "Quiz", type: "number", width: 50 },
                { name: "Forum, Thread, Post", type: "number", width: 100 },
                // { name: "Address", type: "text", width: 200 },
                // { name: "Country", type: "select", items: JsDBSource.countries, valueField: "Id", textField: "Name" },
                { type: "control" }
            ],
            controller: JsDBSource
        };
        this.createGrid(n("#jsGrid"), e)
    }, n.GridApp = new e, n.GridApp.Constructor = e
}(window.jQuery),
function() {
    "use strict";
    window.jQuery.GridApp.init()
}();