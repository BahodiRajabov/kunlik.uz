const serverURL = "http://localhost:5000/"

const elOrderTemplate = document.querySelector(".order-template").content
const elCategoryTemplate = document.querySelector(".category-template").content
const elServiceOptionTemplate = document.querySelector(".service-option-template").content
const elRegionOptionTemplate = document.querySelector(".region-option-template").content
const elOrderList = document.querySelector(".results")
const elCateroyList = document.querySelector(".categories-list")
const elServicesSelect = document.querySelector(".select-services")
const elRegionsSelect = document.querySelector(".select-regions")
const elSearchForm = document.querySelector(".searchjob-form")
const elSearchFormInput = document.querySelector(".searchjob-input")
const elHeaderLoginLink = document.querySelector(".header-login-link")

if (localStorage.getItem("token")) {
  elHeaderLoginLink.textContent = "Profile"
  elHeaderLoginLink.href = "/profile"
}

const createOrderCard = (order) => {
  let orderCardClone = elOrderTemplate.cloneNode(true);
  orderCardClone.querySelector(".result-title").textContent = order.title;
  orderCardClone.querySelector(".result-img").src = `${serverURL}${order.image_src}` || "images/avatar.png";
  // "/images/noimage.png"
  orderCardClone.querySelector(".result-phonenumber").textContent = order.phone_number;
  orderCardClone.querySelector(".result-phonenumber").href = order.phone_number;
  orderCardClone.querySelector(".result-direction").textContent = order.service_name;
  orderCardClone.querySelector(".result-text").textContent = order.descripton;
  orderCardClone.querySelector(".result-address").textContent = `${order.region_name} | ${order.created_at}`;
  orderCardClone.querySelector(".result-price").textContent = `${order.price} | ${order.jbt_type}`;
  return orderCardClone
}


const createCategoryCard = (cat) => {
  let elCategoryClone = elCategoryTemplate.cloneNode(true);
  elCategoryClone.querySelector(".categories-title").textContent = cat.service_name;
  // elCategoryClone.querySelector(".result-img").src = `${serverURL}${cat.image_src}` || "images/avatar.png";
  // elCategoryClone.querySelector(".categories-link").href = cat.service_count;
  return elCategoryClone
}

const createServicesOption = (opt) => {
  let elOptionClone = elServiceOptionTemplate.cloneNode(true);
  elOptionClone.querySelector("option").textContent = opt.service_name;
  elOptionClone.querySelector("option").value = opt.service_id;
  return elOptionClone
}

const createRegionsCard = (opt) => {
  let elOptionClone = elRegionOptionTemplate.cloneNode(true);
  elOptionClone.querySelector("option").textContent = opt.region_name;
  elOptionClone.querySelector("option").value = opt.region_id;
  return elOptionClone
}


let displayItemsOrder = (arr, list) => {
  list.innerHTML = "";
  let listFragment = document.createDocumentFragment();
  arr.forEach((orderr) => {
    listFragment.appendChild(createOrderCard(orderr))
  })
  list.appendChild(listFragment)
}

let displayItemsServices = (arr, list) => {
  list.innerHTML = "";
  let listFragment = document.createDocumentFragment();
  arr.forEach((orderr) => {
    listFragment.appendChild(createCategoryCard(orderr))
  })
  console.log(listFragment);
  list.appendChild(listFragment)
}

let displayItemsRegions = (arr, list) => {
  list.innerHTML = "";
  let listFragment = document.createDocumentFragment();
  arr.forEach((orderr) => {
    listFragment.appendChild(createRegionsCard(orderr))
  })
  list.appendChild(listFragment)
}

let displayItemsServicesSelect = (arr, list) => {
  list.innerHTML = "";
  let listFragment = document.createDocumentFragment();
  arr.forEach((orderr) => {
    listFragment.appendChild(createServicesOption(orderr))
  })
  list.appendChild(listFragment)
}


const fetchOrders = async () => {
  const response = await fetch(`${serverURL}api/orders`)
  const data = await response.json()
  return data.data
}

const fetchServices = async () => {
  const response = await fetch(`${serverURL}api/services`)
  const data = await response.json()
  console.log(data);
  return data.data
}

const fetchRegions = async () => {
  const response = await fetch(`${serverURL}api/regions`)
  const data = await response.json()
  console.log(data);
  return data.data
}

  ; (async () => {
    const orders = await fetchOrders()
    displayItemsOrder(orders, elOrderList)

    const services = await fetchServices()
    displayItemsServices(services, elCateroyList)
    displayItemsServicesSelect(services, elServicesSelect)
    
    const regions = await fetchRegions()
    displayItemsRegions(regions, elRegionsSelect)

  })()


  elServicesSelect.addEventListener("change",async (evt) => {
    const response = await fetch(`${serverURL}api/orders/service/${evt.target.value}`)
    const data = await response.json()
    displayItemsOrder(data.data, elOrderList)
  })

  elRegionsSelect.addEventListener("change",async (evt) => {
    const response = await fetch(`${serverURL}api/orders/region/${evt.target.value}`)
    const data = await response.json()
    displayItemsOrder(data.data, elOrderList)
  })

  elSearchForm.addEventListener("submit",async(evt) => {
    evt.preventDefault()
    const response = await fetch(`${serverURL}api/orders/search?q=${elSearchFormInput.value}`)
    const data = await response.json()
    console.log(data);
    displayItemsOrder(data.data, elOrderList)
  })

  elSearchFormInput.addEventListener("input",async(evt) => {
    evt.preventDefault()
    const response = await fetch(`${serverURL}api/orders/search?q=${elSearchFormInput.value}`)
    const data = await response.json()
    console.log(data);
    displayItemsOrder(data.data, elOrderList)
  })