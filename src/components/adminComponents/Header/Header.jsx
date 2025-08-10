import './Header.css'

function Header({title, after, css, onClick, show, sectionName}) {

  

  return (
    <div className='header-wrp'>
      <h2 className={css}>{title}</h2>
      <span className={after} onClick={() => onClick({ [sectionName]: !show })}></span>
    </div>
  )
}

export default Header   