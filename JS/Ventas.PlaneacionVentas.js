﻿/**/

var ver = true;

$(function () {

	MantenerSesion();

	setInterval(MantenerSesion, 1000 * 60 * 1.5);

	$("#sinPlaneacion").change(FiltroPlanVentas);
	$("#planeacionMes1").change(FiltroPlanVentas);


	//##############################################################################
	//////funcion del grid//////
	$("#gbox_grdPlanVentas").livequery(function () {// MODIFICAR
		$("#grdPlanVentas").jqGrid('navButtonAdd', '#pagPlanVentas', {// MODIFICAR
			caption: "Exportar",
			title: "Exportar",
			buttonicon: 'ui-icon-newwin',
			onClickButton: function () {
				var idoportunidad = '';
				if ($('#gbox_grdPlanVentas #gs_IdOportunidad').val() != null) {
					idoportunidad = $('#gs_IdOportunidad').val();
				}
				var oportunidad = '';
				if ($('#gbox_grdPlanVentas #gs_Oportunidad').val() != null) {
					oportunidad = $('#gs_Oportunidad').val();
				}
				var cliente = '';
				if ($('#gbox_grdPlanVentas #gs_Cliente').val() != null) {
					cliente = $('#gs_Cliente').val();
				}
				var sucursal = -1;
				if ($('#gbox_grdPlanVentas #gs_Sucursal').val() != null) {
					sucursal = $('#gbox_grdPlanVentas #gs_Sucursal').val();
				}
				var agente = '';
				if ($('#gbox_grdPlanVentas #gs_Agente').val() != null) {
					agente = $('#gs_Agente').val();
				}
				var nivelinteres = -1;
				if ($('#gbox_grdPlanVentas #gs_NivelInteres').val() != null) {
					nivelinteres = $('#gbox_grdPlanVentas #gs_NivelInteres').val();
				}
				var preventadetenido = -1;
				if ($('#gbox_grdPlanVentas #gs_PreventaDetenido').val() != null) {
					preventadetenido = $('#gbox_grdPlanVentas #gs_PreventaDetenido').val();
				}
				var ventasdetenido = -1;
				if ($('#gbox_grdPlanVentas #gs_VentasDetenido').val() != null) {
					ventasdetenido = $('#gbox_grdPlanVentas #gs_VentasDetenido').val();
				}
				var comprasdetenido = -1;
				if ($('#gbox_grdPlanVentas #gs_ComprasDetenido').val() != null) {
					comprasdetenido = $('#gbox_grdPlanVentas #gs_ComprasDetenido').val();
				}
				var proyectosdetenido = -1;
				if ($('#gbox_grdPlanVentas #gs_ProyectosDetenido').val() != null) {
					proyectosdetenido = $('#gbox_grdPlanVentas #gs_ProyectosDetenido').val();
				}
				var finzanzasdetenido = -1;
				if ($('#gbox_grdPlanVentas #gs_FinzanzasDetenido').val() != null) {
					finzanzasdetenido = $('#gbox_grdPlanVentas #gs_FinzanzasDetenido').val();
				}
				var division = (($("#gs_Division").val() != null) ? parseInt($("#gs_Division").val()) : -1);
				var sinPlaneacion = 0;
				sinPlaneacion = ($("#sinPlaneacion").is(":checked")) ? 1 : 0;
				var planeacionMes1 = 0;
				planeacionMes1 = ($("#planeacionMes1").is(":checked")) ? 1 : 0;

				$.UnifiedExportFile({
					action: '../ExportacionesExcel/ExportarExcelPlanVentas.aspx',
					data: {
						'pColumnaOrden': $('#grdPlanVentas').getGridParam('sortname'),
						'pTipoOrden': $('#grdPlanVentas').getGridParam('sortorder'),
						'pIdOportunidad':idoportunidad,
						'pOportunidad': oportunidad,
						'pCliente':cliente,
						'pSucursal': sucursal,
						'pAgente': agente,
						'pNivelInteres': nivelinteres,
						'pPreventaDetenido': preventadetenido,
						'pVentasDetenido': ventasdetenido,
						'pComprasDetenido': comprasdetenido,
						'pProyectosDetenido': proyectosdetenido,
						'pFinzanzasDetenido': finzanzasdetenido,
						'pSinPlaneacion': sinPlaneacion,
						'planeacionMes1': planeacionMes1,
						'pDivision': division
					},
					downloadType: 'Normal'
				});

			}
		});
	});

	//$(document).tooltip();

	$("#btnAgregarOportunidad").click(ObtenerFormaAgregarOportunidad);

});

