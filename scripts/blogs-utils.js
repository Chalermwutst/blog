//console.log("Hello Skooldio")

let blogsRawData = [];
let loadingTimeout = {};

function createBlogHTML(blogs) {
  const blogElement = document.getElementById("blog-container");

  const blogContentElement = blogs
    .map(function (blog) {
      return `
     <div class="flex flex-col md:flex-row gap-6 w-full">
     <img
       src=" ${blog.imageUrl}"
       alt="feature image 1"
       class="w-full md:w-auto"
     />
     <div class="flex flex-col gap-4 bg-wd-darkgrey p-6 grow">
       <h3 class="text-2xl font-semibold">
         ${blog.title}
       </h3>
       <p class="text-xl font-light">
       ${blog.description}
       </p>
       <p>${blog.publishedDate}</p>
       <a href="${blog.url}">Read more</a>
     </div>
     </div>
     `;
    })
    .join("");

  blogElement.innerHTML = blogContentElement;
}

function createWorkHTML(myWorks) {
  const blogElement = document.getElementById("work-container");

  const blogContentElement = myWorks
    .map(function (myWork) {
      return `
        <img
        src="${myWork.src}"
        alt="${myWork.alt}"
        class="${myWork.class}" />
        `;
    })
    .join("");

  blogElement.innerHTML = blogContentElement;
}

function createMorePhotoHTML(morePhotos) {
  const blogElement = document.getElementById("morephoto-container");

  const blogContentElement = morePhotos
    .map(function (morephoto) {
      return `
        <img
        src="${morephoto.src}"
        alt="${morephoto.alt}"
        class="${morephoto.class}" />
        `;
    })
    .join("");

  blogElement.innerHTML = blogContentElement;
}

const blog = {
  title: "Skooldio Test",
  description: "Skooldio Descrition",
  publishedDate: "4/1/2024",
  imageUrl:
    "https://fastly.picsum.photos/id/648/300/200.jpg?hmac=1CBWajz31GOLUdds_HpCDPaHDG6FF3eoY1fYcoFgEMY",
};

function searchBlogs(element) {
  const blogElement = document.getElementById("blog-container");
  //แสดง loading
  clearTimeout(loadingTimeout);

  blogElement.innerHTML = "Loading...";

  loadingTimeout = setTimeout(() => {
    const filterredBlogs = blogsRawData.filter(function (blog) {
      return (
        blog.title.toLowerCase().includes(element.value.toLowerCase()) ||
        blog.description.toLowerCase().includes(element.value.toLowerCase())
      );
    });

    createBlogHTML(filterredBlogs);
  }, 2000);
}

function sortBlogs(element) {
  const sortedBlogs = blogsRawData.sort(function (blogA, blogB) {
    let compareDate =
      new Date(blogA.publishedDate) - new Date(blogB.publishedDate);

    if (element.value === "desc") {
      compareDate =
        new Date(blogB.publishedDate) - new Date(blogA.publishedDate);
    }
    return compareDate;
  });

  createBlogHTML(sortedBlogs);
}

async function main() {
  const response = await axios.get("/scripts/blogs.json");
  blogsRawData = response.data;
  const responseWork = await axios.get("/scripts/works.json");
  const works = responseWork.data;

  // const responseMorePhoto = await axios.get('/scripts/morephotos.json')
  // const morephotos = responseWork.data;

  createBlogHTML(blogsRawData);
  createWorkHTML(works);
  //createMorePhotoHTML(morephotos)
}

main();
