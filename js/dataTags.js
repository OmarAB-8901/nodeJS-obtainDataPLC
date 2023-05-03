let totLines = 2;
let totButtons = 4;
let andonTags = [];
let bdEntradasTags = [];

for(let i=1; i<=totLines; i++){

	andonTags.push({tag: `ns=3;s=[PLC_ANDON]linea_entradas_andon[${i}].sol_lider`, type: "Int32"});
	andonTags.push({tag: `ns=3;s=[PLC_ANDON]linea_entradas_andon[${i}].totalsensor`, type: "Int32"});
	andonTags.push({tag: `ns=3;s=[PLC_ANDON]linea_entradas_andon[${i}].retro_lider`, type: "Int32"});
	andonTags.push({tag: `ns=3;s=[PLC_ANDON]linea_entradas_andon[${i}].Return`, type: "Int32"});

	for(let j=1; j<= totButtons; j++)
		andonTags.push({tag: `ns=3;s=[PLC_ANDON]linea_entradas_andon[${i}].operador[${j}]`, type: "Int32"});		

	bdEntradasTags.push({tag: `ns=3;s=[PLC_ANDON]BD_Entradas_OEE.Ready[${i}]`, type: "Bool"});
	bdEntradasTags.push({tag: `ns=3;s=[PLC_ANDON]BD_Entradas_OEE.Run[${i}]`, type: "Bool"});
	bdEntradasTags.push({tag: `ns=3;s=[PLC_ANDON]BD_Entradas_OEE.TotalParts[${i}]`, type: "Int32"});
	bdEntradasTags.push({tag: `ns=3;s=[PLC_ANDON]BD_Entradas_OEE.Scrap[${i}]`, type: "Int32"});
	bdEntradasTags.push({tag: `ns=3;s=[PLC_ANDON]BD_Entradas_OEE.ICT[${i}]`, type: "Float"});
	bdEntradasTags.push({tag: `ns=3;s=[PLC_ANDON]BD_Entradas_OEE.HabSensor[${i}]`, type: "Bool"});
	bdEntradasTags.push({tag: `ns=3;s=[PLC_ANDON]BD_Entradas_OEE.loteid[${i}]`, type: "Int32"});
	bdEntradasTags.push({tag: `ns=3;s=[PLC_ANDON]BD_Entradas_OEE.parteid[${i}]`, type: "Int32"});
}

export default {
	events: [
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_Event[0].Read", type: "Bool"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_Event[0].IdEvento", type: "Int31"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_Event[0].IdMachine", type: "String"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_Event[0].Starttime", type: "String"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_Event[0].Endtime", type: "String"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_Event[0].Type", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_Event[0].Description", type: "String"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_Event[0].Duration", type: "Int32"},
	],
	oee: [
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].Read", type: "Bool"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].Idmachine", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].Dttimecaptura", type: "String"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].OEE", type: "Float"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].Availability", type: "Float"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].Running", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].Available", type: "Float"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].Performance", type: "Float"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].ICT", type: "Float"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].TotalParts", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].Quality", type: "Float"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].GoodParts", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].LoteId", type: "String"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].ParteId", type: "String"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].ShiftId", type: "Float"}
	],
	analogicas:{},
	bd_entradas: bdEntradasTags,
	andon: andonTags,
	tag_escritura: [
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].Return", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]FIFO_WC_Event[0].Return", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]Write_date_from_server", type: "Bool"},
		{tag: "ns=3;s=[PLC_ANDON]From_server_String", type: "String"},
		{tag: "ns=3;s=[PLC_ANDON]Alm_Falla_Com_DXM.Alm", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]Alm_Falla_Com_Server.Alm", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]Alm_Falla_Energia.Alm", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]Alm_Falla_Com_DXM.Res", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]Alm_Falla_Com_Server.Res", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]Alm_Falla_Energia.Res", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]wachdog_server_tx", type: "Int32"},
		{tag: "ns=3;s=[PLC_ANDON]wachdog_server_rx", type: "Int32"},
	],
	otras: []
};