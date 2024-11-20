window.addEventListener('DOMContentLoaded', () => {

  const thanksModal = () => {
    const div = document.createElement('div');
    div.classList.add("thanksModal")
    div.textContent = 'Ваша заявка успешно отправлена и находится в обработке. Ожидайте email с подтверждением бронирования.'
    document.body.prepend(div);
  }

  const postData = (formData) => {
    const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

    fetch("server.php", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: jsonData,
    })
      .then(response => response.json())
      .then(data => console.log("Sent:", data))
      .catch(error => console.error(error))
  }

  const showErrorMessage = (input, message) => {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains('error_message')) {
      error = document.createElement('div');
      error.classList.add('error_message');
      error.textContent = message;
      input.parentNode.insertBefore(error, input.nextSibling);
    }
  }
  const clearError = (input) => {
    let error = input.nextElementSibling;
    if (error && error.classList.contains('error_message')) {
      error.remove();
    }
  };

  document.querySelector('#contact_form').addEventListener('submit', (e) => {
    e.preventDefault();
    let email = document.querySelector('#email');
    let name = document.querySelector('#name');
    let phone = document.querySelector('#tel');

    const validEmail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const validName = /^[a-zA-Zа-яА-ЯёЁґҐєЄіІїЇўЎ\s]{2,}$/;
    const validPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/;

    let isValid = true;

    if (!validEmail.test(email.value.trim())) {
      isValid = false;
      showErrorMessage(email, 'Пожалуйста правильно заполните email.');
    } else {
      clearError(email)
    }

    if (!validName.test(name.value.trim())) {
      isValid = false;
      showErrorMessage(name, 'Пожалуйста правильно заполните имя');
    } else {
      clearError(name)
    }

    if (!validPhone.test(phone.value.trim())) {
      isValid = false;
      showErrorMessage(phone, 'Пожалуйста введите телефон в формате +375 XX XXXXXXX');
    } else {
      clearError(phone)
    }

    if (isValid) {
      const formData = new FormData(e.target);
      postData(formData);
      email.value = "";
      name.value = ""
      phone.value = ""
      thanksModal();
      setTimeout(() => document.querySelector('.thanksModal').style.display = 'none', 4000);
    }

  })
})