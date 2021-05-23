function siparisDetayUrlGetir(kod, mail) {
    $.ajax({
        method: "POST",
        url: rootDirectory + "ajax.php",
        dataType: "json",
        data: {
            ajaxType: "siparisDetayUrlGetir",
            kod: kod,
            mail: mail
        }
    }).done(function(msg) {
        window.location = msg.url;
    });
}

function ajaxBaglantiGetir() {
    var xmlhttpajaxBaglantiGetir;
    if (window.XMLHttpRequest) {
        xmlhttpajaxBaglantiGetir = new XMLHttpRequest();
    } else {
        xmlhttpajaxBaglantiGetir = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttpajaxBaglantiGetir.overrideMimeType) {
        xmlhttpajaxBaglantiGetir.overrideMimeType('text/xml; charset=utf-8');
    }
    return xmlhttpajaxBaglantiGetir;
}
var xmlhttpcheckAramaMotoru;

function aramaMotoru(val) {
    var div = ".aramaMotoruDiv";
    xmlhttpcheckAramaMotoru = null;
    xmlhttpcheckAramaMotoru = ajaxBaglantiGetir();
    xmlhttpcheckAramaMotoru.onreadystatechange = function() {
        if (xmlhttpcheckAramaMotoru.readyState == 4 && xmlhttpcheckAramaMotoru.status == 200) {
            var donen = xmlhttpcheckAramaMotoru.responseText;
            donen = $.trim(donen);
            if (donen != "") {
                $(div).html(donen);
                $(".aramaMotoruDiv").slideDown("fast");
                $(".aramaMotoruKapat").slideDown("fast");
            } else {
                $(".aramaMotoruKapat").hide();
                $(".aramaMotoruDiv").hide();
            }
        }
    }
    xmlhttpcheckAramaMotoru.open("POST", rootDirectory + "aramaMotoruAjax.php?a=" + val, true);
    xmlhttpcheckAramaMotoru.send();
}

function karsilastirmaChange(id, thisGelen, durum) {
    var checked = $(thisGelen).is(":checked");
    var check = "";
    if (checked == true || durum == "ekle")
        check = "ekle";
    else if (checked == false || durum == "kaldir")
        check = "kaldir";
    $.ajax({
        method: "POST",
        url: rootDirectory + "ajax.php",
        dataType: "json",
        data: {
            ajaxType: "karsilastirmaCheck",
            id: id,
            check: check
        }
    }).done(function(msg) {
        karsilastirmaEnd(msg);
    });
}

function favorilerChange(tip, anaurunID, template) {
    $.ajax({
        method: "POST",
        url: rootDirectory + "ajax.php",
        dataType: "json",
        data: {
            ajaxType: "favoriCheck",
            id: anaurunID,
            tip: tip,
            template: template
        }
    }).done(function(msg) {
        favorilerEnd(msg);
    });
}

function yorumsayfalama(div, page, tur, anaurunID) {
    $.ajax({
        method: "POST",
        url: rootDirectory + "ajax.php",
        dataType: "json",
        data: {
            ajaxType: "yorumGetir",
            div: div,
            page: page,
            id: anaurunID,
            template: tur
        }
    }).done(function(msg) {
        $("#" + msg.div).html(msg.data);
    });
}

function yorumsirala(div, olcut, tur, anaurunID) {
    $.ajax({
        method: "POST",
        url: rootDirectory + "ajax.php",
        dataType: "json",
        data: {
            ajaxType: "yorumGetir",
            div: div,
            olcut: olcut,
            id: anaurunID,
            template: tur
        }
    }).done(function(msg) {
        $("#" + msg.div).html(msg.data);
    });
}

function mailKontrol(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(email);
}

function sehirGetir(ulkeler_id, sehirler_select_id) {
    $.ajax({
        method: "POST",
        url: rootDirectory + "ajax.php",
        dataType: "json",
        data: {
            ajaxType: "sehirGetir",
            id: ulkeler_id,
            sehirler_select_id: sehirler_select_id
        }
    }).done(function(msg) {
        $("#" + msg.sehirler_select_id).html(msg.data);
    });
}

