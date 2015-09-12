BrowserPower is a proof of concept for using browsers as compute nodes.

```sh
$ node server.js
```

Then open two browser windows. Point one at localhost:8080 -- this is a worker
node. Point the other at localhost:8080/admin -- this is the driver interface.
You can submit jobs by tweaking the functions in the admin interface and using
the Run button. You can also connect as many clients as you want as workers;
jobs are parallelized automatically between them.

The raytracing demo is also working; the administrative page is
localhost:8080/rt-admin, and the client page is localhost:8080/rt. Note that
either client can run either demo, since the map/reduce functions are included
with the data to be processed. The /rt client is specialized for raytracing,
though, and will show you the blocks that it processes.

![raytracing result](http://spencertipping.com/browserpower.png)
