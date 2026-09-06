export interface HomeBlog {
  img: string;
  category: string;
  date: string;
  title: string;
  readTime: string;
  author: string;
}

export const homeBlogs: HomeBlog[] = [
  { img: "/images/unimart/blog-post-img/blog-post-09.webp", category: "Food", date: "February 11, 2026", title: "Why choose a theme that looks good with eCommerce", readTime: "9 Min To Read", author: "Pásztor Kíra" },
  { img: "/images/unimart/blog-post-img/blog-post-10.webp", category: "Product", date: "February 11, 2026", title: "How to Pick a Template Perfect for eCommerce Compatibility", readTime: "9 Min To Read", author: "Pásztor Kíra" },
  { img: "/images/unimart/blog-post-img/blog-post-11.webp", category: "Fashion", date: "February 28, 2026", title: "How to Choose the Perfect Theme for Your Online Store", readTime: "9 Min To Read", author: "Pásztor Kíra" },
  { img: "/images/unimart/blog-post-img/blog-post-12.webp", category: "Lifestyle", date: "March 15, 2026", title: "Why a Template Enhances Your eCommerce Store", readTime: "9 Min To Read", author: "Pásztor Kíra" },
];