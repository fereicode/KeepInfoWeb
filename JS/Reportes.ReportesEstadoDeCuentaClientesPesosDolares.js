﻿//----------DHTMLX----------//
var arrDataModel = new Array;
//--------------------------//
//----------JQuery----------//
//--------------------------//
$(document).ready(function() {
    setInterval(MantenerSesion, 150000); //2.5 minutos
    ObtenerFormaFiltrosReporteEstadoCuentaClientesPesosDolares();

    $("#divContenido").on("click", "#btnImprimirEstadoCuenta, #btnImprimirEstadoCuentaArriba", function() {
        var IdCliente = 0;
        if ($("#divFiltrosReporteEstadoCuentaClientesPesosDolares").attr("idCliente") != null && $("#divFiltrosReporteEstadoCuentaClientesPesosDolares").attr("idCliente") != "") {
            IdCliente = $("#divFiltrosReporteEstadoCuentaClientesPesosDolares").attr("idCliente");
        }
        if (IdCliente != 0) {
            ImprimirEstadoCuenta(IdCliente);
        }
        else {
            MostrarMensajeError("Seleccione un cliente");
        }
    });

    $("#divFiltrosReporteEstadoCuentaClientesPesosDolares").on("change", "#cmbSucursal", function() {
        FiltroEstadoCuentaClientesPesosDolares();
    });

    $("#divContenido").on("click", "#btnExportar, #btnExportarArriba", function() {
        tableToExcel('tblReporte', 'ReporteEstadoCuenta');
    });

    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
                , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><style type="text/css">.Datos{font-size:16px;}</style><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
                , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
                , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
            window.location.href = uri + base64(format(template, ctx))
        }
    })()
});

function ImprimirEstadoCuenta(pIdCliente) {
    MostrarBloqueo();   
    var pRequest = new Object();
    pRequest.pTemplate = 'EstadoCuentaClientePesosDolares';
    pRequest.pIdCliente = pIdCliente;

    pRequest.pFechaInicial = "";
    pRequest.pFechaFinal = "";

    if ($("#txtFechaInicial").val() != "" && $("#txtFechaInicial").val() != null) {
        pRequest.pFechaInicial = $("#txtFechaInicial").val();
        pRequest.pFechaInicial = ConvertirFecha(pRequest.pFechaInicial, 'aaaammdd');
    }

    pRequest.pIdSucursal = $("#cmbSucursal").val();

    pRequest.pTipoImpresion = $("#cmbTipoImpresion").val();
    
    $.ajax({
        type: "POST",
        url: "ReporteEstadoCuentaClientesPesosDolares.aspx/ImprimirEstadoCuentaPesosDolares",
        data: JSON.stringify(pRequest),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(pRespuesta) {
            respuesta = jQuery.parseJSON(pRespuesta.d);
            if (respuesta.Error == "0") {
                var ruta = respuesta.Modelo.Archivo;
                var imp = ruta.split('|');
                if (imp[0] == '0') { $("[id*=btnDescarga]").click(); } else { MostrarMensajeError(imp[1]); }
            } else { MostrarMensajeError(respuesta.Descripcion); }
        },
        complete: function() {
            OcultarBloqueo();
        }
    });
}

//---------Funciones--------//

//--------------------------//

//--------Validaciones-------//
//--------------------------//

//-----------AJAX------------//
//----Funciones de Accion----//

//-----------AJAX-----------//
//-Funciones Obtener Formas-//

function ObtenerFormaFiltrosReporteEstadoCuentaClientesPesosDolares() {
    $("#divFiltrosReporteEstadoCuentaClientesPesosDolares").obtenerVista({
        nombreTemplate: "tmplFiltrosReporteEstadoCuentaClientesPesosDolares.html",
        url: "ReporteEstadoCuentaClientesPesosDolares.aspx/ObtenerFormaFiltroReporteEstadoCuentaClientesPesosDolares",
        despuesDeCompilar: function(pRespuesta) {
            autocompletarCliente();
            if ($("#txtFechaInicial").length) {
                $("#txtFechaInicial").datepicker({
                    onSelect: function() {
                        FiltroEstadoCuentaClientesPesosDolares();
                    }
                });
            }

        }
    });
}
function FiltroEstadoCuentaClientesPesosDolares() {

    var pIdCliente = 0;
    if ($("#divFiltrosReporteEstadoCuentaClientesPesosDolares").attr("idCliente") != null && $("#divFiltrosReporteEstadoCuentaClientesPesosDolares").attr("idCliente") != "") {
        pIdCliente = $("#divFiltrosReporteEstadoCuentaClientesPesosDolares").attr("idCliente");
    }    

    var Cliente = new Object();
    Cliente.pIdCliente = pIdCliente;
    Cliente.pFechaInicial = "";
    Cliente.pFechaFinal = "";

    if ($("#txtFechaInicial").val() != "" && $("#txtFechaInicial").val() != null) {
        Cliente.pFechaInicial = $("#txtFechaInicial").val();
        Cliente.pFechaInicial = ConvertirFecha(Cliente.pFechaInicial, 'aaaammdd');
    }
    Cliente.pIdSucursal = $("#cmbSucursal").val();
    ObtieneEstadoCuentaClientePesosDolares(JSON.stringify(Cliente));

}

function ObtieneEstadoCuentaClientePesosDolares(pRequest) {
    $("#divEstadoCuentaClientePesosDolares").obtenerVista({
    nombreTemplate: "tmplReporteEstadoCuentaClientePesosDolares.html",                   
        parametros: pRequest,
        url: "ReporteEstadoCuentaClientesPesosDolares.aspx/ObtieneEstadoCuentaClientePesosDolares",
        despuesDeCompilar: function(pRespuesta) {
        }
    });
}

function autocompletarCliente() {
    $('#txtRazonSocial').autocomplete({
        source: function(request, response) {
            var pRequest = new Object();
            pRequest.pRazonSocial = $("#txtRazonSocial").val();
            pRequest.pIdSucursal = $("#cmbSucursal").val();
            $.ajax({
                type: 'POST',
                url: 'ReporteEstadoCuentaClientesPesosDolares.aspx/BuscarRazonSocial',
                data: JSON.stringify(pRequest),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function(pRespuesta) {
                    $("#divFiltrosReporteEstadoCuentaClientesPesosDolares").attr("idCliente", "0");
                    var json = jQuery.parseJSON(pRespuesta.d);
                    response($.map(json.Table, function(item) {
                        return { label: item.RazonSocial, value: item.RazonSocial, id: item.IdCliente }
                    }));
                }
            });
        },
        minLength: 2,
        select: function(event, ui) {
            var pIdCliente = ui.item.id;
            $("#divFiltrosReporteEstadoCuentaClientesPesosDolares").attr("idCliente", pIdCliente);

            var Cliente = new Object();
            Cliente.pIdCliente = pIdCliente;
            Cliente.pFechaInicial = "";
            Cliente.pFechaFinal = "";

            if ($("#txtFechaInicial").val() != "" && $("#txtFechaInicial").val() != null) {
                Cliente.pFechaInicial = $("#txtFechaInicial").val();
                Cliente.pFechaInicial = ConvertirFecha(Cliente.pFechaInicial, 'aaaammdd');
            }
            Cliente.pIdSucursal = $("#cmbSucursal").val();         
            ObtieneEstadoCuentaClientePesosDolares(JSON.stringify(Cliente));

        },
        change: function(event, ui) { },
        open: function() { $(this).removeClass("ui-corner-all").addClass("ui-corner-top"); },
        close: function() { $(this).removeClass("ui-corner-top").addClass("ui-corner-all"); }
    });
    
}