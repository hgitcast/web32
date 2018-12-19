$(function () {

    var nowPage = 1
    var pageSize = 5
    render()
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: nowPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                // console.log(res)
                var htmlStr = template('tmppp', res)
                $('tbody').html(htmlStr)

                //分页初始化
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: res.page,//当前页
                    totalPages: Math.ceil(res.total / res.size),//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        nowPage = page
                        render()
                    }
                });
            }
        })
    }
    $('.btn-add2').on('click', function () {
        // alert(1)
        $('#myModal02').modal('show')
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (res) {
                // console.log(res)

                var htmlStr = template('tmppppp', res)
                $('.dropdown-menu').html(htmlStr)

            }
        })
    })
    $('.dropdown-menu').on('click', 'a', function () {
        $('button.btn.btn-default.dropdown-toggle em').text($(this).text())
        $('#categoryId').val($(this).data('id'))
        $('#secForm').data('bootstrapValidator').updateStatus('categoryId','VALID')
    })



    // 文件上床插件
    $("#exampleInputFile").fileupload({
        dataType: "json",

        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {

            console.log(data);
            var imgSrc = data.result.picAddr
            $('#img01').attr('src', imgSrc)
            $('#brandLogo').val(imgSrc)
            $('#secForm').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
        }
    });

    // 表单验证
    $('#secForm').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择分类名称'
                    },
                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入二级分类名称'
                    },
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传图像'
                    },
                }
            },
        }


    })

    // 监视上传阻止默认
    $('#secForm').on('success.form.bv',function( e ){
        e.preventDefault()
        $.ajax({
            type : 'post',
            url : '/category/addSecondCategory',
            data : $('#secForm').serialize(),
            dataType : 'json',
            success : function( res ){
                if(res.success){
                    $('#myModal02').modal('hide');
                    render();
                    $('#secForm').data("bootstrapValidator").resetForm( true );
                    $('.btn.btn-default.dropdown-toggle em').text('请选择一级分类')
                    $('#img01').attr('src', './images/none.png')
                }
            }




        })
    })
})