function siparisSayfaKaydet(url) {
    if (url == undefined)
        url = "";
    var teslimat_musteri_adresleri_id = 0;
    var fatura_musteri_adresleri_id = 0;
    var farkli_fatura = false;
    var ulkeler_idTeslimat = $("#ulkeler_idTeslimat").val();
    var sehirler_idTeslimat = $("#sehirler_idTeslimat").val();
    var ulkeler_idFatura = $("#ulkeler_idFatura").val();
    var sehirler_idFatura = $("#sehirler_idFatura").val();
    var unvan_adsoyadTeslimat = $("#unvan_adsoyadTeslimat").val();
    var eposta_adresiTeslimat = $("#eposta_adresiTeslimat").val();
    var telefonTeslimat = $("#telefonTeslimat").val();
    var telefonTeslimat_kod = $("#telefonTeslimat_kod").val();
    var telefonTeslimat_ulke = $("#telefonTeslimat_ulke").val();
    var gsmTeslimat = $("#gsmTeslimat").val();
    var gsmTeslimat_kod = $("#gsmTeslimat_kod").val();
    var gsmTeslimat_ulke = $("#gsmTeslimat_ulke").val();
    var adresTeslimat = $("#adresTeslimat").val();
    var ilceTeslimat = $("#ilceTeslimat").val();
    var faturaAdresTipi = $("#faturaAdresTipi").val();
    var unvanFatura = $("#unvanFatura").val();
    var vergiNumarasiFatura = $("#vergiNumarasiFatura").val();
    var vergiDairesiFatura = $("#vergiDairesiFatura").val();
    var adSoyadFatura = $("#adSoyadFatura").val();
    var tcFatura = $("#tcFatura").val();
    var adresFatura = $("#adresFatura").val();
    var ilceFatura = $("#ilceFatura").val();
    var telefonFatura = $("#telefonFatura").val();
    var telefonFatura_kod = $("#telefonFatura_kod").val();
    var telefonFatura_ulke = $("#telefonFatura_ulke").val();
    var gsmFatura = $("#gsmFatura").val();
    var gsmFatura_kod = $("#gsmFatura_kod").val();
    var gsmFatura_ulke = $("#gsmFatura_ulke").val();
    if (ulkeler_idTeslimat != undefined) {
        farkli_fatura = $("#farkli_fatura_uyeliksiz").is(':checked');
    } else {
        teslimat_musteri_adresleri_id = $("#teslimat_musteri_adresleri_id").val();
        farkli_fatura = $("#farkli_fatura").is(':checked');
        if (farkli_fatura)
            fatura_musteri_adresleri_id = $("#fatura_musteri_adresleri_id").val();
    }
    var hediye_paketi = $("input[name='hediye_paketi']:checked").val();
    var hediyenotu = $("#hediyenotu").val();
    var hediye_paketleri = "";
    var odemeTipi = $("#odemeTipi").val();
    hediye_paketi = (hediye_paketi == undefined) ? 0 : hediye_paketi;
    if (hediye_paketi > 0) {
        $(".hediyePaketiCheck").each(function() {
            if ($(this).is(':checked')) {
                var id = $(this).attr("data-id");
                hediye_paketleri += (hediye_paketleri != "") ? "," : "";
                hediye_paketleri += id + "-";
                var adet = $(".hediyePaketiAdet[data-id=" + id + "]").val();
                hediye_paketleri += adet;
            }
        });
    }
    var kargo_firmalari_id = $("input[name='kargo_firmalari_id']:checked").val();
    var sozlesme = $("#sozlesme").is(':checked');
    $.ajax({
        method: "POST",
        url: rootDirectory + "ajax.php",
        dataType: "json",
        data: {
            ajaxType: "siparisSayfaKaydet",
            teslimat_musteri_adresleri_id: teslimat_musteri_adresleri_id,
            fatura_musteri_adresleri_id: fatura_musteri_adresleri_id,
            hediyenotu: hediyenotu,
            farkli_fatura: farkli_fatura,
            sozlesme: sozlesme,
            hediye_paketi: hediye_paketi,
            hediye_paketleri: hediye_paketleri,
            kargo_firmalari_id: kargo_firmalari_id,
            odemeTipi: odemeTipi,
            ulkeler_idTeslimat: ulkeler_idTeslimat,
            sehirler_idTeslimat: sehirler_idTeslimat,
            ulkeler_idFatura: ulkeler_idFatura,
            sehirler_idFatura: sehirler_idFatura,
            unvan_adsoyadTeslimat: unvan_adsoyadTeslimat,
            eposta_adresiTeslimat: eposta_adresiTeslimat,
            telefonTeslimat: telefonTeslimat,
            telefonTeslimat_kod: telefonTeslimat_kod,
            telefonTeslimat_ulke: telefonTeslimat_ulke,
            gsmTeslimat: gsmTeslimat,
            gsmTeslimat_kod: gsmTeslimat_kod,
            gsmTeslimat_ulke: gsmTeslimat_ulke,
            adresTeslimat: adresTeslimat,
            faturaAdresTipi: faturaAdresTipi,
            unvanFatura: unvanFatura,
            vergiNumarasiFatura: vergiNumarasiFatura,
            vergiDairesiFatura: vergiDairesiFatura,
            adSoyadFatura: adSoyadFatura,
            tcFatura: tcFatura,
            adresFatura: adresFatura,
            ilceFatura: ilceFatura,
            ilceTeslimat: ilceTeslimat,
            telefonFatura: telefonFatura,
            telefonFatura_kod: telefonFatura_kod,
            telefonFatura_ulke: telefonFatura_ulke,
            gsmFatura: gsmFatura,
            gsmFatura_kod: gsmFatura_kod,
            gsmFatura_ulke: gsmFatura_ulke,
            url: url
        }
    }).done(function(msg) {
        if (msg.url != "") {
            if (msg.url == "reload") {
                window.location.reload();
            } else {
                window.location = msg.url;
            }
        } else {
            $("#basketTotal").html(msg.data);
        }
    });
}

