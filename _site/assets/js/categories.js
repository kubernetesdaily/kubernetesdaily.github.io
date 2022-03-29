const categories = { terrascan: [{ url: `/extend-gitops-security-with-terrascan`, date: `04 Feb 2022`, title: `Extend GitOps Security with Terrascan`},{ url: `/reduce-cloud-native-provisoning-issues`, date: `12 Jan 2021`, title: `less risky business way to reduce cloud-native provisioning issues`},],Terraform: [{ url: `/reduce-cloud-native-provisoning-issues`, date: `12 Jan 2021`, title: `less risky business way to reduce cloud-native provisioning issues`},],misconfiguration: [{ url: `/reduce-cloud-native-provisoning-issues`, date: `12 Jan 2021`, title: `less risky business way to reduce cloud-native provisioning issues`},],security: [{ url: `/extend-gitops-security-with-terrascan`, date: `04 Feb 2022`, title: `Extend GitOps Security with Terrascan`},{ url: `/reduce-cloud-native-provisoning-issues`, date: `12 Jan 2021`, title: `less risky business way to reduce cloud-native provisioning issues`},],kubernetes: [{ url: `/extend-gitops-security-with-terrascan`, date: `04 Feb 2022`, title: `Extend GitOps Security with Terrascan`},{ url: `/reduce-cloud-native-provisoning-issues`, date: `12 Jan 2021`, title: `less risky business way to reduce cloud-native provisioning issues`},],gitops: [{ url: `/extend-gitops-security-with-terrascan`, date: `04 Feb 2022`, title: `Extend GitOps Security with Terrascan`},], }

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