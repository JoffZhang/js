//ʹ��Sequelize����MySQL��Ҫ��������׼��������

//��һ��������һ��sequelize����ʵ����

const Sequelize = require('sequelize');
const config = require('./config');

console.log('init sequelize ...');

var sequelize = new Sequelize(config.database,config.username,config.password,{
	host: config.host,
	dialect:'mysql',
	pool:{
		max:5,
		min:0,
		idle:30000
	}
});

//�ڶ���������ģ��Pet������Sequelize���ӳ�����ݿ��
//ͨ��sequelize.define()���ص�Pet��ΪModel������ʾһ������ģ�͡�
var Pet = sequelize.define('pet',{
	id:{
		type:Sequelize.STRING(50),
		primaryKey:true
	},
	name:Sequelize.STRING(100),
	gender:Sequelize.BOOLEAN,
	birth:Sequelize.STRING(10),
	createdAt:Sequelize.BIGINT,
	updatedAt:Sequelize.BIGINT,
	version:Sequelize.BIGINT
	},{
	timestamps:false	
});
/*
��sequelize.define()����Modelʱ����������pet��Ĭ�ϵı�������pets���ڶ�������ָ���������������ͣ��������������Ҫ����ϸ��ָ���������������Ƕ�������ã����Ǵ���{ timestamps: false }��Ϊ�˹ر�Sequelize���Զ����timestamp�Ĺ��ܡ����е�ORM��ܶ���һ�ֺܲ��õķ������������������ؼ�����ν���Զ������Ĺ��ܣ����ǻ����˸е���ȫ������ͷ�ԡ�
*/


var now = Date.now();

Pet.create({
	id:'g-'+now,
	name:'JOFF',
	gender:false,
	birth:'2011-11-11',
	createdAt:now,
	updatedAt:now,
	version:0
}).then(function(p){
	console.log('created. '+JSON.stringify(p));
}).catch(function(err){
	console.log('failed:'+err);
});

(async ()=>{
	var dog = await Pet.create(
		{
			id: 'd-' + now,
			name: 'Odie',
			gender: false,
			birth: '2008-08-08',
			createdAt: now,
			updatedAt: now,
			version: 0
		}
	)
	console.log('created: ' + JSON.stringify(dog));
})();
(async ()=>{
	//ͨ��Pet.findAll()���ص�һ����һ������ΪModelʵ����ÿ��ʵ��������ֱ��ͨ��JSON.stringify���л�ΪJSON�ַ������������Ǻ���ͨJSON������ȣ�����һЩ��Sequelize��ӵķ���������save()��destroy()��������Щ�������ǿ���ִ�и��»���ɾ��������
	var pets = await Pet.findAll({
		where:{
			name:'JOFF'
		}
	});
/*
ʹ��Sequelize�������ݿ��һ�㲽����ǣ�

���ȣ�ͨ��ĳ��Model�����findAll()������ȡʵ����

���Ҫ����ʵ�����ȶ�ʵ�����Ը���ֵ���ٵ���save()������

���Ҫɾ��ʵ����ֱ�ӵ���destroy()������

ע��findAll()�������Խ���where��order��Щ��������ͽ�Ҫ���ɵ�SQL����Ƕ�Ӧ�ġ�
*/
	console.log(`find ${pets.length} pets:`);
	for(let p of pets){
		console.log(JSON.stringify(p));
		console.log('update pet ... ');
		p.gender =true;
		p.updateAt = Date.now();
		p.version ++;
		await p.save();
		if(p.version === 3){
			await p.destroy();
			console.log(`${p.name} was destroyed`);
		}
	}
})();