(async function() {
  document.addEventListener("click", function() {
    document.querySelectorAll("img").forEach(element => {
      element.classList.remove("zoomed")
    })
  })
  function loadData() {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType("application/json");
      xhr.open("GET", "itens.json?"+ new Date().getTime(), true);
      xhr.onload = function() {
        resolve(xhr.responseText)
      }
      xhr.onerror = function(e) {
        reject(e)
      }
      xhr.send();
    });
  }

  const response = await loadData();
  const dataJson = JSON.parse(response);

  const itensContainer = document.querySelector(".itens-container")

  dataJson.forEach(saleItem => {
    const itemHeader = document.createElement("header");
    itemHeader.appendChild(document.createTextNode(saleItem.title))

    const detailsSection = document.createElement("section");

    saleItem.pictures.forEach(picture => {
      const itemPicture = document.createElement("img");
      itemPicture.src = picture;
      itemPicture.addEventListener("click", function(e) {
        itemPicture.classList.toggle("zoomed");
        e.stopPropagation();
      })
      detailsSection.appendChild(itemPicture);
    })


    const textDetails = document.createElement("div");

    const itemDescription = document.createElement("summary");
    itemDescription.appendChild(document.createTextNode(saleItem.description))
    textDetails.appendChild(itemDescription);

    const itemPrice = document.createElement("footer");
    itemPrice.appendChild(document.createTextNode(saleItem.price))
    textDetails.appendChild(itemPrice);

    detailsSection.appendChild(textDetails);


    const itemSection = document.createElement("article");
    itemSection.appendChild(itemHeader)
    itemSection.appendChild(detailsSection)

    itensContainer.appendChild(itemSection);
  });
})();