function siparisSayfaKaydetAdim2() {
    var odemeTipi = $("#odemeTipi").val();
    $.ajax({
        method: "POST",
        url: rootDirectory + "ajax.php",
        dataType: "json",
        data: {
            ajaxType: "siparisSayfaKaydet",
            kayit: "odemeAdim2",
            odemeTipi: odemeTipi
        }
    }).done(function(msg) {
        $("#basketTotal").html(msg.data);
    });
}

function adresGetir(id, div) {
    $.ajax({
        method: "POST",
        url: rootDirectory + "ajax.php",
        dataType: "json",
        data: {
            ajaxType: "adresGetir",
            id: id,
            div: div
        }
    }).done(function(msg) {
        $("#" + msg.div).html(msg.data);
        $("#" + msg.div).show();
    });
}

function varyantClickFunction() {
    $(".varyantSecenek").click(function() {
        var id = $(this).attr("data-id");
        var varyantlar_id = $(this).attr("data-varyant-id");
        var sira = parseInt($(this).attr("data-sira"));
        var toplam = parseInt($(this).attr("data-toplam"));
        var anaUrunID = $(this).attr("data-anaurun-id");
        var varyantsira = $(this).attr("data-varyantsira");
        var xmlhttpcheck;
        if (window.XMLHttpRequest)
            xmlhttpcheck = new XMLHttpRequest();
        else
            xmlhttpcheck = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttpcheck.onreadystatechange = function() {
            if (xmlhttpcheck.readyState == 4 && xmlhttpcheck.status == 200) {
                if (xmlhttpcheck.responseText.indexOf("location:") > -1) {
                    var a = xmlhttpcheck.responseText.split("location:");
                    window.location = a[1];
                } else {
                    for (var i = sira + 1; i <= toplam; i++) {
                        $("#varyant_" + i).remove();
                    }
                    $("#varyantlar").html($("#varyantlar").html() + xmlhttpcheck.responseText);
                    varyantClickFunction();
                }
            }
        }
        xmlhttpcheck.open("POST", rootDirectory + "varyant-getirAjax.php?id=" + id + "&varyantlar_id=" + varyantlar_id + "&sira=" + sira + "&anaUrunID=" + anaUrunID + "&varyantsira=" + varyantsira + "&toplam=" + toplam, true);
    });
}
var ajaxGetirSayfaCache = {};

