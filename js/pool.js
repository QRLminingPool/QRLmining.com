<script>


    var docCookies = {
        getItem: function (sKey) {
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        removeItem: function (sKey, sPath, sDomain) {
            if (!sKey || !this.hasItem(sKey)) { return false; }
            document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
            return true;
        },
        hasItem: function (sKey) {
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        }
    };

    $.fn.update = function(txt){
        var el = this[0];
        if (el.textContent !== txt)
            el.textContent = txt;
        return this;
    };

    function updateTextClasses(className, text){
        var els = document.getElementsByClassName(className);
        for (var i = 0; i < els.length; i++){
            var el = els[i];
            if (el.textContent !== text)
                el.textContent = text;
        }
    }

    function updateText(elementId, text){
        var el = document.getElementById(elementId);
        if (el.textContent !== text){
            el.textContent = text;
        }
        return el;
    }


    var currentPage;
    var lastStats;

    function getReadableCoins(coins, digits, withoutSymbol){
        var amount = (parseInt(coins || 0) / coinUnits).toFixed(digits || coinUnits.toString().length - 1);
        return amount + (withoutSymbol ? '' : (' ' + lastStats.config.symbol));
    }

    function formatDate(time){
        if (!time) return '';
        return new Date(parseInt(time) * 1000).toLocaleString();
    }

    function formatPaymentLink(hash){
        return '<a target="_blank" href="' + transactionExplorer + hash + '">' + hash + '</a>';
    }

    function getPaymentRowElement(payment, jsonString){

        var row = document.createElement('tr');
        row.setAttribute('data-json', jsonString);
        row.setAttribute('data-time', payment.time);
        row.setAttribute('id', 'paymentRow' + payment.time);

        row.innerHTML = getPaymentCells(payment);

        return row;
    }


    function parsePayment(time, serializedPayment){
        var parts = serializedPayment.split(':');
        return {
            time: parseInt(time),
            hash: parts[0],
            amount: parts[1],
            fee: parts[2],
            mixin: parts[3],
            recipients: parts[4]
        };
    }

    function renderPayments(paymentsResults){

        var $paymentsRows = $('#payments_rows');

        for (var i = 0; i < paymentsResults.length; i += 2){

            var payment = parsePayment(paymentsResults[i + 1], paymentsResults[i]);

            var paymentJson = JSON.stringify(payment);

            var existingRow = document.getElementById('paymentRow' + payment.time);

            if (existingRow && existingRow.getAttribute('data-json') !== paymentJson){
                $(existingRow).replaceWith(getPaymentRowElement(payment, paymentJson));
            }
            else if (!existingRow){

                var paymentElement = getPaymentRowElement(payment, paymentJson);

                var inserted = false;
                var rows = $paymentsRows.children().get();
                for (var f = 0; f < rows.length; f++) {
                    var pTime = parseInt(rows[f].getAttribute('data-time'));
                    if (pTime < payment.time){
                        inserted = true;
                        $(rows[f]).before(paymentElement);
                        break;
                    }
                }
                if (!inserted)
                    $paymentsRows.append(paymentElement);
            }

        }
    }

    function pulseLiveUpdate(){
        var stats_update = document.getElementById('stats_updated');
        stats_update.style.transition = 'opacity 100ms ease-out';
        stats_update.style.opacity = 1;
        setTimeout(function(){
            stats_update.style.transition = 'opacity 7000ms linear';
            stats_update.style.opacity = 0;
        }, 500);
    }

    window.onhashchange = function(){
        routePage();
    };


    function fetchLiveStats() {
        $.ajax({
            url: api + '/live_stats',
            dataType: 'json',
            cache: 'false'
        }).done(function(data){
            pulseLiveUpdate();
            lastStats = data;
            updateIndex();
            currentPage.update();
        }).always(function () {
            fetchLiveStats();
        });
    }


    var xhrPageLoading;
    function routePage(loadedCallback) {

        if (currentPage) currentPage.destroy();
        $('#page').html('');
        $('#loading').show();

        if (xhrPageLoading)
            xhrPageLoading.abort();

        $('.hot_link').parent().removeClass('active');
        var $link = $('a.hot_link[href="' + (window.location.hash || '#') + '"]');

        $link.parent().addClass('active');
        var page = $link.data('page');

        xhrPageLoading = $.ajax({
            url: 'pages/' + page,
            cache: false,
            success: function (data) {
                $('#loading').hide();
                $('#page').show().html(data);
                currentPage.update();
                if (loadedCallback) loadedCallback();
            }
        });
    }

    function updateIndex(){
        updateText('coinName', lastStats.config.coin);
        updateText('poolVersion', lastStats.config.version);
    }

    $(function(){
        $.get(api + '/stats', function(data){
            lastStats = data;
            updateIndex();
            routePage(fetchLiveStats);
        });
    });


</script>