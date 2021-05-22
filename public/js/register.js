const elLoginForm = document.querySelector(".register_form")
const elLoginFormError = document.querySelector(".register-error")

const serverURL = "http://localhost:5000/" //rbcoder12345.fvds.ru


if (localStorage.getItem("token")) {
  window.location.href = "/"
}

elLoginForm.addEventListener("submit", async (evt) => {
  evt.preventDefault()
  const firstNameInput = document.querySelector(".first_name").value
  const lastNameInput = document.querySelector(".second_name").value
  const phoneNumberInput = document.querySelector(".phone_number").value
  const passwordInput = document.querySelector(".password_input").value
  console.log(passwordInput);
  const response = await fetch(`${serverURL}api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      phone_number: phoneNumberInput,
      first_name: firstNameInput,
      last_name: lastNameInput,
      password: passwordInput
    })
  })

  const data = await response.json()

  if (data.success) {

    localStorage.setItem("token", data.TOKEN)
    localStorage.setItem("userId", data.data.user_id)

    location.href = "/"
  } else {
    elLoginFormError.textContent = data.msg
  }

})