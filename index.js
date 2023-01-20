function asyncPatch(app){
	//The "Layer" constructor is not exposed,
	//to support express which required from outside the project path
	//here I get the constructor from a temporary router
	//the router will then be poped,so it will not affect your router
	const r=app.route('/--------------------');
	r.get((req,res,next)=>next());
	
	//modified handle function from express source code
	r.stack.pop().__proto__.handle_request=async function handle(req, res, next) {//here added an "async"
		var fn = this.handle;
		if (fn.length > 3) {
			return next();
		}
		try {
			await fn(req, res, next);//here added an "await"
		} catch (err) {
			next(err);
		}
	};
}

module.exports=asyncPatch;