function FiltroPlanVentas() {
	var idoportunidad = '';
	if ($('#gbox_grdPlanVentas #gs_IdOportunidad').val() != null) {
		idoportunidad = $('#gs_IdOportunidad').val();
	}
	var oportunidad = '';
	if ($('#gbox_grdPlanVentas #gs_Oportunidad').val() != null) {
		oportunidad = $('#gs_Oportunidad').val();
	}
	var cliente = '';
	if ($('#gbox_grdPlanVentas #gs_Cliente').val() != null) {
		cliente = $('#gs_Cliente').val();
	}
	var sucursal = -1;
	if ($('#gbox_grdPlanVentas #gs_Sucursal').val() != null) {
		sucursal = $('#gbox_grdPlanVentas #gs_Sucursal').val();
	}
	var agente = '';
	if ($('#gbox_grdPlanVentas #gs_Agente').val() != null) {
		agente = $('#gs_Agente').val();
	}
	var nivelinteres = -1;
	if ($('#gbox_grdPlanVentas #gs_NivelInteres').val() != null) {
		nivelinteres = $('#gbox_grdPlanVentas #gs_NivelInteres').val();
	}
	var preventadetenido = -1;
	if ($('#gbox_grdPlanVentas #gs_PreventaDetenido').val() != null) {
		preventadetenido = $('#gbox_grdPlanVentas #gs_PreventaDetenido').val();
	}
	var ventasdetenido = -1;
	if ($('#gbox_grdPlanVentas #gs_VentasDetenido').val() != null) {
		ventasdetenido = $('#gbox_grdPlanVentas #gs_VentasDetenido').val();
	}
	var comprasdetenido = -1;
	if ($('#gbox_grdPlanVentas #gs_ComprasDetenido').val() != null) {
		comprasdetenido = $('#gbox_grdPlanVentas #gs_ComprasDetenido').val();
	}
	var proyectosdetenido = -1;
	if ($('#gbox_grdPlanVentas #gs_ProyectosDetenido').val() != null) {
		proyectosdetenido = $('#gbox_grdPlanVentas #gs_ProyectosDetenido').val();
	}
	var finzanzasdetenido = -1;
	if ($('#gbox_grdPlanVentas #gs_FinzanzasDetenido').val() != null) {
		finzanzasdetenido = $('#gbox_grdPlanVentas #gs_FinzanzasDetenido').val();
	}
	var division = (($("#gs_Division").val() != null) ? parseInt($("#gs_Division").val()) : -1);
	var sinPlaneacion = 0;
	sinPlaneacion = ($("#sinPlaneacion").is(":checked")) ? 1 : 0;
	var planeacionMes1 = 0;
	planeacionMes1 = ($("#planeacionMes1").is(":checked")) ? 1 : 0;
	$.ajax({
		url: 'PlaneacionVentas.aspx/ObtenerPlanVentas',
		data: "{'pTamanoPaginacion':" + $('#grdPlanVentas').getGridParam('rowNum') + ",'pPaginaActual':" + $('#grdPlanVentas').getGridParam('page') + ",'pColumnaOrden':'" + $('#grdPlanVentas').getGridParam('sortname') + "','pTipoOrden':'" + $('#grdPlanVentas').getGridParam('sortorder') + "','pIdOportunidad':'" + idoportunidad + "','pOportunidad':'" + oportunidad + "','pCliente':'" + cliente + "','pSucursal':" + sucursal + ",'pAgente':'" + agente + "','pNivelInteres':" + nivelinteres + ",'pPreventaDetenido':" + preventadetenido + ",'pVentasDetenido':" + ventasdetenido + ",'pComprasDetenido':" + comprasdetenido + ",'pProyectosDetenido':" + proyectosdetenido + ",'pFinzanzasDetenido':" + finzanzasdetenido + ",'pSinPlaneacion':"+ sinPlaneacion+",'planeacionMes1':"+ planeacionMes1 +",'pDivision':" + division + "}",
		dataType: 'json',
		type: 'post',
		contentType: 'application/json; charset=utf-8',
		complete: function (jsondata, stat) {
			if (stat == 'success') $('#grdPlanVentas')[0].addJSONData(JSON.parse(jsondata.responseText).d);
			else alert(JSON.parse(jsondata.responseText).Message);
		}
	});
}

