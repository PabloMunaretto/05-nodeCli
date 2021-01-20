var fs = require('fs');
var request = require("request");

module.exports = {
    pwd :function(args, done){
      done(process.cwd())
    },

    date : function(args, done){
      let  date = new Date()
      let date1 = ("0" + date.getDate()).slice(-2); 
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let year = date.getFullYear();
      done(`${date1}/${month}/${year}`);
    },

    ls : function (args, done) {
        let result = "";
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            result = files.map(file => file.toString()).join("\n");
            done(result);
          });
    },

    echo : function(args, done) {
      let result = "";
      args.forEach(arg => {
        if (process.env[arg.slice(1)]) {
          result += process.env[arg.slice(1)] + " ";
        } else {
          result += arg + " ";
        }
      });
        done(result)
    },

    cat : function (args, done) {
        fs.readFile(`./${args}`, "utf8", (err, data) => {
            if (err) throw err;
            done(data)
          });
    },

    head : function (args, done) {
        fs.readFile(`./${args}`, "utf8", (err, data) => {
            if (err) throw err;
            let lines = data.split("\n");
            let linesSP = lines.slice(0, 10).join("\n")
            done(linesSP)
          });
    },

    tail : function (args, done) {
        
        fs.readFile(`./${args}`, "utf8", (err, data) => {
            if (err) throw err;
            let lines = data.split("\n");
            let linesSP = lines.slice(lines.length-11, lines.length).join("\n");
            done(linesSP);
          });
    },

    curl: function(url, done){
      
     request(url.toString(), (error, response, body) => {
        if (error) throw error;
         done(body)  
     })
     },

}
