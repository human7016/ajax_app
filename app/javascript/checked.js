function check() {
  const posts = document.getElementsByClassName("post");
  postsA = Array.from(posts);

  postsA.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", (e) => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        //【posts_controller.rb:20】render json:{post:item}でレスポンス形式を指定
        const item = XHR.response.post;
        //【posts_controller.rb:19】item = Post.find(params[:id])
        if (item.checked === true){
          post.setAttribute("data-check", "true");
        } else if(item.checked === false){
          post.removeAttribute("data-check");
        }
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        } else {
          return null;
        }
      }
      XHR.onerror = () => {
        alert("Request failed");
      };
    });
  });
}

setInterval(check, 1000);
