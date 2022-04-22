const categories = { terrascan: [{ url: `/terrascan/gitops/security/kubernetes/2022/02/04/extend-gitops-security-with-terrascan.html`, date: `04 Feb 2022`, title: `Extend GitOps Security with Terrascan`},{ url: `/terrascan/terraform/misconfiguration/security/kubernetes/2022/01/12/reduce-cloud-native-provisoning-issues.html`, date: `12 Jan 2022`, title: `less risky business way to reduce cloud-native provisioning issues`},],Terraform: [{ url: `/terrascan/terraform/misconfiguration/security/kubernetes/2022/01/12/reduce-cloud-native-provisoning-issues.html`, date: `12 Jan 2022`, title: `less risky business way to reduce cloud-native provisioning issues`},],misconfiguration: [{ url: `/terrascan/terraform/misconfiguration/security/kubernetes/2022/01/12/reduce-cloud-native-provisoning-issues.html`, date: `12 Jan 2022`, title: `less risky business way to reduce cloud-native provisioning issues`},],security: [{ url: `/terrascan/gitops/security/kubernetes/2022/02/04/extend-gitops-security-with-terrascan.html`, date: `04 Feb 2022`, title: `Extend GitOps Security with Terrascan`},{ url: `/terrascan/terraform/misconfiguration/security/kubernetes/2022/01/12/reduce-cloud-native-provisoning-issues.html`, date: `12 Jan 2022`, title: `less risky business way to reduce cloud-native provisioning issues`},],kubernetes: [{ url: `/terrascan/gitops/security/kubernetes/2022/02/04/extend-gitops-security-with-terrascan.html`, date: `04 Feb 2022`, title: `Extend GitOps Security with Terrascan`},{ url: `/terrascan/terraform/misconfiguration/security/kubernetes/2022/01/12/reduce-cloud-native-provisoning-issues.html`, date: `12 Jan 2022`, title: `less risky business way to reduce cloud-native provisioning issues`},],gitops: [{ url: `/terrascan/gitops/security/kubernetes/2022/02/04/extend-gitops-security-with-terrascan.html`, date: `04 Feb 2022`, title: `Extend GitOps Security with Terrascan`},],docker: [{ url: `/https:/blog.cloudnativefolks.org/the-ultimate-docker-cheatsheet-for-everyone`, date: `22 Apr 2022`, title: `The Ultimate Docker CheatSheet For Everyone`},], }

window.onload = function () {
  document.querySelectorAll(".category").forEach((category) => {
    category.addEventListener("click", function (e) {
      const posts = categories[e.target.innerText];
      let html = ``
      posts.forEach(post=>{
        html += `
        <a class="modal-article" href="${post.url}">
          <h4>${post.title}</h4>
          <small class="modal-article-date">${post.date}</small>
        </a>
        `
      })
      document.querySelector("#category-modal-title").innerText = e.target.innerText;
      document.querySelector("#category-modal-content").innerHTML = html;
      document.querySelector("#category-modal-bg").classList.toggle("open");
      document.querySelector("#category-modal").classList.toggle("open");
    });
  });

  document.querySelector("#category-modal-bg").addEventListener("click", function(){
    document.querySelector("#category-modal-title").innerText = "";
    document.querySelector("#category-modal-content").innerHTML = "";
    document.querySelector("#category-modal-bg").classList.toggle("open");
    document.querySelector("#category-modal").classList.toggle("open");
  })
};