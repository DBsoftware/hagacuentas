import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../../../core/_services';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  idTip;
  dataTip = { id: "", title: "TÍTULO", content: '', description:'', image_share: "", descriptionTipComp: ""};

  constructor(
    _seo: SeoService,
    private _route:ActivatedRoute
  ) {
    switch (`${this._route.snapshot.params.idCategory}_${this._route.snapshot.params.id}`) {
      case '1_28':
        _seo.addTags('5_pasos_para_lograr_la_independencia_financiera')
        break;
      case '1_33':
        _seo.addTags('Cómo_planear_las_vacaciones_a_última_hora')
        break;
      case '1_34':
        _seo.addTags('¿Sabia_que_un_colombiano_que_reside_en_el_exterior_puede_invertir_en_Colombia?')
        break;
      case '1_35':
        _seo.addTags('Ahorre_tiempo_y_plata_anticipando_sus_compras_de_navidad')
        break;
      case '1_36':
        _seo.addTags('Para_decorar_su_casa_en_navidad,_no_necesita_acabar_con_su_bolsillo')
        break;
      case '1_37':
        _seo.addTags('Recomendaciones_financieras_para_las_festividades_decembrinas')
        break;
      case '1_39':
        _seo.addTags('¿Cómo_obtener_un_buen_historial_crediticio_en_las_centrales_de_riesgo?')
        break;
      case '1_40':
        _seo.addTags('No_deje_que_la_prima_se_vaya')
        break;
      case '1_41':
        _seo.addTags('Revise_su_situación_financiera_antes_de_terminar_2018')
        break;
      case '1_42':
        _seo.addTags('Prepare_sus_finanzas_personales_y_familiares_para_el_nuevo_año')
        break;
      case '1_43':
        _seo.addTags('¿Qué_debe_tener_en_cuenta_para_comenzar_el_nuevo_año?')
        break;
      case '1_46':
        _seo.addTags('Mesada:_la_oportunidad_para_aprender_a_manejar_el_dinero')
        break;
      case '1_47':
        _seo.addTags('Pase_del_ahorro_a_la_inversión')
        break;
      case '1_50':
        _seo.addTags('Controle_su(s)_peso(s)_en_el_gimnasio')
        break;
      case '1_51':
        _seo.addTags('¿Qué_debe_tener_en_cuenta_a_la_hora_de_invertir?')
        break;
      case '1_56':
        _seo.addTags('¿Cómo_enfrentar_el_sobre-endeudamiento?')
        break;
      case '1_62':
        _seo.addTags('¿Cómo_elegir_una_cantidad_financiera_para_solicitar_un_crédito?')
        break;
      case '1_63':
        _seo.addTags('Cómo_aprovechar_los_beneficios_de_seguros_de_sus_tarjetas_de_crédito')
        break;
      case '1_64':
        _seo.addTags('Cómo_aprovechar_los_beneficios_de_asistencias_de_sus_tarjetas_de_crédito')
        break;
      case '1_65':
        _seo.addTags('Recomendaciones_para_el_buen_uso_de_la_Tarjeta_de_Crédito')
        break;
      case '1_83':
        _seo.addTags('Acciones_en_el_hogar_que_le_ayudarán_a_controlar_sus_gastos')
        break;
      case '1_87':
        _seo.addTags('5_libros_para_aprender_sobre_finanzas_personales')
        break;
      case '1_88':
        _seo.addTags('La_regla_50_20_30')
        break;
      case '1_89':
        _seo.addTags('5_recomendaciones_para_controlar_los_gastos_pequeños')
        break;
      case '1_94':
        _seo.addTags('Conozca_más_sobre_inversiones_financieras')
        break;
      case '1_96':
        _seo.addTags('Micrometas_como_puntos_de_control')
        break;
      case '1_97':
        _seo.addTags('Ojo_con_los_pequeños_gastos')
        break;
      case '1_101':
        _seo.addTags('Avances_en_seguridad_digital')
        break;
      case '1_116':
        _seo.addTags('Tips_para_ahorrar_a_la_hora_de_hacer_compras')
        break;
      case '1_117':
        _seo.addTags('Buenos_hábitos_de_las_personas_exitosas')
        break;
      case '1_118':
          _seo.addTags('Los_gastos_que_descuadran_su_presupuesto')
        break;
      case '2_30':
          _seo.addTags('¡Tome_ya_la_decisión_de_ahorrar!')
        break;
      case '2_45':
          _seo.addTags('Ahorre_en_sus_servicios_de_telecomunicaciones')
        break;
      case '2_52':
          _seo.addTags('Cómo_ahorrar_en_fechas_especiales')
        break;
      case '2_54':
          _seo.addTags('Cómo_ahorrar_en_los_gastos_de_su_mascota')
        break;
      case '2_55':
          _seo.addTags('La_importancia_del_ahorro_y_los_seguros_en_la_familia')
        break;
      case '2_60':
          _seo.addTags('¿Sabe_cómo_funcionan_los_bolsillos_de_ahorro?')
        break;
      case '2_61':
          _seo.addTags('La_cuenta_de_ahorro_para_Pensionados')
        break;
      case '2_92':
          _seo.addTags('4_recomendaciones_para_controlar_pequeños_gastos')
        break;
      case '2_105':
          _seo.addTags('Conozca_las_diferencias_entre_ahorrar_e_invertir')
        break;
      case '2_106':
          _seo.addTags('La_importancia_de_enseñarle_a_ahorrar_a_los_niños')
        break;
      case '2_120':
          _seo.addTags('En_el_mes_del_ahorro,_lo_invitamos_a_ser_una_ardilla')
        break;
      case '2_122':
          _seo.addTags('Mitos_sobre_el_ahorro')
        break;
      case '2_123':
          _seo.addTags('Novios,_amigos_y_ahorradores')
        break;
      case '3_53':
          _seo.addTags('Cómo_funciona_el_crédito_en_las_tarjetas_de_crédito')
        break;
      case '3_119':
          _seo.addTags('5_beneficios_de_las_tarjetas_de_crédito_virtuales')
        break;
      case '4_48':
          _seo.addTags('La_banca_digital_es_para_usted')
        break;
      case '4_57':
          _seo.addTags('Seguridad_en_la_banca_virtual')
        break;
      case '4_99':
          _seo.addTags('¿Qué_es_la_disrupción_digital?')
        break;
      case '4_100':
          _seo.addTags('Más_canales_para_realizar_sus_transacciones_bancarias')
        break;
      case '4_102':
          _seo.addTags('Uso_seguro_de_los_canales_digitales')
        break;
      case '4_103':
          _seo.addTags('Domiciliación:_el_pago_de_sus_servicios,_siempre_al_día')
        break;
      case '4_104':
          _seo.addTags('Beneficios_de_la_banca_digital')
        break;
      case '4_107':
          _seo.addTags('¿Cómo_hacer_pagos_a_través_de_PSE?')
        break;
      case '4_108':
          _seo.addTags('Pague_los_servicios_públicos_sin_salir_de_casa')
        break;
      case '4_109':
          _seo.addTags('Facturas_electrónicas:_ayude_al_planeta_y_pague_desde_su_casa')
        break;
      case '4_110':
          _seo.addTags('El_tiempo_es_oro._!No_lo_desperdicie_pagando_facturas!')
        break;
      case '4_111':
          _seo.addTags('Pagos_y_transferencias_a_través_de_dispositivos_móviles')
        break;
      case '4_112':
          _seo.addTags('Mitos_sobre_la_banca_digital')
        break;
      case '4_115':
          _seo.addTags('Un_código_QR_puede_arreglarle_el_día')
        break;
      case '5_82':
          _seo.addTags('¿Conoce_cómo_funcionan_las_pólizas_exequiales?')
        break;
      case '5_84':
          _seo.addTags('Asegure_la_educación_de_sus_hijos_y_viva_tranquilo')
        break;
      case '5_85':
          _seo.addTags('¿Sabe_cómo_funciona_el_seguro_de_desempleo?')
        break;
      case '5_86':
          _seo.addTags('Seguros_no_convencionales')
        break;
      case '5_98':
          _seo.addTags('Prepárese_para_Declarar_Renta_en_el_2019')
        break;
      case '6_31':
          _seo.addTags('Cómo_aprovechar_los_alimentos_orgánicos_y_cuidar_el_bolsillo')
        break;
      case '6_38':
          _seo.addTags('Ideas_de_menú_navideño')
        break;
      case '6_44':
          _seo.addTags('4_propósitos_financieros_para_este_nuevo_año')
        break;
      case '6_58':
          _seo.addTags('¿Cómo_manejar_el_apoyo_económico_que_pueden_requerir_sus_familiares?')
        break;
      case '6_59':
          _seo.addTags('Los_errores_más_comunes_a_la_hora_de_manejar_las_finanzas_en_pareja')
        break;
      case '6_66':
          _seo.addTags('¿Cómo_construir_patrimonio_en_pareja?')
        break;
      case '6_90':
          _seo.addTags('El_manejo_del_dinero_ante_la_muerte_de_un_ser_querido')
        break;
      case '6_93':
          _seo.addTags('¿Cómo_administrar_mejor_el_dinero_en_pareja?')
        break;
      case '6_95':
          _seo.addTags('Involucre_a_sus_hijos_en_las_finanzas')
        break;
      case '8_29':
          _seo.addTags('Aproveche_los_beneficios_del_seguro_de_su_vehículo')
        break;
      case '8_32':
          _seo.addTags('Beneficios_de_comprar_vivienda')
        break;
      case '8_49':
          _seo.addTags('¿Pensando_en_remodelar?')
        break;
      case '8_113':
          _seo.addTags('Viaje_feliz_en_su_vehículo')
        break;
      case '8_114':
          _seo.addTags('Su_vivienda,_lo_más_importante')
        break;
      case '9_81':
          _seo.addTags('¿Cómo_impactan_los_indicadores_económicos_sus_finanzas_personales?')
        break;
      case '9_91':
          _seo.addTags('¿Qué_tanto_impacta_el_precio_del_dólar_las_finanzas_personales_de_los_colombianos?')
        break;
    }

   }

  ngOnInit() {
    this.idTip = this._route.snapshot.params.id;
  }

}