function Termino_grdPlanVentas ()
{

	$("td[aria-describedby=grdPlanVentas_IdOportunidad]").click(function () {
		var Oportunidad = new Object();
		Oportunidad.pIdOportunidad = parseInt($(this).text());
		var Request = JSON.stringify(Oportunidad);
		ObtenerFormaEditarOportunidad(Request)
	});

	$("td[aria-describedby=grdPlanVentas_Baja]").each(function (index, element) {
		var IdOportunidad = $(element).parent("tr").children("td[aria-describedby=grdPlanVentas_IdOportunidad]").text()
		$(element).html('<img src="../Images/on.png" onclick="EliminarOportunidad('+ IdOportunidad +');" style="cursor:pointer;"/>');
	});

	//
	$("td[aria-describedby=grdPlanVentas_Mes1]").each(function (index, element) {
		var input = $('<input type="text" class="Mes1 monto" style="width:96%;"/>').val($(element).text());
		$(input).change(ActualizarPlanVentas).css("background-color", "#EEE");
		InitCampo(input);
		$(element).html(input);
	});

	$("td[aria-describedby=grdPlanVentas_Mes2]").each(function (index, element) {
		var input = $('<input type="text" class="Mes2 monto" style="width:96%;"/>').val($(element).text());
		$(input).change(ActualizarPlanVentas).css("background-color", "#DDD");
		InitCampo(input);
		$(element).html(input);
	});

	$("td[aria-describedby=grdPlanVentas_Mes3]").each(function (index, element) {
		var input = $('<input type="text" class="Mes3 monto" style="width:96%;"/>').val($(element).text());
		$(input).change(ActualizarPlanVentas).css("background-color", "#CCC");
		InitCampo(input);
		$(element).html(input);
	});

	// Campos de fecha
	$("td[aria-describedby=grdPlanVentas_PreventaDetenido]").each(function (index, element) {
		var marcado = ($(element).text() == "True") ? "underline" : "";
		var fecha = $("td[aria-describedby=grdPlanVentas_CompromisoPreventa]", $(element).parent("tr")).text();
		var input = $('<input type="text" class="Preventa ' + marcado + '" value="' + fecha + '" style="width:50px;"/>');
		var Oportunidad = new Object();
		Oportunidad.IdOportunidad = parseInt($("td[aria-describedby=grdPlanVentas_IdOportunidad]", $(element).parent("tr")).text());
		Oportunidad.Fecha = 1;
		$(element).attr("title", fecha);
		$(element).html(input);
		$(input).click(function () { MostrarFecha(JSON.stringify(Oportunidad)); });
	});

	$("td[aria-describedby=grdPlanVentas_VentasDetenido]").each(function (index, element) {
		var marcado = ($(element).text() == "True") ? "underline" : "";
		var fecha = $("td[aria-describedby=grdPlanVentas_CompromisoVenta]", $(element).parent("tr")).text();
		var input = $('<input type="text" class="Ventas ' + marcado + '" value="' + fecha + '" style="width:50px;"/>');
		var Oportunidad = new Object();
		Oportunidad.IdOportunidad = parseInt($("td[aria-describedby=grdPlanVentas_IdOportunidad]", $(element).parent("tr")).text());
		Oportunidad.Fecha = 2;
		$(element).html(input);
		$(input).click(function () { MostrarFecha(JSON.stringify(Oportunidad)); });
	});

	$("td[aria-describedby=grdPlanVentas_ComprasDetenido]").each(function (index, element) {
		var marcado = ($(element).text() == "True") ? "underline" : "";
		var fecha = $("td[aria-describedby=grdPlanVentas_CompromisoCompras]", $(element).parent("tr")).text();
		var input = $('<input type="text" class="Compras ' + marcado + '" value="' + fecha + '" style="width:50px;"/>');
		var Oportunidad = new Object();
		Oportunidad.IdOportunidad = parseInt($("td[aria-describedby=grdPlanVentas_IdOportunidad]", $(element).parent("tr")).text());
		Oportunidad.Fecha = 3;
		$(element).html(input);
		$(input).click(function () { MostrarFecha(JSON.stringify(Oportunidad)); });
	});

	$("td[aria-describedby=grdPlanVentas_ProyectosDetenido]").each(function (index, element) {
		var marcado = ($(element).text() == "True") ? "underline" : "";
		var fecha = $("td[aria-describedby=grdPlanVentas_CompromisoProyectos]", $(element).parent("tr")).text();
		var input = $('<input type="text" class="Proyectos ' + marcado + '" value="' + fecha + '" style="width:50px;"/>');
		var Oportunidad = new Object();
		Oportunidad.IdOportunidad = parseInt($("td[aria-describedby=grdPlanVentas_IdOportunidad]", $(element).parent("tr")).text());
		Oportunidad.Fecha = 4;
		$(element).html(input);
		$(input).click(function () { MostrarFecha(JSON.stringify(Oportunidad)); });
	});

	$("td[aria-describedby=grdPlanVentas_FinzanzasDetenido]").each(function (index, element) {
		var marcado = ($(element).text() == "True") ? "underline" : "";
		var fecha = $("td[aria-describedby=grdPlanVentas_CompromisoFinanzas]", $(element).parent("tr")).text();
		var input = $('<input type="text" class="Finanzas  ' + marcado + '" value="' + fecha + '" style="width:50px;"/>');
		var Oportunidad = new Object();
		Oportunidad.IdOportunidad = parseInt($("td[aria-describedby=grdPlanVentas_IdOportunidad]", $(element).parent("tr")).text());
		Oportunidad.Fecha = 5;
		$(element).html(input);
		$(input).click(function () { MostrarFecha(JSON.stringify(Oportunidad)); });
	});

	$("tr", "#grdPlanVentas tbody").each(function (index, element) {
		var Mes1 = parseFloat(QuitaFormatoMoneda($(".Mes1", element).val()));
		var Mes2 = parseFloat(QuitaFormatoMoneda($(".Mes2", element).val()));
		var Mes3 = parseFloat(QuitaFormatoMoneda($(".Mes3", element).val()));
		if ((Mes1 + Mes2 + Mes3) == 0) {
			$(element).css("color", "red");
		}
	});

	TotalesPlanVentas();
	TotalesPlanVentasDepartamento();
	TotalesPlanVentasSucursal();
}

