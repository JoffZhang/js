/**
 * Created by admin01 on 2017/4/17.
 */
module.exports = {
    'GET /':async(ctx,next)=>{
        ctx.render('index.html');
    }
};