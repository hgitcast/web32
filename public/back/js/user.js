$(function () {

    var nowPage =1;

    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: nowPage,
                pageSize: 5,
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)

                // 1 渲染表格啊小伙子
                var htmlStr = template('tmp-table', res)
                $('tbody').html(htmlStr)

                //2 渲染分页啊小伙子

                $(".pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: res.page,//当前页
                    totalPages: Math.ceil(res.total / res.size),//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (a, v, h, page) {
                        // console.log(page)
                        nowPage = page;
                        render()



                    }
                });
            }
        })
    }


    var btnNow;
    var id;
    $('tbody').on('click','.btn',function(){
        // alert(1)
        id = $(this).parent().data('id')
        btnNow = $(this).hasClass('btn-danger')? 0 : 1
        // console.log(btnNow)
        // console.log(id)
        $('#myModal02').modal('show')
        
    })
    $('.btn-set').on('click',function(){
        
        $.ajax({
            type : 'post',
            url : '/user/updateUser',
            dataType : 'json',
            data : {
                id : id,
                isDelete : btnNow
            },
            success : function (res) {
                console.log(res)
                $('#myModal02').modal('hide')
                render()
            }

        })
    })




})