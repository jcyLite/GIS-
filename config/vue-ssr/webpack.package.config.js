const fs = require('fs');
const path=require('path');
const jcyFs=require('jcy-fs');
const copyDir=jcyFs.copyDir;
const copyFile=jcyFs.copyFile
const resolve=dir=>path.resolve(__dirname,dir);
fs.mkdir(resolve('../../package-ssr'),function(){
	fs.mkdir(resolve('../../package-ssr/config'),()=>{
		fs.mkdir(resolve('../../package-ssr/config/build-ssr'),()=>{
			copyFile(resolve('../build-ssr/server.js'),resolve('../../package-ssr/config/build-ssr/server.js'))
			copyFile(resolve('../build-ssr/index.template.html'),resolve('../../package-ssr/config/build-ssr/index.template.html'))
		})
		copyDir(path.resolve(__dirname,'../../dist-ssr'),path.resolve(__dirname,'../../package-ssr/dist-ssr'))
		fs.readFile(path.resolve(__dirname,'../../package.json'), function(err, data) {
			if(err) return console.log(err);
			var d=JSON.parse(data.toString());
			delete d.devDependencies;
			d.scripts={
				start:d.scripts.start
			}
			
			fs.writeFile(path.resolve(__dirname,'../../package-ssr/package.json'),JSON.stringify(d),function(err){
				 if (err) console.error(err);
			})
		})
	})
})