function MostrarFecha(Oportunidad) {
	var ventana = $("<div></div>");
	$(ventana).dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		close: function () { $(this).remove() },
		buttons: {
			"Guardar": function () {
				Oportunidad = JSON.parse(Oportunidad);
				Oportunidad.FechaCompromiso = $("#txtFechaCompromiso", ventana).val();
				Oportunidad.FechaTerminado = $("#txtFechaTermino", ventana).val();
				Oportunidad.Detenido = $("#chkActivo", ventana).is(":checked");
				Oportunidad.Fecha = parseInt($("#divFormaFechas", ventana).attr("TipoFecha"));
				console.log(Oportunidad);
				GuardarFechasOportunidad(JSON.stringify(Oportunidad));
				$(this).dialog("close");
			},
			"Cancelar": function () { $(this).dialog("close"); }
		}
	});
	$(ventana).obtenerVista({
		url: "PlaneacionVentas.aspx/ObtenerFechaCumplimiento",
		parametros: Oportunidad,
		nombreTemplate: "tmplControlFechaPlanVentas.html",
		despuesDeCompilar: function (Respuesta) {
			$(ventana).dialog("open");
			$("#txtFechaCompromiso").datepicker();
			$("#txtFechaTermino").datepicker();
		}
	});
}

function GuardarFechasOportunidad(Oportunidad)
{
	$.ajax({
		url: "PlaneacionVentas.aspx/GuardarFechasOportunidad",
		type: "post",
		data: Oportunidad,
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success: function (Respuesta) {
			FiltroPlanVentas();
		}
	});
}

function InitCampo(input) {
	$(input).dblclick(function () {
		var fila = $(input).parent("td").parent("tr");
		var Diferencia = QuitaFormatoMoneda($("td[aria-describedby=grdPlanVentas_Diferencia]",fila).text());
		$(this).val(Diferencia).change();
	}).focus(function () {
		$(this).val(QuitaFormatoMoneda($(this).val())).select()
	}).blur(function () {
		$(this).val(formato.moneda($(this).val(),'$'));
	}).css("color","inherit");
}

function ActualizarPlanVentas() {
	var Oportunidad = new Object();
	var fila = $(this).parent("td").parent("tr");
	Oportunidad.IdOportunidad = parseInt($("td[aria-describedby=grdPlanVentas_IdOportunidad]", fila).text());
	Oportunidad.Mes1 = parseFloat(QuitaFormatoMoneda($(".Mes1", fila).val()));
	Oportunidad.Mes2 = parseFloat(QuitaFormatoMoneda($(".Mes2", fila).val()));
	Oportunidad.Mes3 = parseFloat(QuitaFormatoMoneda($(".Mes3", fila).val()));
	Oportunidad.Preventa = $(".Preventa", fila).hasClass("underline");
	Oportunidad.Venta = $(".Ventas", fila).hasClass("underline");
	Oportunidad.Compras = $(".Compras", fila).hasClass("underline");
	Oportunidad.Proyectos = $(".Proyectos", fila).hasClass("underline");
	Oportunidad.Finanzas = $(".Finanzas", fila).hasClass("underline");
	Oportunidad.CompromisoPreventa = $(".Preventa", fila).val().trim();
	Oportunidad.CompromisoVentas = $(".Ventas", fila).val().trim();
	Oportunidad.CompromisoCompras = $(".Compras", fila).val().trim();
	Oportunidad.CompromisoProyectos = $(".Proyectos", fila).val().trim();
	Oportunidad.CompromisoFinanzas = $(".Finanzas", fila).val().trim();

	var Request = JSON.stringify(Oportunidad);

	$.ajax({
		url: "PlaneacionVentas.aspx/GuardarPlanVentas",
		type: "post",
		data: Request,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (Respuesta) {
			var json = JSON.parse(Respuesta.d);
			if (json.Error == 0)
			{

			}
			else
			{
				MostrarMensajeError(json.Descripcion);
			}
			FiltroPlanVentas();
		}
	});
}

