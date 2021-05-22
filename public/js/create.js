const elRegisterForm = document.querySelector(".b-order")
const elRegisterFormError = document.querySelector(".b-order-error")

const serverURL = "http://localhost:5000/" //rbcoder12345.fvds.ru

if (!window.localStorage.getItem("token")) {
  window.location.href = "/register"
}

elRegisterForm.addEventListener("submit", async (evt) => {
  evt.preventDefault()
  
  const titleValue = elRegisterForm.querySelector(".b-order-input").value
  const descriptonValue = elRegisterForm.querySelector(".b-order-textarea").value
  const regionIdValue = elRegisterForm.querySelector(".hudud-select").value
  const serviceId = elRegisterForm.querySelector(".b-order-select").value
  const jbtType = elRegisterForm.querySelector(".bujet-select").value
  const price = elRegisterForm.querySelector(".narx-select").value
  const ownerId = Number(window.localStorage.getItem("userId"))
  const imageValue = elRegisterForm.querySelector(".image").files[0]

  let formData = new FormData();

  formData.append("title", titleValue);
  formData.append("descripton", descriptonValue);
  formData.append("region_id", regionIdValue);
  formData.append("service_id", serviceId);
  formData.append("jbt_type", jbtType);
  formData.append("price", price);
  formData.append("owner_id", ownerId);
  formData.append("image", imageValue);

  const response = await fetch(`${serverURL}api/orders`, {
    method: "POST",
    body: formData
  })
  const data = await response.json()

  if (!data.success) {
    return elRegisterFormError.textContent = data.msg
  }

  location.href = "/"

})