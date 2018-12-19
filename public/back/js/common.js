$(function () {
    // alert(1)
    $(document).on('ajaxStart', function () {
        // console.log("ajaxStart在开始一个ajax请求时触发");
        NProgress.start();
        // alert(1)
    })
    // $(document).ajaxStart(function () {
    //     console.log("ajaxStart在开始一个ajax请求时触发");
    //   });
    $(document).ajaxStop(function () {
        NProgress.done();
    });
})

$(function () {
    $('.aside .nav ul .li-list').on('click', function () {
        $('.aside .nav ul .li-list .child').stop().slideToggle();
    })
})
$(function () {
    $('.btn-left').on('click', function () {

        $('.aside').toggleClass('run')
        $('.topbar').toggleClass('run')
        $('.main').toggleClass('run')

    })
})
// 模态框
$(function () {
    $('#myModal').modal({
        keyboard: false,
        show: false,
    })

    $('.btn-right').on('click', function () {
        $('#myModal01').modal('show')
    })

    //退出
    $('.btn-loginOut').on('click', function () {
        $.ajax({
            tyle: 'get',
            url: '/employee/employeeLogout',
            data: {},
            dataType: 'json',
            success: function (res) {
                if(res.success){
                    location.href = 'login.html'
                }else if(res.error){
                    console.log('退出失败')
                }
            }
        })
    })



})