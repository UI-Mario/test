var mysql = require("mysql");
const fetch = require("node-fetch");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "000000",
  database: "tw",
});

const getDetailList = async () => {
  const url =
    "https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=1&count=20";
  try {
    const res = await fetch(url);

    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }

    const data = await res.json();
    console.log(data);
    insertData(data.subjects[0].title);
  } catch (err) {
    console.error(err);
  }
};

const insertData = (data) => {
  connection.connect();

  var addSql = "INSERT INTO test(id, mobile) VALUES(?,?)";
  var addSqlParams = [1, data];
  //增
  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      console.log("[INSERT ERROR] - ", err.message);
      return;
    }

    console.log("--------------------------INSERT----------------------------");
    console.log("INSERT ID:", result);
    console.log(
      "-----------------------------------------------------------------\n\n"
    );
  });
  connection.end();
};

getDetailList();
