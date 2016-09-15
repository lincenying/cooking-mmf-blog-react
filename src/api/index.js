import NProgress from 'nprogress'

$.ajaxSetup({
    url: '/api/',
    global: true,
    type: 'POST',
    dataType: 'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Basic dGVzdDpwYXNzd2Q='
    }
})
$(document).ajaxStart(function() {
    NProgress.start()
})
$(document).ajaxComplete(function() {
    NProgress.done()
})

export default {
    getFromConfig(config) {
        return $.ajax({ data: config })
    },
    getData(config) {
        return $.ajax({
            global: false,
            data: config
        })
    }
}
