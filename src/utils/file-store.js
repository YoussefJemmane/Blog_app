const fs = require("fs/promises");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data");
const POSTS_FILE = path.join(DATA_DIR, "posts.json");
const TEMP_FILE = path.join(DATA_DIR, "posts.tmp.json");

let writeQueue = Promise.resolve();

const ensureDataDir = async () => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error("Failed to create data directory : ", err);
  }
};

const atomicWrite = async () => {
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(TEMP_FILE, json);
  await fs.rename(TEMP_FILE, POSTS_FILE);
};

const writePosts = (data) => {
  writeQueue = writeQueue.then(() => atomicWrite(data)).catch(console.error);
  return writeQueue;
};

const readPosts = async () => {
  try {
    const content = await fs.readFile(POSTS_FILE, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

const initSamplePosts = async () => {
  await ensureDataDir();
  try {
    await fs.access(POSTS_FILE);
  } catch {
    const samplePosts = [
      { id: 1, title: "Hello World", content: "This is the first post." },
      { id: 2, title: "Second Post", content: "Another day, another post." },
      { id: 3, title: "Thoughts", content: "Just sharing some ideas." },
    ];
    await writePosts(samplePosts);
  }
};

module.exports = { readPosts, writePosts, initSamplePosts };
