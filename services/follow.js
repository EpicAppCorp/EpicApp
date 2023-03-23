export const acceptFollower = (author, foreignAuthor) => {
    return axiosClient.put(author.host + 'api/authors/' + author.id + '/followers/' + foreignAuthor.id);
  };

export const unFollow = (author, foreignAuthor) => {
    return axiosClient.delete(author.host + 'api/authors/' + author.id + '/followers/' + foreignAuthor.id);
};