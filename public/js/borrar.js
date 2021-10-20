$(document).ready(function(){
    $('.btneli').on('click', function(){
        let btn = $('.btneli').index(this);
        let pla = $('.pla').eq(btn);

        let pl = pla.val();

        $.ajax({
            type: "POST",
            url:'/delete',
            data: {
                "VehPlaca": pl
            }
        })
    })
})