function ajaxGetirSayfa(url, item, push) {
    if (url == "javascript:;")
        return;
    ajaxGetirLoadingStart();
    url = String(url);
    if ((ajaxGetirCacheActive) && (url in ajaxGetirSayfaCache)) {
        $(item).html(ajaxGetirSayfaCache[url]);
        $("#pageBody").attr("data-code", $("#page_code").val());
        codeJSReady();
        eticaretJsReadey();
        ajaxGetirLoadingEnd();
    } else {
        $.ajax({
            type: "post",
            url: url,
            data: {
                "ajax": "1"
            },
            success: function(cevap) {
                cevap = cevap.trim();
                $(item).html(cevap);
                $("#pageBody").attr("data-code", $("#page_code").val());
                $("title").html($("#page_title").val());
                $("meta[name='title']").attr('content', $("#page_title").val());
                $("meta[name='description']").attr('content', $("#page_description").val());
                $("meta[name='keywords']").attr('content', $("#page_keywords").val());
                ajaxGetirSayfaCache[url] = cevap;
                codeJSReady();
                eticaretJsReadey();
                ajaxGetirLoadingEnd();
            }
        });
    }
    if (push) {
        history.pushState({
            name: url
        }, '', url);
    }
    try {
        var urlClear = url.replace(rootDirectory, "");
        if (urlClear != "") {
            urlClear = urlClear.replace(".html", "");
            urlClear = urlClear.split("?");
            urlClear = urlClear[0];
            urlClear = urlClear.split("/");
            urlClear = urlClear[urlClear.length - urlTypeInc];
        }
        if (urlClear == "")
            urlClear = "index";
        $("#pageBody").attr("data-page", urlClear);
    } catch (e) {}
}

function filtreleSon(url) {
    try {
        if (ajaxGetirActive) {
            ajaxGetirYonlendir(url, true);
        } else {
            window.location = url;
        }
    } catch (e) {
        window.location = url;
    }
}

