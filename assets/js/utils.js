$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    if (options.url.includes('/api/') === false) {
        options.headers = {
            Authorization: window.localStorage.getItem('token')
        };
    }
    options.complete = function (res) {
        // console.log(res.responseJSON);
        if (res.responseJSON.status === 1) {
            window.localStorage.removeItem('token');
            window.location.href = '../login.html';
        }
    }
})