function TotalesPlanVentas() {
	var PlanVentas = new Object();
	PlanVentas.pIdOportunidad = $("#gs_IdOportunidad").val();
	PlanVentas.pOportunidad = $("#gs_Oportunidad").val();
	PlanVentas.pCliente = $("#gs_Cliente").val();
	PlanVentas.pIdSucursal = parseInt($("#gs_Sucursal").val());
	PlanVentas.pAgente = $("#gs_Agente").val();
	PlanVentas.pNivelInteres = parseInt($("#gs_NivelInteres").val());
	PlanVentas.pPreventaDetenido = parseInt($("#gs_PreventaDetenido").val());
	PlanVentas.pVentasDetenido = parseInt($("#gs_VentasDetenido").val());
	PlanVentas.pComprasDetenido = parseInt($("#gs_ComprasDetenido").val());
	PlanVentas.pProyectosDetenido = parseInt($("#gs_ProyectosDetenido").val());
	PlanVentas.pFinzanzasDetenido = parseInt($("#gs_FinzanzasDetenido").val());

	var Request = JSON.stringify(PlanVentas);

	$.ajax({
		url: "PlaneacionVentas.aspx/ObtenerTotalMeses",
		type: "post",
		data: Request,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (Respuesta) {
			var json = JSON.parse(Respuesta.d);
			if (json.Error == 0) {
				$("#facturado").text(formato.moneda(json.Modelo.Facturado, '$'));
				$("#Mes1").text(formato.moneda(json.Modelo.Mes1, '$'));
				$("#plan").text(formato.moneda(json.Modelo.PlanCierre, '$'));
				$("#Mes2").text(formato.moneda(json.Modelo.Mes2, '$'));
				$("#Mes3").text(formato.moneda(json.Modelo.Mes3, '$'));
			}
			else {
				MostrarMensajeError(json.Descripcion);
			}
		}
	});
}

function TotalesPlanVentasSucursal() {
	var PlanVentas = new Object();
	PlanVentas.pIdOportunidad = $("#gs_IdOportunidad").val();
	PlanVentas.pOportunidad = $("#gs_Oportunidad").val();
	PlanVentas.pCliente = $("#gs_Cliente").val();
	PlanVentas.pIdSucursal = parseInt($("#gs_Sucursal").val());
	PlanVentas.pAgente = $("#gs_Agente").val();
	PlanVentas.pNivelInteres = parseInt($("#gs_NivelInteres").val());
	PlanVentas.pPreventaDetenido = parseInt($("#gs_PreventaDetenido").val());
	PlanVentas.pVentasDetenido = parseInt($("#gs_VentasDetenido").val());
	PlanVentas.pComprasDetenido = parseInt($("#gs_ComprasDetenido").val());
	PlanVentas.pProyectosDetenido = parseInt($("#gs_ProyectosDetenido").val());
	PlanVentas.pFinzanzasDetenido = parseInt($("#gs_FinzanzasDetenido").val());

	var Request = JSON.stringify(PlanVentas);

	$.ajax({
		url: "PlaneacionVentas.aspx/ObtenerTotalesSucursal",
		type: "post",
		data: Request,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (Respuesta) {
			var json = JSON.parse(Respuesta.d);
			if (json.Error == 0) {
				$("#mty").text(formato.moneda(json.Modelo.Monterrey, '$'));
				$("#mex").text(formato.moneda(json.Modelo.Mexico, '$'));
				$("#gdl").text(formato.moneda(json.Modelo.Guadalajara, '$'));
			}
			else {
				MostrarMensajeError(json.Descripcion);
			}
		}
	});
}

function TotalesPlanVentasDepartamento() {
	var PlanVentas = new Object();
	PlanVentas.pIdOportunidad = $("#gs_IdOportunidad").val();
	PlanVentas.pOportunidad = $("#gs_Oportunidad").val();
	PlanVentas.pCliente = $("#gs_Cliente").val();
	PlanVentas.pIdSucursal = parseInt($("#gs_Sucursal").val());
	PlanVentas.pAgente = $("#gs_Agente").val();
	PlanVentas.pNivelInteres = parseInt($("#gs_NivelInteres").val());
	PlanVentas.pPreventaDetenido = parseInt($("#gs_PreventaDetenido").val());
	PlanVentas.pVentasDetenido = parseInt($("#gs_VentasDetenido").val());
	PlanVentas.pComprasDetenido = parseInt($("#gs_ComprasDetenido").val());
	PlanVentas.pProyectosDetenido = parseInt($("#gs_ProyectosDetenido").val());
	PlanVentas.pFinzanzasDetenido = parseInt($("#gs_FinzanzasDetenido").val());

	var Request = JSON.stringify(PlanVentas);

	$.ajax({
		url: "PlaneacionVentas.aspx/ObtenerTotalDepartamentos",
		type: "post",
		data: Request,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (Respuesta) {
			var json = JSON.parse(Respuesta.d);
			if (json.Error == 0) {
				$("#preventa").text(formato.moneda(json.Modelo.Preventa, '$'));
				$("#venta").text(formato.moneda(json.Modelo.Ventas, '$'));
				$("#compras").text(formato.moneda(json.Modelo.Compras, '$'));
				$("#proyectos").text(formato.moneda(json.Modelo.Proyectos, '$'));
				$("#finanzas").text(formato.moneda(json.Modelo.Finanzas, '$'));
			}
			else {
				MostrarMensajeError(json.Descripcion);
			}
		}
	});
}

