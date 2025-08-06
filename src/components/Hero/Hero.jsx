import style from "./Hero.module.sass"


export default function Hero({scrollToSection, signupRef}) {
  
  return (
    <div className={style.hero_section}>

      <div className={style.hero_content}>
        <h1 >Test assignment for front-end developer</h1>
        <p className={style.hero_text}>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
        
        <nav>
          <button onClick={() => scrollToSection(signupRef)}>Sign up</button>
        </nav>
      </div>

    </div>
  );
}