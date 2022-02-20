require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/videoDB");

// itemCount = 0;
// query = "music";
// maxResults = "10";
// const url =
//   "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=" +
//   maxResults +
//   "&q=" +
//   query +
//   "&type=video&key=" +
//   process.env.API_KEY;

const videoSchema = new mongoose.Schema({
  videoId: String,
  publishedAt: String,
  title: String,
  thumbnailUrl: String,
  channelTitle: String,
  count: Number,
});

const Video = mongoose.model("Video", videoSchema);

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

// function request() {
//   app
//     .get("/home", function (res) {
//       res.on("data", function (chunk) {
//         console.log(chunk);
//       });
//     })
//     .on("error", function (e) {
//       console.log("Got error: " + e.message);
//     });
// }
// setInterval(request, 1000);

recursive = function (req, res) {
  console.log(res.items);
  // mytimeout = setTimeout(recursive, 1000);
  // if (count >= 5) clearTimeout(mytimeout);
};

app.post("/postData/:count", (req, res) => {
  const request = req.body;
  let index = req.params.count;
  //console.log(video);
  const newvid = new Video({
    videoId: request.id.videoId,
    publishedAt: request.snippet.publishedAt,
    title: request.snippet.title,
    thumbnailUrl: request.snippet.thumbnails.medium.url,
    channelTitle: request.snippet.channelTitle,
    count: index,
  });
  console.log(newvid);
  newvid.save((err, saved) => {
    if (err) console.log(err);
    else res.send("Data saved");
  });
});

app.get("/getData/:count", (req, res) => {
  let searchCount = req.params.count;
  let vidArray = [Video];
  if (searchCount <= 10) {
    Video.find({ count: { $lte: searchCount } }, (err, docs) => {
      if (err) console.log(err);
      else {
        // console.log(docs);
        res.send(docs);
      }
    });
  } else {
    Video.find(
      { count: { $gt: searchCount - 10, $lte: searchCount } },
      (err, docs) => {
        if (err) console.log(err);
        else {
          // console.log(docs);
          res.send(docs);
        }
      }
    );
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
