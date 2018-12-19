$(function () {
    var nowPage = 1;
    newD();

    function newD() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: nowPage,
                pageSize: 5,
            },
            dataType: 'json',
            success: function (res) {
                console.log("----------------------")
                console.log(res.page)
                // 1
                var htmlStr = template('tmpp', res)
                $('tbody').html(htmlStr)
                //2
                $("#pagintor_first1").bootstrapPaginator({

                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: res.page,
                    // 总页数
                    totalPages: Math.ceil(res.total / res.size),
                    // 添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        // 更新当前页
                        nowPage = page;
                        // 重新渲染
                        newD();
                    }
                });
               
            }
        })
    }


    //添加按钮
    $('.btn-add').on('click', function () {
        // alert(1)
        $('#myModal03').modal('show')
    })


    $('#myform_01').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '类名不能为空'
                    },
                    //长度校验

                    //正则校验

                }
            },
        }
    });
    $('#myform_01').on('success.form.bv', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('#myform_01').serialize(),
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res.success) {
                    $('#myModal03').modal('hide')
                    nowPage = 1;
                    newD()
                    $('#myform_01').data("bootstrapValidator").resetForm(true);
                }
            }

        })
    })

})