//
function EliminarOportunidad(IdOportunidad) {
	var ventana = $('<div><p>Motivo cancelación:</p><textarea id="txtMotivoCancelacion" style="width:280px;height:80px;" maxlength="500" placeholder="Motivo"></textarea></div>');
	$(ventana).dialog({
		modal: true,
		draggable: false,
		resizable: false,
		width: "auto",
		close: function () { $(this).remove(); },
		buttons: {
			"Inactivar": function () {
				var Oportunidad = new Object();
				Oportunidad.IdOportunidad = IdOportunidad;
				Oportunidad.MotivoCancelacion = $("#txtMotivoCancelacion", ventana).val();
				var Request = JSON.stringify(Oportunidad);
				$.ajax({
					url: "PlaneacionVentas.aspx/EliminarOportunidad",
					type: "post",
					data: Request,
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function () {
						FiltroPlanVentas();
					}
				});
			},
			"Cancelar": function () { $(ventana).dialog("close"); }
		}
	});
}

// Agregar Oportunidad
function ObtenerFormaAgregarOportunidad() {
	var ventana = $('<div title="Agregar Oportunidad"></div>');
	$(ventana).dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		cloase: function () { $(this).remove(); },
		buttons: {
			"Agregar": function () {
				AgregarOportunidad();
				$(this).dialog("close");
			},
			"Cancelar": function () { $(this).dialog("close"); }
		}
	});
	$(ventana).obtenerVista({
		url: "PlaneacionVentas.aspx/ObtenerFormaAgregarOportunidad",
		nombreTemplate: "tmplAgregarOportunidad.html",
		despuesDeCompilar: function () {
			$(ventana).dialog("open");
			AutocompletarClienteOportunidad();
			$("#dialogAgregarOportunidad").dialog("open");
			$("#txtProveedores").on("keypress keyup keydown", function () {
				var lb = $(this).val().split("\n").length;
				var l = $(this).val().length
				var r = Math.floor(l / 43) + lb;
				$(this).attr("rows", r);
			});
			$("#txtFechaCierre").datepicker({
				dateFormat: "dd/mm/yy",
				minDate: new Date()
			});
		}
	});
}

// Editar Oportunidad
function ObtenerFormaEditarOportunidad(request) {
	var ventana = $('<div id="dialogEditarOportunidad" Title="Oportunidad"></div>');
	$(ventana).dialog({
		modal: true,
		autoOpen: false,
		resizable: false,
		width: "auto",
		draggable: false,
		cloase: function () { $(this).remove(); },
		buttons: {
			"Editar": function () {
				EditarOportunidad();
			},
			"Cancelar": function () {
				$(this).dialog("close");
			}
		}
	});
	$("#dialogEditarOportunidad").obtenerVista({
		nombreTemplate: "tmplEditarOportunidad.html",
		url: "Oportunidad.aspx/ObtenerFormaEditarOportunidad",
		parametros: request,
		despuesDeCompilar: function (pRespuesta) {
			AutocompletarUsuario();
			AutocompletarClienteOportunidad();
			$("#tabOportunidad").tabs();
			$("#dialogEditarOportunidad").dialog("open");
			$("#txtProveedores").on("keypress keyup keydown", function () {
				var lb = $(this).val().split("\n").length;
				var ll = $(this).val().split("\n")[$(this).val().split("\n").length - 1];
				var r = lb + Math.floor(ll.length / 43);
				$(this).attr("rows", r);
			}).keypress();
			$("#txtFechaCierre").datepicker({
				dateFormat: "dd/mm/yy",
				minDate: new Date()
			});
			$("#tblContactoCliente",ventana).DataTables();
		}
	});
}

