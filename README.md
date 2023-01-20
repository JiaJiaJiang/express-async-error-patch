# express-async-error-patch
let express support async middleware/router error catch

## Usage

```javascript
const express=require('express');
const app=express();

const asyncPatch=require('express-async-error-patch');
asyncPatch(app);
//done
```

Then you can handle async middleware errors in your normal error handle as same as sync middlewares.

```javascript
app.get('/',async (req,res,next)=>{
	await new Promise((resolve,reject)=>{
		setTimeout(()=>{//do an async operation
			reject('test');//reject in 1 second
		},1000);
	});
});

app.use((err,req,res,next)=>{
	//the rejected promise error will be passed to this normal error handle
	console.log(err);// "test"
})
```

## How

This patcher simply add an "await" and an "async" to the express `Layer.prototype.handle_request` function to let all router and middleware support async errors.

## Notice

This patcher modifies just one express source function and have been tested in express 4.x, not sure will it work in lower or higher versions.