function codeJSReady() {
    var aramaMotoruBeklet = "";
    $(".aramaMotoru").keyup(function() {
        clearInterval(aramaMotoruBeklet);
        var e = $(this);
        aramaMotoruBeklet = setInterval(function() {
            var val = e.val();
            if (val != "" && val != undefined) {
                aramaMotoru(val);
            } else {
                $(".aramaMotoruDiv").hide();
                $(".aramaMotoruKapat").hide();
            }
            clearInterval(aramaMotoruBeklet);
        }, 300);
    });
    $(".aramaMotoruKapat").click(function() {
        $(".aramaMotoruKapat").hide();
        $(".aramaMotoruDiv").hide();
        $(".aramaMotoru").val("");
    });
    $("#ulkeler_id").change(function() {
        var id = $(this).val();
        sehirGetir(id, "sehirler_id");
    });
    $(".musteri_adresleri_id").change(function() {
        var id = $(this).val();
        var div = $(this).attr("data-div");
        var url = (div == "teslimat_adresDiv") ? $(this).attr("data-url") : '';
        if (div == "fatura_adresDiv") {
            if (id != 0) {
                adresGetir(id, div);
            } else {
                $("#" + div).hide();
            }
            $("#fatura_musteri_adresleri_id").val(id);
        } else {
            $("#teslimat_musteri_adresleri_id").val(id);
        }
        siparisSayfaKaydet(url);
    });
    sehirGetirLoad = true;
    $("#ulkeler_idTeslimat").change(function() {
        var url = $(this).attr("data-url");
        siparisSayfaKaydet(url);
    });
    $("#ulkeler_idFatura").change(function() {
        var id = $(this).val();
        sehirGetir(id, "sehirler_idFatura");
        siparisSayfaKaydet('');
    });
    $("#sehirler_idTeslimat, #sehirler_idFatura, #faturaAdresTipi").change(function() {
        siparisSayfaKaydet('');
    });
    $(".uyeliksizText").blur(function() {
        siparisSayfaKaydet('');
    });
    $("input[name=kargo_firmalari_id]").click(function() {
        siparisSayfaKaydet('reload');
    });
    $('input[name=odemeButonu]').click(function() {
        $(this).addClass("treeDisabled");
        var result = odemeKontrol(this);
        if (!result)
            $(this).removeClass("treeDisabled");
        return result;
    });
    $('input[name=odemeButonuAdim1]').click(function() {
        $(this).addClass("treeDisabled");
        var result = odemeAdim1(this);
        if (!result)
            $(this).removeClass("treeDisabled");
        return result;
    });
    $('input[name=odemeButonuAdim2]').click(function() {
        $(this).addClass("treeDisabled");
        var result = odemeAdim2(this);
        if (!result)
            $(this).removeClass("treeDisabled");
        return result;
    });
    $('.sepeteEkleListe').on("click", function() {
        var id = $(this).attr("data-id");
        sepetDuzenle(id, 1, "add", "");
    });
    $('.sepeteEkleCoklu').on("click", function() {
        var data = [];
        $(".urunlerSepetAdet").each(function() {
            var adet = parseInt($(this).val()) || 0;
            if (adet != 0) {
                var obj = {
                    id: $(this).data("id"),
                    adet: adet
                }
                data.push(obj);
            }
        });
        if (data.length <= 0) {
            sepeteEkleEnd({
                status: "noproduct"
            });
        } else {
            sepetDuzenle(0, data, "add", "");
        }
    });
    $('.sepeteEkleGrupUrun').on("click", function() {
        var count = parseInt($(this).data("catcount"));
        var id = $(this).data("id");
        var data = [];
        $(".grupUrunRadio").each(function() {
            if ($(this).prop('checked')) {
                var gid = $(this).data("id");
                var group = $(this).data("group");
                var adetVar = $("#grup_" + group + "_adet_" + gid).val() != undefined;
                var adet = adetVar ? parseInt($("#grup_" + group + "_adet_" + gid).val()) : 1;
                if (adet > 0) {
                    data.push(gid + ":" + adet);
                }
            }
        });
        if (data.length < count) {
            sepeteEkleEnd({
                status: "noproduct"
            });
        } else {
            sepetDuzenle(id, data, "addGroup", "");
        }
    });
    $(".sepeteEkleAdet").click(function() {
        sepeteEkleAdet(this, "add");
    });
    $(".hizliSatinAlAdet").click(function() {
        sepeteEkleAdet(this, "hizli");
    });
    $('.sepetSatirDuzenle').click(function() {
        var id = $(this).attr("data-id");
        var deger = $(this).attr("data-deger");
        var grup = $(this).attr("data-grup");
        var val = 0;
        var nesne = "";
        if (grup != undefined && grup != "") {
            nesne = "input[name='sepet_adet_" + id + "'][data-deger='" + deger + "'][data-grup='" + grup + "']";
        } else if (deger != undefined && deger != "") {
            nesne = "input[name='sepet_adet_" + id + "'][data-deger='" + deger + "']";
        } else {
            nesne = "input[name='sepet_adet_" + id + "']";
        }
        $(nesne).each(function() {
            val += parseInt($(this).val());
        });
        sepetDuzenle(id, val, "set", deger, grup);
    });
    $('.sepetSatirSil').click(function() {
        var id = $(this).attr("data-id");
        var yeniAdet = 0;
        if ($(this).attr("data-adet") != undefined)
            yeniAdet = parseInt($(this).attr("data-adet"));
        var val = (yeniAdet > 0) ? yeniAdet : $("#sepet_adet_" + id).val();
        sepetDuzenle(id, val, "sil", $(this).attr("data-deger"), $(this).attr("data-grup"));
    });
    $('.sepet_adet').keyup(function() {
        if ($(this).attr("data-type") == "tam") {} else {}
    });
    $("#farkli_fatura").click(function() {
        var teslimatVal = $("#teslimat_musteri_adresleri_id").val();
        var telimat_uyarival = $(this).attr("telimat_uyarival");
        if ($(this).is(':checked') && teslimatVal != "0" && teslimatVal != "" && teslimatVal != undefined) {
            $("#otherAddressDetails").show();
        } else if (teslimatVal == "0" || teslimatVal == "" || teslimatVal == undefined) {
            swal({
                title: '',
                text: telimat_uyarival
            });
            $(this).attr('checked', false);
        } else {
            $("#otherAddressDetails").hide();
        }
        siparisSayfaKaydet('');
    });
    $("#hediyenotu").focusout(function() {
        siparisSayfaKaydet('');
    });
    $("input[name=hediye_paketi]").click(function() {
        if ($(this).val() == "1")
            $("#giftDetails").show();
        else
            $("#giftDetails").hide();
        siparisSayfaKaydet('');
    });
    $("input[name=hediye_paketi2]").click(function() {
        if ($(this).is(":checked"))
            $("#giftDetails").show();
        else
            $("#giftDetails").hide();
        siparisSayfaKaydet('');
    });
    $(".hediyePaketiCheck").click(function() {
        var id = $(this).attr("data-id");
        $(".hediye_paketleri_detay_class").hide();
        if ($(this).is(':checked')) {
            $("#hediye_paketleri_detay_" + id).show();
        } else {
            $("#hediye_paketleri_detay_" + id).hide();
        }
        $(".hediyePaketiAdet[data-id=" + id + "]").trigger("change");
        siparisSayfaKaydet('');
    });
    $(".hediyePaketiAdet").change(function() {
        var id = $(this).attr("data-id");
        var adet = $(this).val();
        $.ajax({
            method: "POST",
            url: rootDirectory + "ajax.php",
            dataType: "json",
            data: {
                ajaxType: "hediyePaketiAdet",
                id: id,
                adet: adet
            }
        }).done(function(msg) {
            $("#hediye_paketleri_hesap_" + msg.id).html(msg.data);
            siparisSayfaKaydet('');
        });
    });
    $(".goAdresButton").click(function() {
        siparisSayfaKaydet($(this).attr("data-url"));
    });
    $(".filtreSolMenu").click(function() {
        var id = $(this).attr("data-id");
        var top_id = $(this).attr("data-top-id");
        var type = $(this).attr("data-type");
        var minval = $(this).attr("data-min");
        var maxval = $(this).attr("data-max");
        var checked = $(this).is(':checked');
        var pageGet = $("#pageBody").attr("data-get");
        var pageUrl = $("#pageBody").attr("data-url");
        $.ajax({
            method: "POST",
            url: 
          + "filtreleAjax.php",
            dataType: "json",
            data: {
                ajaxType: "filtrele",
                id: id,
                type: type,
                checked: checked,
                top_id: top_id,
                minval: minval,
                maxval: maxval,
                pageGet: pageGet,
                pageUrl: pageUrl
            }
        }).done(function(msg) {
            filtreleSon(msg.data);
        });
    });
    $(".filter-run").click(function() {
        var data = [];
        $(this).parent().find(".filtreSolButon:checkbox:checked").each(function() {
            var obj = {
                type: $(this).data("type"),
                id: $(this).data("id"),
                top_id: $(this).data("top-id"),
                minval: $(this).data("min"),
                maxval: $(this).data("max")
            }
            data.push(obj);
        });
        var datatext = JSON.stringify(data);
        var top_id = $(this).attr("data-top-id");
        var type = $(this).attr("data-type");
        var pageGet = $("#pageBody").attr("data-get");
        var pageUrl = $("#pageBody").attr("data-url");
        $.ajax({
            method: "POST",
            url: 
          
          + "filtreleAjax.php",
            dataType: "json",
            data: {
                ajaxType: "filtrele",
                typeFull: "t",
                type: type,
                top_id: top_id,
                data: datatext,
                pageGet: pageGet,
                pageUrl: pageUrl
            }
        }).done(function(msg) {
            filtreleSon(msg.data);
        });
    });
    $("#kart_numarasi").keyup(function() {
        kartNoDegis();
    });
    $("#kart_numarasi").change(function() {
        kartNoDegis();
    });
}
var geleniYaz = false;
var kartNoDegisCalisiyor = false;