function AgregarOportunidad() {
	var pOportunidad = new Object();
	pOportunidad.pOportunidad = $("#txtOportunidad").val();
	pOportunidad.pIdCliente = $("#divFormaAgregarOportunidad").attr("idCliente");
	pOportunidad.pMonto = $("#txtMontoOportunidad").val().replace("$", "").replace(",", "");
	pOportunidad.pFechaCierre = $("#txtFechaCierre").val();
	pOportunidad.IdNivelInteresOportunidad = parseInt($("#cmbNivelInteresOportunidad").val());
	pOportunidad.pIdDivision = parseInt($("#cmbDivisionOportunidad").val());
	pOportunidad.pEsProyecto = parseInt($("#cmbEsProyecto").val());
	pOportunidad.pUrgente = parseInt($("#cmbUrgente").val());
	pOportunidad.pIdCampana = parseInt($("#cmbCampana").val());
	pOportunidad.pProveedores = $("#txtProveedores").val();
	pOportunidad.pUtilidad = parseInt($("#txtMargen").val());
	pOportunidad.pCosto = parseFloat($("#txtCosto").val().replace("$", "").replace(",", ""));
	var validacion = ValidarOportunidad(pOportunidad);
	if (validacion != "") {
		MostrarMensajeError(validacion);
		return false;
	}
	var oRequest = new Object();
	oRequest.pOportunidad = pOportunidad;
	SetAgregarOportunidad(JSON.stringify(oRequest));
}

function SetAgregarOportunidad(pRequest) {
	MostrarBloqueo();
	$.ajax({
		type: "POST",
		url: "Oportunidad.aspx/AgregarOportunidad",
		data: pRequest,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (pRespuesta) {
			respuesta = jQuery.parseJSON(pRespuesta.d);
			if (respuesta.Error == 0) {
				$("#grdOportunidad").trigger("reloadGrid");
			}
			else {
				MostrarMensajeError(respuesta.Descripcion);
			}
		},
		complete: function () {
			OcultarBloqueo();
			$("#dialogAgregarOportunidad").dialog("close");
		}
	});
}

function EditarOportunidad() {
	var pOportunidad = new Object();
	pOportunidad.pIdOportunidad = $("#divFormaEditarOportunidad").attr("idOportunidad");
	pOportunidad.pOportunidad = $("#txtOportunidad").val();
	pOportunidad.pIdCliente = $("#divFormaEditarOportunidad").attr("idCliente");
	pOportunidad.pIdUsuario = $("#divFormaEditarOportunidad").attr("idUsuario");
	pOportunidad.pMonto = QuitaFormatoMoneda($("#txtMontoOportunidad").val().replace("$", "").replace(",", ""));
	pOportunidad.pFechaCierre = $("#txtFechaCierre").val();
	pOportunidad.IdNivelInteresOportunidad = $("#cmbNivelInteresOportunidad").val();
	pOportunidad.pClasificacion = parseInt($("#cmbClasificacionOportunidad").val());
	pOportunidad.pDivision = parseInt($("#cmbDivisionOportunidad").val());
	pOportunidad.pCampana = parseInt($("#cmbCampana").val());
	pOportunidad.pCerrada = parseInt($("#cmbCerradaOportunidad").val());
	pOportunidad.pEsProyecto = parseInt($("#cmbEsProyectoOportunidad").val());
	pOportunidad.pUrgente = parseInt($("#cmbUrgenteOportunidad").val());
	pOportunidad.pProveedores = $("#txtProveedores").val();
	pOportunidad.pUtilidad = parseInt(QuitaFormatoMoneda($("#txtMargen").val()));
	pOportunidad.pCosto = parseFloat(QuitaFormatoMoneda($("#txtCosto").val().replace("$", "").replace(",", "")));
	var validacion = ValidarOportunidad(pOportunidad);
	if (validacion != "") {
		MostrarMensajeError(validacion);
		return false;
	}
	var oRequest = new Object();
	oRequest.pOportunidad = pOportunidad;
	SetEditarOportunidad(JSON.stringify(oRequest));
	$("#dialogEditarOportunidad").dialog("close");
}

function SetEditarOportunidad(pRequest) {
	MostrarBloqueo();
	$.ajax({
		type: "POST",
		url: "Oportunidad.aspx/EditarOportunidad",
		data: pRequest,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (pRespuesta) {
			respuesta = jQuery.parseJSON(pRespuesta.d);
			if (respuesta.Error == 0) {
				$("#grdPlanVentas").trigger("reloadGrid");
			}
			else {
				MostrarMensajeError(respuesta.Descripcion);
			}
		},
		complete: function () {
			OcultarBloqueo();
			$("#dialogEditarOportunidad").dialog("close");
		}
	});
}

