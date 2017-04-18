const model = require('./model');
let
       Pet = model.Pet,
       User = model.User;

(async() => {
    var user = await User.create({
        name:"JOFF ZHANG",
        gender : false,
        email : 'joff-'+Date.now()+"@mail.pet",
        passwd:'hahahha',
    });
    console.log('created : '+ JSON.stringify(user));
    var cat =  Pet.create({
        ownerId: user.id,
        name: 'Garfield',
        gender: false,
        birth: '2007-07-07',
    });
    console.log('created: ' + JSON.stringify(cat));
    var dog = await Pet.create({
        ownerId: user.id,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
    });
    console.log('created: ' + JSON.stringify(dog));
})();