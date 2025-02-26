const paths = {
  home() {
    return "/";
  },

  topicShow(slug: string) {
    console.log("bbbbbbb", slug);
    return `/topics/${slug}`;
  },

  postCreate(slug: string) {
    return `/topics/${slug}/posts/new`;
  },
  postShow(slug: string, postId: number) {
    return `/topics/${slug}/posts/${postId}`;
  },
};

export default paths;