function AutocompletarUsuario () {
	$("#txtUsuarioOportunidad").autocomplete({
		source: function (request, response) {
			var Usuario = new Object();
			Usuario.pUsuario = request.term;
			var pRequest = JSON.stringify(Usuario);
			$.ajax({
				type: "POST",
				url: "Oportunidad.aspx/ObtenerUsuariosAsignar",
				data: pRequest,
				dataType: "json",
				contentType: 'application/json; charset=utf-8',
				success: function (oRespuesta) {
					var json = jQuery.parseJSON(oRespuesta.d);
					response($.map(json.Table, function (item) {
						return { label: item.Usuario, value: item.Usuario, id: item.IdUsuario }
					}));
				}
			});
		},
		minLength: 1,
		select: function (event, ui) {
			var IdUsuario = ui.item.id;
			$("#divFormaEditarOportunidad").attr("idUsuario", IdUsuario);
		},
		change: function (event, ui) { },
		open: function () { $(this).removeClass("ui-corner-all").addClass("ui-corner-top"); },
		close: function () { $(this).removeClass("ui-corner-top").addClass("ui-corner-all"); }
	});
}

function AutocompletarClienteOportunidad () {
	$('#txtClienteOportunidad').autocomplete({
		source: function (request, response) {
			var pRequest = new Object();
			pRequest.pCliente = $("#txtClienteOportunidad").val();
			$.ajax({
				type: 'POST',
				url: 'Oportunidad.aspx/BuscarCliente',
				data: JSON.stringify(pRequest),
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				success: function (pRespuesta) {
					var json = jQuery.parseJSON(pRespuesta.d);
					response($.map(json.Table, function (item) {
						return { label: item.Cliente, value: item.Cliente, id: item.IdCliente, Saldo: item.Saldo }
					}));
				}
			});
		},
		minLength: 2,
		select: function (event, ui) {
			var pIdCliente = ui.item.id;
			var Saldo = ui.item.Saldo;
			$("#divFormaAgregarOportunidad, #divFormaEditarOportunidad").attr("idCliente", pIdCliente);
			$("#lvlSaldo").text(formato.moneda(Saldo, '$'));
		},
		change: function (event, ui) { },
		open: function () { $(this).removeClass("ui-corner-all").addClass("ui-corner-top"); },
		close: function () { $(this).removeClass("ui-corner-top").addClass("ui-corner-all"); }
	}).change(function () { $("#lvlSaldo").text(''); });
}

function CalculoUtilidad () {
	var Monto = parseFloat($("#txtMontoOportunidad").val().replace("$", "").replace(/,/g, ""));
	var Margen = parseInt($("#txtMargen").val());
	var Costo = parseFloat($("#txtCosto").val().replace("$", "").replace(",", ""));

	console.log($("#txtMontoOportunidad").val().replace("$", "").replace(",", ""));

	Monto = (!isNaN(Monto) && isFinite(Monto)) ? Monto : 0;
	Margen = (!isNaN(Margen) && isFinite(Margen)) ? Margen : 0;
	Costo = (!isNaN(Costo) && isFinite(Costo)) ? Costo : 0;

	Monto = (Monto == 0 && Margen > 0 && Costo > 0) ? Costo / ((100 - Margen) / 100) : Monto;
	Margen = (Margen == 0 && Costo > 0 && Monto > 0) ? Math.round((Monto - Costo) * 100 / Monto) : Margen;
	Costo = (Costo == 0 && Monto > 0 && Margen > 0) ? Monto * ((100 - Margen) / 100) : Costo;

	$("#txtMontoOportunidad").val(formato.moneda(Monto, '$'));
	$("#txtMargen").val(Margen);
	$("#txtCosto").val(formato.moneda(Costo, '$'));
}

function ValidarOportunidad (pOportunidad) {

	var error = "";
	if (pOportunidad.pOportunidad == "") {
		error += '<span>*</span> El campo de oportunidad esta vacio, favor de completarlo.<br/>';
	}
	if (pOportunidad.pIdCliente == "" || pOportunidad.pIdCliente == 0 || pOportunidad.pIdCliente == null || pOportunidad.pIdCliente == undefined) {
		error += '<span>*</span> Favor de selecionar el cliente de la oportunidad.<br/>';
	}
	if (pOportunidad.pMonto == "") {
		error += '<span>*</span> El campo del monto de la oprotunidad esta vacio, favor de completarlo.<br/>';
	}
	if (isNaN(pOportunidad.pMonto)) {
		error += '<span>*</span> El monto debe ser numerico y no puede llevar signos ni comas.<br/>';
	}
	if (pOportunidad.pIdNivelInteresOportunidad == "") {
		error += '<span>*</span> Favor de selecionar el nivel de interés de la oportunidad.<br/>';
	}
	if (pOportunidad.pUrgente == 1 && pOportunidad.IdNivelInteresOportunidad != 1) {
		error += '<span>*</span> Únicamente las oportunidades con nivel de interes alto pueden ser urgentes.<br/>';
	}
	if (error != "") {
		error = '<p>Favor de completar los siguientes requisitos:</p>' + error;
	}
	return error;
}
