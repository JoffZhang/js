// index:

module.exports = {
    'GET /': async (ctx, next) => {
        let user = ctx.state.user;
        console.log(ctx);
        if(user){
            ctx.render('room.html',{
                user:user
            });
        }else{
            ctx.response.redirect('/signin');
        }
    }
};