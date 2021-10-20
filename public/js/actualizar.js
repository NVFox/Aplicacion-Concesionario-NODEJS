$(document).ready(function(){
    $('.btnact').on('click', function(){
        let btn = $('.btnact').index(this);
        let pla = $('.pla').eq(btn);
        let cat = $('.cat').eq(btn);
        let mod = $('.mod').eq(btn);
        let mar = $('.mar').eq(btn);
        let est = $('.est').eq(btn);
        let pre = $('.pre').eq(btn);

        let pl = pla.val();
        let c = cat.val();
        let md = mod.val();
        let mr = mar.val();
        let e = est.val();
        let pr = pre.val();

        $.ajax({
            type: "POST",
            url:'/update',
            data: {
                "VehPlaca": pl,
                "CatId": c,
                "VehModelo": md,
                "VehMarca": mr,
                "VehEstado": e,
                "VehPrecio": pr,
            }
        })
    })
})