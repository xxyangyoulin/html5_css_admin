$(function () {
    // 抽屉按钮
    $('#drawer-toggle').on('click', function () {
        $('#drawer').toggleClass('drawer-closed')

        if ($('#drawer').hasClass('drawer-closed')) {
            setCookie('drawerIsClosed', true, 365);
            $('.content-wrap').addClass('content-wrap-full')
        } else {
            setCookie('drawerIsClosed', '', 365);
            $('.content-wrap').removeClass('content-wrap-full')
        }
    });

    // 抽屉菜单控制
    $('#drawer .menu-link').on('click', function (e) {
        var $t = $(this);
        var $item = $t.parent('.menu-child')
        var nextPar = $item.children('.menu-parent');

        if(nextPar.length){
            if($item.hasClass('open')){
                $item.children('.menu-parent').stop(false,true).slideUp(200)
                $item.removeClass('open')
            }else{
                $('#drawer .open').removeClass('open').children('.menu-parent').stop(false,true).slideUp(200)
                $item.addClass('open')
                $item.children('.menu-parent').stop(false,true).slideDown(200)
            }
        }else{
            $('#drawer .open').not($t.parents('.menu-child'))
                .removeClass('open')
                .children('.menu-parent')
                .stop(false,true).slideUp(200)
        }

    });

    //不需要pjax功能可以直接删除
    //pjax 不需要pjax加载的a标签，请加上类 no-pjax
    $(document).pjax('a:not(.no-pjax)', {
        container: '#container',
        fragment: '#container',/*如果服务端做了pjax处理，注释掉*/
        timeout: 10000
    });

    $(document).on('pjax:send', function () {
        NProgress.start();
    });

    $(document).on('pjax:complete', function () {
        NProgress.done();
    });

    $(document).on('pjax:end', function () {
    });
});