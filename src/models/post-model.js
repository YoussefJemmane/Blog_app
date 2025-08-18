const { readPosts, writePosts } = require("../utils/file-store.js");
const { v4: uuidv4 } = require("uuid");

const findAll = async () => {
  const posts = await readPosts();
  return posts;
};

const findById = async (id) => {
  const posts = await readPosts();
  const post = posts.filter((posts) => posts.id === id);
  return post;
};

const create = async (post) => {
  const posts = await readPosts();

  const newPost = {
    id: uuidv4(),
    ...post,
    created_at: Date().toISOString(),
    updated_at: Date().toISOString(),
  };
  posts.push(newPost);
  await writePosts(posts);
  return newPost;
};

const update = async (id, updatedData) => {
  const posts = await readPosts();

  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    console.log("Post not found");
  }
  const post = posts[postIndex];
  const updatedPost = {
    ...post,
    ...updatedData,
    updated_at: Date().toISOString(),
  };

  posts[postIndex] = updatedPost;
  await writePosts(posts);
  return updatedPost;
};

const remove = async (id) => {
  const posts = await readPosts();
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    console.log("Post not found");
  }
  const [removedPost] = posts.splice(postIndex, 1);

  await writePosts(posts);
  return removedPost;
};

const query = async (options = {}) => {
  const posts = await readPosts();
  const {
    q = "",
    sort = "createdAt",
    order = "desc",
    page = 1,
    limit = 10,
  } = options;

  const filteredPosts = posts;
  if (q) {
    const search = q.toLowerCase();
    filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search) ||
        post.content.toLowerCase().include(search),
    );
  }

  filteredPosts.sort((a, b) => {
    let comparison = 0;
    const valA = a[sort] || "";
    const valB = b[sort] || "";

    if (valA > valB) {
      comparison = 1;
    } else {
      comparison = -1;
    }

    return order === "desc" ? comparison * -1 : comparison;
  });

  const total = filteredPosts.length;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  const items = filteredPosts.slice(startIndex, endIndex);

  return { items, total, page: pageNumber, limit: limitNumber };
};
