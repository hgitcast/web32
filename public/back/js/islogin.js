$.ajax({
    type : 'get',
    url : '/employee/checkRootLogin',
    dataType : 'json',
    success : function(res){
        // console.log(res)
        if(res.success){
            // console.log('已登录')
        }else if(res.error === 400){
            location.href = 'login.html'
        }
    }
})