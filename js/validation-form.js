var modalValidate = $('#modal-validate');
var submitted=false;

const expresions = {
  name:/^[a-zA-ZÀ-ÿ\s]{3,40}$/,
  lastname:/^[a-zA-ZÀ-ÿ\s]{3,40}$/,
  email:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

const fields = {};

window.onload = () => {

  setTimeout(()=>{
    let inputs = document.querySelectorAll('.form__input');
    let errorMessage = document.getElementById('form__message');
    var validateField = (expresion, input, field) => {
      if (expresion.test(input.value)) {
        document.getElementById(`group__${field}`).classList.remove('form__group-incorrect');
        document.getElementById(`group__${field}`).classList.add('form__group-correct');
        document.querySelector(`#group__${field} i`).classList.remove('fa-times-circle');
        document.querySelector(`#group__${field} i`).classList.add('fa-check-circle');
        document.querySelector(`#form__error-${field} p`).classList.remove('form__input-error-active');
        fields[field] = true;
        if (Object.values(fields).includes(false)) {
          errorMessage.style.display = 'block';
          console.log('false');
        } else {
          errorMessage.style.display = 'none';
        }
      } else {
        document.getElementById(`group__${field}`).classList.add('form__group-incorrect');
        document.getElementById(`group__${field}`).classList.remove('form__group-correct');
        document.querySelector(`#group__${field} i`).classList.add('fa-times-circle');
        document.querySelector(`#group__${field} i`).classList.remove('fa-check-circle');
        document.querySelector(`#form__error-${field} p`).classList.add('form__input-error-active');
        errorMessage.style.display = 'block';
        fields[field] = false;
      }
    };
  
    var validateFields = function (e) {
      switch (e.target.id) {
        case 'name':
          validateField(expresions.name, e.target, 'name');
          break;
        case 'lastname':
          validateField(expresions.lastname, e.target, 'lastname');
          break;
        case 'email':
          validateField(expresions.email, e.target, 'email');
          break;
      }
    };
    inputs.forEach(input => {
      input.addEventListener('keyup', validateFields);
      input.addEventListener('blur', validateFields);
    });
  },100);
};

function validateForm() {

  if(Object.keys(fields).length == 3){
    if((fields.name && fields.lastname)&&fields.email){
      submitted=true;
      modalValidate.show();
      return true;
    }else{
      alert("El mensaje no pudo ser enviado");
      return false;
    }
  }else{
    alert("El mensaje no pudo ser enviado");
    return false;
  }
}

