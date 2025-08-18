import FormAuth from '../FormAuth/FormAuth'
import Logo from '../Logo/Logo'
import './Authorization.css'


function Authorization() {
  

  return (
    <div className='wrp-auth'>
      <div className='wrp-logo'>
        <Logo />
        <h2 className='auth-adm'>Администраторррская</h2>
      </div>
      <FormAuth />
    </div>     
  )
}

export default Authorization 

 