function kartNoDegis() {
    var value = $("#kart_numarasi").val();
    if (value != undefined) {
        value = value.replace(' ', '');
        if (!kartNoDegisCalisiyor && value.length >= 6) {
            geleniYaz = true;
            value = value.substr(0, 6);
            kartNoDegisCalisiyor = true;
            $.ajax({
                method: "POST",
                url: rootDirectory + "ajax.php",
                dataType: "json",
                data: {
                    ajaxType: "taksitGetir",
                    kart: value
                }
            }).done(function(msg) {
                kartNoDegisCalisiyor = false;
                if (geleniYaz) {
                    $("#taksitDiv").html(msg.data);
                }
            }).fail(function() {
                kartNoDegisCalisiyor = false;
            });
        } else if (value.length < 6) {
            geleniYaz = false
            $("#taksitDiv").html("");
        }
    }
}

function grupUrunDegis(tutar, ozelTaksit, template, divId) {
    $.ajax({
        method: "POST",
        url: rootDirectory + "ajax.php",
        dataType: "json",
        data: {
            ajaxType: 'taksitTemplateGetir',
            tutar: tutar,
            ozelTaksit: ozelTaksit,
            template: template
        }
    }).done(function(msg) {
        $("#" + divId).html(msg.data);
    });
}
$(document).ready(function() {
    codeJSReady();
});