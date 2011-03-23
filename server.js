// BrowserPower map/reduce server

// Connection pattern:
// A client initially connects by POSTing null to /. When the server has a job
// to run, it then replies to that client with a job description. The client
// runs the job and POSTs the result to /.

// Server state:
// The server keeps global queues of clients and jobs. When a new job comes in
// we send it to any waiting clients.

var waiting_clients = [];
var waiting_jobs    = [];
var job_listeners   = [];
var job_retries     = [];
var job_identifier  = 0;

// Jobs:
// A job is simply a JSON object of this form:
// {id: number,
//   f: string of function code,
//   x: first argument to function,
//   y: second argument to function}
//
// The browser replies with an object of this form:
// {id: number,
//   r: result of function}

var enqueue_job = function (f, x, y, on_result) {
  var job_id = ++job_identifier;
  job_listeners[job_id] = on_result;
  waiting_jobs.push({id: job_id, f: f, x: x, y: y});
  send_jobs_to_clients();
};

var send_jobs_to_clients = function () {
  while (waiting_clients.length && waiting_jobs.length) {
    var client = waiting_clients.shift();
    var job    = waiting_jobs.shift();

    console.log('Sending job ' + job.id + ' to client');
    client.writeHead(200, {'content-type': 'application/json'});
    client.end(JSON.stringify(job));

    job_retries[job.id] = setTimeout(function () {
      console.log('Retrying job ' + job.id);
      enqueue_job(job.f, job.x, job.y, job_listeners[job.id]);
      job_listeners[job.id] = null;
    }, 2000);
  }
};

var with_json_post_data = function (request, callback) {
  var chunks = [];
  request.on('data', function (chunk) {chunks.push(chunk)});
  request.on('end', function () {
    callback(JSON.parse(chunks.join('')));
  });
};

var handle_result = function (request, response) {
  waiting_clients.push(response);
  with_json_post_data(request, function (result) {
    console.log('Received result for job ' + result.id);
    job_retries[result.id] && clearTimeout(job_retries[result.id]);
    job_listeners[result.id] && job_listeners[result.id](result.r);
    job_listeners[result.id] = null;              // Prevent space leak
  });
  send_jobs_to_clients();
};

// Administration:
// Users administer the server by POSTing job requests to /run. A job request
// consists of three parts:
// {  data: [array of data elements],
//   first: [initial element for map/reduce],
//     map: [map function string -- takes one argument x],
//  reduce: [reduce function string -- takes two arguments x and y]}
//
// This will create a series of map jobs that trigger reduce jobs, and will
// reply with a JSON result containing the output of the last reduce step.

var handle_job_request = function (request, response) {
  with_json_post_data(request, function (job_request) {
    var pending_results = job_request.data.length * 2;
    var reduction_queue = [job_request.first];

    var got_a_result = function (result) {
      if (--pending_results) {
        reduction_queue.push(result);
        if (reduction_queue.length > 1)
          enqueue_job(job_request.reduce, reduction_queue.shift(), reduction_queue.shift(), got_a_result);
      } else {
        response.writeHead(200, {'content-type': 'application/json'});
        response.end(JSON.stringify(result));
      }
    };

    job_request.data.forEach(function (x) {
      enqueue_job(job_request.map, x, null, got_a_result);
    });
  });
};

// Client interfacing:
// If a client issues a GET /, we send down the default client page. If the URL
// is unknown, we send down a generic 404 message.

var send_client_page = function (client_name) {
  return function (request, response) {
    require('fs').readFile('clients/' + client_name, 'utf8', function (error, page) {
      response.writeHead(200, {'content-type': 'text/html'});
      response.end(page);
    });
  };
};

var send_404 = function (request, response) {
  response.writeHead(404, {'content-type': 'text/plain'});
  response.end(request.url + ' is not a valid BrowserPower request.');
};

// Main server loop:
require('http').createServer(function (request, response) {
  var signature = request.method + ' ' + request.url;
  var handler   = signature === 'GET /'         ? send_client_page('job-runner.html') :
                  signature === 'GET /admin'    ? send_client_page('admin.html') :
                  signature === 'GET /rt'       ? send_client_page('rt-job-runner.html') :
                  signature === 'GET /rt-admin' ? send_client_page('rt-admin.html') :

                  signature === 'POST /'     ? handle_result :
                  signature === 'POST /run'  ? handle_job_request :
                                               send_404;
  handler(request, response);
}).listen(8080, '0.0.0.0');
