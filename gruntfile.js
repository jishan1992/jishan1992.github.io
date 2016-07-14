module.exports = function(grunt){
	
	//1 加载模块
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	//2 配置任务
	grunt.initConfig({
		uglify:{
			uglify:{
				src:["js/jquery.min.js","js/ejym.js"],
				dest:"js/erji.min.js"
			}
		}
	});
	
	//3 注册任务
	grunt.registerTask("default",["uglify"]);
	
};