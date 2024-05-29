import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Dummy data for demonstration
let story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
let author = "by John Doe";

app.get("/", (req, res) => {
  res.render("index.ejs", { latestStory: story, latestAuthor: author });
});

app.get('/edit', (req, res) => {
  // Assuming edit functionality is similar to creating a new post
  // Pass additional data to the template
  res.render("post.ejs", { isEdit: true, story: story, author: author });
});

app.get('/create-post', (req, res) => {
  res.render("post.ejs", { isEdit: false });
});

app.post('/submit-post', (req, res) => {
  // Retrieve data from the request body
  const newStory = req.body.story;
  const newAuthor = req.body.author;

  // Update the story and author variables with the new data
  story = newStory;
  author = newAuthor;

  // Process the new post (e.g., save to database)
  // For now, just log to the console
  console.log(`New Post by ${author}`);

  // Redirect to the homepage after submitting the post
  res.render("index.ejs", { latestStory: story, latestAuthor: author });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
